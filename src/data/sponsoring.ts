export interface SponsorshipPack {
  id: string;
  name: string;
  amountLabel: string;
  tagline?: string;
  featured?: boolean;
  benefits: string[];
}

export const SPONSORING_INTRO =
  'Les formules suivantes constituent une base de partenariat. Des offres personnalisées peuvent être élaborées en fonction du secteur, des objectifs et du budget du partenaire.';

export const sponsorshipPacks: SponsorshipPack[] = [
  {
    id: 'platinum',
    name: 'Sponsor Platinum',
    amountLabel: '100 000 000 GNF',
    tagline: 'Partenaire majeur de HAG 2026.',
    featured: true,
    benefits: [
      'Statut de Sponsor Platinum',
      'Association privilégiée de la marque à l’édition 2026',
      'Mention officielle dans certaines communications',
      'Logo premium sur les supports officiels',
      'Visibilité sur les supports digitaux',
      'Présence premium sur le tapis rouge',
      'Branding / photocall',
      'Table VVIP pour 14 personnes',
      'Possibilité de remise d’un prix majeur',
      'Allocution selon protocole défini par l’organisation',
      'Interviews médias',
      'Spot ou capsule vidéo partenaire',
      'Publications dédiées',
      'Cadeaux / invitations VIP',
      'Présence dans les contenus audiovisuels',
      'Possibilité d’activation de marque'
    ]
  },
  {
    id: 'diamant',
    name: 'Sponsor Diamant',
    amountLabel: '65 000 000 GNF',
    benefits: [
      'Statut de Sponsor Diamant',
      'Logo premium sur les supports',
      'Visibilité digitale',
      'Intégration dans certaines communications',
      'Remise d’une catégorie de prix',
      'Table VIP pour 8 personnes',
      'Branding stratégique',
      'Présence sur le photocall',
      'Interviews',
      'Conférence de presse',
      'Publication dédiée',
      'Présence dans certains contenus audiovisuels'
    ]
  },
  {
    id: 'or',
    name: 'Sponsor Or',
    amountLabel: '30 000 000 GNF',
    benefits: [
      'Statut de Sponsor Or',
      'Logo sur les supports officiels',
      'Invitations VIP pour 6 personnes',
      'Mention par le maître de cérémonie',
      'Certificat de reconnaissance',
      'Publications sur les réseaux sociaux',
      'Présence dans les communications partenaires',
      'Accès au photocall',
      'Capsule vidéo partenaire',
      'Visibilité lors de la cérémonie'
    ]
  },
  {
    id: 'argent',
    name: 'Sponsor Argent',
    amountLabel: '15 000 000 GNF',
    benefits: [
      'Logo sur les supports officiels',
      'Invitations pour 4 personnes',
      'Mention de remerciement',
      'Certificat de partenariat',
      'Publications sur les réseaux sociaux',
      'Présence dans certaines communications',
      'Possibilité d’interview selon programmation média'
    ]
  },
  {
    id: 'bronze',
    name: 'Sponsor Bronze',
    amountLabel: '7 000 000 GNF',
    benefits: [
      'Logo sur les supports officiels',
      'Invitations pour 2 personnes',
      'Mention de remerciement',
      'Certificat de partenariat',
      'Présence dans les supports partenaires'
    ]
  }
];

export const technicalPartnerExamples = [
  'Transport',
  'Hébergement',
  'Restauration',
  'Boissons',
  'Impression',
  'Signalétique',
  'Décoration',
  'Équipements',
  'Sécurité',
  'Communication',
  'Prestations audiovisuelles',
  'Mise à disposition d’espaces'
];

export const partnershipProcess = [
  {
    step: 1,
    title: 'Prise de contact',
    text: 'Prise de contact avec l’équipe HAG 2026.'
  },
  {
    step: 2,
    title: 'Objectifs',
    text: 'Présentation du projet et identification des objectifs du partenaire.'
  },
  {
    step: 3,
    title: 'Formule',
    text: 'Choix d’une formule ou élaboration d’une offre personnalisée.'
  },
  {
    step: 4,
    title: 'Validation',
    text: 'Validation du partenariat.'
  },
  {
    step: 5,
    title: 'Convention',
    text: 'Signature d’une convention ou d’un contrat de partenariat.'
  },
  {
    step: 6,
    title: 'Mise en œuvre',
    text: 'Mise en œuvre des contreparties.'
  },
  {
    step: 7,
    title: 'Bilan',
    text: 'Bilan et valorisation post-événement.'
  }
];

export const customPartnershipTypes = [
  'Partenaire principal',
  'Partenaire officiel d’une activité',
  'Partenaire média',
  'Partenaire technique',
  'Partenaire institutionnel',
  'Partenaire en nature',
  'Sponsor d’une catégorie ou d’un prix',
  'Partenaire d’une activation spécifique'
];

export const BUDGET_TOTAL_LABEL = '642 801 500 GNF';

export const budgetLines = [
  { label: 'Logistique & production', amount: '97 100 000 GNF' },
  { label: 'Communication & publicité', amount: '280 765 000 GNF' },
  { label: 'Restauration', amount: '157 500 000 GNF' },
  { label: 'Sécurité', amount: '15 000 000 GNF' },
  { label: 'Animation & protocole', amount: '34 000 000 GNF' },
  { label: 'Frais administratifs & coordination', amount: '10 %' }
];

export const fundingSources = [
  'Sponsoring',
  'Partenariats financiers',
  'Partenariats en nature',
  'Billetterie',
  'Contributions et prestations associées',
  'Autres ressources liées à l’événement'
];
