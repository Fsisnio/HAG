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
  wide?: boolean;
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
    partners: [
      {
        name: 'Ministère de la Culture, du Tourisme et de l’Artisanat',
        description:
          'Institution de tutelle du secteur culturel, touristique et artisanal de la République de Guinée (MCTA).',
        logo: '/partenaires/logo-mcta.png'
      },
      {
        name: 'Guinea Development Board',
        description:
          'Agence Guinéenne de Développement (GDB), partenaire du développement économique et de la promotion de la destination Guinée.',
        logo: '/partenaires/logo-gdb.png'
      },
      {
        name: 'Marque Guinée',
        description:
          'Marque nationale de la République de Guinée, symbole de l’identité, de la culture et de l’attractivité du pays.',
        logo: '/partenaires/logo-guinee.png'
      },
      {
        name: 'Programme Simandou 2040',
        description:
          'Initiative nationale « Un pont vers la prospérité », autour de l’agriculture, l’éducation, les infrastructures, l’économie et la santé. Avec Simandou Academy.',
        logo: '/partenaires/logo-simandou-2040.png',
        wide: true
      }
    ]
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

export const partnersWithLogos: Array<Partner & { logo: string }> = partnerGroups.flatMap((group) =>
  group.partners.filter((partner): partner is Partner & { logo: string } => Boolean(partner.logo))
);
