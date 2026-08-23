import {
  GraduationCap,
  BookOpen,
  User,
  Plane,
  Globe,
  MapPin,
  Calendar,
  Leaf,
  Smartphone,
  Headphones,
  Wine,
  Utensils,
  ChefHat,
  Store,
  Coffee,
  Music,
  Palmtree,
  Heart,
  Trophy
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
  'Formation professionnelle et Enseignement Supérieur',
  'Tourisme',
  'Innovation',
  'Accueil et Service',
  'Restauration',
  'Divertissement et Loisirs',
  'Coup de Cœur du Public',
  'Grand Prix Hospitality Awards Guinée 2026'
];

export const officialCategories: Category[] = [
  {
    id: 1,
    icon: GraduationCap,
    title: 'Prix du Meilleur Etablissement de Formation professionnelle et Technique',
    description: 'Récompense l’établissement qui excelle dans la formation professionnelle et technique liée à l’hospitalité.',
    criteria: [
      'Qualité de la formation et des programmes',
      'Insertion professionnelle des diplômés',
      'Infrastructures et encadrement',
      'Partenariats avec le secteur',
      'Impact sur les compétences du métier'
    ],
    group: 'Formation professionnelle et Enseignement Supérieur'
  },
  {
    id: 2,
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
    group: 'Formation professionnelle et Enseignement Supérieur'
  },
  {
    id: 3,
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
    group: 'Tourisme'
  },
  {
    id: 4,
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
    group: 'Tourisme'
  },
  {
    id: 5,
    icon: Globe,
    title: 'Meilleur Ambassadeur (rice) de la Destination Guinée',
    description: 'Récompense une personnalité qui promeut et rayonne pour la destination Guinée.',
    criteria: [
      'Rayonnement national et international',
      'Promotion de l’image de la Guinée',
      'Engagement pour le tourisme et la culture',
      'Influence et capacité d’inspiration',
      'Contribution à l’attractivité du pays'
    ],
    group: 'Tourisme'
  },
  {
    id: 6,
    icon: MapPin,
    title: 'Prix de la Meilleure Destination Touristique',
    description: 'Récompense le site ou la destination qui offre la plus belle expérience de visite.',
    criteria: [
      'Attractivité et unicité du site',
      'Accueil et aménagements',
      'Préservation du patrimoine',
      'Expérience visiteur',
      'Potentiel de développement touristique'
    ],
    group: 'Tourisme'
  },
  {
    id: 7,
    icon: Calendar,
    title: 'Prix Meilleur Événement Touristique',
    description: 'Récompense l’événement qui dynamise le tourisme et valorise la culture guinéenne.',
    criteria: [
      'Originalité et attractivité',
      'Organisation et fréquentation',
      'Impact économique et médiatique',
      'Rayonnement de la destination',
      'Pérennité et vision'
    ],
    group: 'Tourisme'
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
    group: 'Tourisme'
  },
  {
    id: 9,
    icon: Smartphone,
    title: 'Prix de l’Innovation Digital dans l’Hospitalité',
    description: 'Récompense une solution digitale qui transforme l’expérience ou la gestion de l’hospitalité.',
    criteria: [
      'Innovation technologique',
      'Utilité pour les professionnels ou les voyageurs',
      'Qualité de l’expérience utilisateur',
      'Impact mesurable',
      'Potentiel de déploiement'
    ],
    group: 'Innovation'
  },
  {
    id: 10,
    icon: Headphones,
    title: 'Prix de l’Excellence en Accueil et Service Client',
    description: 'Récompense l’établissement qui offre un accueil et un service client d’exception.',
    criteria: [
      'Qualité de l’accueil',
      'Personnalisation du service',
      'Réactivité et professionnalisme',
      'Satisfaction client',
      'Constante dans l’excellence'
    ],
    group: 'Accueil et Service'
  },
  {
    id: 11,
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
    group: 'Accueil et Service'
  },
  {
    id: 12,
    icon: Utensils,
    title: 'Prix de l’Excellence Food & Beverage',
    description: 'Récompense l’excellence dans la restauration et le service Food & Beverage.',
    criteria: [
      'Qualité de l’offre F&B',
      'Cohérence du service',
      'Innovation et présentation',
      'Standards d’hygiène',
      'Expérience client'
    ],
    group: 'Accueil et Service'
  },
  {
    id: 13,
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
    group: 'Restauration'
  },
  {
    id: 14,
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
    group: 'Restauration'
  },
  {
    id: 15,
    icon: Coffee,
    title: 'Prix du Meilleur Restaurant',
    description: 'Récompense le restaurant qui offre la meilleure expérience gastronomique.',
    criteria: [
      'Excellence culinaire',
      'Qualité du service',
      'Ambiance et cadre',
      'Rapport qualité-prix',
      'Réputation et fidélisation'
    ],
    group: 'Restauration'
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
    group: 'Divertissement et Loisirs'
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
    group: 'Divertissement et Loisirs'
  },
  {
    id: 18,
    icon: Heart,
    title: 'Prix Coup de Cœur du Public – Hôtels',
    description: 'Récompense l’hôtel plébiscité par le public. Attribution 100 % par vote du public.',
    criteria: [
      'Nombre de votes du public',
      'Popularité et notoriété',
      'Connexion émotionnelle avec le public',
      'Engagement des supporters',
      'Image et rayonnement'
    ],
    group: 'Coup de Cœur du Public',
    publicVote: true
  },
  {
    id: 19,
    icon: Trophy,
    title: 'Grand prix National d’Excellence de l’Hospitalité',
    description: 'Plus haute distinction des HAG 2026, attribuée par le jury et un comité spécial de professionnels reconnus.',
    criteria: [
      'Excellence globale',
      'Impact sur le secteur',
      'Leadership et exemplarité',
      'Innovation et vision',
      'Contribution au rayonnement de l’hospitalité guinéenne'
    ],
    group: 'Grand Prix Hospitality Awards Guinée 2026'
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
