const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, ccp-hmac-signature',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
};

const TICKETS = [
  { name: 'Standard', price: 500000, maxQuantity: 10 },
  { name: 'VIP', price: 1000000, maxQuantity: 10 },
  { name: 'VVIP', price: 2000000, maxQuantity: 10 },
  { name: 'Table entreprise', price: 10000000, maxQuantity: 5 },
  { name: 'Table Prestige', price: 20000000, maxQuantity: 5 }
];
const VOTE_AMOUNT_GNF = 5000;
const DEFAULT_BASE_URL = 'https://chapchappay.com/api';

const resolvePaymentAmount = (body: Record<string, any>) => {
  if (body.kind === 'ticket') {
    const ticket = TICKETS.find((item) => item.name === body.ticketName);
    if (!ticket) throw new Error('Type de ticket invalide');
    const qty = Math.floor(Number(body.quantity) || 1);
    if (!Number.isFinite(qty) || qty < 1 || qty > ticket.maxQuantity) {
      throw new Error(`Quantité invalide (1 à ${ticket.maxQuantity})`);
    }
    return { amount: ticket.price * qty, description: body.description || `Ticket HAG ${ticket.name} x${qty}` };
  }
  const qty = Math.floor(Number(body.quantity) || 1);
  if (!Number.isFinite(qty) || qty < 1 || !Number.isSafeInteger(VOTE_AMOUNT_GNF * qty)) {
    throw new Error('Nombre de votes invalide');
  }
  return {
    amount: VOTE_AMOUNT_GNF * qty,
    description: body.description || `Vote Hospitality Awards Guinée x${qty}`
  };
};

const json = (status: number, payload: unknown) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
  });

const signBody = async (key: string, body: string) => {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(body));
  return Array.from(new Uint8Array(signature)).map((b) => b.toString(16).padStart(2, '0')).join('');
};

const statusCodeOf = (payload: Record<string, any>) => {
  if (typeof payload.status === 'string') return payload.status.toLowerCase();
  if (payload.status && typeof payload.status.code === 'string') return payload.status.code.toLowerCase();
  return '';
};

const normalizeStatus = (code: string) => {
  const value = (code || '').toLowerCase();
  if (['created', 'new'].includes(value)) return 'created';
  if (['pending', 'processing'].includes(value)) return 'processing';
  if (['success', 'completed', 'paid'].includes(value)) return 'success';
  if (['cancel', 'canceled', 'cancelled', 'expired', 'failed', 'error'].includes(value)) return 'cancel';
  return value || 'unknown';
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }

  const apiKey = (Deno.env.get('CHAPCHAP_API_KEY') || '').trim();
  const encryptKey = (Deno.env.get('CHAPCHAP_ENCRYPT_KEY') || '').trim();
  const baseUrl = (Deno.env.get('CHAPCHAP_BASE_URL') || DEFAULT_BASE_URL).replace(/\/+$/, '');
  const notifyUrl = (Deno.env.get('CHAPCHAP_NOTIFY_URL') || '').trim();

  if (!apiKey) {
    return json(500, { error: 'CHAPCHAP_API_KEY manquante côté serveur' });
  }

  try {
    const body = await req.json();
    const action = body.action || 'checkout';

    if (action === 'status') {
      const operationId = body.operationId || '';
      const orderId = body.orderId || '';
      if (!operationId && !orderId) {
        return json(400, { error: 'operationId ou orderId requis' });
      }
      const path = operationId
        ? `/ecommerce/${encodeURIComponent(operationId)}`
        : `/ecommerce/order/${encodeURIComponent(orderId)}`;
      const response = await fetch(`${baseUrl}${path}`, {
        headers: { 'CCP-Api-Key': apiKey }
      });
      const payload = await response.json();
      if (!response.ok) {
        return json(502, { error: 'Impossible de vérifier le paiement Chap Chap Pay' });
      }
      const code = statusCodeOf(payload);
      const normalized = normalizeStatus(code);
      return json(200, {
        operationId: payload.operation_id,
        orderId: payload.order_id,
        amount: Number(payload.amount) || 0,
        status: normalized,
        rawStatus: code,
        paid: normalized === 'success' && Number(payload.amount) > 0,
        cancelled: normalized === 'cancel',
        paymentUrl: payload.payment_url || null
      });
    }

    const orderId = body.orderId;
    if (!orderId) return json(400, { error: 'order_id manquant' });

    const priced = resolvePaymentAmount(body);
    const payload = {
      amount: priced.amount,
      description: priced.description,
      order_id: String(orderId),
      return_url: body.returnUrl,
      cancel_url: body.cancelUrl,
      options: { 'auto-redirect': true as const },
      ...(notifyUrl ? { notify_url: notifyUrl } : {})
    };
    const raw = JSON.stringify(payload);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'CCP-Api-Key': apiKey
    };
    if (encryptKey) {
      headers['CCP-HMAC-Signature'] = await signBody(encryptKey, raw);
    }

    const response = await fetch(`${baseUrl}/ecommerce/create`, {
      method: 'POST',
      headers,
      body: raw
    });
    const created = await response.json();
    if (response.status !== 201 || !created.payment_url) {
      return json(502, { error: created.message || created.error || 'Création du paiement refusée' });
    }

    return json(201, {
      paymentUrl: created.payment_url,
      operationId: created.operation_id,
      orderId: created.order_id,
      amount: created.amount,
      paymentMethods: created.payment_methods || []
    });
  } catch (error) {
    return json(500, { error: error instanceof Error ? error.message : 'Erreur Chap Chap Pay' });
  }
});
