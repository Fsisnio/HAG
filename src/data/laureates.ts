export interface Laureate {
  name: string;
  organization?: string;
  category: string;
  photo?: string;
  justification?: string;
}

export interface LaureateEdition {
  year: number;
  title: string;
  status: 'published' | 'upcoming' | 'future';
  summary: string;
  laureates: Laureate[];
}

export const laureateEditions: LaureateEdition[] = [
  {
    year: 2025,
    title: 'Première édition',
    status: 'published',
    summary:
      'Archive officielle de la première édition. Les Étoiles d’Honneur ont été remises lors de la soirée de distinction organisée par Le Groupe LM. L’archive complète des prix sera enrichie au fur et à mesure des documents officiels.',
    laureates: [
      {
        name: 'Docteur Fatoumata Bah',
        category: 'Étoile d’Honneur',
        photo: '/premiere-edition/etoile-honneur-fatoumata-bah.png',
        justification: 'Distinction d’honneur de la première édition des Hospitality Awards Guinée.'
      },
      {
        name: 'M. Firas Mohamed Challoub',
        category: 'Étoile d’Honneur',
        photo: '/premiere-edition/etoile-honneur-firas-challoub.png',
        justification: 'Distinction d’honneur de la première édition des Hospitality Awards Guinée.'
      }
    ]
  },
  {
    year: 2026,
    title: 'Deuxième édition',
    status: 'upcoming',
    summary:
      'Les lauréats HAG 2026 seront annoncés lors de la cérémonie officielle du 11 décembre 2026 à l’Hôtel Kaloum. Chaque fiche comprendra la photo, l’établissement ou l’organisation, la catégorie remportée et la justification du jury.',
    laureates: []
  },
  {
    year: 2027,
    title: 'Troisième édition',
    status: 'future',
    summary:
      'Cette rubrique conservera, édition après édition, la mémoire officielle de l’excellence de l’hospitalité guinéenne.',
    laureates: []
  }
];
