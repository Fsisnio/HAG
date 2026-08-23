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

export const officialCandidatesByCategory: { [key: string]: OfficialCandidate[] } = {
  'Prix du Meilleur Etablissement de Formation professionnelle et Technique': [
    candidate(1, 'Institut Gastronomique le Chef', 'Prix du Meilleur Etablissement de Formation professionnelle et Technique', 'Établissement de formation gastronomique'),
    candidate(2, 'Institut de Formation Professionnelle Amadou Dieng (IFPAD)', 'Prix du Meilleur Etablissement de Formation professionnelle et Technique', 'Institut de formation professionnelle'),
    candidate(3, 'ISTHOG', 'Prix du Meilleur Etablissement de Formation professionnelle et Technique', 'Institut supérieur de tourisme et d’hôtellerie'),
    candidate(4, 'Nako Diabaté', 'Prix du Meilleur Etablissement de Formation professionnelle et Technique', 'Établissement de formation professionnelle'),
    candidate(5, 'Billy Ecole', 'Prix du Meilleur Etablissement de Formation professionnelle et Technique', 'École de formation professionnelle'),
    candidate(6, 'CENFORTH', 'Prix du Meilleur Etablissement de Formation professionnelle et Technique', 'Centre de formation en tourisme et hôtellerie')
  ],
  'Prix du Meilleur Etablissement d’Enseignement Supérieur': [
    candidate(7, 'École Supérieure de Tourisme et de l’Hotellerie (ESTH)', 'Prix du Meilleur Etablissement d’Enseignement Supérieur', 'École supérieure spécialisée tourisme et hôtellerie'),
    candidate(8, 'Université Koffi', 'Prix du Meilleur Etablissement d’Enseignement Supérieur', 'Établissement d’enseignement supérieur')
  ],
  'Prix du Meilleur Guide Touristique': [
    candidate(9, 'M. Hassan Bah', 'Prix du Meilleur Guide Touristique', 'Guide touristique'),
    candidate(10, 'M. Taibou', 'Prix du Meilleur Guide Touristique', 'Guide touristique'),
    candidate(11, 'M. Oumar', 'Prix du Meilleur Guide Touristique', 'Guide touristique'),
    candidate(12, 'M. Kolié', 'Prix du Meilleur Guide Touristique', 'Guide touristique'),
    candidate(13, 'M. Fernand Léno', 'Prix du Meilleur Guide Touristique', 'Guide touristique')
  ],
  'Prix de la Meilleure Agence de Voyage': [
    candidate(14, 'Mondial Express', 'Prix de la Meilleure Agence de Voyage', 'Agence de voyage'),
    candidate(15, 'Dounia Voyage', 'Prix de la Meilleure Agence de Voyage', 'Agence de voyage'),
    candidate(16, 'Mondial Tour', 'Prix de la Meilleure Agence de Voyage', 'Agence de voyage')
  ],
  'Meilleur Ambassadeur (rice) de la Destination Guinée': [
    candidate(17, 'Abdoulaye M’baye', 'Meilleur Ambassadeur (rice) de la Destination Guinée', 'Ambassadeur de la destination Guinée'),
    candidate(18, 'Takana Zion', 'Meilleur Ambassadeur (rice) de la Destination Guinée', 'Ambassadeur de la destination Guinée'),
    candidate(19, 'Serhou Guirassy', 'Meilleur Ambassadeur (rice) de la Destination Guinée', 'Ambassadeur de la destination Guinée'),
    candidate(20, 'Jupiter Devibe', 'Meilleur Ambassadeur (rice) de la Destination Guinée', 'Ambassadeur de la destination Guinée'),
    candidate(21, 'Naby Keita', 'Meilleur Ambassadeur (rice) de la Destination Guinée', 'Ambassadeur de la destination Guinée'),
    candidate(22, 'Djelikaba Bintou', 'Meilleur Ambassadeur (rice) de la Destination Guinée', 'Ambassadrice de la destination Guinée'),
    candidate(23, 'Iya Traoré', 'Meilleur Ambassadeur (rice) de la Destination Guinée', 'Ambassadeur de la destination Guinée'),
    candidate(24, 'Saïfon Baldé', 'Meilleur Ambassadeur (rice) de la Destination Guinée', 'Ambassadeur de la destination Guinée')
  ],
  'Prix de la Meilleure Destination Touristique': [
    candidate(25, 'La voile de la Marié', 'Prix de la Meilleure Destination Touristique', 'Destination touristique'),
    candidate(26, 'Les Eaux de Kilissi', 'Prix de la Meilleure Destination Touristique', 'Destination touristique'),
    candidate(27, 'Le Pont de Liane', 'Prix de la Meilleure Destination Touristique', 'Destination touristique')
  ],
  'Prix Meilleur Événement Touristique': [
    candidate(28, 'La Saison Touristique', 'Prix Meilleur Événement Touristique', 'Événement touristique'),
    candidate(29, 'Festival des Arts et de la Culture', 'Prix Meilleur Événement Touristique', 'Événement touristique et culturel')
  ],
  'Prix de la Meilleure Initiative Eco-Responsable': [
    candidate(30, 'Palmeraie Lodge', 'Prix de la Meilleure Initiative Eco-Responsable', 'Initiative éco-responsable'),
    candidate(31, 'Maf Village', 'Prix de la Meilleure Initiative Eco-Responsable', 'Initiative éco-responsable'),
    candidate(32, 'Jardin D’Eden', 'Prix de la Meilleure Initiative Eco-Responsable', 'Initiative éco-responsable'),
    candidate(33, 'Beau Village de YARAYA', 'Prix de la Meilleure Initiative Eco-Responsable', 'Initiative éco-responsable')
  ],
  'Prix de l’Innovation Digital dans l’Hospitalité': [
    candidate(34, 'AphoGest-Visit Guinea', 'Prix de l’Innovation Digital dans l’Hospitalité', 'Solution digitale pour l’hospitalité'),
    candidate(35, 'OBS Technologie', 'Prix de l’Innovation Digital dans l’Hospitalité', 'Innovation digitale'),
    candidate(36, 'Zaly Meirveille', 'Prix de l’Innovation Digital dans l’Hospitalité', 'Innovation digitale')
  ],
  'Prix de l’Excellence en Accueil et Service Client': [
    candidate(37, 'Souaré Premium Hôtel', 'Prix de l’Excellence en Accueil et Service Client', 'Hôtel – accueil et service client'),
    candidate(38, 'Hôtel ONOMO', 'Prix de l’Excellence en Accueil et Service Client', 'Hôtel – accueil et service client'),
    candidate(39, 'Atlantic View Hôtel', 'Prix de l’Excellence en Accueil et Service Client', 'Hôtel – accueil et service client'),
    candidate(40, 'Riviera Taouyah', 'Prix de l’Excellence en Accueil et Service Client', 'Hôtel – accueil et service client')
  ],
  'Prix du Bartender de l’Année': [
    candidate(41, 'Jean Sivily Koivogui', 'Prix du Bartender de l’Année', 'Bartender'),
    candidate(42, 'Emmanuel Koivogui', 'Prix du Bartender de l’Année', 'Bartender')
  ],
  'Prix de l’Excellence Food & Beverage': [
    candidate(43, 'M. Mohamed Firas Challoub', 'Prix de l’Excellence Food & Beverage', 'Professionnel Food & Beverage')
  ],
  'Prix de la Création Culinaire Guinéenne': [
    candidate(44, 'Le Jacquier', 'Prix de la Création Culinaire Guinéenne', 'Création culinaire guinéenne')
  ],
  'Prix de la Meilleure Chaîne de Restauration': [
    candidate(45, 'Big FATAYA', 'Prix de la Meilleure Chaîne de Restauration', 'Chaîne de restauration'),
    candidate(46, 'Heroes Coffee', 'Prix de la Meilleure Chaîne de Restauration', 'Chaîne de restauration'),
    candidate(47, 'RFC', 'Prix de la Meilleure Chaîne de Restauration', 'Chaîne de restauration'),
    candidate(48, 'SLM', 'Prix de la Meilleure Chaîne de Restauration', 'Chaîne de restauration')
  ],
  'Prix du Meilleur Restaurant': [
    candidate(49, 'G. BARISTA', 'Prix du Meilleur Restaurant', 'Restaurant'),
    candidate(50, 'Avenue', 'Prix du Meilleur Restaurant', 'Restaurant'),
    candidate(51, 'Aquarium', 'Prix du Meilleur Restaurant', 'Restaurant'),
    candidate(52, 'Istanbul', 'Prix du Meilleur Restaurant', 'Restaurant')
  ],
  'Prix de la Meilleure Experience de divertissement': [
    candidate(53, 'Plage Camayenne', 'Prix de la Meilleure Experience de divertissement', 'Expérience de divertissement'),
    candidate(54, 'Iles de Los', 'Prix de la Meilleure Experience de divertissement', 'Expérience de divertissement'),
    candidate(55, 'Plage de Tayaki', 'Prix de la Meilleure Experience de divertissement', 'Expérience de divertissement'),
    candidate(56, 'Jardin du 2 Octobre', 'Prix de la Meilleure Experience de divertissement', 'Expérience de divertissement')
  ],
  'Prix de la Meilleure Experience de Loisirs': [
    candidate(57, 'Le Baron', 'Prix de la Meilleure Experience de Loisirs', 'Expérience de loisirs'),
    candidate(58, 'Boulevard Select', 'Prix de la Meilleure Experience de Loisirs', 'Expérience de loisirs')
  ],
  'Prix Coup de Cœur du Public – Hôtels': [
    candidate(59, 'Noom Hôtel', 'Prix Coup de Cœur du Public – Hôtels', 'Hôtel – coup de cœur du public'),
    candidate(60, 'PalmCamayenne Hôtel', 'Prix Coup de Cœur du Public – Hôtels', 'Hôtel – coup de cœur du public'),
    candidate(61, 'Hôtel Kaloum', 'Prix Coup de Cœur du Public – Hôtels', 'Hôtel – coup de cœur du public'),
    candidate(62, 'Riviera Royal Hôtel', 'Prix Coup de Cœur du Public – Hôtels', 'Hôtel – coup de cœur du public'),
    candidate(63, 'Radisson Blu Hôtel Conakry', 'Prix Coup de Cœur du Public – Hôtels', 'Hôtel – coup de cœur du public')
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
