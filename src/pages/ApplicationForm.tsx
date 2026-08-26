import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle, AlertCircle, Upload, FileText, Calendar } from 'lucide-react';
import { officialCategories, categoryGroups } from '../data/categories';
import { EVENT_YEAR, EVENT_EDITION, SLOGAN, APPLICATION_START, APPLICATION_END, VOTES_START, VOTES_END, GALA_VENUE, CALENDAR, isApplicationOpen } from '../data/event';
import { submitApplication } from '../services/applications';

interface FormData {
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

type FormErrors = Partial<Record<keyof Omit<FormData, 'documents' | 'authorization'>, string>> & {
  authorization?: string;
};

const emptyForm: FormData = {
  organizationName: '',
  commercialName: '',
  category: '',
  prize: '',
  address: '',
  phone: '',
  email: '',
  website: '',
  contactPerson: '',
  contactFunction: '',
  contactPhone: '',
  contactEmail: '',
  description: '',
  creationDate: '',
  activities: '',
  motivation: '',
  strengths: '',
  innovation: '',
  qualityActions: '',
  satisfaction: '',
  socialMedia: '',
  documents: [],
  authorization: false,
  declarationName: '',
  declarationFunction: '',
  declarationPlace: ''
};

const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const applicationsOpen = isApplicationOpen();

  const prizesForCategory = useMemo(
    () => officialCategories.filter((cat) => !formData.category || cat.group === formData.category),
    [formData.category]
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const nextValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => {
      const updated = { ...prev, [name]: nextValue };
      if (name === 'category') {
        updated.prize = '';
      }
      return updated;
    });

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, documents: Array.from(e.target.files || []) }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.organizationName.trim()) newErrors.organizationName = 'Le nom du candidat est requis';
    if (!formData.category) newErrors.category = 'La catégorie est requise';
    if (!formData.prize) newErrors.prize = 'Le prix est requis';
    if (!formData.address.trim()) newErrors.address = 'L’adresse est requise';
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L’email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L’email n’est pas valide';
    }
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Le nom du responsable est requis';
    if (!formData.description.trim()) newErrors.description = 'La présentation est requise';
    if (!formData.motivation.trim()) newErrors.motivation = 'La motivation est requise';
    if (!formData.strengths.trim()) newErrors.strengths = 'Les atouts sont requis';
    if (!formData.authorization) {
      newErrors.authorization = 'Vous devez autoriser l’utilisation des éléments de communication';
    }
    if (!formData.declarationName.trim()) newErrors.declarationName = 'Le nom du déclarant est requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await submitApplication(formData);
      setIsSubmitted(true);
      setTimeout(() => navigate('/'), 5000);
    } catch (error) {
      console.error('Erreur lors de l’envoi:', error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Impossible d’enregistrer la candidature. Réessayez.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (hasError?: string) =>
    `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
      hasError ? 'border-red-500' : 'border-gray-300'
    }`;

  const ErrorText = ({ message }: { message?: string }) =>
    message ? (
      <p className="text-red-500 text-sm mt-1 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {message}
      </p>
    ) : null;

  if (isSubmitted) {
    return (
      <div className="ApplicationForm pt-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-12">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-green-800 mb-4">Candidature envoyée !</h1>
              <p className="text-lg text-green-700 mb-6">
                Votre dossier {EVENT_EDITION} a été reçu. Le comité d’organisation vous recontactera
                pour la suite du processus.
              </p>
              <p className="text-green-600">
                Conservez une copie de vos pièces. Vous allez être redirigé vers l’accueil.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ApplicationForm pt-20">
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <p className="text-gold font-semibold mb-3">Formulaire officiel de candidature</p>
          <h1 className="mb-6">
            Candidater aux <span className="text-gold">{EVENT_EDITION}</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed mb-4">{SLOGAN}</p>
          <p className="text-white/80">
            Période des candidatures : 25 août – 20 septembre {EVENT_YEAR}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gold/10 border border-gold/30 rounded-2xl p-6 mb-8">
              <div className="flex items-start space-x-3 mb-4">
                <Calendar className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-lg font-bold text-blue-dark">Calendrier officiel {EVENT_YEAR}</h2>
                  <p className="text-sm text-gray-600">
                    Inscriptions du 25 août au 20 septembre • Gala le 11 décembre à l’{GALA_VENUE}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-dark">
                {CALENDAR.map((item) => (
                  <div key={item.label} className="flex justify-between bg-white/70 rounded-lg px-3 py-2">
                    <span>{item.label}</span>
                    <strong>{item.date}</strong>
                  </div>
                ))}
              </div>
              {!applicationsOpen && (
                <p className="mt-4 text-sm text-blue-dark">
                  Les inscriptions officielles courent du {APPLICATION_START.split('-').reverse().join('/')} au{' '}
                  {APPLICATION_END.split('-').reverse().join('/')}. Vous pouvez déjà préparer votre dossier.
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-blue-dark mb-6">1. Identification du candidat</h2>
                <div className="grid grid-2 gap-6">
                  <div>
                    <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de l’établissement / entreprise / candidat *
                    </label>
                    <input
                      type="text"
                      id="organizationName"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      className={fieldClass(errors.organizationName)}
                    />
                    <ErrorText message={errors.organizationName} />
                  </div>
                  <div>
                    <label htmlFor="commercialName" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom commercial
                    </label>
                    <input
                      type="text"
                      id="commercialName"
                      name="commercialName"
                      value={formData.commercialName}
                      onChange={handleInputChange}
                      className={fieldClass()}
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie de candidature *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={fieldClass(errors.category)}
                    >
                      <option value="">Sélectionnez une catégorie</option>
                      {categoryGroups.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                    <ErrorText message={errors.category} />
                  </div>
                  <div>
                    <label htmlFor="prize" className="block text-sm font-medium text-gray-700 mb-2">
                      Le prix *
                    </label>
                    <select
                      id="prize"
                      name="prize"
                      value={formData.prize}
                      onChange={handleInputChange}
                      className={fieldClass(errors.prize)}
                    >
                      <option value="">Sélectionnez un prix</option>
                      {prizesForCategory.map((prize) => (
                        <option key={prize.id} value={prize.title}>
                          {prize.id}. {prize.title}
                        </option>
                      ))}
                    </select>
                    <ErrorText message={errors.prize} />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={fieldClass(errors.address)}
                    />
                    <ErrorText message={errors.address} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={fieldClass(errors.phone)}
                      placeholder="+224 XXX XX XX XX"
                    />
                    <ErrorText message={errors.phone} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={fieldClass(errors.email)}
                    />
                    <ErrorText message={errors.email} />
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                      Site Internet / réseaux sociaux
                    </label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className={fieldClass()}
                    />
                  </div>
                  <div>
                    <label htmlFor="socialMedia" className="block text-sm font-medium text-gray-700 mb-2">
                      Liens réseaux sociaux
                    </label>
                    <input
                      type="text"
                      id="socialMedia"
                      name="socialMedia"
                      value={formData.socialMedia}
                      onChange={handleInputChange}
                      className={fieldClass()}
                    />
                  </div>
                  <div>
                    <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du responsable *
                    </label>
                    <input
                      type="text"
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className={fieldClass(errors.contactPerson)}
                    />
                    <ErrorText message={errors.contactPerson} />
                  </div>
                  <div>
                    <label htmlFor="contactFunction" className="block text-sm font-medium text-gray-700 mb-2">
                      Fonction du responsable
                    </label>
                    <input
                      type="text"
                      id="contactFunction"
                      name="contactFunction"
                      value={formData.contactFunction}
                      onChange={handleInputChange}
                      className={fieldClass()}
                    />
                  </div>
                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone du responsable
                    </label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className={fieldClass()}
                    />
                  </div>
                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail du responsable
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className={fieldClass()}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-blue-dark mb-6">2. Présentation du candidat</h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Présentation générale *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className={fieldClass(errors.description)}
                      placeholder="Présentez brièvement votre établissement, entreprise, organisation ou parcours professionnel."
                    />
                    <ErrorText message={errors.description} />
                  </div>
                  <div>
                    <label htmlFor="creationDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Date de création / début d’activité
                    </label>
                    <input
                      type="text"
                      id="creationDate"
                      name="creationDate"
                      value={formData.creationDate}
                      onChange={handleInputChange}
                      className={fieldClass()}
                    />
                  </div>
                  <div>
                    <label htmlFor="activities" className="block text-sm font-medium text-gray-700 mb-2">
                      Principales activités
                    </label>
                    <textarea
                      id="activities"
                      name="activities"
                      value={formData.activities}
                      onChange={handleInputChange}
                      rows={3}
                      className={fieldClass()}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-blue-dark mb-6">3. Motivation de la candidature</h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                      Pourquoi estimez-vous mériter cette distinction ? *
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      rows={4}
                      className={fieldClass(errors.motivation)}
                    />
                    <ErrorText message={errors.motivation} />
                  </div>
                  <div>
                    <label htmlFor="strengths" className="block text-sm font-medium text-gray-700 mb-2">
                      Quels sont vos principaux atouts par rapport aux autres candidats ? *
                    </label>
                    <textarea
                      id="strengths"
                      name="strengths"
                      value={formData.strengths}
                      onChange={handleInputChange}
                      rows={4}
                      className={fieldClass(errors.strengths)}
                    />
                    <ErrorText message={errors.strengths} />
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-blue-dark mb-6">4. Innovation, qualité et excellence</h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="innovation" className="block text-sm font-medium text-gray-700 mb-2">
                      Quelles innovations avez-vous mises en place ?
                    </label>
                    <textarea
                      id="innovation"
                      name="innovation"
                      value={formData.innovation}
                      onChange={handleInputChange}
                      rows={3}
                      className={fieldClass()}
                    />
                  </div>
                  <div>
                    <label htmlFor="qualityActions" className="block text-sm font-medium text-gray-700 mb-2">
                      Quelles actions avez-vous entreprises pour améliorer la qualité de service ?
                    </label>
                    <textarea
                      id="qualityActions"
                      name="qualityActions"
                      value={formData.qualityActions}
                      onChange={handleInputChange}
                      rows={3}
                      className={fieldClass()}
                    />
                  </div>
                  <div>
                    <label htmlFor="satisfaction" className="block text-sm font-medium text-gray-700 mb-2">
                      Comment mesurez-vous la satisfaction de vos clients ?
                    </label>
                    <textarea
                      id="satisfaction"
                      name="satisfaction"
                      value={formData.satisfaction}
                      onChange={handleInputChange}
                      rows={3}
                      className={fieldClass()}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-blue-dark mb-6">5. Pièces à joindre au dossier</h2>
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  <li>• Formulaire de candidature dûment rempli</li>
                  <li>• Présentation de l’établissement / candidat</li>
                  <li>• Photos et vidéos récentes en haute résolution</li>
                  <li>• Logo en haute définition</li>
                  <li>• Certifications et distinctions éventuelles</li>
                  <li>• Liens vers les réseaux sociaux et/ou le site Internet</li>
                </ul>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Joignez vos documents (PDF, DOC, JPG, PNG)</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="documents"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4"
                  />
                  <label htmlFor="documents" className="btn btn-secondary cursor-pointer">
                    Sélectionner des fichiers
                  </label>
                </div>
                {formData.documents.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.documents.map((file, index) => (
                      <div key={`${file.name}-${index}`} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-5 h-5 text-gray-500" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-blue-dark mb-4">6. Autorisation de communication</h2>
                <p className="text-sm text-gray-600 mb-4">
                  En soumettant ce dossier, le candidat autorise le Comité d’organisation des Hospitality Awards
                  Guinée à utiliser les informations, photographies, vidéos, logos et éléments de présentation
                  fournis dans le cadre de la communication de l’événement. Les informations communiquées
                  doivent être exactes, sincères et vérifiables.
                </p>
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="authorization"
                    checked={formData.authorization}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    J’autorise l’utilisation de mes éléments de communication et certifie l’exactitude des informations. *
                  </span>
                </label>
                <ErrorText message={errors.authorization} />
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-blue-dark mb-6">7. Déclaration du candidat</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Je certifie l’exactitude des informations communiquées et j’accepte le règlement ainsi que
                  les conditions de participation aux Hospitality Awards Guinée {EVENT_YEAR}.
                </p>
                <div className="grid grid-2 gap-6">
                  <div>
                    <label htmlFor="declarationName" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="declarationName"
                      name="declarationName"
                      value={formData.declarationName}
                      onChange={handleInputChange}
                      className={fieldClass(errors.declarationName)}
                    />
                    <ErrorText message={errors.declarationName} />
                  </div>
                  <div>
                    <label htmlFor="declarationFunction" className="block text-sm font-medium text-gray-700 mb-2">
                      Fonction
                    </label>
                    <input
                      type="text"
                      id="declarationFunction"
                      name="declarationFunction"
                      value={formData.declarationFunction}
                      onChange={handleInputChange}
                      className={fieldClass()}
                    />
                  </div>
                  <div>
                    <label htmlFor="declarationPlace" className="block text-sm font-medium text-gray-700 mb-2">
                      Fait à
                    </label>
                    <input
                      type="text"
                      id="declarationPlace"
                      name="declarationPlace"
                      value={formData.declarationPlace}
                      onChange={handleInputChange}
                      className={fieldClass()}
                      placeholder="Conakry"
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-6 text-center">
                Votes du public : {VOTES_START.split('-').reverse().join('/')} au {VOTES_END.split('-').reverse().join('/')} •
                Remise des prix le 11 décembre {EVENT_YEAR} à l’Hôtel Kaloum.
              </p>

              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-large disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Envoi en cours...' : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Soumettre ma candidature
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplicationForm;
