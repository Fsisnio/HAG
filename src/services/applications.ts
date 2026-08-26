import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { EVENT_YEAR } from '../data/event';

export interface ApplicationPayload {
  organizationName: string;
  commercialName: string;
  category: string;
  prize: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  contactPerson: string;
  contactFunction: string;
  contactPhone: string;
  contactEmail: string;
  description: string;
  creationDate: string;
  activities: string;
  motivation: string;
  strengths: string;
  innovation: string;
  qualityActions: string;
  satisfaction: string;
  socialMedia: string;
  documents: File[];
  authorization: boolean;
  declarationName: string;
  declarationFunction: string;
  declarationPlace: string;
}

export const submitApplication = async (form: ApplicationPayload): Promise<{ id?: string }> => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase n’est pas configuré. Vérifiez SUPABASE_URL et SUPABASE_ANON_KEY.');
  }

  const { error } = await supabase.from('hag_applications').insert({
    edition: EVENT_YEAR,
    status: 'pending',
    organization_name: form.organizationName.trim(),
    commercial_name: form.commercialName.trim() || null,
    category_group: form.category,
    prize: form.prize,
    address: form.address.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    website: form.website.trim() || null,
    contact_person: form.contactPerson.trim(),
    contact_function: form.contactFunction.trim() || null,
    contact_phone: form.contactPhone.trim() || null,
    contact_email: form.contactEmail.trim() || null,
    description: form.description.trim(),
    creation_date: form.creationDate || null,
    activities: form.activities.trim() || null,
    motivation: form.motivation.trim(),
    strengths: form.strengths.trim(),
    innovation: form.innovation.trim() || null,
    quality_actions: form.qualityActions.trim() || null,
    satisfaction: form.satisfaction.trim() || null,
    social_media: form.socialMedia.trim() || null,
    document_names: form.documents.map((file) => file.name),
    has_authorization: form.authorization,
    declaration_name: form.declarationName.trim(),
    declaration_function: form.declarationFunction.trim() || null,
    declaration_place: form.declarationPlace.trim() || null
  });

  if (error) {
    throw new Error(error.message);
  }

  return {};
};
