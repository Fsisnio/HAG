import { supabase, isSupabaseConfigured } from '../lib/supabase';

export class AdminRpcMissingError extends Error {
  constructor() {
    super(
      'Le tableau de bord ne peut pas encore lire les candidatures. Dans Supabase → SQL Editor, exécutez le fichier hag_admin_rpcs.sql (aucune table n’est supprimée).'
    );
    this.name = 'AdminRpcMissingError';
  }
}

export interface AdminApplication {
  id: string;
  organizationName: string;
  commercialName?: string;
  category: string;
  prize?: string;
  website?: string;
  contactPerson: string;
  email: string;
  phone: string;
  description: string;
  motivation?: string;
  strengths?: string;
  status: 'pending' | 'approved' | 'rejected' | string;
  submittedAt: string;
}

export interface AdminPaidVote {
  id: string;
  candidate: string;
  category: string;
  voter: string;
  voteType: 'online';
  amount: number;
  status: 'approved';
  submittedAt: string;
  transactionId?: string;
}

export interface VoteTotal {
  candidate_id: number;
  votes: number;
}

const rpcErrorText = (error?: { message?: string; details?: string; hint?: string; code?: string }) =>
  [error?.message, error?.details, error?.hint, error?.code].filter(Boolean).join(' ');

const isMissingRpc = (error?: { message?: string; details?: string; hint?: string; code?: string }) => {
  const text = rpcErrorText(error).toLowerCase();
  const code = error?.code || '';
  if (code === 'PGRST202' || code === 'PGRST125' || code === '42883') return true;
  if (text.includes('could not find the function')) return true;
  if (text.includes('invalid path')) return true;
  if (text.includes('function') && text.includes('does not exist')) return true;
  return false;
};

const mapApplication = (row: Record<string, any>): AdminApplication => ({
  id: row.id,
  organizationName: row.organization_name,
  commercialName: row.commercial_name,
  category: row.category_group || row.prize,
  prize: row.prize,
  website: row.website,
  contactPerson: row.contact_person,
  email: row.email,
  phone: row.phone,
  description: row.description,
  motivation: row.motivation,
  strengths: row.strengths,
  status: row.status || 'pending',
  submittedAt: row.submitted_at
});

export const fetchAdminApplications = async (): Promise<AdminApplication[]> => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase n’est pas configuré. Vérifiez SUPABASE_URL et SUPABASE_ANON_KEY.');
  }

  const rpc = await supabase.rpc('hag_admin_list_applications');
  if (!rpc.error) {
    return ((rpc.data as Record<string, any>[]) || []).map(mapApplication);
  }

  if (isMissingRpc(rpc.error)) {
    const fallback = await supabase
      .from('hag_applications')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (!fallback.error && fallback.data && fallback.data.length > 0) {
      return fallback.data.map(mapApplication);
    }
  }

  throw new AdminRpcMissingError();
};

export const setApplicationStatus = async (
  id: string,
  status: 'approved' | 'rejected' | 'pending'
): Promise<AdminApplication> => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase n’est pas configuré.');
  }

  const { data, error } = await supabase.rpc('hag_admin_set_application_status', {
    app_id: id,
    new_status: status
  });

  if (error) {
    if (isMissingRpc(error)) {
      throw new AdminRpcMissingError();
    }
    throw new Error('Impossible de mettre à jour la candidature.');
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row) {
    throw new Error('Candidature introuvable.');
  }

  return mapApplication(row as Record<string, any>);
};

export const fetchVoteTotals = async (): Promise<VoteTotal[]> => {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase.rpc('hag_vote_totals');
  if (error || !data) return [];
  return data as VoteTotal[];
};

export const fetchPaidVoteTotals = async (): Promise<number> => {
  const totals = await fetchVoteTotals();
  return totals.reduce((sum, row) => sum + (row.votes || 0), 0);
};

export const fetchAdminPaidVotes = async (): Promise<AdminPaidVote[]> => {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase.rpc('hag_admin_list_paid_votes');
  if (error) {
    throw new Error(error.message || 'Impossible de charger les votes payés.');
  }

  return ((data as Record<string, any>[]) || []).map((row) => ({
    id: row.id,
    candidate: row.candidate_name,
    category: row.candidate_category,
    voter: [row.voter_first_name, row.voter_last_name].filter(Boolean).join(' ') || 'Paiement Chap Chap Pay',
    voteType: 'online' as const,
    amount: row.amount,
    status: 'approved' as const,
    submittedAt: row.paid_at || row.created_at,
    transactionId: row.chapchap_operation_id || row.fedapay_transaction_id
  }));
};
