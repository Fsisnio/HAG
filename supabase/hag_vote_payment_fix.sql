-- Several votes can share one Chap Chap operation (quantity > 1).
drop index if exists public.hag_votes_chapchap_operation_uidx;

create index if not exists hag_votes_chapchap_operation_idx
  on public.hag_votes (chapchap_operation_id);

drop function if exists public.hag_admin_list_paid_votes();

create function public.hag_admin_list_paid_votes()
returns table (
  id uuid,
  candidate_id integer,
  candidate_name text,
  candidate_category text,
  voter_first_name text,
  voter_last_name text,
  amount integer,
  currency text,
  fedapay_transaction_id text,
  chapchap_operation_id text,
  paid_at timestamptz,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    v.id,
    v.candidate_id,
    v.candidate_name,
    v.candidate_category,
    v.voter_first_name,
    v.voter_last_name,
    v.amount,
    v.currency,
    v.fedapay_transaction_id,
    v.chapchap_operation_id,
    v.paid_at,
    v.created_at
  from public.hag_votes v
  where v.status = 'paid'
  order by coalesce(v.paid_at, v.created_at) desc;
$$;

grant execute on function public.hag_admin_list_paid_votes() to anon, authenticated;
