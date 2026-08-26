import {
  GraduationCap,
  BookOpen,
  User,
  Plane,
  Globe,
  Leaf,
  Smartphone,
  Headphones,
  Wine,
  ChefHat,
  Store,
  Coffee,
  Music,
  Palmtree,
  Heart,
  Trophy,
  Lightbulb,
  Briefcase,
  Star
} from 'lucide-react';

export interface Category {
  id: number;
  icon: any;
  title: string;
  description: string;
  criteria: string[];
  prize?: string;
  group: string;
  publicVote?: boolean;
}

export const categoryGroups = [
  'Formation & Développement des Compétences',
  'Tourisme & Destination Guinée',
  'Innovation & Développement Durable',
  'Accueil, Service & Expérience Client',
  'Restauration & Chaîne',
  'Management & Leadership',
  'Divertissement & Loisirs',
  'Coup de Cœur du Public',
  'Grand Prix Hospitality Award Guinée 2026'
];

export const officialCategories: Category[] = [
  {
    id: 1,
    icon: GraduationCap,
    title: 'Prix du Meilleur Etablissement de Formation aux métiers de l’hospitalité',
    description: 'Récompense l’établissement qui forme le mieux aux métiers de l’hospitalité.',
    criteria: [
      'Qualité de la formation et des programmes',
      'Insertion professionnelle des diplômés',
      'Infrastructures et encadrement',
      'Partenariats avec le secteur',
      'Impact sur les compétences du métier'
    ],
    group: 'Formation & Développement des Compétences'
  },
  {
    id: 2,
    icon: Lightbulb,
    title: 'Prix de la Meilleure Initiative de Developpement des Compétences',
    description: 'Récompense une initiative qui développe concrètement les compétences du secteur.',
    criteria: [
      'Pertinence de l’initiative',
      'Nombre de personnes formées ou accompagnées',
      'Qualité pédagogique',
      'Partenariats et ancrage local',
      'Résultats mesurables'
    ],
    group: 'Formation & Développement des Compétences'
  },
  {
    id: 3,
    icon: BookOpen,
    title: 'Prix du Meilleur Etablissement d’Enseignement Supérieur',
    description: 'Récompense l’établissement d’enseignement supérieur qui forme les futurs cadres de l’hospitalité et du tourisme.',
    criteria: [
      'Excellence académique',
      'Pertinence des filières tourisme et hôtellerie',
      'Recherche et innovation pédagogique',
      'Ouverture internationale',
      'Employabilité des diplômés'
    ],
    group: 'Formation & Développement des Compétences'
  },
  {
    id: 4,
    icon: User,
    title: 'Prix du Meilleur Guide Touristique',
    description: 'Récompense le guide qui incarne la passion, le savoir et l’art de transmettre la destination Guinée.',
    criteria: [
      'Maîtrise du patrimoine culturel et naturel',
      'Capacité pédagogique et storytelling',
      'Accueil et relation avec les visiteurs',
      'Sécurité et organisation des visites',
      'Retours positifs des voyageurs'
    ],
    group: 'Tourisme & Destination Guinée'
  },
  {
    id: 5,
    icon: Plane,
    title: 'Prix de la Meilleure Agence de Voyage',
    description: 'Récompense l’agence qui se distingue par la qualité de son offre et de son accompagnement.',
    criteria: [
      'Qualité et originalité des offres',
      'Service client et réactivité',
      'Organisation et fiabilité',
      'Promotion de la destination Guinée',
      'Satisfaction des voyageurs'
    ],
    group: 'Tourisme & Destination Guinée'
  },
  {
    id: 6,
    icon: Globe,
    title: 'Prix Meilleur(e) Ambassadeur (rice) de la Destination Guinée',
    description: 'Récompense une personnalité qui promeut et rayonne pour la destination Guinée.',
    criteria: [
      'Rayonnement national et international',
      'Promotion de l’image de la Guinée',
      'Engagement pour le tourisme et la culture',
      'Influence et capacité d’inspiration',
      'Contribution à l’attractivité du pays'
    ],
    group: 'Tourisme & Destination Guinée'
  },
  {
    id: 7,
    icon: Smartphone,
    title: 'Prix de l’Innovation Digitale dans les métiers de l’Hospitalité',
    description: 'Récompense une solution digitale qui transforme les métiers de l’hospitalité.',
    criteria: [
      'Innovation technologique',
      'Utilité pour les professionnels ou les voyageurs',
      'Qualité de l’expérience utilisateur',
      'Impact mesurable',
      'Potentiel de déploiement'
    ],
    group: 'Innovation & Développement Durable'
  },
  {
    id: 8,
    icon: Leaf,
    title: 'Prix de la Meilleure Initiative Eco-Responsable',
    description: 'Récompense une initiative exemplaire en matière d’écologie et de tourisme durable.',
    criteria: [
      'Impact environnemental positif',
      'Pratiques durables concrètes',
      'Sensibilisation des publics',
      'Intégration communautaire',
      'Innovation éco-responsable'
    ],
    group: 'Innovation & Développement Durable'
  },
  {
    id: 9,
    icon: Headphones,
    title: 'Prix d’Excellence en Accueil, Service et Expérience Client',
    description: 'Récompense l’établissement qui offre un accueil, un service et une expérience client d’exception.',
    criteria: [
      'Qualité de l’accueil',
      'Personnalisation du service',
      'Réactivité et professionnalisme',
      'Satisfaction client',
      'Constante dans l’excellence'
    ],
    group: 'Accueil, Service & Expérience Client'
  },
  {
    id: 10,
    icon: Wine,
    title: 'Prix du Bartender de l’Année',
    description: 'Récompense le bartender qui se distingue par sa créativité, sa technique et son sens du service.',
    criteria: [
      'Maîtrise technique',
      'Créativité des cocktails',
      'Relation client et mise en scène',
      'Hygiène et professionnalisme',
      'Contribution à l’expérience de l’établissement'
    ],
    group: 'Accueil, Service & Expérience Client'
  },
  {
    id: 11,
    icon: ChefHat,
    title: 'Prix de la Création Culinaire Guinéenne',
    description: 'Récompense une création qui sublime et modernise la gastronomie guinéenne.',
    criteria: [
      'Créativité et identité guinéenne',
      'Qualité gustative',
      'Mise en valeur des produits locaux',
      'Présentation et signature',
      'Contribution à la cuisine nationale'
    ],
    group: 'Restauration & Chaîne'
  },
  {
    id: 12,
    icon: Store,
    title: 'Prix de la Meilleure Chaîne de Restauration',
    description: 'Récompense la chaîne qui allie qualité, consistance et développement.',
    criteria: [
      'Qualité et constance de l’offre',
      'Identité et positionnement',
      'Service et hygiène',
      'Expansion et impact',
      'Satisfaction client'
    ],
    group: 'Restauration & Chaîne'
  },
  {
    id: 13,
    icon: Coffee,
    title: 'Prix du Meilleur Restaurant de l’année',
    description: 'Récompense le restaurant qui offre la meilleure expérience gastronomique de l’année.',
    criteria: [
      'Excellence culinaire',
      'Qualité du service',
      'Ambiance et cadre',
      'Rapport qualité-prix',
      'Réputation et fidélisation'
    ],
    group: 'Restauration & Chaîne'
  },
  {
    id: 14,
    icon: Star,
    title: 'Prix du jeune Talent de l’Hospitalité',
    description: 'Récompense un jeune professionnel prometteur du secteur de l’hospitalité.',
    criteria: [
      'Potentiel et parcours',
      'Innovation et créativité',
      'Engagement et professionnalisme',
      'Impact malgré le jeune âge',
      'Vision pour le secteur'
    ],
    group: 'Management & Leadership'
  },
  {
    id: 15,
    icon: Briefcase,
    title: 'Prix du Meilleur Manager Hôtelier de l’Année',
    description: 'Récompense le manager hôtelier qui se distingue par son leadership et ses résultats.',
    criteria: [
      'Leadership et gestion d’équipe',
      'Performance de l’établissement',
      'Qualité de service',
      'Innovation managériale',
      'Reconnaissance des équipes et des clients'
    ],
    group: 'Management & Leadership'
  },
  {
    id: 16,
    icon: Music,
    title: 'Prix de la Meilleure Experience de divertissement',
    description: 'Récompense le lieu ou l’expérience qui offre le meilleur divertissement.',
    criteria: [
      'Qualité de l’expérience',
      'Attractivité et originalité',
      'Accueil et organisation',
      'Sécurité et confort',
      'Satisfaction du public'
    ],
    group: 'Divertissement & Loisirs'
  },
  {
    id: 17,
    icon: Palmtree,
    title: 'Prix de la Meilleure Experience de Loisirs',
    description: 'Récompense l’expérience de loisirs la plus mémorable et qualitative.',
    criteria: [
      'Diversité et qualité des activités',
      'Ambiance et cadre',
      'Service et hospitalité',
      'Innovation dans l’offre',
      'Fidélisation de la clientèle'
    ],
    group: 'Divertissement & Loisirs'
  },
  {
    id: 18,
    icon: Heart,
    title: 'Prix Coup de Cœur du Public – Hôtel & performance globale',
    description: 'Récompense l’hôtel plébiscité par le public. Attribution 100 % par vote du public.',
    criteria: [
      'Nombre de votes du public',
      'Popularité et notoriété',
      'Performance globale de l’établissement',
      'Connexion émotionnelle avec le public',
      'Image et rayonnement'
    ],
    group: 'Coup de Cœur du Public',
    publicVote: true
  },
  {
    id: 19,
    icon: Trophy,
    title: 'Grand prix National d’Excellence dans l’Hospitalité',
    description: 'Plus haute distinction des HAG 2026, attribuée par le jury et un comité spécial de professionnels reconnus.',
    criteria: [
      'Excellence globale',
      'Impact sur le secteur',
      'Leadership et exemplarité',
      'Innovation et vision',
      'Contribution au rayonnement de l’hospitalité guinéenne'
    ],
    group: 'Grand Prix Hospitality Award Guinée 2026'
  }
];

export const getCategoriesByGroup = (group: string): Category[] => {
  return officialCategories.filter(category => category.group === group);
};

export const getCategoriesGrouped = (): { [key: string]: Category[] } => {
  return categoryGroups.reduce((acc, group) => {
    acc[group] = getCategoriesByGroup(group);
    return acc;
  }, {} as { [key: string]: Category[] });
};

export const getCategoryById = (id: number): Category | undefined => {
  return officialCategories.find(category => category.id === id);
};

export const getTotalCategoriesCount = (): number => {
  return officialCategories.length;
};

export const getGroupsCount = (): number => {
  return categoryGroups.length;
};
