import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { VOTE_AMOUNT_GNF } from '../data/event';

const localProxy = process.env.NODE_ENV === 'development';
const supabaseFunctionsUrl = process.env.REACT_APP_SUPABASE_URL
  ? `${process.env.REACT_APP_SUPABASE_URL.replace(/\/+$/, '')}/functions/v1`
  : '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

const jsonHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (!localProxy && supabaseAnonKey) {
    headers.Authorization = `Bearer ${supabaseAnonKey}`;
    headers.apikey = supabaseAnonKey;
  }
  return headers;
};

const readError = async (response: Response): Promise<string> => {
  try {
    const payload = await response.json();
    return payload.error || payload.message || `Erreur ${response.status}`;
  } catch {
    return `Erreur ${response.status}`;
  }
};

export interface ChapChapCheckoutResult {
  paymentUrl: string;
  operationId: string;
  orderId: string;
  amount: number;
  paymentMethods: string[];
}

export interface ChapChapStatusResult {
  operationId: string;
  orderId: string;
  amount: number;
  status: string;
  rawStatus?: string;
  paid: boolean;
  cancelled: boolean;
  paymentUrl?: string | null;
}

export const createChapChapCheckout = async (input: {
  orderId: string;
  description: string;
  returnUrl: string;
  cancelUrl: string;
  kind?: 'vote' | 'ticket';
  ticketName?: string;
  quantity?: number;
}): Promise<ChapChapCheckoutResult> => {
  const url = localProxy ? '/api/chapchap/checkout' : `${supabaseFunctionsUrl}/chapchap`;
  const response = await fetch(url, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(
      localProxy
        ? input
        : { action: 'checkout', ...input }
    )
  });
  if (!response.ok) {
    throw new Error(await readError(response));
  }
  return response.json();
};

export const fetchChapChapStatus = async (query: {
  operationId?: string;
  orderId?: string;
}): Promise<ChapChapStatusResult> => {
  if (localProxy) {
    const params = new URLSearchParams();
    if (query.operationId) params.set('operationId', query.operationId);
    if (query.orderId) params.set('orderId', query.orderId);
    const response = await fetch(`/api/chapchap/status?${params.toString()}`);
    if (!response.ok) {
      throw new Error(await readError(response));
    }
    return response.json();
  }

  const response = await fetch(`${supabaseFunctionsUrl}/chapchap`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ action: 'status', ...query })
  });
  if (!response.ok) {
    throw new Error(await readError(response));
  }
  return response.json();
};

export const persistPendingVote = async (vote: {
  candidateId: number;
  candidateName: string;
  candidateCategory: string;
  voterLastName: string;
  voterFirstName: string;
  voterEmail: string;
  voterPhone: string;
  amount: number;
  orderId: string;
  operationId?: string;
  quantity?: number;
}) => {
  if (!isSupabaseConfigured || !supabase) return;
  const quantity = Math.max(1, Math.floor(vote.quantity || 1));
  const rows = Array.from({ length: quantity }, () => ({
    candidate_id: vote.candidateId,
    candidate_name: vote.candidateName,
    candidate_category: vote.candidateCategory,
    voter_last_name: vote.voterLastName,
    voter_first_name: vote.voterFirstName,
    voter_email: vote.voterEmail,
    voter_phone: vote.voterPhone,
    amount: VOTE_AMOUNT_GNF,
    currency: 'GNF',
    payment_provider: 'chapchap',
    status: 'pending_payment',
    chapchap_order_id: vote.orderId,
    chapchap_operation_id: vote.operationId || null
  }));
  const { error } = await supabase.from('hag_votes').insert(rows);
  if (error) {
    console.warn('Vote pending non enregistré côté serveur:', error.message);
  }
};
