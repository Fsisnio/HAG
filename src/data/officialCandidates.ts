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

export const officialCandidatesByCategory: { [key: string]: OfficialCandidate[] } = {
  "Meilleur Guide Touristique de l'année": [
    {
      id: 1,
      name: "Fouta Tourisme",
      category: "Meilleur Guide Touristique de l'année",
      description: "Guide touristique spécialisé dans la découverte du Fouta Djallon",
      votes: 0,
      rating: 4.2,
      totalRatings: 15,
      isVoted: false,
      criteria: [
        "Maîtrise du patrimoine culturel, historique et naturel",
        "Capacité pédagogique et art du récit captivant",
        "Adaptabilité aux différents profils touristiques",
        "Gestion sécurisée des visites et excursions",
        "Retours positifs des visiteurs",
        "Bilinguisme",
        "Vidéo de présentation de 3 min (+ liens des réseaux sociaux)"
      ],
      presentationVideo: "https://example.com/fouta-tourisme-video",
      socialMediaLinks: ["@foutatourisme", "facebook.com/foutatourisme"]
    },
    {
      id: 2,
      name: "Tibou Bah",
      category: "Meilleur Guide Touristique de l'année",
      description: "Guide expérimenté avec une connaissance approfondie de la Guinée",
      votes: 0,
      rating: 4.5,
      totalRatings: 23,
      isVoted: false,
      criteria: [
        "Maîtrise du patrimoine culturel, historique et naturel",
        "Capacité pédagogique et art du récit captivant",
        "Adaptabilité aux différents profils touristiques",
        "Gestion sécurisée des visites et excursions",
        "Retours positifs des visiteurs",
        "Bilinguisme",
        "Vidéo de présentation de 3 min (+ liens des réseaux sociaux)"
      ],
      presentationVideo: "https://example.com/tibou-bah-video",
      socialMediaLinks: ["@tiboubah", "facebook.com/tiboubah"]
    },
    {
      id: 3,
      name: "Hassan Bah",
      category: "Meilleur Guide Touristique de l'année",
      description: "Guide passionné par l'histoire et la culture guinéenne",
      votes: 0,
      rating: 4.0,
      totalRatings: 18,
      isVoted: false,
      criteria: [
        "Maîtrise du patrimoine culturel, historique et naturel",
        "Capacité pédagogique et art du récit captivant",
        "Adaptabilité aux différents profils touristiques",
        "Gestion sécurisée des visites et excursions",
        "Retours positifs des visiteurs",
        "Bilinguisme",
        "Vidéo de présentation de 3 min (+ liens des réseaux sociaux)"
      ],
      presentationVideo: "https://example.com/hassan-bah-video",
      socialMediaLinks: ["@hassanbah", "facebook.com/hassanbah"]
    }
  ],

  "Meilleure Équipe en Housekeeping de l'année": [
    {
      id: 4,
      name: "Hôtel Onomo",
      category: "Meilleure Équipe en Housekeeping de l'année",
      description: "Équipe dédiée à l'excellence du service de ménage",
      votes: 0,
      rating: 4.3,
      totalRatings: 20,
      isVoted: false,
      criteria: [
        "Qualité et régularité du service (respect des normes de propreté, d'hygiène et de présentation dans tous les espaces assignés)",
        "Esprit d'équipe",
        "Professionnalisme et discrétion",
        "Organisation et efficacité",
        "Attention aux détails",
        "Formation continue et innovation",
        "Vidéo de présentation de 3 min (+ liens des réseaux sociaux)"
      ],
      presentationVideo: "https://example.com/hotel-onomo-video",
      socialMediaLinks: ["@hotelonomo", "facebook.com/hotelonomo"]
    },
    {
      id: 5,
      name: "Atlantic View Hôtel",
      category: "Meilleure Équipe en Housekeeping de l'année",
      description: "Service de housekeeping de qualité supérieure",
      votes: 0,
      rating: 4.1,
      totalRatings: 16,
      isVoted: false,
      criteria: [
        "Qualité et régularité du service (respect des normes de propreté, d'hygiène et de présentation dans tous les espaces assignés)",
        "Esprit d'équipe",
        "Professionnalisme et discrétion",
        "Organisation et efficacité",
        "Attention aux détails",
        "Formation continue et innovation",
        "Vidéo de présentation de 3 min (+ liens des réseaux sociaux)"
      ],
      presentationVideo: "https://example.com/atlantic-view-video",
      socialMediaLinks: ["@atlanticview", "facebook.com/atlanticview"]
    },
    {
      id: 6,
      name: "Souaré Premium Hôtel",
      category: "Meilleure Équipe en Housekeeping de l'année",
      description: "Équipe professionnelle et attentionnée",
      votes: 0,
      rating: 4.4,
      totalRatings: 22,
      isVoted: false,
      criteria: [
        "Qualité et régularité du service (respect des normes de propreté, d'hygiène et de présentation dans tous les espaces assignés)",
        "Esprit d'équipe",
        "Professionnalisme et discrétion",
        "Organisation et efficacité",
        "Attention aux détails",
        "Formation continue et innovation",
        "Vidéo de présentation de 3 min (+ liens des réseaux sociaux)"
      ],
      presentationVideo: "https://example.com/souare-premium-video",
      socialMediaLinks: ["@souarepremium", "facebook.com/souarepremium"]
    },
    {
      id: 7,
      name: "Hôtel Mirador Park",
      category: "Meilleure Équipe en Housekeeping de l'année",
      description: "Excellence dans l'entretien et la propreté",
      votes: 0,
      rating: 4.2,
      totalRatings: 19,
      isVoted: false,
      criteria: [
        "Qualité et régularité du service (respect des normes de propreté, d'hygiène et de présentation dans tous les espaces assignés)",
        "Esprit d'équipe",
        "Professionnalisme et discrétion",
        "Organisation et efficacité",
        "Attention aux détails",
        "Formation continue et innovation",
        "Vidéo de présentation de 3 min (+ liens des réseaux sociaux)"
      ],
      presentationVideo: "https://example.com/mirador-park-video",
      socialMediaLinks: ["@miradorpark", "facebook.com/miradorpark"]
    }
  ],

  "Meilleure Brigade de Cuisine de l'année": [
    {
      id: 8,
      name: "Noom Hôtel",
      category: "Meilleure Brigade de Cuisine de l'année",
      description: "Cuisine créative et raffinée",
      votes: 0,
      rating: 4.6,
      totalRatings: 28,
      isVoted: false,
      criteria: [
        "Qualité gustative et visuelle des plats",
        "Coordination, discipline et esprit d'équipe",
        "Respect des normes HACCP",
        "Capacité d'innovation et créativité culinaire",
        "Gestion efficace en période d'affluence",
        "Vidéo de présentation de 3 min (+ liens des réseaux sociaux)"
      ],
      presentationVideo: "https://example.com/noom-hotel-video",
      socialMediaLinks: ["@noomhotel", "facebook.com/noomhotel"]
    },
    {
      id: 9,
      name: "Riviera Royal",
      category: "Meilleure Brigade de Cuisine de l'année",
      description: "Excellence culinaire et innovation",
      votes: 0,
      rating: 4.4,
      totalRatings: 25,
      isVoted: false,
      criteria: [
        "Qualité gustative et visuelle des plats",
        "Coordination, discipline et esprit d'équipe",
        "Respect des normes HACCP",
        "Capacité d'innovation et créativité culinaire",
        "Gestion efficace en période d'affluence",
        "Vidéo de présentation de 3 min (+ liens des réseaux sociaux)"
      ],
      presentationVideo: "https://example.com/riviera-royal-video",
      socialMediaLinks: ["@rivieraroyal", "facebook.com/rivieraroyal"]
    },
    {
      id: 10,
      name: "Hôtel PalmCamayenne",
      category: "Meilleure Brigade de Cuisine de l'année",
      description: "Tradition et modernité en cuisine",
      votes: 0,
      rating: 4.3,
      totalRatings: 21,
      isVoted: false,
      criteria: [
        "Qualité gustative et visuelle des plats",
        "Coordination, discipline et esprit d'équipe",
        "Respect des normes HACCP",
        "Capacité d'innovation et créativité culinaire",
        "Gestion efficace en période d'affluence",
        "Vidéo de présentation de 3 min (+ liens des réseaux sociaux)"
      ],
      presentationVideo: "https://example.com/palmcamayenne-video",
      socialMediaLinks: ["@palmcamayenne", "facebook.com/palmcamayenne"]
    }
  ],

  "Meilleure Équipe de Service en Salle de l'année": [
    {
      id: 11,
      name: "Noom Hôtel - Service Salle",
      category: "Meilleure Équipe de Service en Salle de l'année",
      description: "Service en salle exemplaire et professionnel",
      votes: 0,
      rating: 4.5,
      totalRatings: 26,
      isVoted: false
    },
    {
      id: 12,
      name: "Hôtel Kaloum",
      category: "Meilleure Équipe de Service en Salle de l'année",
      description: "Équipe dévouée au service client",
      votes: 0,
      rating: 4.2,
      totalRatings: 18,
      isVoted: false
    },
    {
      id: 13,
      name: "Riviera Royal - Service Salle",
      category: "Meilleure Équipe de Service en Salle de l'année",
      description: "Excellence dans le service en salle",
      votes: 0,
      rating: 4.4,
      totalRatings: 24,
      isVoted: false
    }
  ],

  "Meilleure Equipe d'accueil et Service Client de l'année": [
    {
      id: 14,
      name: "Radisson Blu Hôtel",
      category: "Meilleure Equipe d'accueil et Service Client de l'année",
      description: "Accueil chaleureux et service client exceptionnel",
      votes: 0,
      rating: 4.7,
      totalRatings: 32,
      isVoted: false
    },
    {
      id: 15,
      name: "Hôtel Kaloum - Service Client",
      category: "Meilleure Equipe d'accueil et Service Client de l'année",
      description: "Équipe d'accueil professionnelle et souriante",
      votes: 0,
      rating: 4.3,
      totalRatings: 20,
      isVoted: false
    }
  ],

  "Meilleur Etablissement de Formation de l'année": [
    {
      id: 16,
      name: "ESTH",
      category: "Meilleur Etablissement de Formation de l'année",
      description: "École Supérieure de Tourisme et d'Hôtellerie",
      votes: 0,
      rating: 4.4,
      totalRatings: 22,
      isVoted: false
    },
    {
      id: 17,
      name: "ISTHOG",
      category: "Meilleur Etablissement de Formation de l'année",
      description: "Institut Supérieur de Tourisme et d'Hôtellerie de Guinée",
      votes: 0,
      rating: 4.2,
      totalRatings: 19,
      isVoted: false
    },
    {
      id: 18,
      name: "IFPAD",
      category: "Meilleur Etablissement de Formation de l'année",
      description: "Institut de Formation Professionnelle en Arts et Design",
      votes: 0,
      rating: 4.1,
      totalRatings: 17,
      isVoted: false
    }
  ],

  "Meilleur Club de Plage de l'année": [
    {
      id: 19,
      name: "Club Iya Traoré",
      category: "Meilleur Club de Plage de l'année",
      description: "Club de plage avec ambiance festive et détente",
      votes: 0,
      rating: 4.3,
      totalRatings: 21,
      isVoted: false
    },
    {
      id: 20,
      name: "Club Camayenne",
      category: "Meilleur Club de Plage de l'année",
      description: "Club de plage premium avec services haut de gamme",
      votes: 0,
      rating: 4.5,
      totalRatings: 27,
      isVoted: false
    }
  ],

  "Meilleure Initiative RSE de l'année": [
    {
      id: 21,
      name: "Noom Hôtel - RSE",
      category: "Meilleure Initiative RSE de l'année",
      description: "Engagement social et environnemental exemplaire",
      votes: 0,
      rating: 4.6,
      totalRatings: 29,
      isVoted: false
    },
    {
      id: 22,
      name: "Hôtel Onomo - RSE",
      category: "Meilleure Initiative RSE de l'année",
      description: "Initiatives durables et responsabilité sociale",
      votes: 0,
      rating: 4.4,
      totalRatings: 23,
      isVoted: false
    },
    {
      id: 23,
      name: "Riviera Royal - RSE",
      category: "Meilleure Initiative RSE de l'année",
      description: "Programmes RSE innovants et impactants",
      votes: 0,
      rating: 4.3,
      totalRatings: 20,
      isVoted: false
    }
  ],

  "Meilleur projet Tourisme Culturel de l'année": [
    {
      id: 24,
      name: "Festival international du Djémbé de Conakry",
      category: "Meilleur projet Tourisme Culturel de l'année",
      description: "Festival célébrant la culture musicale guinéenne",
      votes: 0,
      rating: 4.7,
      totalRatings: 35,
      isVoted: false
    },
    {
      id: 25,
      name: "Danse Traditionnelle Mamaya",
      category: "Meilleur projet Tourisme Culturel de l'année",
      description: "Préservation et promotion de la danse traditionnelle",
      votes: 0,
      rating: 4.5,
      totalRatings: 28,
      isVoted: false
    }
  ],

  "Meilleure Agence de Voyage de l'année": [
    {
      id: 26,
      name: "Mondial Express",
      category: "Meilleure Agence de Voyage de l'année",
      description: "Agence de voyage avec services complets",
      votes: 0,
      rating: 4.2,
      totalRatings: 18,
      isVoted: false
    },
    {
      id: 27,
      name: "Dunia Voyages",
      category: "Meilleure Agence de Voyage de l'année",
      description: "Spécialiste des voyages sur mesure",
      votes: 0,
      rating: 4.4,
      totalRatings: 24,
      isVoted: false
    },
    {
      id: 28,
      name: "IPC Voyages",
      category: "Meilleure Agence de Voyage de l'année",
      description: "Agence de voyage professionnelle et fiable",
      votes: 0,
      rating: 4.1,
      totalRatings: 16,
      isVoted: false
    },
    {
      id: 29,
      name: "Guinée Voyages",
      category: "Meilleure Agence de Voyage de l'année",
      description: "Découverte de la Guinée authentique",
      votes: 0,
      rating: 4.3,
      totalRatings: 22,
      isVoted: false
    },
    {
      id: 30,
      name: "Satguru Travel Guinée",
      category: "Meilleure Agence de Voyage de l'année",
      description: "Voyages spirituels et culturels",
      votes: 0,
      rating: 4.0,
      totalRatings: 15,
      isVoted: false
    }
  ],

  "Meilleur Écolodge ou écoresponsable de l'année": [
    {
      id: 31,
      name: "Maf Village",
      category: "Meilleur Écolodge ou écoresponsable de l'année",
      description: "Village écotouristique respectueux de l'environnement",
      votes: 0,
      rating: 4.6,
      totalRatings: 30,
      isVoted: false
    },
    {
      id: 32,
      name: "Jardin D'éden",
      category: "Meilleur Écolodge ou écoresponsable de l'année",
      description: "Hébergement écologique au cœur de la nature",
      votes: 0,
      rating: 4.4,
      totalRatings: 25,
      isVoted: false
    },
    {
      id: 33,
      name: "Hôtel yarayah",
      category: "Meilleur Écolodge ou écoresponsable de l'année",
      description: "Établissement écoresponsable et durable",
      votes: 0,
      rating: 4.2,
      totalRatings: 19,
      isVoted: false
    }
  ],

  "Meilleur Hôtel Milieu de Gamme de l'année": [
    {
      id: 34,
      name: "Riviera Taouyah",
      category: "Meilleur Hôtel Milieu de Gamme de l'année",
      description: "Confort et qualité à prix accessible",
      votes: 0,
      rating: 4.3,
      totalRatings: 21,
      isVoted: false
    },
    {
      id: 35,
      name: "Hôtel M Lys",
      category: "Meilleur Hôtel Milieu de Gamme de l'année",
      description: "Hôtel moderne avec services de qualité",
      votes: 0,
      rating: 4.1,
      totalRatings: 17,
      isVoted: false
    },
    {
      id: 36,
      name: "Hôtel Mirador Park - Milieu de Gamme",
      category: "Meilleur Hôtel Milieu de Gamme de l'année",
      description: "Excellence en milieu de gamme",
      votes: 0,
      rating: 4.4,
      totalRatings: 26,
      isVoted: false
    },
    {
      id: 37,
      name: "Hôtel 2Flo",
      category: "Meilleur Hôtel Milieu de Gamme de l'année",
      description: "Hôtel contemporain et accueillant",
      votes: 0,
      rating: 4.0,
      totalRatings: 14,
      isVoted: false
    },
    {
      id: 38,
      name: "Hôtel Maison Blanche",
      category: "Meilleur Hôtel Milieu de Gamme de l'année",
      description: "Charme et confort dans un cadre élégant",
      votes: 0,
      rating: 4.2,
      totalRatings: 20,
      isVoted: false
    }
  ],

  "Meilleur Groupe Hôtelier de l'année": [
    {
      id: 39,
      name: "Riviera Hôtels",
      category: "Meilleur Groupe Hôtelier de l'année",
      description: "Groupe hôtelier leader en Guinée",
      votes: 0,
      rating: 4.5,
      totalRatings: 28,
      isVoted: false
    },
    {
      id: 40,
      name: "Souaré Hôtels",
      category: "Meilleur Groupe Hôtelier de l'année",
      description: "Excellence et innovation hôtelière",
      votes: 0,
      rating: 4.3,
      totalRatings: 24,
      isVoted: false
    },
    {
      id: 41,
      name: "Hôtels Mirador",
      category: "Meilleur Groupe Hôtelier de l'année",
      description: "Groupe hôtelier de référence",
      votes: 0,
      rating: 4.4,
      totalRatings: 26,
      isVoted: false
    }
  ]
};

// Fonction pour obtenir tous les candidats
export const getAllOfficialCandidates = (): OfficialCandidate[] => {
  return Object.values(officialCandidatesByCategory).flat();
};

// Fonction pour obtenir les candidats d'une catégorie spécifique
export const getCandidatesByCategory = (category: string): OfficialCandidate[] => {
  return officialCandidatesByCategory[category] || [];
};

// Fonction pour obtenir toutes les catégories avec candidats
export const getCategoriesWithCandidates = (): string[] => {
  return Object.keys(officialCandidatesByCategory);
};
