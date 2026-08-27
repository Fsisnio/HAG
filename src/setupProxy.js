const { createCheckout, fetchOperation, verifyWebhookSignature, statusCodeOf, normalizeStatus } = require('../server/chapchap');

const readJsonBody = (req) =>
  new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
      resolve({ json: req.body, raw: JSON.stringify(req.body) });
      return;
    }
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) {
        resolve({ json: {}, raw: '' });
        return;
      }
      try {
        resolve({ json: JSON.parse(raw), raw });
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });

const sendJson = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
};

module.exports = function setupChapChapProxy(app) {
  app.post('/api/chapchap/checkout', async (req, res) => {
    try {
      const { json } = await readJsonBody(req);
      const origin = `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`;
      const kind = json.kind === 'ticket' ? 'ticket' : 'vote';
      const returnPath = kind === 'ticket' ? '/tickets' : '/voter';
      const checkout = await createCheckout({
        orderId: json.orderId,
        description: json.description,
        kind,
        ticketName: json.ticketName,
        quantity: json.quantity,
        returnUrl: json.returnUrl || `${origin}${returnPath}?order_id=${encodeURIComponent(json.orderId || '')}`,
        cancelUrl:
          json.cancelUrl ||
          `${origin}${returnPath}?order_id=${encodeURIComponent(json.orderId || '')}&status=canceled`,
        notifyUrl: json.notifyUrl
      });
      sendJson(res, 201, checkout);
    } catch (error) {
      sendJson(res, error.statusCode || 500, { error: error.message || 'Erreur Chap Chap Pay' });
    }
  });

  app.get('/api/chapchap/status', async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      const operationId = url.searchParams.get('operationId') || '';
      const orderId = url.searchParams.get('orderId') || '';
      if (!operationId && !orderId) {
        sendJson(res, 400, { error: 'operationId ou orderId requis' });
        return;
      }
      const status = await fetchOperation({ operationId, orderId });
      sendJson(res, 200, status);
    } catch (error) {
      sendJson(res, error.statusCode || 500, { error: error.message || 'Erreur Chap Chap Pay' });
    }
  });

  app.post('/api/chapchap/webhook', async (req, res) => {
    try {
      const { json, raw } = await readJsonBody(req);
      const signature = req.headers['ccp-hmac-signature'] || req.headers['x-ccp-signature'] || '';
      if (!verifyWebhookSignature(raw, signature)) {
        sendJson(res, 401, { error: 'Signature webhook invalide' });
        return;
      }
      const operationId = json.operation_id || json.operationId || '';
      const code = statusCodeOf(json) || (json.event || '').toLowerCase();
      sendJson(res, 200, {
        received: true,
        operationId,
        status: normalizeStatus(code)
      });
    } catch (error) {
      sendJson(res, 400, { error: 'Webhook illisible' });
    }
  });
};
