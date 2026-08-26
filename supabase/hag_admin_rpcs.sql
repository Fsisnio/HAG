-- ADDITIF : aucune table n'est supprimée.
-- Permet au tableau de bord admin de lister et de mettre à jour les candidatures.

create or replace function public.hag_admin_list_applications()
returns setof public.hag_applications
language sql
stable
security definer
set search_path = public
as $$
  select *
  from public.hag_applications
  order by submitted_at desc;
$$;

create or replace function public.hag_admin_set_application_status(
  app_id uuid,
  new_status text
)
returns public.hag_applications
language plpgsql
security definer
set search_path = public
as $$
declare
  updated public.hag_applications;
begin
  if new_status not in ('pending', 'approved', 'rejected') then
    raise exception 'Statut invalide';
  end if;

  update public.hag_applications
  set status = new_status
  where id = app_id
  returning * into updated;

  if updated.id is null then
    raise exception 'Candidature introuvable';
  end if;

  return updated;
end;
$$;

create or replace function public.hag_admin_list_paid_votes()
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
    v.paid_at,
    v.created_at
  from public.hag_votes v
  where v.status = 'paid'
  order by coalesce(v.paid_at, v.created_at) desc;
$$;

grant execute on function public.hag_admin_list_applications() to anon, authenticated;
grant execute on function public.hag_admin_set_application_status(uuid, text) to anon, authenticated;
grant execute on function public.hag_admin_list_paid_votes() to anon, authenticated;
