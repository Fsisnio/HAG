import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';
import {
  applyChapChapVoteStatus,
  isPaidCode,
  normalizeStatus,
  statusCodeOf
} from '../_shared/hagVotes.ts';

const json = (status: number, payload: unknown) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });

const DEFAULT_BASE_URL = 'https://chapchappay.com/api';

const fetchChapChapOperation = async (operationId: string, orderId: string) => {
  const apiKey = (Deno.env.get('CHAPCHAP_API_KEY') || '').trim();
  const baseUrl = (Deno.env.get('CHAPCHAP_BASE_URL') || DEFAULT_BASE_URL).replace(/\/+$/, '');
  if (!apiKey || (!operationId && !orderId)) return null;
  const path = operationId
    ? `/ecommerce/${encodeURIComponent(operationId)}`
    : `/ecommerce/order/${encodeURIComponent(orderId)}`;
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { 'CCP-Api-Key': apiKey }
  });
  if (!response.ok) return null;
  return response.json();
};

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const raw = await req.text();
  let payload: Record<string, any> = {};
  try {
    payload = raw ? JSON.parse(raw) : {};
  } catch {
    return json(400, { error: 'JSON invalide' });
  }

  const operationId = payload.operation_id || payload.operationId || '';
  const orderId = payload.order_id || payload.orderId || '';
  if (!operationId && !orderId) {
    return json(400, { error: 'operation_id manquant' });
  }

  const live = await fetchChapChapOperation(operationId, orderId);
  const source = live && typeof live === 'object' ? live : payload;
  const code = statusCodeOf(source);
  const paid = isPaidCode(code) && Number(source.amount || payload.amount || 0) > 0;
  const cancelled = normalizeStatus(code) === 'cancel';

  try {
    const applied = await applyChapChapVoteStatus(createClient, {
      operationId: source.operation_id || operationId,
      orderId: source.order_id || orderId,
      paid,
      cancelled,
      description: source.description || payload.description || ''
    });
    return json(200, { received: true, ...applied, operationId, orderId, status: code });
  } catch (error) {
    return json(500, { error: error instanceof Error ? error.message : 'Erreur webhook' });
  }
});
