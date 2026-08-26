-- ADDITIF UNIQUEMENT : ne supprime aucune table, aucune donnée, aucune autre policy.

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'hag_applications'
      and policyname = 'hag_applications_public_insert'
  ) then
    create policy hag_applications_public_insert
      on public.hag_applications
      for insert
      to anon, authenticated
      with check (status = 'pending');
  end if;
end $$;

grant insert on public.hag_applications to anon, authenticated;
