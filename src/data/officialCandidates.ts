export interface OfficialCandidate {
  id: number;
  name: string;
  category: string;
  description?: string;
  image?: string;
  votes?: number;
  rating?: number;
  totalRatings?: number;
  isVoted?: boolean;
  userRating?: number;
  criteria?: string[];
  presentationVideo?: string;
  socialMediaLinks?: string[];
}

const candidate = (
  id: number,
  name: string,
  category: string,
  description: string,
  image?: string
): OfficialCandidate => ({
  id,
  name,
  category,
  description,
  image,
  votes: 0,
  rating: 0,
  totalRatings: 0,
  isVoted: false
});

const FORMATION =
  'Prix du Meilleur Établissement de Formation aux Métiers de l’Hospitalité de l’Année';
const INITIATIVE =
  'Prix Meilleure Initiative de Développement des Compétences de l’Année';
const SUPERIEUR = 'Prix du Meilleur Établissement d’Enseignement Supérieur';
const GUIDE = 'Prix Meilleur Guide Touristique de l’Année';
const AGENCE = 'Prix Meilleure Agence de Voyages de l’Année';
const AMBASSADEUR = 'Prix Meilleur(e) Ambassadeur (rice) de la Destination Guinée';
const INNOVATION = 'Prix de l’Innovation Digitale dans l’Hospitalité de l’Année';
const ECO = 'Prix de la Meilleure Initiative Éco-Responsable de l’Année';
const ACCUEIL = 'Prix d’Excellence en Accueil, Service et Expérience Client de l’Année';
const BARTENDER = 'Prix du Meilleur Bartender de l’Année';
const CULINAIRE = 'Prix de la Création Culinaire Guinéenne de l’Année';
const CHAINE = 'Prix Meilleure Chaîne de Restaurants de l’Année';
const RESTAURANT = 'Prix du Meilleur Restaurant de l’Année';
const JEUNE = 'Prix du Jeune Talent de l’Hospitalité';
const MANAGER = 'Prix du Meilleur Manager Hôtelier de l’Année';
const DIVERTISSEMENT = 'Prix Meilleure Expérience de Divertissement de l’Année';
const LOISIRS = 'Prix Meilleure Expérience de Loisirs de l’Année';
const COUP_DE_COEUR = 'Prix Coup de Cœur du Public de l’Année – Hôtel et performance globale';

export const officialCandidatesByCategory: { [key: string]: OfficialCandidate[] } = {
  [FORMATION]: [
    candidate(
      1,
      'Institut Gastronomique Le Chef',
      FORMATION,
      'Institut gastronomique — nominé au Prix du Meilleur Établissement de Formation aux Métiers de l’Hospitalité de l’Année',
      '/candidats/institut-le-chef.png'
    ),
    candidate(
      2,
      'Institut de Formation Professionnelle Amadou Dieng (IFPAD)',
      FORMATION,
      'Institut de formation professionnelle — nominé au Prix du Meilleur Établissement de Formation aux Métiers de l’Hospitalité de l’Année',
      '/candidats/ifpad-amadou-dieng.png'
    ),
    candidate(
      3,
      'ISTHOG - Guinée',
      FORMATION,
      'Institut supérieur de tourisme et d’hôtellerie — nominé au Prix du Meilleur Établissement de Formation aux Métiers de l’Hospitalité de l’Année',
      '/candidats/isthog-guinee.png'
    ),
    candidate(
      4,
      'Institut Nako Diabaté',
      FORMATION,
      'Institut de formation professionnelle — nominé au Prix du Meilleur Établissement de Formation aux Métiers de l’Hospitalité de l’Année',
      '/candidats/institut-nako-diabate.png'
    )
  ],
  [INITIATIVE]: [
    candidate(
      58,
      'Kamy École Guinéenne de Gastronomie (EGG)',
      INITIATIVE,
      'École de gastronomie — nominée au Prix Meilleure Initiative de Développement des Compétences de l’Année',
      '/candidats/kamy-egg.png'
    ),
    candidate(
      59,
      'Zinetraiteurs Academy',
      INITIATIVE,
      'Académie de formation — nominée au Prix Meilleure Initiative de Développement des Compétences de l’Année',
      '/candidats/zinetraiteurs-academy.png'
    ),
    candidate(
      60,
      'Touma Multi-Services',
      INITIATIVE,
      'Initiative de formation et de services — nominée au Prix Meilleure Initiative de Développement des Compétences de l’Année',
      '/candidats/touma-multi-services.png'
    ),
    candidate(
      77,
      'Master Management',
      INITIATIVE,
      'Initiative de formation — nominée au Prix Meilleure Initiative de Développement des Compétences de l’Année',
      '/candidats/master-management.png'
    )
  ],
  [SUPERIEUR]: [
    candidate(
      7,
      'École Supérieure du Tourisme et de l’Hôtellerie (ESTH)',
      SUPERIEUR,
      'École supérieure spécialisée tourisme et hôtellerie — nominée au Prix du Meilleur Établissement d’Enseignement Supérieur',
      '/candidats/esth.png'
    ),
    candidate(
      8,
      'Université Kofi Annan de Guinée',
      SUPERIEUR,
      'Université — nominée au Prix du Meilleur Établissement d’Enseignement Supérieur',
      '/candidats/universite-kofi-annan.png'
    )
  ],
  [GUIDE]: [
    candidate(
      9,
      'M. Hassan BAH',
      GUIDE,
      'Guide touristique — nominé au Prix Meilleur Guide Touristique de l’Année',
      '/candidats/hassan-bah.png'
    ),
    candidate(
      10,
      'M. Tabou BAH',
      GUIDE,
      'Guide touristique — nominé au Prix Meilleur Guide Touristique de l’Année',
      '/candidats/tabou-bah.jpg'
    ),
    candidate(11, 'M. Oumar', GUIDE, 'Guide touristique'),
    candidate(12, 'M. Kolié', GUIDE, 'Guide touristique'),
    candidate(13, 'M. Fernand Léno', GUIDE, 'Guide touristique'),
    candidate(
      78,
      'M. Mohamed Sanoussi GASSAMA',
      GUIDE,
      'Guide touristique — nominé au Prix Meilleur Guide Touristique de l’Année',
      '/candidats/mohamed-sanoussi-gassama.jpg'
    ),
    candidate(
      79,
      'M. Mamadou Diallo',
      GUIDE,
      'Guide touristique — nominé au Prix Meilleur Guide Touristique de l’Année',
      '/candidats/mamadou-diallo.jpg'
    )
  ],
  [AGENCE]: [
    candidate(
      14,
      'Mondial Express',
      AGENCE,
      'Agence de voyage — nominée au Prix Meilleure Agence de Voyages de l’Année',
      '/candidats/mondial-express.png'
    ),
    candidate(15, 'Dounia Voyage', AGENCE, 'Agence de voyage'),
    candidate(16, 'Mondial Tour', AGENCE, 'Agence de voyage'),
    candidate(
      75,
      'ABV Agence Barry Voyages',
      AGENCE,
      'Agence de voyage — nominée au Prix Meilleure Agence de Voyages de l’Année',
      '/candidats/abv-agence-barry-voyages.png'
    ),
    candidate(
      76,
      'LCOMLOISIRS',
      AGENCE,
      'Agence de voyages et de tourisme — nominée au Prix Meilleure Agence de Voyages de l’Année',
      '/candidats/lcomloisirs.png'
    )
  ],
  [AMBASSADEUR]: [
    candidate(17, 'Abdoulaye M’baye', AMBASSADEUR, 'Ambassadeur de la destination Guinée'),
    candidate(18, 'Takana Zion', AMBASSADEUR, 'Ambassadeur de la destination Guinée'),
    candidate(19, 'Serhou Guirassy', AMBASSADEUR, 'Ambassadeur de la destination Guinée'),
    candidate(20, 'Jupiter Devibe', AMBASSADEUR, 'Ambassadeur de la destination Guinée'),
    candidate(21, 'Naby Keita', AMBASSADEUR, 'Ambassadeur de la destination Guinée'),
    candidate(22, 'Djelikaba Bintou', AMBASSADEUR, 'Ambassadrice de la destination Guinée'),
    candidate(23, 'Iya Traoré', AMBASSADEUR, 'Ambassadeur de la destination Guinée'),
    candidate(24, 'Saïfon Baldé', AMBASSADEUR, 'Ambassadeur de la destination Guinée')
  ],
  [INNOVATION]: [
    candidate(
      61,
      'Simandou Séjour',
      INNOVATION,
      'Solution digitale — nominée au Prix de l’Innovation Digitale dans l’Hospitalité de l’Année',
      '/candidats/simandou-sejour.png'
    ),
    candidate(
      26,
      'OBS Technology',
      INNOVATION,
      'Solution digitale — nominée au Prix de l’Innovation Digitale dans l’Hospitalité de l’Année',
      '/candidats/obs-technology.png'
    ),
    candidate(
      25,
      'Visit Guinea',
      INNOVATION,
      'Solution digitale — nominée au Prix de l’Innovation Digitale dans l’Hospitalité de l’Année',
      '/candidats/visit-guinea.png'
    )
  ],
  [ECO]: [
    candidate(
      28,
      'Palmeraie Lodge',
      ECO,
      'Initiative éco-responsable — nominée au Prix de la Meilleure Initiative Éco-Responsable de l’Année',
      '/candidats/palmeraie-lodge.png'
    ),
    candidate(
      31,
      'Beau Village de Yaraya',
      ECO,
      'Initiative éco-responsable — nominée au Prix de la Meilleure Initiative Éco-Responsable de l’Année',
      '/candidats/beau-village-yaraya.png'
    ),
    candidate(
      30,
      'Jardin d’Eden Maferinya',
      ECO,
      'Initiative éco-responsable — nominée au Prix de la Meilleure Initiative Éco-Responsable de l’Année',
      '/candidats/jardin-d-eden.png'
    ),
    candidate(
      29,
      'Maf Village',
      ECO,
      'Initiative éco-responsable — nominée au Prix de la Meilleure Initiative Éco-Responsable de l’Année',
      '/candidats/maf-village.png'
    )
  ],
  [ACCUEIL]: [
    candidate(
      32,
      'Souaré Premium Hotel',
      ACCUEIL,
      'Hôtel — nominé au Prix d’Excellence en Accueil, Service et Expérience Client de l’Année',
      '/candidats/souare-premium-hotel.png'
    ),
    candidate(
      33,
      'ONOMO Conakry',
      ACCUEIL,
      'Hôtel — nominé au Prix d’Excellence en Accueil, Service et Expérience Client de l’Année',
      '/candidats/onomo-conakry.png'
    ),
    candidate(
      34,
      'Atlantic View Hotel & Resort',
      ACCUEIL,
      'Hôtel — nominé au Prix d’Excellence en Accueil, Service et Expérience Client de l’Année',
      '/candidats/atlantic-view.png'
    ),
    candidate(
      35,
      'Hôtel Riviera Taouyah',
      ACCUEIL,
      'Hôtel — nominé au Prix d’Excellence en Accueil, Service et Expérience Client de l’Année',
      '/candidats/riviera-taouyah.png'
    )
  ],
  [BARTENDER]: [
    candidate(36, 'Jean Sivily Koivogui', BARTENDER, 'Bartender'),
    candidate(
      37,
      'M. Emmanuel Woïwo GUILAVOGUI',
      BARTENDER,
      'Bartender — nominé au Prix du Meilleur Bartender de l’Année',
      '/candidats/emmanuel-woiwo-guilavogui.png'
    ),
    candidate(
      81,
      'M. Djanfamara Bangaly CISSÉ',
      BARTENDER,
      'Bartender — nominé au Prix du Meilleur Bartender de l’Année',
      '/candidats/djanfamara-bangaly-cisse.png'
    ),
    candidate(
      84,
      'M. Ahmed Tidiane Cisse',
      BARTENDER,
      'Bartender — nominé au Prix du Meilleur Bartender de l’Année',
      '/candidats/ahmed-tidiane-cisse.png'
    )
  ],
  [CULINAIRE]: [
    candidate(
      38,
      'Le Jacquier',
      CULINAIRE,
      'Restaurant-traiteur — nominé au Prix de la Création Culinaire Guinéenne de l’Année',
      '/candidats/le-jacquier.png'
    ),
    candidate(
      62,
      'OKLM Grill Chez Poupina',
      CULINAIRE,
      'Restaurant — nominé au Prix de la Création Culinaire Guinéenne de l’Année',
      '/candidats/oklm-grill.png'
    ),
    candidate(
      63,
      'Restaurant Le Baobab de Bamba',
      CULINAIRE,
      'Restaurant — nominé au Prix de la Création Culinaire Guinéenne de l’Année',
      '/candidats/baobab-de-bamba.png'
    )
  ],
  [CHAINE]: [
    candidate(
      39,
      'Big Fataya',
      CHAINE,
      'Chaîne de restauration — nominée au Prix Meilleure Chaîne de Restaurants de l’Année',
      '/candidats/big-fataya.png'
    ),
    candidate(
      40,
      'Heroes Coffee Guinée',
      CHAINE,
      'Chaîne de restauration — nominée au Prix Meilleure Chaîne de Restaurants de l’Année',
      '/candidats/heroes-coffee.png'
    ),
    candidate(
      41,
      'RFC',
      CHAINE,
      'Chaîne de restauration — nominée au Prix Meilleure Chaîne de Restaurants de l’Année',
      '/candidats/rfc.png'
    ),
    candidate(
      42,
      'Le SLM',
      CHAINE,
      'Chaîne de restauration — nominée au Prix Meilleure Chaîne de Restaurants de l’Année',
      '/candidats/le-slm.png'
    )
  ],
  [RESTAURANT]: [
    candidate(
      43,
      'Barista Groupe',
      RESTAURANT,
      'Restaurant — nominé au Prix du Meilleur Restaurant de l’Année',
      '/candidats/barista-groupe.png'
    ),
    candidate(
      44,
      'Avenue Group GN',
      RESTAURANT,
      'Restaurant — nominé au Prix du Meilleur Restaurant de l’Année',
      '/candidats/avenue-group.png'
    ),
    candidate(
      45,
      'Aquarium Restaurant et Lounge',
      RESTAURANT,
      'Restaurant — nominé au Prix du Meilleur Restaurant de l’Année',
      '/candidats/aquarium.png'
    ),
    candidate(
      69,
      'UMIÏ Resto & Bar',
      RESTAURANT,
      'Restaurant — nominé au Prix du Meilleur Restaurant de l’Année',
      '/candidats/umii-resto-bar.png'
    ),
    candidate(
      70,
      'Restaurant Ajami',
      RESTAURANT,
      'Restaurant — nominé au Prix du Meilleur Restaurant de l’Année',
      '/candidats/restaurant-ajami.png'
    )
  ],
  [JEUNE]: [
    candidate(
      71,
      'M. Ézéckiel Saoromou',
      JEUNE,
      'DG Palmeraie Lodge — nominé au Prix du Jeune Talent de l’Hospitalité',
      '/candidats/ezeckiel-saoromou.png'
    ),
    candidate(
      72,
      'M. Jean Pierre Tolno',
      JEUNE,
      'PDG Institut Gastronomique Le Chef — nominé au Prix du Jeune Talent de l’Hospitalité',
      '/candidats/jean-pierre-tolno.png'
    ),
    candidate(
      73,
      'M. Mamadou DIABY',
      JEUNE,
      'Maître d’hôtel — nominé au Prix du Jeune Talent de l’Hospitalité',
      '/candidats/mamadou-diaby.png'
    ),
    candidate(
      74,
      'M. Aboubacar CONTÉ',
      JEUNE,
      'DG Complexe Hôtelier — nominé au Prix du Jeune Talent de l’Hospitalité',
      '/candidats/aboubacar-conte.png'
    ),
    candidate(
      85,
      'M. Mamadou Saidou DIALLO',
      JEUNE,
      'Gestionnaire hôtelier — nominé au Prix du Jeune Talent de l’Hospitalité',
      '/candidats/mamadou-saidou-diallo.png'
    )
  ],
  [MANAGER]: [
    candidate(
      80,
      'M. Marco Rabbia',
      MANAGER,
      'DG Radisson Blu Hotel Conakry — nominé au Prix du Meilleur Manager Hôtelier de l’Année',
      '/candidats/marco-rabbia.png'
    ),
    candidate(
      82,
      'M. Serge NDONO',
      MANAGER,
      'DG Hôtel le Bonheur — nominé au Prix du Meilleur Manager Hôtelier de l’Année',
      '/candidats/serge-ndono.png'
    ),
    candidate(
      83,
      'M. Charlie Yang',
      MANAGER,
      'DG Hôtel Kaloum — nominé au Prix du Meilleur Manager Hôtelier de l’Année',
      '/candidats/charlie-yang.png'
    )
  ],
  [DIVERTISSEMENT]: [
    candidate(
      51,
      'Le Baron',
      DIVERTISSEMENT,
      'Lieu de divertissement — nominé au Prix Meilleure Expérience de Divertissement de l’Année',
      '/candidats/le-baron.png'
    ),
    candidate(
      64,
      'Brabus Restaurant Night Club',
      DIVERTISSEMENT,
      'Lieu de divertissement — nominé au Prix Meilleure Expérience de Divertissement de l’Année',
      '/candidats/brabus.png'
    ),
    candidate(
      65,
      'Pyramide Plus',
      DIVERTISSEMENT,
      'Lieu de divertissement — nominé au Prix Meilleure Expérience de Divertissement de l’Année',
      '/candidats/pyramide-plus.png'
    ),
    candidate(
      66,
      'Vendome Club Conakry',
      DIVERTISSEMENT,
      'Lieu de divertissement — nominé au Prix Meilleure Expérience de Divertissement de l’Année',
      '/candidats/vendome-club.png'
    ),
    candidate(
      67,
      'Group Barista',
      DIVERTISSEMENT,
      'Lieu de divertissement — nominé au Prix Meilleure Expérience de Divertissement de l’Année',
      '/candidats/group-barista.png'
    ),
    candidate(
      68,
      '3 by 3 Club',
      DIVERTISSEMENT,
      'Lieu de divertissement — nominé au Prix Meilleure Expérience de Divertissement de l’Année',
      '/candidats/3-by-3-club.png'
    )
  ],
  [LOISIRS]: [
    candidate(
      47,
      'Camayenne Plage',
      LOISIRS,
      'Site de loisirs — nominé au Prix Meilleure Expérience de Loisirs de l’Année',
      '/candidats/camayenne-plage.png'
    ),
    candidate(
      50,
      'Jardin 02 Octobre',
      LOISIRS,
      'Site de loisirs — nominé au Prix Meilleure Expérience de Loisirs de l’Année',
      '/candidats/jardin-02-octobre.jpg'
    )
  ],
  [COUP_DE_COEUR]: [
    candidate(
      57,
      'Radisson Blu Conakry',
      COUP_DE_COEUR,
      'Hôtel — nominé au Prix Coup de Cœur du Public de l’Année',
      '/candidats/radisson-blu-conakry.png'
    ),
    candidate(
      53,
      'Noom Hotel Conakry',
      COUP_DE_COEUR,
      'Hôtel — nominé au Prix Coup de Cœur du Public de l’Année',
      '/candidats/noom-hotel-conakry.png'
    ),
    candidate(
      55,
      'Hôtel Kaloum',
      COUP_DE_COEUR,
      'Hôtel — nominé au Prix Coup de Cœur du Public de l’Année',
      '/candidats/hotel-kaloum.png'
    ),
    candidate(
      56,
      'Riviera Royal Resort & Casino',
      COUP_DE_COEUR,
      'Hôtel — nominé au Prix Coup de Cœur du Public de l’Année',
      '/candidats/riviera-royal.png'
    ),
    candidate(
      54,
      'Palm Camayenne',
      COUP_DE_COEUR,
      'Hôtel — nominé au Prix Coup de Cœur du Public de l’Année',
      '/candidats/palm-camayenne.jpg'
    )
  ]
};

export const getAllOfficialCandidates = (): OfficialCandidate[] => {
  return Object.values(officialCandidatesByCategory).flat();
};

export const getCandidatesByCategory = (category: string): OfficialCandidate[] => {
  return officialCandidatesByCategory[category] || [];
};

export const getCategoriesWithCandidates = (): string[] => {
  return Object.keys(officialCandidatesByCategory);
};
