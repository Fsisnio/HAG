-- ADDITIF : conserve fedapay_transaction_id, ajoute Chap Chap Pay.
alter table public.hag_votes
  add column if not exists chapchap_operation_id text,
  add column if not exists chapchap_order_id text;

create unique index if not exists hag_votes_chapchap_operation_uidx
  on public.hag_votes (chapchap_operation_id)
  where chapchap_operation_id is not null;

create index if not exists hag_votes_chapchap_order_idx
  on public.hag_votes (chapchap_order_id);

alter table public.hag_votes
  alter column payment_provider set default 'chapchap';

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
