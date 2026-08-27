import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

const VOTE_AMOUNT_GNF = 5000;

const json = (status: number, payload: unknown) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });

const statusCodeOf = (payload: Record<string, any>) => {
  if (typeof payload.status === 'string') return payload.status.toLowerCase();
  if (payload.status && typeof payload.status.code === 'string') return payload.status.code.toLowerCase();
  if (typeof payload.event === 'string') return payload.event.toLowerCase();
  return '';
};

const isPaid = (code: string) => ['success', 'completed', 'paid'].includes(code);
const isCancelled = (code: string) =>
  ['cancel', 'canceled', 'cancelled', 'expired', 'failed', 'error'].includes(code);

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

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const raw = await req.text();
  const encryptKey = (Deno.env.get('CHAPCHAP_ENCRYPT_KEY') || '').trim();
  const signature = req.headers.get('ccp-hmac-signature') || req.headers.get('x-ccp-signature') || '';

  if (encryptKey && signature) {
    const expected = await signBody(encryptKey, raw);
    if (expected !== signature) {
      return json(401, { error: 'Signature webhook invalide' });
    }
  }

  let payload: Record<string, any> = {};
  try {
    payload = raw ? JSON.parse(raw) : {};
  } catch {
    return json(400, { error: 'JSON invalide' });
  }

  const operationId = payload.operation_id || payload.operationId || '';
  const orderId = payload.order_id || payload.orderId || '';
  const code = statusCodeOf(payload);
  if (!operationId && !orderId) {
    return json(400, { error: 'operation_id manquant' });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') || '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
    { auth: { persistSession: false } }
  );

  const nextStatus = isPaid(code) ? 'paid' : isCancelled(code) ? 'cancelled' : null;
  if (!nextStatus) {
    return json(200, { received: true, ignored: true, status: code });
  }

  let query = supabase.from('hag_votes').update({
    status: nextStatus,
    chapchap_operation_id: operationId || undefined,
    paid_at: nextStatus === 'paid' ? new Date().toISOString() : null
  });
  query = operationId
    ? query.or(`chapchap_operation_id.eq.${operationId},chapchap_order_id.eq.${orderId || 'none'}`)
    : query.eq('chapchap_order_id', orderId);

  const { error } = await query;
  if (error) {
    return json(500, { error: error.message });
  }

  if (nextStatus === 'paid' && payload.amount && Number(payload.amount) !== VOTE_AMOUNT_GNF) {
    return json(200, { received: true, warning: 'Montant inattendu' });
  }

  return json(200, { received: true, status: nextStatus, operationId, orderId });
});
