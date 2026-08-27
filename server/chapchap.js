const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const loadEnvFile = (fileName) => {
  const envPath = path.join(__dirname, '..', fileName);
  if (!fs.existsSync(envPath)) return;
  fs.readFileSync(envPath, 'utf8').split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eq = trimmed.indexOf('=');
    if (eq === -1) return;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (key && !process.env[key]) process.env[key] = value;
  });
};

loadEnvFile('.env');
loadEnvFile('.env.local');

const { VOTE_AMOUNT_GNF, resolvePaymentAmount } = require('./pricing');
const DEFAULT_BASE_URL = 'https://chapchappay.com/api';

const PAID_CODES = new Set(['success', 'completed', 'paid']);
const CANCELLED_CODES = new Set(['cancel', 'canceled', 'cancelled', 'expired', 'failed', 'error']);

const getConfig = () => ({
  apiKey: (process.env.CHAPCHAP_API_KEY || '').trim(),
  encryptKey: (process.env.CHAPCHAP_ENCRYPT_KEY || '').trim(),
  baseUrl: (process.env.CHAPCHAP_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, ''),
  notifyUrl: (process.env.CHAPCHAP_NOTIFY_URL || '').trim()
});

const requestJson = (method, url, { headers = {}, body } = {}) =>
  new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const payload = body || '';
    const lib = parsed.protocol === 'http:' ? http : https;
    const req = lib.request(
      {
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        port: parsed.port || undefined,
        path: `${parsed.pathname}${parsed.search}`,
        method,
        headers: {
          ...headers,
          ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
        }
      },
      (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          const text = Buffer.concat(chunks).toString('utf8');
          let json = null;
          try {
            json = text ? JSON.parse(text) : null;
          } catch {
            json = null;
          }
          resolve({ status: res.statusCode || 0, json, text });
        });
      }
    );
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });

const signBody = (encryptKey, body) =>
  crypto.createHmac('sha256', encryptKey).update(body).digest('hex');

const statusCodeOf = (payload) => {
  if (!payload) return '';
  if (typeof payload.status === 'string') return payload.status.toLowerCase();
  if (payload.status && typeof payload.status.code === 'string') {
    return payload.status.code.toLowerCase();
  }
  return '';
};

const normalizeStatus = (code) => {
  const value = (code || '').toLowerCase();
  if (['created', 'new'].includes(value)) return 'created';
  if (['pending', 'processing'].includes(value)) return 'processing';
  if (PAID_CODES.has(value)) return 'success';
  if (CANCELLED_CODES.has(value)) return 'cancel';
  return value || 'unknown';
};

const createCheckout = async ({
  orderId,
  description,
  returnUrl,
  cancelUrl,
  notifyUrl,
  kind,
  ticketName,
  quantity
}) => {
  const config = getConfig();
  if (!config.apiKey) {
    const error = new Error('CHAPCHAP_API_KEY manquante');
    error.statusCode = 500;
    throw error;
  }
  if (!orderId) {
    const error = new Error('order_id manquant');
    error.statusCode = 400;
    throw error;
  }

  const priced = resolvePaymentAmount({ kind, ticketName, quantity });
  const payload = {
    amount: priced.amount,
    description: description || (priced.kind === 'ticket'
      ? `Ticket HAG ${priced.ticketName} x${priced.quantity}`
      : 'Vote Hospitality Awards Guinée'),
    order_id: String(orderId),
    return_url: returnUrl,
    cancel_url: cancelUrl,
    options: { 'auto-redirect': true }
  };
  const resolvedNotify = notifyUrl || config.notifyUrl;
  if (resolvedNotify) payload.notify_url = resolvedNotify;

  const body = JSON.stringify(payload);
  const headers = {
    'Content-Type': 'application/json',
    'CCP-Api-Key': config.apiKey
  };
  if (config.encryptKey) {
    headers['CCP-HMAC-Signature'] = signBody(config.encryptKey, body);
  }

  const response = await requestJson('POST', `${config.baseUrl}/ecommerce/create`, {
    headers,
    body
  });

  if (response.status !== 201 || !response.json || !response.json.payment_url) {
    const error = new Error(
      (response.json && (response.json.message || response.json.error)) ||
        `Chap Chap Pay a refusé la création du paiement (${response.status})`
    );
    error.statusCode = 502;
    error.details = response.json || response.text;
    throw error;
  }

  return {
    paymentUrl: response.json.payment_url,
    operationId: response.json.operation_id,
    orderId: response.json.order_id,
    amount: response.json.amount,
    paymentMethods: response.json.payment_methods || [],
    kind: priced.kind,
    ticketName: priced.ticketName,
    quantity: priced.quantity
  };
};

const fetchOperation = async ({ operationId, orderId }) => {
  const config = getConfig();
  if (!config.apiKey) {
    const error = new Error('CHAPCHAP_API_KEY manquante');
    error.statusCode = 500;
    throw error;
  }

  const path = operationId
    ? `/ecommerce/${encodeURIComponent(operationId)}`
    : `/ecommerce/order/${encodeURIComponent(orderId)}`;

  const response = await requestJson('GET', `${config.baseUrl}${path}`, {
    headers: { 'CCP-Api-Key': config.apiKey }
  });

  if (response.status !== 200 || !response.json) {
    const error = new Error('Impossible de vérifier le paiement Chap Chap Pay');
    error.statusCode = 502;
    error.details = response.json || response.text;
    throw error;
  }

  const code = statusCodeOf(response.json);
  const normalized = normalizeStatus(code);
  return {
    operationId: response.json.operation_id,
    orderId: response.json.order_id,
    amount: Number(response.json.amount) || 0,
    status: normalized,
    rawStatus: code,
    paid: normalized === 'success' && Number(response.json.amount) > 0,
    cancelled: normalized === 'cancel',
    paymentUrl: response.json.payment_url || null
  };
};

const verifyWebhookSignature = (rawBody, signature) => {
  const config = getConfig();
  if (!config.encryptKey || !signature) return !config.encryptKey;
  const expected = signBody(config.encryptKey, rawBody);
  const left = Buffer.from(expected);
  const right = Buffer.from(String(signature));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
};

module.exports = {
  VOTE_AMOUNT_GNF,
  createCheckout,
  fetchOperation,
  normalizeStatus,
  statusCodeOf,
  verifyWebhookSignature,
  getConfig
};
