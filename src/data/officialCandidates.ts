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
  description: string
): OfficialCandidate => ({
  id,
  name,
  category,
  description,
  votes: 0,
  rating: 0,
  totalRatings: 0,
  isVoted: false
});

const FORMATION = 'Prix du Meilleur Etablissement de Formation aux métiers de l’hospitalité';
const SUPERIEUR = 'Prix du Meilleur Etablissement d’Enseignement Supérieur';
const GUIDE = 'Prix du Meilleur Guide Touristique';
const AGENCE = 'Prix de la Meilleure Agence de Voyage';
const AMBASSADEUR = 'Prix Meilleur(e) Ambassadeur (rice) de la Destination Guinée';
const INNOVATION = 'Prix de l’Innovation Digitale dans les métiers de l’Hospitalité';
const ECO = 'Prix de la Meilleure Initiative Eco-Responsable';
const ACCUEIL = 'Prix d’Excellence en Accueil, Service et Expérience Client';
const BARTENDER = 'Prix du Bartender de l’Année';
const CULINAIRE = 'Prix de la Création Culinaire Guinéenne';
const CHAINE = 'Prix de la Meilleure Chaîne de Restauration';
const RESTAURANT = 'Prix du Meilleur Restaurant de l’année';
const DIVERTISSEMENT = 'Prix de la Meilleure Experience de divertissement';
const LOISIRS = 'Prix de la Meilleure Experience de Loisirs';
const COUP_DE_COEUR = 'Prix Coup de Cœur du Public – Hôtel & performance globale';

export const officialCandidatesByCategory: { [key: string]: OfficialCandidate[] } = {
  [FORMATION]: [
    candidate(1, 'Institut Gastronomique le Chef', FORMATION, 'Établissement de formation gastronomique'),
    candidate(2, 'Institut de Formation Professionnelle Amadou Dieng (IFPAD)', FORMATION, 'Institut de formation professionnelle'),
    candidate(3, 'ISTHOG', FORMATION, 'Institut supérieur de tourisme et d’hôtellerie'),
    candidate(4, 'Nako Diabaté', FORMATION, 'Établissement de formation professionnelle'),
    candidate(5, 'Billy Ecole', FORMATION, 'École de formation professionnelle'),
    candidate(6, 'CENFORTH', FORMATION, 'Centre de formation en tourisme et hôtellerie')
  ],
  [SUPERIEUR]: [
    candidate(7, 'École Supérieure de Tourisme et de l’Hotellerie (ESTH)', SUPERIEUR, 'École supérieure spécialisée tourisme et hôtellerie'),
    candidate(8, 'Université Koffi', SUPERIEUR, 'Établissement d’enseignement supérieur')
  ],
  [GUIDE]: [
    candidate(9, 'M. Hassan Bah', GUIDE, 'Guide touristique'),
    candidate(10, 'M. Taibou', GUIDE, 'Guide touristique'),
    candidate(11, 'M. Oumar', GUIDE, 'Guide touristique'),
    candidate(12, 'M. Kolié', GUIDE, 'Guide touristique'),
    candidate(13, 'M. Fernand Léno', GUIDE, 'Guide touristique')
  ],
  [AGENCE]: [
    candidate(14, 'Mondial Express', AGENCE, 'Agence de voyage'),
    candidate(15, 'Dounia Voyage', AGENCE, 'Agence de voyage'),
    candidate(16, 'Mondial Tour', AGENCE, 'Agence de voyage')
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
    candidate(25, 'AphoGest-Visit Guinea', INNOVATION, 'Solution digitale pour l’hospitalité'),
    candidate(26, 'OBS Technologie', INNOVATION, 'Innovation digitale'),
    candidate(27, 'Zaly Meirveille', INNOVATION, 'Innovation digitale')
  ],
  [ECO]: [
    candidate(28, 'Palmeraie Lodge', ECO, 'Initiative éco-responsable'),
    candidate(29, 'Maf Village', ECO, 'Initiative éco-responsable'),
    candidate(30, 'Jardin D’Eden', ECO, 'Initiative éco-responsable'),
    candidate(31, 'Beau Village de YARAYA', ECO, 'Initiative éco-responsable')
  ],
  [ACCUEIL]: [
    candidate(32, 'Souaré Premium Hôtel', ACCUEIL, 'Hôtel – accueil et service client'),
    candidate(33, 'Hôtel ONOMO', ACCUEIL, 'Hôtel – accueil et service client'),
    candidate(34, 'Atlantic View Hôtel', ACCUEIL, 'Hôtel – accueil et service client'),
    candidate(35, 'Riviera Taouyah', ACCUEIL, 'Hôtel – accueil et service client')
  ],
  [BARTENDER]: [
    candidate(36, 'Jean Sivily Koivogui', BARTENDER, 'Bartender'),
    candidate(37, 'Emmanuel Koivogui', BARTENDER, 'Bartender')
  ],
  [CULINAIRE]: [
    candidate(38, 'Le Jacquier', CULINAIRE, 'Création culinaire guinéenne')
  ],
  [CHAINE]: [
    candidate(39, 'Big FATAYA', CHAINE, 'Chaîne de restauration'),
    candidate(40, 'Heroes Coffee', CHAINE, 'Chaîne de restauration'),
    candidate(41, 'RFC', CHAINE, 'Chaîne de restauration'),
    candidate(42, 'SLM', CHAINE, 'Chaîne de restauration')
  ],
  [RESTAURANT]: [
    candidate(43, 'G. BARISTA', RESTAURANT, 'Restaurant'),
    candidate(44, 'Avenue', RESTAURANT, 'Restaurant'),
    candidate(45, 'Aquarium', RESTAURANT, 'Restaurant'),
    candidate(46, 'Istanbul', RESTAURANT, 'Restaurant')
  ],
  [DIVERTISSEMENT]: [
    candidate(47, 'Plage Camayenne', DIVERTISSEMENT, 'Expérience de divertissement'),
    candidate(48, 'Iles de Los', DIVERTISSEMENT, 'Expérience de divertissement'),
    candidate(49, 'Plage de Tayaki', DIVERTISSEMENT, 'Expérience de divertissement'),
    candidate(50, 'Jardin du 2 Octobre', DIVERTISSEMENT, 'Expérience de divertissement')
  ],
  [LOISIRS]: [
    candidate(51, 'Le Baron', LOISIRS, 'Expérience de loisirs'),
    candidate(52, 'Boulevard Select', LOISIRS, 'Expérience de loisirs')
  ],
  [COUP_DE_COEUR]: [
    candidate(53, 'Noom Hôtel', COUP_DE_COEUR, 'Hôtel – coup de cœur du public'),
    candidate(54, 'PalmCamayenne Hôtel', COUP_DE_COEUR, 'Hôtel – coup de cœur du public'),
    candidate(55, 'Hôtel Kaloum', COUP_DE_COEUR, 'Hôtel – coup de cœur du public'),
    candidate(56, 'Riviera Royal Hôtel', COUP_DE_COEUR, 'Hôtel – coup de cœur du public'),
    candidate(57, 'Radisson Blu Hôtel Conakry', COUP_DE_COEUR, 'Hôtel – coup de cœur du public')
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
