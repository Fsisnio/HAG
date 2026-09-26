-- =============================================================================
-- HAG 2026 — Aligner Supabase sur le site (src/data/categories.ts + officialCandidates.ts)
--
-- SÛR POUR LES VOTES :
-- - aucun DELETE
-- - les IDs des nominés officiels restent identiques
-- - hag_votes.candidate_id n'est pas modifié
--
-- Dans Supabase : SQL Editor → New query → coller tout ce fichier → Run
-- =============================================================================

-- 1) Titres des prix = titres affichés sur /voter
insert into public.hag_categories (id, title, description, category_group, criteria, public_vote, sort_order)
values
(1, $$Prix du Meilleur Établissement de Formation aux Métiers de l’Hospitalité de l’Année$$, $$Récompense l’établissement qui forme le mieux aux métiers de l’hospitalité.$$, $$Formation & Développement des Compétences$$, '["Qualité de la formation et des programmes","Insertion professionnelle des diplômés","Infrastructures et encadrement","Partenariats avec le secteur","Impact sur les compétences du métier"]'::jsonb, false, 1),
(2, $$Prix Meilleure Initiative de Développement des Compétences de l’Année$$, $$Récompense une initiative qui développe concrètement les compétences du secteur.$$, $$Formation & Développement des Compétences$$, '["Pertinence de l’initiative","Nombre de personnes formées ou accompagnées","Qualité pédagogique","Partenariats et ancrage local","Résultats mesurables"]'::jsonb, false, 2),
(3, $$Prix du Meilleur Établissement d’Enseignement Supérieur$$, $$Récompense l’établissement d’enseignement supérieur qui forme les futurs cadres de l’hospitalité et du tourisme.$$, $$Formation & Développement des Compétences$$, '["Excellence académique","Pertinence des filières tourisme et hôtellerie","Recherche et innovation pédagogique","Ouverture internationale","Employabilité des diplômés"]'::jsonb, false, 3),
(4, $$Prix du Meilleur Guide de Tourisme de l’Année$$, $$Récompense le guide qui incarne la passion, le savoir et l’art de transmettre la destination Guinée.$$, $$Tourisme & Destination Guinée$$, '["Maîtrise du patrimoine culturel et naturel","Capacité pédagogique et storytelling","Accueil et relation avec les visiteurs","Sécurité et organisation des visites","Retours positifs des voyageurs"]'::jsonb, false, 4),
(5, $$Prix Meilleure Agence de Voyages de l’Année$$, $$Récompense l’agence qui se distingue par la qualité de son offre et de son accompagnement.$$, $$Tourisme & Destination Guinée$$, '["Qualité et originalité des offres","Service client et réactivité","Organisation et fiabilité","Promotion de la destination Guinée","Satisfaction des voyageurs"]'::jsonb, false, 5),
(6, $$Prix Meilleur Ambassadeur de la Destination Guinée de l’Année$$, $$Récompense une personnalité qui promeut et rayonne pour la destination Guinée.$$, $$Tourisme & Destination Guinée$$, '["Rayonnement national et international","Promotion de l’image de la Guinée","Engagement pour le tourisme et la culture","Influence et capacité d’inspiration","Contribution à l’attractivité du pays"]'::jsonb, false, 6),
(7, $$Prix de l’Innovation Digitale dans l’Hospitalité de l’Année$$, $$Récompense une solution digitale qui transforme les métiers de l’hospitalité.$$, $$Innovation & Développement Durable$$, '["Innovation technologique","Utilité pour les professionnels ou les voyageurs","Qualité de l’expérience utilisateur","Impact mesurable","Potentiel de déploiement"]'::jsonb, false, 7),
(8, $$Prix de la Meilleure Initiative Éco-Responsable de l’Année$$, $$Récompense une initiative exemplaire en matière d’écologie et de tourisme durable.$$, $$Innovation & Développement Durable$$, '["Impact environnemental positif","Pratiques durables concrètes","Sensibilisation des publics","Intégration communautaire","Innovation éco-responsable"]'::jsonb, false, 8),
(9, $$Prix d’Excellence en Accueil, Service et Expérience Client de l’Année$$, $$Récompense l’établissement qui offre un accueil, un service et une expérience client d’exception.$$, $$Accueil, Service & Expérience Client$$, '["Qualité de l’accueil","Personnalisation du service","Réactivité et professionnalisme","Satisfaction client","Constante dans l’excellence"]'::jsonb, false, 9),
(10, $$Prix du Meilleur Barman de l’Année$$, $$Récompense le barman qui se distingue par sa créativité, sa technique et son sens du service.$$, $$Accueil, Service & Expérience Client$$, '["Maîtrise technique","Créativité des cocktails","Relation client et mise en scène","Hygiène et professionnalisme","Contribution à l’expérience de l’établissement"]'::jsonb, false, 10),
(11, $$Prix de la Création Culinaire Guinéenne de l’Année$$, $$Récompense une création qui sublime et modernise la gastronomie guinéenne.$$, $$Restauration & Chaîne$$, '["Créativité et identité guinéenne","Qualité gustative","Mise en valeur des produits locaux","Présentation et signature","Contribution à la cuisine nationale"]'::jsonb, false, 11),
(12, $$Prix Meilleure Chaîne de Restaurants de l’Année$$, $$Récompense la chaîne qui allie qualité, consistance et développement.$$, $$Restauration & Chaîne$$, '["Qualité et constance de l’offre","Identité et positionnement","Service et hygiène","Expansion et impact","Satisfaction client"]'::jsonb, false, 12),
(13, $$Prix du Meilleur Restaurant de l’Année$$, $$Récompense le restaurant qui offre la meilleure expérience gastronomique de l’année.$$, $$Restauration & Chaîne$$, '["Excellence culinaire","Qualité du service","Ambiance et cadre","Rapport qualité-prix","Réputation et fidélisation"]'::jsonb, false, 13),
(14, $$Prix du Jeune Talent de l’Hospitalité$$, $$Récompense un jeune professionnel prometteur du secteur de l’hospitalité.$$, $$Management & Leadership$$, '["Potentiel et parcours","Innovation et créativité","Engagement et professionnalisme","Impact malgré le jeune âge","Vision pour le secteur"]'::jsonb, false, 14),
(15, $$Prix du Meilleur Manager Hôtelier de l’Année$$, $$Récompense le manager hôtelier qui se distingue par son leadership et ses résultats.$$, $$Management & Leadership$$, '["Leadership et gestion d’équipe","Performance de l’établissement","Qualité de service","Innovation managériale","Reconnaissance des équipes et des clients"]'::jsonb, false, 15),
(16, $$Prix Meilleure Expérience de Divertissement de l’Année$$, $$Récompense le lieu ou l’expérience qui offre le meilleur divertissement.$$, $$Divertissement & Loisirs$$, '["Qualité de l’expérience","Attractivité et originalité","Accueil et organisation","Sécurité et confort","Satisfaction du public"]'::jsonb, false, 16),
(17, $$Prix Meilleure Expérience de Loisirs de l’Année$$, $$Récompense l’expérience de loisirs la plus mémorable et qualitative.$$, $$Divertissement & Loisirs$$, '["Diversité et qualité des activités","Ambiance et cadre","Service et hospitalité","Innovation dans l’offre","Fidélisation de la clientèle"]'::jsonb, false, 17),
(18, $$Prix Coup de Cœur du Public de l’Année – Hôtel et performance globale$$, $$Récompense l’hôtel plébiscité par le public. Attribution 100 % par vote du public.$$, $$Coup de Cœur du Public$$, '["Nombre de votes du public","Popularité et notoriété","Performance globale de l’établissement","Connexion émotionnelle avec le public","Image et rayonnement"]'::jsonb, true, 18),
(19, $$Grand prix National d’Excellence dans l’Hospitalité$$, $$Plus haute distinction des HAG 2026, attribuée par le jury et un comité spécial de professionnels reconnus.$$, $$Grand Prix Hospitality Award Guinée 2026$$, '["Excellence globale","Impact sur le secteur","Leadership et exemplarité","Innovation et vision","Contribution au rayonnement de l’hospitalité guinéenne"]'::jsonb, false, 19)
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  category_group = excluded.category_group,
  criteria = excluded.criteria,
  public_vote = excluded.public_vote,
  sort_order = excluded.sort_order;

-- 2) Nominés = liste du site (noms, photos, catégories)
insert into public.hag_candidates (id, category_id, name, description, image_url, is_active)
values
(1, 1, $$Institut Gastronomique Le Chef$$, $$Institut gastronomique — nominé au Prix du Meilleur Établissement de Formation aux Métiers de l’Hospitalité de l’Année$$, $$/candidats/institut-le-chef.png$$, true),
(2, 1, $$Institut de Formation Professionnelle Amadou Dieng (IFPAD)$$, $$Institut de formation professionnelle — nominé au Prix du Meilleur Établissement de Formation aux Métiers de l’Hospitalité de l’Année$$, $$/candidats/ifpad-amadou-dieng.png$$, true),
(3, 1, $$ISTHOG - Guinée$$, $$Institut supérieur de tourisme et d’hôtellerie — nominé au Prix du Meilleur Établissement de Formation aux Métiers de l’Hospitalité de l’Année$$, $$/candidats/isthog-guinee.png$$, true),
(4, 1, $$Institut Nako Diabaté$$, $$Institut de formation professionnelle — nominé au Prix du Meilleur Établissement de Formation aux Métiers de l’Hospitalité de l’Année$$, $$/candidats/institut-nako-diabate.png$$, true),
(58, 2, $$Kamy École Guinéenne de Gastronomie (EGG)$$, $$École de gastronomie — nominée au Prix Meilleure Initiative de Développement des Compétences de l’Année$$, $$/candidats/kamy-egg.png$$, true),
(59, 2, $$Zinetraiteurs Academy$$, $$Académie de formation — nominée au Prix Meilleure Initiative de Développement des Compétences de l’Année$$, $$/candidats/zinetraiteurs-academy.png$$, true),
(60, 2, $$Touma Multi-Services$$, $$Initiative de formation et de services — nominée au Prix Meilleure Initiative de Développement des Compétences de l’Année$$, $$/candidats/touma-multi-services.png$$, true),
(77, 2, $$Master Management$$, $$Initiative de formation — nominée au Prix Meilleure Initiative de Développement des Compétences de l’Année$$, $$/candidats/master-management.png$$, true),
(7, 3, $$École Supérieure du Tourisme et de l’Hôtellerie (ESTH)$$, $$École supérieure spécialisée tourisme et hôtellerie — nominée au Prix du Meilleur Établissement d’Enseignement Supérieur$$, $$/candidats/esth.png$$, true),
(8, 3, $$Université Kofi Annan de Guinée$$, $$Université — nominée au Prix du Meilleur Établissement d’Enseignement Supérieur$$, $$/candidats/universite-kofi-annan.png$$, true),
(9, 4, $$M. Hassan BAH$$, $$Guide touristique — nominé au Prix du Meilleur Guide de Tourisme de l’Année$$, $$/candidats/hassan-bah.png$$, true),
(10, 4, $$M. Tibou BAH$$, $$Guide touristique — nominé au Prix du Meilleur Guide de Tourisme de l’Année$$, $$/candidats/tabou-bah.jpg$$, true),
(11, 4, $$M. Oumar$$, $$Guide touristique$$, null, true),
(12, 4, $$M. Kolié$$, $$Guide touristique$$, null, true),
(13, 4, $$M. Fernand Léno$$, $$Guide touristique$$, null, true),
(88, 4, $$M. Ibrahim BAH$$, $$Guide touristique — nominé au Prix du Meilleur Guide de Tourisme de l’Année$$, $$/candidats/ibrahim-bah.jpg$$, true),
(78, 4, $$M. Mohamed Sanoussi GASSAMA$$, $$Guide touristique — nominé au Prix du Meilleur Guide de Tourisme de l’Année$$, $$/candidats/mohamed-sanoussi-gassama.jpg$$, true),
(79, 4, $$M. Mamadou Diallo$$, $$Guide touristique — nominé au Prix du Meilleur Guide de Tourisme de l’Année$$, $$/candidats/mamadou-diallo.jpg$$, true),
(14, 5, $$Mondial Express$$, $$Agence de voyage — nominée au Prix Meilleure Agence de Voyages de l’Année$$, $$/candidats/mondial-express.png$$, true),
(15, 5, $$Dounia Voyage$$, $$Agence de voyage$$, null, true),
(16, 5, $$Mondial Tour$$, $$Agence de voyage$$, null, true),
(75, 5, $$ABV Agence Barry Voyages$$, $$Agence de voyage — nominée au Prix Meilleure Agence de Voyages de l’Année$$, $$/candidats/abv-agence-barry-voyages.png$$, true),
(76, 5, $$LCOMLOISIRS$$, $$Agence de voyages et de tourisme — nominée au Prix Meilleure Agence de Voyages de l’Année$$, $$/candidats/lcomloisirs.png$$, true),
(87, 5, $$Confort Airlines$$, $$Agence de voyage — nominée au Prix Meilleure Agence de Voyages de l’Année$$, $$/candidats/confort-airlines.png$$, true),
(17, 6, $$Abdoulaye M’baye$$, $$Ambassadeur de la destination Guinée$$, null, true),
(18, 6, $$Takana Zion$$, $$Ambassadeur de la destination Guinée$$, null, true),
(19, 6, $$Serhou Guirassy$$, $$Ambassadeur de la destination Guinée — nominé au Prix Meilleur Ambassadeur de la Destination Guinée de l’Année$$, $$/candidats/serhou-guirassy.png$$, true),
(20, 6, $$Jupiter Davibe$$, $$Ambassadeur de la destination Guinée — nominé au Prix Meilleur Ambassadeur de la Destination Guinée de l’Année$$, $$/candidats/jupiter-davibe.png$$, true),
(21, 6, $$Naby Keita$$, $$Ambassadeur de la destination Guinée$$, null, true),
(22, 6, $$Djelikaba Bintou$$, $$Ambassadrice de la destination Guinée — nominée au Prix Meilleur Ambassadeur de la Destination Guinée de l’Année$$, $$/candidats/djelikaba-bintou.png$$, true),
(23, 6, $$M. Iya TRAORE$$, $$Ambassadeur de la destination Guinée — nominé au Prix Meilleur Ambassadeur de la Destination Guinée de l’Année$$, $$/candidats/iya-traore.png$$, true),
(24, 6, $$Saïfon Baldé$$, $$Ambassadeur de la destination Guinée$$, null, true),
(61, 7, $$Simandou Séjour$$, $$Solution digitale — nominée au Prix de l’Innovation Digitale dans l’Hospitalité de l’Année$$, $$/candidats/simandou-sejour.png$$, true),
(26, 7, $$OBS Technology$$, $$Solution digitale — nominée au Prix de l’Innovation Digitale dans l’Hospitalité de l’Année$$, $$/candidats/obs-technology.png$$, true),
(25, 7, $$Visit Guinea$$, $$Solution digitale — nominée au Prix de l’Innovation Digitale dans l’Hospitalité de l’Année$$, $$/candidats/visit-guinea.png$$, true),
(28, 8, $$Palmeraie Lodge$$, $$Initiative éco-responsable — nominée au Prix de la Meilleure Initiative Éco-Responsable de l’Année$$, $$/candidats/palmeraie-lodge.png$$, true),
(31, 8, $$Beau Village de Yaraya$$, $$Initiative éco-responsable — nominée au Prix de la Meilleure Initiative Éco-Responsable de l’Année$$, $$/candidats/beau-village-yaraya.png$$, true),
(30, 8, $$Jardin d’Eden Maferinya$$, $$Initiative éco-responsable — nominée au Prix de la Meilleure Initiative Éco-Responsable de l’Année$$, $$/candidats/jardin-d-eden.png$$, true),
(29, 8, $$Maf Village$$, $$Initiative éco-responsable — nominée au Prix de la Meilleure Initiative Éco-Responsable de l’Année$$, $$/candidats/maf-village.png$$, true),
(32, 9, $$Souaré Premium Hotel$$, $$Hôtel — nominé au Prix d’Excellence en Accueil, Service et Expérience Client de l’Année$$, $$/candidats/souare-premium-hotel.png$$, true),
(33, 9, $$ONOMO Conakry$$, $$Hôtel — nominé au Prix d’Excellence en Accueil, Service et Expérience Client de l’Année$$, $$/candidats/onomo-conakry.png$$, true),
(34, 9, $$Atlantic View Hotel & Resort$$, $$Hôtel — nominé au Prix d’Excellence en Accueil, Service et Expérience Client de l’Année$$, $$/candidats/atlantic-view.png$$, true),
(35, 9, $$Hôtel Riviera Taouyah$$, $$Hôtel — nominé au Prix d’Excellence en Accueil, Service et Expérience Client de l’Année$$, $$/candidats/riviera-taouyah.png$$, true),
(36, 10, $$Jean Sivily Koivogui$$, $$Barman — nominé au Prix du Meilleur Barman de l’Année$$, $$/candidats/jean-sivily-koivogui.jpg$$, true),
(37, 10, $$M. Emmanuel Woïwo GUILAVOGUI$$, $$Barman — nominé au Prix du Meilleur Barman de l’Année$$, $$/candidats/emmanuel-woiwo-guilavogui.png$$, true),
(81, 10, $$M. Djanfamara Bangaly CISSÉ$$, $$Barman — nominé au Prix du Meilleur Barman de l’Année$$, $$/candidats/djanfamara-bangaly-cisse.png$$, true),
(84, 10, $$M. Ahmed Tidiane Cisse$$, $$Barman — nominé au Prix du Meilleur Barman de l’Année$$, $$/candidats/ahmed-tidiane-cisse.png$$, true),
(38, 11, $$Le Jacquier$$, $$Restaurant-traiteur — nominé au Prix de la Création Culinaire Guinéenne de l’Année$$, $$/candidats/le-jacquier.png$$, true),
(62, 11, $$OKLM Grill Chez Poupina$$, $$Restaurant — nominé au Prix de la Création Culinaire Guinéenne de l’Année$$, $$/candidats/oklm-grill.png$$, true),
(63, 11, $$Restaurant Le Baobab de Bamba$$, $$Restaurant — nominé au Prix de la Création Culinaire Guinéenne de l’Année$$, $$/candidats/baobab-de-bamba.png$$, true),
(69, 11, $$UMIÏ Resto & Bar$$, $$Restaurant — nominé au Prix de la Création Culinaire Guinéenne de l’Année$$, $$/candidats/umii-resto-bar.png$$, true),
(39, 12, $$Big Fataya$$, $$Chaîne de restauration — nominée au Prix Meilleure Chaîne de Restaurants de l’Année$$, $$/candidats/big-fataya.png$$, true),
(40, 12, $$Heroes Coffee Guinée$$, $$Chaîne de restauration — nominée au Prix Meilleure Chaîne de Restaurants de l’Année$$, $$/candidats/heroes-coffee.png$$, true),
(41, 12, $$RFC$$, $$Chaîne de restauration — nominée au Prix Meilleure Chaîne de Restaurants de l’Année$$, $$/candidats/rfc.png$$, true),
(42, 12, $$Le SLM$$, $$Chaîne de restauration — nominée au Prix Meilleure Chaîne de Restaurants de l’Année$$, $$/candidats/le-slm.png$$, true),
(43, 13, $$Barista Groupe$$, $$Restaurant — nominé au Prix du Meilleur Restaurant de l’Année$$, $$/candidats/barista-groupe.png$$, true),
(44, 13, $$Avenue Group GN$$, $$Restaurant — nominé au Prix du Meilleur Restaurant de l’Année$$, $$/candidats/avenue-group.png$$, true),
(45, 13, $$Aquarium Restaurant et Lounge$$, $$Restaurant — nominé au Prix du Meilleur Restaurant de l’Année$$, $$/candidats/aquarium.png$$, true),
(89, 13, $$UMIÏ Resto & Bar$$, $$Restaurant — nominé au Prix du Meilleur Restaurant de l’Année$$, $$/candidats/umii-resto-bar.png$$, true),
(70, 13, $$Restaurant Ajami$$, $$Restaurant — nominé au Prix du Meilleur Restaurant de l’Année$$, $$/candidats/restaurant-ajami.png$$, true),
(71, 14, $$M. Ézéckiel Saoromou$$, $$DG Palmeraie Lodge — nominé au Prix du Jeune Talent de l’Hospitalité$$, $$/candidats/ezeckiel-saoromou.png$$, true),
(72, 14, $$M. Jean Pierre Tolno$$, $$PDG Institut Gastronomique Le Chef — nominé au Prix du Jeune Talent de l’Hospitalité$$, $$/candidats/jean-pierre-tolno.png$$, true),
(73, 14, $$M. Mamadou DIABY$$, $$Maître d’hôtel — nominé au Prix du Jeune Talent de l’Hospitalité$$, $$/candidats/mamadou-diaby.png$$, true),
(74, 14, $$M. Aboubacar CONTÉ$$, $$DG Complexe Hôtelier — nominé au Prix du Jeune Talent de l’Hospitalité$$, $$/candidats/aboubacar-conte.png$$, true),
(85, 14, $$M. Mamadou Saidou DIALLO$$, $$Gestionnaire hôtelier — nominé au Prix du Jeune Talent de l’Hospitalité$$, $$/candidats/mamadou-saidou-diallo.png$$, true),
(86, 14, $$M. Firas Mohamed Chaloub$$, $$Nominé au Prix du Jeune Talent de l’Hospitalité$$, $$/candidats/firas-mohamed-chaloub.png$$, true),
(80, 15, $$M. Marco Rabbia$$, $$DG Radisson Blu Hotel Conakry — nominé au Prix du Meilleur Manager Hôtelier de l’Année$$, $$/candidats/marco-rabbia.png$$, true),
(82, 15, $$M. Serge NDONO$$, $$DG Hôtel le Bonheur — nominé au Prix du Meilleur Manager Hôtelier de l’Année$$, $$/candidats/serge-ndono.png$$, false),
(83, 15, $$M. Charlie Yang$$, $$DG Hôtel Kaloum — nominé au Prix du Meilleur Manager Hôtelier de l’Année$$, $$/candidats/charlie-yang.png$$, true),
(51, 16, $$Le Baron$$, $$Lieu de divertissement — nominé au Prix Meilleure Expérience de Divertissement de l’Année$$, $$/candidats/le-baron.png$$, true),
(64, 16, $$Brabus Restaurant Night Club$$, $$Lieu de divertissement — nominé au Prix Meilleure Expérience de Divertissement de l’Année$$, $$/candidats/brabus.png$$, true),
(65, 16, $$Pyramide Plus$$, $$Lieu de divertissement — nominé au Prix Meilleure Expérience de Divertissement de l’Année$$, $$/candidats/pyramide-plus.png$$, true),
(66, 16, $$Vendome Club Conakry$$, $$Lieu de divertissement — nominé au Prix Meilleure Expérience de Divertissement de l’Année$$, $$/candidats/vendome-club.png$$, true),
(67, 16, $$Group Barista$$, $$Lieu de divertissement — nominé au Prix Meilleure Expérience de Divertissement de l’Année$$, $$/candidats/group-barista.png$$, true),
(68, 16, $$3 by 3 Club$$, $$Lieu de divertissement — nominé au Prix Meilleure Expérience de Divertissement de l’Année$$, $$/candidats/3-by-3-club.png$$, true),
(47, 17, $$Camayenne Plage$$, $$Site de loisirs — nominé au Prix Meilleure Expérience de Loisirs de l’Année$$, $$/candidats/camayenne-plage.png$$, true),
(50, 17, $$Jardin 02 Octobre$$, $$Site de loisirs — nominé au Prix Meilleure Expérience de Loisirs de l’Année$$, $$/candidats/jardin-02-octobre.jpg$$, true),
(57, 18, $$Radisson Blu Conakry$$, $$Hôtel — nominé au Prix Coup de Cœur du Public de l’Année$$, $$/candidats/radisson-blu-conakry.png$$, true),
(53, 18, $$Noom Hotel Conakry$$, $$Hôtel — nominé au Prix Coup de Cœur du Public de l’Année$$, $$/candidats/noom-hotel-conakry.png$$, true),
(55, 18, $$Hôtel Kaloum$$, $$Hôtel — nominé au Prix Coup de Cœur du Public de l’Année$$, $$/candidats/hotel-kaloum.png$$, true),
(56, 18, $$Riviera Royal Resort & Casino$$, $$Hôtel — nominé au Prix Coup de Cœur du Public de l’Année$$, $$/candidats/riviera-royal.png$$, true),
(54, 18, $$Palm Camayenne$$, $$Hôtel — nominé au Prix Coup de Cœur du Public de l’Année$$, $$/candidats/palm-camayenne.jpg$$, true)
on conflict (id) do update set
  category_id = excluded.category_id,
  name = excluded.name,
  description = excluded.description,
  image_url = excluded.image_url,
  is_active = excluded.is_active;

-- 3) Désactiver tout nominé qui n'est PAS sur le site (Billy, CENFORTH, anciennes fiches…)
--    Les votes déjà payés restent attachés à l'ID, ils ne sont pas effacés.
update public.hag_candidates
set is_active = false
where id not in (1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 47, 50, 51, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 83, 84, 85, 86, 87, 88, 89);

-- 4) Harmoniser le libellé stocké sur les votes existants (nom + prix)
update public.hag_votes v
set
  candidate_name = c.name,
  candidate_category = cat.title
from public.hag_candidates c
join public.hag_categories cat on cat.id = c.category_id
where v.candidate_id = c.id;

-- 5) Contrôle : comparer ce que la base a d'actif vs les IDs du site
select
  c.id,
  c.name,
  cat.title as prix,
  c.image_url,
  c.is_active
from public.hag_candidates c
join public.hag_categories cat on cat.id = c.category_id
where c.is_active = true
order by cat.sort_order, c.id;
