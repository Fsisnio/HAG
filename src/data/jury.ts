export interface JuryMember {
  id: string;
  photo: string;
  firstName: string;
  lastName: string;
  role: string;
  organization: string;
  expertise: string;
  bio: string;
}

export const juryMembers: JuryMember[] = [];

export const JURY_STATUS =
  'La composition officielle du jury HAG 2026 sera publiée ici : photo, nom, fonction, organisation, domaine d’expertise et biographie professionnelle.';
