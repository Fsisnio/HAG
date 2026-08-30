export const VOTE_AMOUNT_GNF = 5000;

export const statusCodeOf = (payload: Record<string, any>) => {
  if (typeof payload.status === 'string') return payload.status.toLowerCase();
  if (payload.status && typeof payload.status.code === 'string') return payload.status.code.toLowerCase();
  if (typeof payload.event === 'string') return payload.event.toLowerCase();
  return '';
};

export const isPaidCode = (code: string) => {
  const value = (code || '').toLowerCase();
  if (['success', 'completed', 'paid'].includes(value)) return true;
  return /(^|[._-])success$/.test(value);
};

export const isCancelledCode = (code: string) => {
  const value = (code || '').toLowerCase();
  return ['cancel', 'canceled', 'cancelled', 'expired', 'failed', 'error'].includes(value);
};

export const normalizeStatus = (code: string) => {
  const value = (code || '').toLowerCase();
  if (['created', 'new'].includes(value)) return 'created';
  if (['pending', 'processing'].includes(value)) return 'processing';
  if (isPaidCode(value)) return 'success';
  if (isCancelledCode(value)) return 'cancel';
  return value || 'unknown';
};

export const parseVoteDescription = (description: string) => {
  const text = String(description || '').trim();
  const match = text.match(/^Vote HAG x(\d+)\s+[—–-]\s+(.+?)\s+[—–-]\s+(.+)$/i);
  if (!match) return null;
  const quantity = Math.max(1, Math.floor(Number(match[1]) || 1));
  const candidateName = match[2].trim();
  const voterParts = match[3].trim().split(/\s+/).filter(Boolean);
  return {
    quantity,
    candidateName,
    voterFirstName: voterParts[0] || 'Votant',
    voterLastName: voterParts.slice(1).join(' ') || 'ChapChap'
  };
};

const supabaseAdmin = (createClient: any) =>
  createClient(Deno.env.get('SUPABASE_URL') || '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '', {
    auth: { persistSession: false }
  });

export const insertPendingVotes = async (
  createClient: any,
  input: {
    orderId: string;
    operationId?: string;
    quantity: number;
    candidateId: number;
    candidateName: string;
    candidateCategory: string;
    voterLastName: string;
    voterFirstName: string;
    voterEmail: string;
    voterPhone: string;
  }
) => {
  const supabase = supabaseAdmin(createClient);
  const quantity = Math.max(1, Math.floor(input.quantity || 1));
  const { data: existing, error: existingError } = await supabase
    .from('hag_votes')
    .select('id')
    .eq('chapchap_order_id', input.orderId)
    .limit(1);
  if (existingError) throw new Error(existingError.message);
  if (existing && existing.length > 0) {
    if (input.operationId) {
      await supabase
        .from('hag_votes')
        .update({ chapchap_operation_id: input.operationId })
        .eq('chapchap_order_id', input.orderId);
    }
    return existing.length;
  }

  const rows = Array.from({ length: quantity }, () => ({
    candidate_id: input.candidateId,
    candidate_name: input.candidateName,
    candidate_category: input.candidateCategory,
    voter_last_name: input.voterLastName,
    voter_first_name: input.voterFirstName,
    voter_email: input.voterEmail,
    voter_phone: input.voterPhone,
    amount: VOTE_AMOUNT_GNF,
    currency: 'GNF',
    payment_provider: 'chapchap',
    status: 'pending_payment',
    chapchap_order_id: input.orderId,
    chapchap_operation_id: input.operationId || null
  }));
  const { data, error } = await supabase.from('hag_votes').insert(rows).select('id');
  if (error) throw new Error(error.message);
  return data?.length || 0;
};

export const applyChapChapVoteStatus = async (
  createClient: any,
  input: {
    operationId?: string;
    orderId?: string;
    paid: boolean;
    cancelled?: boolean;
    description?: string;
  }
) => {
  const supabase = supabaseAdmin(createClient);
  const operationId = input.operationId || '';
  const orderId = input.orderId || '';
  if (!operationId && !orderId) {
    return { updated: 0, inserted: 0, status: 'ignored' };
  }

  const nextStatus = input.paid ? 'paid' : input.cancelled ? 'cancelled' : null;
  if (!nextStatus) {
    return { updated: 0, inserted: 0, status: 'ignored' };
  }

  const patch: Record<string, unknown> = {
    status: nextStatus,
    paid_at: nextStatus === 'paid' ? new Date().toISOString() : null
  };
  if (operationId) patch.chapchap_operation_id = operationId;

  let query = supabase.from('hag_votes').update(patch);
  query = operationId && orderId
    ? query.or(`chapchap_operation_id.eq.${operationId},chapchap_order_id.eq.${orderId}`)
    : operationId
      ? query.eq('chapchap_operation_id', operationId)
      : query.eq('chapchap_order_id', orderId);

  const { data, error } = await query.select('id');
  if (error) throw new Error(error.message);
  const updated = data?.length || 0;
  if (updated > 0 || nextStatus !== 'paid') {
    return { updated, inserted: 0, status: nextStatus };
  }

  const parsed = parseVoteDescription(input.description || '');
  if (!parsed) return { updated: 0, inserted: 0, status: nextStatus };

  const { data: candidates, error: candidateError } = await supabase
    .from('hag_candidates')
    .select('id, name, category_id')
    .ilike('name', parsed.candidateName);
  if (candidateError) throw new Error(candidateError.message);
  const candidate = (candidates || []).find(
    (row: { name: string }) => row.name.toLowerCase() === parsed.candidateName.toLowerCase()
  ) || (candidates || [])[0];
  if (!candidate) return { updated: 0, inserted: 0, status: nextStatus };

  const { data: category } = await supabase
    .from('hag_categories')
    .select('title')
    .eq('id', candidate.category_id)
    .maybeSingle();

  const rows = Array.from({ length: parsed.quantity }, () => ({
    candidate_id: candidate.id,
    candidate_name: candidate.name,
    candidate_category: category?.title || parsed.candidateName,
    voter_last_name: parsed.voterLastName,
    voter_first_name: parsed.voterFirstName,
    voter_email: 'vote@chapchap.local',
    voter_phone: '000000000',
    amount: VOTE_AMOUNT_GNF,
    currency: 'GNF',
    payment_provider: 'chapchap',
    status: 'paid',
    chapchap_order_id: orderId || null,
    chapchap_operation_id: operationId || null,
    paid_at: new Date().toISOString()
  }));

  const inserted = await supabase.from('hag_votes').insert(rows).select('id');
  if (inserted.error) throw new Error(inserted.error.message);
  return { updated: 0, inserted: inserted.data?.length || 0, status: nextStatus };
};

export const insertPaidVoteByCandidate = async (
  createClient: any,
  input: {
    candidateId: number;
    paymentReference: string;
    quantity?: number;
    voterFirstName?: string;
    voterLastName?: string;
  }
) => {
  const supabase = supabaseAdmin(createClient);
  const reference = String(input.paymentReference || '').trim();
  const quantity = Math.max(1, Math.floor(Number(input.quantity) || 1));
  if (!reference) throw new Error('Référence de paiement manquante');

  const { data: existing, error: existingError } = await supabase
    .from('hag_votes')
    .select('id')
    .eq('chapchap_operation_id', reference)
    .eq('status', 'paid');
  if (existingError) throw new Error(existingError.message);
  if (existing && existing.length > 0) {
    return { updated: existing.length, inserted: 0, status: 'paid' };
  }

  const { data: candidate, error: candidateError } = await supabase
    .from('hag_candidates')
    .select('id, name, category_id')
    .eq('id', input.candidateId)
    .maybeSingle();
  if (candidateError) throw new Error(candidateError.message);
  if (!candidate) throw new Error('Candidat introuvable');

  const { data: category } = await supabase
    .from('hag_categories')
    .select('title')
    .eq('id', candidate.category_id)
    .maybeSingle();

  const rows = Array.from({ length: quantity }, () => ({
    candidate_id: candidate.id,
    candidate_name: candidate.name,
    candidate_category: category?.title || candidate.name,
    voter_last_name: (input.voterLastName || 'ChapChap').trim(),
    voter_first_name: (input.voterFirstName || 'Votant').trim(),
    voter_email: 'vote@chapchap.local',
    voter_phone: '000000000',
    amount: VOTE_AMOUNT_GNF,
    currency: 'GNF',
    payment_provider: 'chapchap',
    status: 'paid',
    chapchap_order_id: reference,
    chapchap_operation_id: reference,
    paid_at: new Date().toISOString()
  }));

  const inserted = await supabase.from('hag_votes').insert(rows).select('id');
  if (inserted.error) throw new Error(inserted.error.message);
  return { updated: 0, inserted: inserted.data?.length || 0, status: 'paid' };
};

