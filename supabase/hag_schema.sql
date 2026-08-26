-- =============================================================================
-- Hospitality Awards Guinée (HAG)
--
-- SCRIPT ADDITIF UNIQUEMENT
-- - Ne contient AUCUN DROP TABLE / TRUNCATE / DELETE
-- - Ne touche pas aux tables déjà présentes dans le projet
-- - Crée seulement les objets préfixés hag_ s'ils n'existent pas
--
-- Dans Supabase : SQL Editor → New query → coller → Run
-- =============================================================================

do $$
begin
  raise notice 'HAG: création des tables hag_* sans supprimer les tables existantes.';
end $$;

create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- 1. Catégories / prix
-- -----------------------------------------------------------------------------
create table if not exists public.hag_categories (
  id integer primary key,
  title text not null unique,
  description text not null,
  category_group text not null,
  criteria jsonb not null default '[]'::jsonb,
  public_vote boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- 2. Nominés
-- -----------------------------------------------------------------------------
create table if not exists public.hag_candidates (
  id integer primary key,
  category_id integer not null references public.hag_categories(id) on delete restrict,
  name text not null,
  description text,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists hag_candidates_category_idx on public.hag_candidates (category_id);

-- -----------------------------------------------------------------------------
-- 3. Candidatures (formulaire d'inscription)
-- -----------------------------------------------------------------------------
create table if not exists public.hag_applications (
  id uuid primary key default gen_random_uuid(),
  edition integer not null default 2026,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  organization_name text not null,
  commercial_name text,
  category_group text not null,
  prize text not null,
  address text not null,
  phone text not null,
  email text not null,
  website text,
  contact_person text not null,
  contact_function text,
  contact_phone text,
  contact_email text,
  description text not null,
  creation_date text,
  activities text,
  motivation text not null,
  strengths text not null,
  innovation text,
  quality_actions text,
  satisfaction text,
  social_media text,
  document_names text[] not null default '{}',
  has_authorization boolean not null default false,
  declaration_name text not null,
  declaration_function text,
  declaration_place text,
  submitted_at timestamptz not null default now()
);

create index if not exists hag_applications_status_idx on public.hag_applications (status);
create index if not exists hag_applications_email_idx on public.hag_applications (email);

-- -----------------------------------------------------------------------------
-- 4. Votes — valides uniquement si status = 'paid'
-- -----------------------------------------------------------------------------
create table if not exists public.hag_votes (
  id uuid primary key default gen_random_uuid(),
  candidate_id integer not null references public.hag_candidates(id) on delete restrict,
  candidate_name text not null,
  candidate_category text not null,
  voter_last_name text not null,
  voter_first_name text not null,
  voter_email text not null,
  voter_phone text not null,
  amount integer not null default 5000,
  currency text not null default 'GNF',
  payment_provider text not null default 'fedapay',
  fedapay_transaction_id text unique,
  status text not null default 'pending_payment'
    check (status in ('pending_payment', 'paid', 'cancelled', 'failed')),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists hag_votes_candidate_paid_idx
  on public.hag_votes (candidate_id)
  where status = 'paid';

create index if not exists hag_votes_status_idx on public.hag_votes (status);

-- Totaux publics sans exposer les données des votants
create or replace function public.hag_vote_totals()
returns table (candidate_id integer, votes integer)
language sql
stable
security definer
set search_path = public
as $$
  select v.candidate_id, count(*)::integer
  from public.hag_votes v
  where v.status = 'paid'
  group by v.candidate_id;
$$;

-- -----------------------------------------------------------------------------
-- 5. Messages de contact
-- -----------------------------------------------------------------------------
create table if not exists public.hag_contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- 6. Équipe / comité d'organisation
-- -----------------------------------------------------------------------------
create table if not exists public.hag_team_members (
  id integer primary key,
  name text not null,
  role text not null,
  photo_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true
);

-- -----------------------------------------------------------------------------
-- 7. Paramètres de l'édition
-- -----------------------------------------------------------------------------
create table if not exists public.hag_event_settings (
  id integer primary key default 1 check (id = 1),
  event_year integer not null,
  event_name text not null,
  slogan text,
  application_start date not null,
  application_end date not null,
  votes_start date not null,
  votes_end date not null,
  gala_date date not null,
  gala_time text not null,
  gala_venue text not null,
  vote_amount_gnf integer not null default 5000,
  fedapay_payment_url text not null,
  contact_email text not null
);

-- =============================================================================
-- Droits & RLS (uniquement sur les tables hag_*)
-- =============================================================================
alter table public.hag_categories enable row level security;
alter table public.hag_candidates enable row level security;
alter table public.hag_applications enable row level security;
alter table public.hag_votes enable row level security;
alter table public.hag_contact_messages enable row level security;
alter table public.hag_team_members enable row level security;
alter table public.hag_event_settings enable row level security;

create or replace function public.hag_create_policy_if_missing(
  table_name text,
  policy_name text,
  policy_sql text
) returns void
language plpgsql
as $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = table_name
      and policyname = policy_name
  ) then
    execute policy_sql;
  end if;
end;
$$;

select public.hag_create_policy_if_missing(
  'hag_categories',
  'hag_categories_public_read',
  $p$create policy hag_categories_public_read on public.hag_categories for select to anon, authenticated using (true)$p$
);

select public.hag_create_policy_if_missing(
  'hag_candidates',
  'hag_candidates_public_read',
  $p$create policy hag_candidates_public_read on public.hag_candidates for select to anon, authenticated using (is_active = true)$p$
);

select public.hag_create_policy_if_missing(
  'hag_team_members',
  'hag_team_public_read',
  $p$create policy hag_team_public_read on public.hag_team_members for select to anon, authenticated using (is_active = true)$p$
);

select public.hag_create_policy_if_missing(
  'hag_event_settings',
  'hag_event_public_read',
  $p$create policy hag_event_public_read on public.hag_event_settings for select to anon, authenticated using (true)$p$
);

select public.hag_create_policy_if_missing(
  'hag_applications',
  'hag_applications_public_insert',
  $p$create policy hag_applications_public_insert on public.hag_applications for insert to anon, authenticated with check (status = 'pending')$p$
);

select public.hag_create_policy_if_missing(
  'hag_contact_messages',
  'hag_contact_public_insert',
  $p$create policy hag_contact_public_insert on public.hag_contact_messages for insert to anon, authenticated with check (true)$p$
);

select public.hag_create_policy_if_missing(
  'hag_votes',
  'hag_votes_public_insert_pending',
  $p$create policy hag_votes_public_insert_pending on public.hag_votes for insert to anon, authenticated with check (status = 'pending_payment' and fedapay_transaction_id is null)$p$
);

grant usage on schema public to anon, authenticated;
grant select on public.hag_categories, public.hag_candidates, public.hag_team_members, public.hag_event_settings
  to anon, authenticated;
grant insert on public.hag_applications, public.hag_contact_messages, public.hag_votes
  to anon, authenticated;
grant execute on function public.hag_vote_totals() to anon, authenticated;

-- =============================================================================
-- Données initiales HAG 2026
-- =============================================================================

insert into public.hag_event_settings (
  id, event_year, event_name, slogan,
  application_start, application_end, votes_start, votes_end,
  gala_date, gala_time, gala_venue, vote_amount_gnf,
  fedapay_payment_url, contact_email
) values (
  1, 2026, 'Hospitality Awards Guinée',
  'Célébrer l''excellence • Valoriser les talents • Promouvoir l''hospitalité guinéenne',
  '2026-08-25', '2026-09-20', '2026-09-25', '2026-12-04',
  '2026-12-11', '17:00', 'Hôtel Kaloum, Conakry – Guinée', 5000,
  'https://me.fedapay.com/HAG-Award', 'groupelmcontact@gmail.com'
) on conflict (id) do update set
  event_year = excluded.event_year,
  slogan = excluded.slogan,
  fedapay_payment_url = excluded.fedapay_payment_url;

insert into public.hag_categories (id, title, description, category_group, criteria, public_vote, sort_order) values
(1, 'Prix du Meilleur Etablissement de Formation aux métiers de l''hospitalité',
 'Récompense l''établissement qui forme le mieux aux métiers de l''hospitalité.',
 'Formation & Développement des Compétences',
 '["Qualité de la formation et des programmes","Insertion professionnelle des diplômés","Infrastructures et encadrement","Partenariats avec le secteur","Impact sur les compétences du métier"]'::jsonb,
 false, 1),
(2, 'Prix de la Meilleure Initiative de Developpement des Compétences',
 'Récompense une initiative qui développe concrètement les compétences du secteur.',
 'Formation & Développement des Compétences',
 '["Pertinence de l''initiative","Nombre de personnes formées ou accompagnées","Qualité pédagogique","Partenariats et ancrage local","Résultats mesurables"]'::jsonb,
 false, 2),
(3, 'Prix du Meilleur Etablissement d''Enseignement Supérieur',
 'Récompense l''établissement d''enseignement supérieur qui forme les futurs cadres de l''hospitalité et du tourisme.',
 'Formation & Développement des Compétences',
 '["Excellence académique","Pertinence des filières tourisme et hôtellerie","Recherche et innovation pédagogique","Ouverture internationale","Employabilité des diplômés"]'::jsonb,
 false, 3),
(4, 'Prix du Meilleur Guide Touristique',
 'Récompense le guide qui incarne la passion, le savoir et l''art de transmettre la destination Guinée.',
 'Tourisme & Destination Guinée',
 '["Maîtrise du patrimoine culturel et naturel","Capacité pédagogique et storytelling","Accueil et relation avec les visiteurs","Sécurité et organisation des visites","Retours positifs des voyageurs"]'::jsonb,
 false, 4),
(5, 'Prix de la Meilleure Agence de Voyage',
 'Récompense l''agence qui se distingue par la qualité de son offre et de son accompagnement.',
 'Tourisme & Destination Guinée',
 '["Qualité et originalité des offres","Service client et réactivité","Organisation et fiabilité","Promotion de la destination Guinée","Satisfaction des voyageurs"]'::jsonb,
 false, 5),
(6, 'Prix Meilleur(e) Ambassadeur (rice) de la Destination Guinée',
 'Récompense une personnalité qui promeut et rayonne pour la destination Guinée.',
 'Tourisme & Destination Guinée',
 '["Rayonnement national et international","Promotion de l''image de la Guinée","Engagement pour le tourisme et la culture","Influence et capacité d''inspiration","Contribution à l''attractivité du pays"]'::jsonb,
 false, 6),
(7, 'Prix de l''Innovation Digitale dans les métiers de l''Hospitalité',
 'Récompense une solution digitale qui transforme les métiers de l''hospitalité.',
 'Innovation & Développement Durable',
 '["Innovation technologique","Utilité pour les professionnels ou les voyageurs","Qualité de l''expérience utilisateur","Impact mesurable","Potentiel de déploiement"]'::jsonb,
 false, 7),
(8, 'Prix de la Meilleure Initiative Eco-Responsable',
 'Récompense une initiative exemplaire en matière d''écologie et de tourisme durable.',
 'Innovation & Développement Durable',
 '["Impact environnemental positif","Pratiques durables concrètes","Sensibilisation des publics","Intégration communautaire","Innovation éco-responsable"]'::jsonb,
 false, 8),
(9, 'Prix d''Excellence en Accueil, Service et Expérience Client',
 'Récompense l''établissement qui offre un accueil, un service et une expérience client d''exception.',
 'Accueil, Service & Expérience Client',
 '["Qualité de l''accueil","Personnalisation du service","Réactivité et professionnalisme","Satisfaction client","Constante dans l''excellence"]'::jsonb,
 false, 9),
(10, 'Prix du Bartender de l''Année',
 'Récompense le bartender qui se distingue par sa créativité, sa technique et son sens du service.',
 'Accueil, Service & Expérience Client',
 '["Maîtrise technique","Créativité des cocktails","Relation client et mise en scène","Hygiène et professionnalisme","Contribution à l''expérience de l''établissement"]'::jsonb,
 false, 10),
(11, 'Prix de la Création Culinaire Guinéenne',
 'Récompense une création qui sublime et modernise la gastronomie guinéenne.',
 'Restauration & Chaîne',
 '["Créativité et identité guinéenne","Qualité gustative","Mise en valeur des produits locaux","Présentation et signature","Contribution à la cuisine nationale"]'::jsonb,
 false, 11),
(12, 'Prix de la Meilleure Chaîne de Restauration',
 'Récompense la chaîne qui allie qualité, consistance et développement.',
 'Restauration & Chaîne',
 '["Qualité et constance de l''offre","Identité et positionnement","Service et hygiène","Expansion et impact","Satisfaction client"]'::jsonb,
 false, 12),
(13, 'Prix du Meilleur Restaurant de l''année',
 'Récompense le restaurant qui offre la meilleure expérience gastronomique de l''année.',
 'Restauration & Chaîne',
 '["Excellence culinaire","Qualité du service","Ambiance et cadre","Rapport qualité-prix","Réputation et fidélisation"]'::jsonb,
 false, 13),
(14, 'Prix du jeune Talent de l''Hospitalité',
 'Récompense un jeune professionnel prometteur du secteur de l''hospitalité.',
 'Management & Leadership',
 '["Potentiel et parcours","Innovation et créativité","Engagement et professionnalisme","Impact malgré le jeune âge","Vision pour le secteur"]'::jsonb,
 false, 14),
(15, 'Prix du Meilleur Manager Hôtelier de l''Année',
 'Récompense le manager hôtelier qui se distingue par son leadership et ses résultats.',
 'Management & Leadership',
 '["Leadership et gestion d''équipe","Performance de l''établissement","Qualité de service","Innovation managériale","Reconnaissance des équipes et des clients"]'::jsonb,
 false, 15),
(16, 'Prix de la Meilleure Experience de divertissement',
 'Récompense le lieu ou l''expérience qui offre le meilleur divertissement.',
 'Divertissement & Loisirs',
 '["Qualité de l''expérience","Attractivité et originalité","Accueil et organisation","Sécurité et confort","Satisfaction du public"]'::jsonb,
 false, 16),
(17, 'Prix de la Meilleure Experience de Loisirs',
 'Récompense l''expérience de loisirs la plus mémorable et qualitative.',
 'Divertissement & Loisirs',
 '["Diversité et qualité des activités","Ambiance et cadre","Service et hospitalité","Innovation dans l''offre","Fidélisation de la clientèle"]'::jsonb,
 false, 17),
(18, 'Prix Coup de Cœur du Public – Hôtel & performance globale',
 'Récompense l''hôtel plébiscité par le public. Attribution 100 % par vote du public.',
 'Coup de Cœur du Public',
 '["Nombre de votes du public","Popularité et notoriété","Performance globale de l''établissement","Connexion émotionnelle avec le public","Image et rayonnement"]'::jsonb,
 true, 18),
(19, 'Grand prix National d''Excellence dans l''Hospitalité',
 'Plus haute distinction des HAG 2026, attribuée par le jury et un comité spécial de professionnels reconnus.',
 'Grand Prix Hospitality Award Guinée 2026',
 '["Excellence globale","Impact sur le secteur","Leadership et exemplarité","Innovation et vision","Contribution au rayonnement de l''hospitalité guinéenne"]'::jsonb,
 false, 19)
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  category_group = excluded.category_group,
  criteria = excluded.criteria,
  public_vote = excluded.public_vote;

insert into public.hag_candidates (id, category_id, name, description) values
(1, 1, 'Institut Gastronomique le Chef', 'Établissement de formation gastronomique'),
(2, 1, 'Institut de Formation Professionnelle Amadou Dieng (IFPAD)', 'Institut de formation professionnelle'),
(3, 1, 'ISTHOG', 'Institut supérieur de tourisme et d''hôtellerie'),
(4, 1, 'Nako Diabaté', 'Établissement de formation professionnelle'),
(5, 1, 'Billy Ecole', 'École de formation professionnelle'),
(6, 1, 'CENFORTH', 'Centre de formation en tourisme et hôtellerie'),
(7, 3, 'École Supérieure de Tourisme et de l''Hotellerie (ESTH)', 'École supérieure spécialisée tourisme et hôtellerie'),
(8, 3, 'Université Koffi', 'Établissement d''enseignement supérieur'),
(9, 4, 'M. Hassan Bah', 'Guide touristique'),
(10, 4, 'M. Taibou', 'Guide touristique'),
(11, 4, 'M. Oumar', 'Guide touristique'),
(12, 4, 'M. Kolié', 'Guide touristique'),
(13, 4, 'M. Fernand Léno', 'Guide touristique'),
(14, 5, 'Mondial Express', 'Agence de voyage'),
(15, 5, 'Dounia Voyage', 'Agence de voyage'),
(16, 5, 'Mondial Tour', 'Agence de voyage'),
(17, 6, 'Abdoulaye M''baye', 'Ambassadeur de la destination Guinée'),
(18, 6, 'Takana Zion', 'Ambassadeur de la destination Guinée'),
(19, 6, 'Serhou Guirassy', 'Ambassadeur de la destination Guinée'),
(20, 6, 'Jupiter Devibe', 'Ambassadeur de la destination Guinée'),
(21, 6, 'Naby Keita', 'Ambassadeur de la destination Guinée'),
(22, 6, 'Djelikaba Bintou', 'Ambassadrice de la destination Guinée'),
(23, 6, 'Iya Traoré', 'Ambassadeur de la destination Guinée'),
(24, 6, 'Saïfon Baldé', 'Ambassadeur de la destination Guinée'),
(25, 7, 'AphoGest-Visit Guinea', 'Solution digitale pour l''hospitalité'),
(26, 7, 'OBS Technologie', 'Innovation digitale'),
(27, 7, 'Zaly Meirveille', 'Innovation digitale'),
(28, 8, 'Palmeraie Lodge', 'Initiative éco-responsable'),
(29, 8, 'Maf Village', 'Initiative éco-responsable'),
(30, 8, 'Jardin D''Eden', 'Initiative éco-responsable'),
(31, 8, 'Beau Village de YARAYA', 'Initiative éco-responsable'),
(32, 9, 'Souaré Premium Hôtel', 'Hôtel – accueil et service client'),
(33, 9, 'Hôtel ONOMO', 'Hôtel – accueil et service client'),
(34, 9, 'Atlantic View Hôtel', 'Hôtel – accueil et service client'),
(35, 9, 'Riviera Taouyah', 'Hôtel – accueil et service client'),
(36, 10, 'Jean Sivily Koivogui', 'Bartender'),
(37, 10, 'Emmanuel Koivogui', 'Bartender'),
(38, 11, 'Le Jacquier', 'Création culinaire guinéenne'),
(39, 12, 'Big FATAYA', 'Chaîne de restauration'),
(40, 12, 'Heroes Coffee', 'Chaîne de restauration'),
(41, 12, 'RFC', 'Chaîne de restauration'),
(42, 12, 'SLM', 'Chaîne de restauration'),
(43, 13, 'G. BARISTA', 'Restaurant'),
(44, 13, 'Avenue', 'Restaurant'),
(45, 13, 'Aquarium', 'Restaurant'),
(46, 13, 'Istanbul', 'Restaurant'),
(47, 16, 'Plage Camayenne', 'Expérience de divertissement'),
(48, 16, 'Iles de Los', 'Expérience de divertissement'),
(49, 16, 'Plage de Tayaki', 'Expérience de divertissement'),
(50, 16, 'Jardin du 2 Octobre', 'Expérience de divertissement'),
(51, 17, 'Le Baron', 'Expérience de loisirs'),
(52, 17, 'Boulevard Select', 'Expérience de loisirs'),
(53, 18, 'Noom Hôtel', 'Hôtel – coup de cœur du public'),
(54, 18, 'PalmCamayenne Hôtel', 'Hôtel – coup de cœur du public'),
(55, 18, 'Hôtel Kaloum', 'Hôtel – coup de cœur du public'),
(56, 18, 'Riviera Royal Hôtel', 'Hôtel – coup de cœur du public'),
(57, 18, 'Radisson Blu Hôtel Conakry', 'Hôtel – coup de cœur du public')
on conflict (id) do update set
  category_id = excluded.category_id,
  name = excluded.name,
  description = excluded.description;

insert into public.hag_team_members (id, name, role, photo_url, sort_order) values
(1, 'M. Maurice Millimouno', 'Président du comité d''organisation', '/equipe/maurice-millimouno.png', 1),
(2, 'M. Ézeckiel Saoromou', 'Vice-président, Coordinateur général', '/equipe/ezeckiel-saoromou.png', 2),
(3, 'M. Ibrahim Sory Bah', 'Secrétaire général', '/equipe/ibrahim-sory-bah.png', 3),
(4, 'M. Firas Mohamed Challoub', 'Ambassadeur responsable de la production, logistique et protocole', '/equipe/firas-mohamed-challoub.png', 4),
(5, 'Mme Hawa Kouyaté', 'Responsable partenariats et sponsoring', '/equipe/hawa-kouyate.png', 5),
(6, 'M. Elie Tounkara', 'Responsable contrôle et finances', '/equipe/elie-tounkara.png', 6),
(7, 'M. Elhadj Oumar Diallo', 'Responsable candidatures et votes', '/equipe/elhadj-oumar-diallo.png', 7),
(8, 'Mlle Clémence Richard', 'Responsable panels et dîner gala', '/equipe/clemence-richard.png', 8),
(9, 'Mlle Saoudatou Barry', 'Responsable commerciale et développement des ventes', '/equipe/saoudatou-barry.png', 9),
(10, 'M. Joseph Ndono', 'Communication et relations publiques', '/equipe/joseph-ndono.png', 10),
(11, 'M. Mamadou Sarifou Sow', 'Responsable carnaval', '/equipe/mamadou-sarifou-sow.png', 11),
(12, 'M. Mamadou Dian Diallo', 'Community manager', '/equipe/mamadou-dian-diallo.png', 12)
on conflict (id) do update set
  name = excluded.name,
  role = excluded.role,
  photo_url = excluded.photo_url,
  sort_order = excluded.sort_order;

-- Vérification : seules les tables HAG apparaissent ici.
-- Tes autres tables du projet restent intactes.
  do $$
begin
  raise notice 'Tables HAG créées : %',
    (select string_agg(tablename, ', ' order by tablename)
     from pg_tables
     where schemaname = 'public' and tablename like 'hag_%');
end $$;

-- -----------------------------------------------------------------------------
-- Tableau de bord admin (additif : CREATE OR REPLACE, aucune table supprimée)
-- -----------------------------------------------------------------------------
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
