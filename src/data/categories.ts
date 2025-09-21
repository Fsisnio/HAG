import { 
  User, 
  Users, 
  Utensils, 
  Server, 
  Headphones, 
  GraduationCap, 
  Umbrella, 
  Heart, 
  Globe, 
  Plane, 
  Coffee, 
  TreePine, 
  Building, 
  Crown, 
  Star,
  Award,
  Music,
  Wine,
  Home,
  UserCheck,
  Zap,
  Trophy,
  ThumbsUp
} from 'lucide-react';

export interface Category {
  id: number;
  icon: any;
  title: string;
  description: string;
  criteria: string[];
  prize: string;
  group: string;
}

// Groupes de catégories
export const categoryGroups = [
  'Formation Professionnelle',
  'Hôtellerie',
  'Restauration & Gastronomie',
  'Tourisme & Voyages',
  'Loisirs & Divertissement',
  'Prix Spéciaux',
  'Prix HAG 2025'
];

export const officialCategories: Category[] = [
  // 1. Catégorie Formation Professionnelle
  {
    id: 1,
    icon: GraduationCap,
    title: 'Meilleur Institut de formation professionnel de l\'année',
    description: 'Récompense l\'institut de formation qui excelle dans la qualité de son enseignement et son impact sur la professionnalisation du secteur.',
    criteria: [
      'Innovation pédagogique et méthodes d\'enseignement',
      'Taux d\'insertion professionnelle des diplômés',
      'Qualité des infrastructures et équipements',
      'Partenariats avec le secteur professionnel',
      'Impact sur le développement des compétences'
    ],
    prize: 'Trophée d\'Or + Certification Excellence',
    group: 'Formation Professionnelle'
  },

  // 2. Catégorie Hôtellerie
  {
    id: 2,
    icon: Users,
    title: 'Meilleure Équipe en service d\'étage de l\'année',
    description: 'Récompense l\'équipe de service d\'étage qui se distingue par son efficacité, sa rigueur et son sens du détail.',
    criteria: [
      'Qualité et constance du service',
      'Travail d\'équipe et coordination',
      'Professionnalisme et discrétion',
      'Organisation et efficacité',
      'Attention au détail et innovation'
    ],
    prize: 'Trophée d\'Or + Certification Excellence',
    group: 'Hôtellerie'
  },
  {
    id: 3,
    icon: Utensils,
    title: 'Meilleure Brigade de Cuisine de l\'année',
    description: 'Récompense la performance collective d\'une équipe de cuisine qui excelle dans l\'art culinaire.',
    criteria: [
      'Qualité gustative et visuelle des plats',
      'Coordination, discipline et esprit d\'équipe',
      'Respect des normes HACCP et d\'hygiène',
      'Innovation culinaire',
      'Gestion efficace en période de forte activité'
    ],
    prize: 'Trophée d\'Or + Certification Excellence',
    group: 'Hôtellerie'
  },
  {
    id: 4,
    icon: Server,
    title: 'Meilleure Équipe de Service en Salle de l\'année',
    description: 'Récompense l\'équipe offrant une expérience gastronomique complète et harmonieuse.',
    criteria: [
      'Rapidité, précision et élégance du service',
      'Coordination et esprit d\'équipe',
      'Relation cordiale et professionnelle avec les clients',
      'Maîtrise des arts de la table',
      'Gestion des situations délicates'
    ],
    prize: 'Trophée d\'Or + Certification Excellence',
    group: 'Hôtellerie'
  },
  {
    id: 5,
    icon: Headphones,
    title: 'Meilleure Équipe d\'accueil et Service Client de l\'année',
    description: 'Récompense l\'équipe de réception offrant une expérience client exceptionnelle.',
    criteria: [
      'Qualité de l\'accueil et des échanges',
      'Rapidité et efficacité dans le traitement des demandes',
      'Capacité d\'écoute et personnalisation',
      'Gestion professionnelle des situations délicates',
      'Retours clients positifs'
    ],
    prize: 'Trophée d\'Or + Certification Excellence',
    group: 'Hôtellerie'
  },
  {
    id: 6,
    icon: TreePine,
    title: 'Meilleur Écolodge ou écoresponsable de l\'année',
    description: 'Récompense un établissement qui se distingue par son engagement en développement durable.',
    criteria: [
      'Gestion environnementale durable',
      'Utilisation d\'énergies renouvelables',
      'Réduction des déchets et impact carbone',
      'Intégration dans l\'environnement naturel',
      'Sensibilisation et éducation environnementale'
    ],
    prize: 'Trophée d\'Or + Certification Excellence',
    group: 'Hôtellerie'
  },
  {
    id: 7,
    icon: Building,
    title: 'Meilleur Hôtel Milieu de Gamme de l\'année',
    description: 'Récompense un hôtel milieu de gamme qui se distingue par son excellent rapport qualité-prix.',
    criteria: [
      'Qualité de l\'accueil et du service',
      'Confort et fonctionnalité des chambres',
      'Rapport qualité-prix optimal',
      'Offre de restauration et services additionnels',
      'Innovation et satisfaction client'
    ],
    prize: 'Trophée d\'Or + Certification Excellence',
    group: 'Hôtellerie'
  },
  {
    id: 8,
    icon: Crown,
    title: 'Meilleur Groupe Hôtelier de l\'année',
    description: 'Récompense un groupe hôtelier qui contribue à élever les standards de l\'hôtellerie en Guinée.',
    criteria: [
      'Croissance et innovation',
      'Gestion et leadership',
      'Expérience client exceptionnelle',
      'Diversité de l\'offre',
      'Impact social et économique positif'
    ],
    prize: 'Trophée d\'Or + Certification Excellence',
    group: 'Hôtellerie'
  },
  {
    id: 9,
    icon: Star,
    title: 'Meilleure Résidence de luxe de l\'année',
    description: 'Récompense une résidence de luxe qui incarne l\'élégance et l\'exclusivité.',
    criteria: [
      'Qualité des infrastructures',
      'Excellence du service personnalisé',
      'Confort et exclusivité',
      'Innovation et technologies',
      'Expérience client haut de gamme'
    ],
    prize: 'Trophée d\'Or + Certification Excellence',
    group: 'Hôtellerie'
  },
  {
    id: 10,
    icon: Home,
    title: 'Meilleur Hôtel de l\'année',
    description: 'Récompense l\'hôtel qui excelle dans tous les aspects de l\'hospitalité et du service.',
    criteria: [
      'Excellence globale du service',
      'Qualité des infrastructures',
      'Innovation et technologies',
      'Satisfaction client et réputation',
      'Contribution au rayonnement touristique'
    ],
    prize: 'Trophée d\'Or + Certification Excellence',
    group: 'Hôtellerie'
  },

  // 3. Catégorie Restauration & Gastronomie
  {
    id: 11,
    icon: Coffee,
    title: 'Meilleur Restaurant Gastronomique de l\'année',
    description: 'Récompense un restaurant qui excelle en combinant haute gastronomie, service et ambiance.',
    criteria: [
      'Excellence culinaire et créativité',
      'Qualité du service de table',
      'Originalité et promotion des produits locaux',
      'Ambiance et décoration',
      'Réputation et reconnaissance'
    ],
    prize: 'Trophée d\'Or + Certification Excellence',
    group: 'Restauration & Gastronomie'
  },
  {
    id: 12,
    icon: Wine,
    title: 'Meilleure Chaîne de Restauration Rapide de l\'année',
    description: 'Récompense la chaîne de restauration rapide qui se distingue par sa qualité et son service.',
    criteria: [
      'Qualité et consistance des produits',
      'Rapidité et efficacité du service',
      'Hygiène et standards de qualité',
      'Innovation dans l\'offre',
      'Expansion et impact économique'
    ],
    prize: 'Trophée d\'Or + Certification Excellence',
    group: 'Restauration & Gastronomie'
  },

  // 4. Catégorie Tourisme & Voyages
  {
    id: 13,
    icon: User,
    title: 'Meilleur Guide Touristique de l\'année',
    description: 'Récompense le guide incarnant la passion et l\'art de transmettre l\'histoire guinéenne.',
    criteria: [
      'Maîtrise du patrimoine culturel et historique',
      'Capacité pédagogique et storytelling',
      'Adaptabilité aux différents profils',
      'Gestion sécurisée des visites',
      'Retours positifs des visiteurs'
    ],
    prize: 'Trophée d\'Or + Certification Excellence',
    group: 'Tourisme & Voyages'
  },
  {
    id: 14,
    icon: Plane,
    title: 'Meilleure Agence de Voyage de l\'année',
    description: 'Récompense une agence qui se distingue par la qualité de son support client.',
    criteria: [
      'Originalité et attractivité des offres',
      'Organisation et ponctualité',
      'Retours clients positifs',
      'Engagement local et innovation',
      'Diversité des destinations'
    ],
    prize: 'Trophée d\'Or + Certification Excellence',
    group: 'Tourisme & Voyages'
  },
  {
    id: 15,
    icon: Globe,
    title: 'Meilleure Initiative de Promotion Touristique',
    description: 'Récompense une initiative qui contribue significativement à la promotion du tourisme guinéen.',
    criteria: [
      'Innovation et créativité de l\'initiative',
      'Impact sur la promotion touristique',
      'Rayonnement national et international',
      'Partenariats et collaborations',
      'Résultats mesurables'
    ],
    prize: 'Trophée d\'Or + Certification Excellence',
    group: 'Tourisme & Voyages'
  },
  {
    id: 16,
    icon: Zap,
    title: 'Meilleure Compagnie Aérienne de l\'année',
    description: 'Récompense la compagnie aérienne qui excelle dans le service et la sécurité.',
    criteria: [
      'Qualité du service client',
      'Ponctualité et fiabilité',
      'Sécurité et standards internationaux',
      'Confort et innovations',
      'Contribution au développement touristique'
    ],
    prize: 'Trophée d\'Or + Certification Excellence',
    group: 'Tourisme & Voyages'
  },

  // 5. Catégorie Loisirs & Divertissement
  {
    id: 17,
    icon: Umbrella,
    title: 'Meilleur Complexe de Loisirs de l\'année',
    description: 'Récompense le complexe offrant la meilleure expérience de loisirs et divertissement.',
    criteria: [
      'Diversité et qualité des activités',
      'Sécurité et confort des installations',
      'Qualité de l\'accueil et du service',
      'Innovation dans l\'offre de loisirs',
      'Satisfaction et fidélisation des clients'
    ],
    prize: 'Trophée d\'Or + Certification Excellence',
    group: 'Loisirs & Divertissement'
  },
  {
    id: 18,
    icon: Music,
    title: 'Meilleur Club/Discothèque de l\'année',
    description: 'Récompense l\'établissement nocturne offrant la meilleure ambiance et expérience.',
    criteria: [
      'Qualité de l\'ambiance et de la programmation',
      'Sécurité et organisation',
      'Innovation dans l\'offre de divertissement',
      'Service client et hospitalité',
      'Impact sur la vie nocturne locale'
    ],
    prize: 'Trophée d\'Or + Certification Excellence',
    group: 'Loisirs & Divertissement'
  },

  // 6. Catégorie Prix Spéciaux
  {
    id: 19,
    icon: Award,
    title: 'Ambassadeur de l\'Hospitalité Guinéenne',
    description: 'Récompense une personnalité qui incarne et promeut l\'excellence de l\'hospitalité guinéenne.',
    criteria: [
      'Rayonnement et représentation internationale',
      'Contribution au secteur de l\'hospitalité',
      'Leadership et inspiration',
      'Promotion de la culture guinéenne',
      'Impact sur l\'image touristique du pays'
    ],
    prize: 'Trophée d\'Honneur + Reconnaissance Spéciale',
    group: 'Prix Spéciaux'
  },
  {
    id: 20,
    icon: Star,
    title: 'Jeune Talent de l\'Hospitalité',
    description: 'Récompense un jeune professionnel prometteur du secteur de l\'hospitalité.',
    criteria: [
      'Innovation et créativité',
      'Potentiel de développement',
      'Engagement et passion',
      'Contributions remarquables malgré le jeune âge',
      'Vision d\'avenir pour le secteur'
    ],
    prize: 'Trophée Jeune Talent + Bourse de Formation',
    group: 'Prix Spéciaux'
  },
  {
    id: 21,
    icon: Crown,
    title: 'Femme Leader de l\'Hospitalité',
    description: 'Récompense une femme leader qui contribue exceptionnellement au secteur.',
    criteria: [
      'Leadership et influence positive',
      'Contributions significatives au secteur',
      'Inspiration pour d\'autres femmes',
      'Innovation et excellence',
      'Impact social et économique'
    ],
    prize: 'Trophée Leadership + Reconnaissance Spéciale',
    group: 'Prix Spéciaux'
  },
  {
    id: 22,
    icon: Trophy,
    title: 'Prix d\'Honneur pour Contribution à l\'Hôtellerie & Tourisme en Guinée',
    description: 'Récompense une contribution exceptionnelle et durable au développement du secteur.',
    criteria: [
      'Ancienneté et constance dans l\'excellence',
      'Impact transformateur sur le secteur',
      'Mentorat et formation de la relève',
      'Reconnaissance par les pairs',
      'Héritage et vision à long terme'
    ],
    prize: 'Trophée d\'Honneur + Reconnaissance à Vie',
    group: 'Prix Spéciaux'
  },
  {
    id: 23,
    icon: Heart,
    title: 'Prix RSE (Responsabilité Sociétale & Développement Durable)',
    description: 'Récompense un engagement exemplaire en responsabilité sociale et environnementale.',
    criteria: [
      'Impact social et environnemental positif',
      'Initiatives de développement durable',
      'Implication communautaire',
      'Innovation en matière de RSE',
      'Mesurabilité des résultats'
    ],
    prize: 'Trophée RSE + Certification Développement Durable',
    group: 'Prix Spéciaux'
  },
  {
    id: 24,
    icon: UserCheck,
    title: 'Personnalité de l\'année dans l\'hospitalité',
    description: 'Récompense la personnalité qui a le plus marqué le secteur durant l\'année.',
    criteria: [
      'Impact et influence durant l\'année',
      'Contributions remarquables',
      'Reconnaissance par le secteur',
      'Innovation et leadership',
      'Rayonnement médiatique et public'
    ],
    prize: 'Trophée Personnalité + Reconnaissance Médiatique',
    group: 'Prix Spéciaux'
  },

  // 7. Catégorie Prix HAG 2025
  {
    id: 25,
    icon: ThumbsUp,
    title: 'Coup de cœur du public',
    description: 'Récompense le candidat ayant reçu le plus de votes et de soutien du public.',
    criteria: [
      'Nombre de votes du public',
      'Engagement sur les réseaux sociaux',
      'Popularité et notoriété',
      'Connexion émotionnelle avec le public',
      'Impact viral et médiatique'
    ],
    prize: 'Trophée Coup de Cœur + Prix Spécial Public',
    group: 'Prix HAG 2025'
  }
];

// Fonctions utilitaires
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



