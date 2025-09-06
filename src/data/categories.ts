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
  Star 
} from 'lucide-react';

export interface Category {
  id: number;
  icon: any;
  title: string;
  description: string;
  criteria: string[];
  prize: string;
}

export const officialCategories: Category[] = [
  {
    id: 1,
    icon: User,
    title: 'Meilleur Guide Touristique de l\'année',
    description: 'Récompense le guide incarnant la passion, la connaissance et l\'art de transmettre l\'histoire et la culture guinéenne.',
    criteria: [
      'Maîtrise du patrimoine culturel, historique et naturel',
      'Capacité pédagogique et storytelling captivant',
      'Adaptabilité à différents profils de touristes',
      'Gestion sécurisée des visites et excursions',
      'Retours positifs des visiteurs',
      'Bilingue'
    ],
    prize: 'Trophée d\'Or + Certification Excellence'
  },
  {
    id: 2,
    icon: Users,
    title: 'Meilleure Équipe en Housekeeping de l\'année',
    description: 'Récompense l\'équipe en charge du housekeeping qui se distingue par son efficacité, sa rigueur et son sens du détail.',
    criteria: [
      'Qualité et constance du service',
      'Travail d\'équipe',
      'Professionnalisme et discrétion',
      'Organisation et efficacité',
      'Attention au détail',
      'Formation continue et innovation'
    ],
    prize: 'Trophée d\'Or + Certification Excellence'
  },
  {
    id: 3,
    icon: Utensils,
    title: 'Meilleure Brigade de Cuisine de l\'année',
    description: 'Récompense la performance collective d\'une équipe de cuisine.',
    criteria: [
      'Qualité gustative et visuelle des plats',
      'Coordination, discipline et esprit d\'équipe',
      'Respect des normes HACCP'
    ],
    prize: 'Trophée d\'Or + Certification Excellence'
  },
  {
    id: 4,
    icon: Server,
    title: 'Meilleure Équipe de Service en Salle de l\'année',
    description: 'Récompense l\'équipe offrant une expérience gastronomique complète et harmonieuse.',
    criteria: [
      'Capacité d\'innovation et créativité culinaire',
      'Gestion efficace en période de forte activité',
      'Rapidité, précision et élégance du service',
      'Coordination et esprit d\'équipe',
      'Relation cordiale et professionnelle avec les clients',
      'Maîtrise des arts de la table',
      'Retours clients positifs'
    ],
    prize: 'Trophée d\'Or + Certification Excellence'
  },
  {
    id: 5,
    icon: Headphones,
    title: 'Meilleure Équipe d\'accueil et Service Client de l\'année',
    description: 'Récompense l\'équipe de réception ou commerciale offrant une expérience client exceptionnelle.',
    criteria: [
      'Qualité de l\'accueil et des échanges',
      'Rapidité et efficacité dans le traitement des demandes',
      'Capacité d\'écoute et personnalisation de l\'expérience',
      'Gestion professionnelle des situations délicates',
      'Feedback clients positif'
    ],
    prize: 'Trophée d\'Or + Certification Excellence'
  },
  {
    id: 6,
    icon: GraduationCap,
    title: 'Meilleur Établissement de Formation de l\'année',
    description: 'Récompense une formation institution qui excelle dans la qualité de son enseignement et son impact sur la professionnalisation.',
    criteria: [
      'Innovation pédagogique (méthodes pratiques, outils numériques, pédagogie active)',
      'Taux d\'insertion professionnelle des diplômés',
      'Témoignages et parcours des anciens élèves',
      'Impact sur la création d\'emplois',
      'Vidéo de présentation de 3 minutes + liens réseaux sociaux'
    ],
    prize: 'Trophée d\'Or + Certification Excellence'
  },
  {
    id: 7,
    icon: Umbrella,
    title: 'Meilleur Club de Plage de l\'année',
    description: 'Récompense le meilleur club de plage qui combine avec succès ambiance, sécurité, confort et attrait touristique.',
    criteria: [
      'Qualité de l\'accueil, divertissement, sécurité',
      'Hygiene et popularité parmi les clients'
    ],
    prize: 'Trophée d\'Or + Certification Excellence'
  },
  {
    id: 8,
    icon: Heart,
    title: 'Meilleure Initiative RSE de l\'année',
    description: 'Récompense un établissement qui démontre un engagement exemplaire en responsabilité sociale et environnementale.',
    criteria: [
      'Impact social, initiatives environnementales',
      'Implication communautaire',
      'Pertinence culturelle'
    ],
    prize: 'Trophée d\'Or + Certification Excellence'
  },
  {
    id: 9,
    icon: Globe,
    title: 'Meilleur Projet Tourisme Culturel de l\'année',
    description: 'Récompense un projet qui met en valeur la richesse culturelle et patrimoniale de la Guinée à travers le tourisme.',
    criteria: [
      'Innovation du projet',
      'Impact local',
      'Accessibilité et attractivité',
      'Durabilité',
      'Partenariats et collaborations',
      'Satisfaction et retombées'
    ],
    prize: 'Trophée d\'Or + Certification Excellence'
  },
  {
    id: 10,
    icon: Plane,
    title: 'Meilleure Agence de Voyage de l\'année',
    description: 'Récompense une agence de voyage qui se distingue par la qualité de son support client et la diversité de ses offres.',
    criteria: [
      'Originalité et attractivité des offres',
      'Organisation et ponctualité',
      'Retours clients positifs',
      'Engagement local et innovation',
      'Diversité des offres'
    ],
    prize: 'Trophée d\'Or + Certification Excellence'
  },
  {
    id: 11,
    icon: Coffee,
    title: 'Meilleur Restaurant de l\'année',
    description: 'Récompense un restaurant qui excelle en combinant qualité gastronomique, service et ambiance.',
    criteria: [
      'Qualité des plats et du service de table',
      'Originalité et promotion des produits locaux',
      'Hygiene et organisation',
      'Rapport qualité-prix',
      'Avis clients et réputation'
    ],
    prize: 'Trophée d\'Or + Certification Excellence'
  },
  {
    id: 12,
    icon: TreePine,
    title: 'Meilleur Écolodge ou Écoresponsable',
    description: 'Récompense un établissement qui se distingue par son engagement en développement durable et protection environnementale.',
    criteria: [
      'Gestion environnementale (réduction empreinte carbone, gestion énergie et eau)',
      'Utilisation de produits durables (énergies renouvelables, matériaux écologiques, produits locaux/organiques)',
      'Réduction des déchets',
      'Intégration dans l\'environnement naturel',
      'Sensibilisation',
      'Innovation durable',
      'Impact social et économique'
    ],
    prize: 'Trophée d\'Or + Certification Excellence'
  },
  {
    id: 13,
    icon: Building,
    title: 'Meilleur Hôtel Milieu de Gamme',
    description: 'Récompense un hôtel milieu de gamme qui se distingue par son excellent rapport qualité-prix et la constance de son service.',
    criteria: [
      'Qualité de l\'accueil et du service',
      'Confort et fonctionnalité des chambres',
      'Rapport qualité-prix',
      'Offre de restauration et services additionnels',
      'Innovation et durabilité',
      'Satisfaction client',
      'Image et attractivité'
    ],
    prize: 'Trophée d\'Or + Certification Excellence'
  },
  {
    id: 14,
    icon: Crown,
    title: 'Meilleur Groupe Hôtelier',
    description: 'Récompense un groupe hôtelier qui contribue à élever les standards de l\'hôtellerie en Guinée.',
    criteria: [
      'Croissance et innovation',
      'Gestion et leadership',
      'Expérience client',
      'Diversité de l\'offre',
      'Impact social et économique'
    ],
    prize: 'Trophée d\'Or + Certification Excellence'
  },
  {
    id: 15,
    icon: Star,
    title: 'Meilleure Résidence de Luxe de l\'année',
    description: 'Récompense une résidence de luxe qui incarne l\'élégance, le confort haut de gamme et l\'exclusivité.',
    criteria: [
      'Qualité des infrastructures',
      'Excellence du service',
      'Confort et exclusivité',
      'Innovation et technologies',
      'Expérience client'
    ],
    prize: 'Trophée d\'Or + Certification Excellence'
  }
];

