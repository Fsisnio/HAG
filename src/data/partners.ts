export type PartnerKind =
  | 'institutionnels'
  | 'sponsors'
  | 'medias'
  | 'professionnels'
  | 'formation'
  | 'entreprises';

export interface Partner {
  name: string;
  description: string;
  logo?: string;
  website?: string;
}

export interface PartnerGroup {
  id: PartnerKind;
  title: string;
  intro: string;
  partners: Partner[];
}

export const partnerGroups: PartnerGroup[] = [
  {
    id: 'institutionnels',
    title: 'Partenaires institutionnels',
    intro: 'Institutions publiques et organismes qui accompagnent la reconnaissance de l’hospitalité guinéenne.',
    partners: []
  },
  {
    id: 'sponsors',
    title: 'Sponsors',
    intro: 'Entreprises qui soutiennent financièrement l’édition, la cérémonie et la visibilité des HAG.',
    partners: []
  },
  {
    id: 'medias',
    title: 'Partenaires médias',
    intro: 'Presse, télévision, radio et plateformes digitales qui relaient l’événement et ses lauréats.',
    partners: []
  },
  {
    id: 'professionnels',
    title: 'Organisations professionnelles',
    intro: 'Fédérations, associations et réseaux du tourisme, de l’hôtellerie et de la restauration.',
    partners: []
  },
  {
    id: 'formation',
    title: 'Écoles et organismes de formation',
    intro: 'Établissements qui forment les talents de l’hospitalité et du tourisme en Guinée.',
    partners: []
  },
  {
    id: 'entreprises',
    title: 'Entreprises partenaires',
    intro: 'Sociétés techniques, logistiques et de services associées à l’organisation des HAG.',
    partners: []
  }
];
