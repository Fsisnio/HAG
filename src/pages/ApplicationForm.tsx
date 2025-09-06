import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle, AlertCircle, Upload, FileText } from 'lucide-react';
import { officialCategories, Category as AwardCategory } from '../data/categories';

interface FormData {
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: string;
  description: string;
  achievements: string;
  innovation: string;
  impact: string;
  website: string;
  socialMedia: string;
  documents: File[];
}

const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    category: '',
    description: '',
    achievements: '',
    innovation: '',
    impact: '',
    website: '',
    socialMedia: '',
    documents: []
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories: string[] = officialCategories.map((cat: AwardCategory): string => cat.title);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, documents: filesArray }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = 'Le nom de l\'organisation est requis';
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Le nom du contact est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }

    if (!formData.category) {
      newErrors.category = 'La catégorie est requise';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }

    if (!formData.achievements.trim()) {
      newErrors.achievements = 'Les réalisations sont requises';
    }

    if (!formData.innovation.trim()) {
      newErrors.innovation = 'L\'innovation est requise';
    }

    if (!formData.impact.trim()) {
      newErrors.impact = 'L\'impact est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulation d'envoi - à remplacer par l'API réelle
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Sauvegarde locale de la candidature pour affichage dans l'admin
      const storageKey = 'hag_applications';
      const existingRaw = localStorage.getItem(storageKey);
      const existing: any[] = existingRaw ? JSON.parse(existingRaw) : [];
      const newApplication = {
        id: Date.now(),
        submittedAt: new Date().toISOString(),
        ...formData
      };
      localStorage.setItem(storageKey, JSON.stringify([newApplication, ...existing]));

      setIsSubmitted(true);
      setTimeout(() => {
        navigate('/');
      }, 5000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="ApplicationForm pt-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-12">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-green-800 mb-4">
                Candidature envoyée !
              </h1>
              <p className="text-lg text-green-700 mb-6">
                Votre candidature a été reçue avec succès. Nous vous remercions 
                pour votre intérêt pour les Hospitality Awards Guinée.
              </p>
              <p className="text-green-600">
                Vous recevrez un email de confirmation dans les prochaines minutes. 
                Notre équipe vous contactera pour la suite du processus.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ApplicationForm pt-20">
      {/* Section Héros */}
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <h1 className="mb-6">
            Formulaire de <span className="text-gold">Candidature</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Soumettez votre candidature pour les Hospitality Awards Guinée 2024. 
            Remplissez tous les champs requis et joignez les documents nécessaires.
          </p>
        </div>
      </section>

      {/* Formulaire */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
              {/* Informations de l'organisation */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-dark mb-6">
                  Informations de l'organisation
                </h2>
                <div className="grid grid-2 gap-6">
                  <div>
                    <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de l'organisation *
                    </label>
                    <input
                      type="text"
                      id="organizationName"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                        errors.organizationName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nom de votre entreprise ou organisation"
                    />
                    {errors.organizationName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.organizationName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">
                      Personne de contact *
                    </label>
                    <input
                      type="text"
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                        errors.contactPerson ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nom et prénom du contact principal"
                    />
                    {errors.contactPerson && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.contactPerson}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="email@exemple.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+224 XXX XXX XXX"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Catégorie et description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-dark mb-6">
                  Catégorie et présentation
                </h2>
                
                <div className="mb-6">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie de prix *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.category}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description de l'organisation et de ses activités *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Décrivez votre organisation, ses activités principales et son positionnement sur le marché..."
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Réalisations et innovation */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-dark mb-6">
                  Réalisations et innovation
                </h2>
                
                <div className="grid grid-2 gap-6">
                  <div>
                    <label htmlFor="achievements" className="block text-sm font-medium text-gray-700 mb-2">
                      Principales réalisations et succès *
                    </label>
                    <textarea
                      id="achievements"
                      name="achievements"
                      value={formData.achievements}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                        errors.achievements ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Détaillez vos principales réalisations, récompenses, certifications..."
                    />
                    {errors.achievements && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.achievements}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="innovation" className="block text-sm font-medium text-gray-700 mb-2">
                      Innovations et approches créatives *
                    </label>
                    <textarea
                      id="innovation"
                      name="innovation"
                      value={formData.innovation}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                        errors.innovation ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Décrivez vos innovations, nouvelles approches, technologies utilisées..."
                    />
                    {errors.innovation && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.innovation}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="impact" className="block text-sm font-medium text-gray-700 mb-2">
                    Impact et contribution au secteur *
                  </label>
                  <textarea
                    id="impact"
                    name="impact"
                    value={formData.impact}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                      errors.impact ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Expliquez l'impact de vos activités sur le secteur touristique guinéen..."
                  />
                  {errors.impact && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.impact}
                    </p>
                  )}
                </div>
              </div>

              {/* Informations complémentaires */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-dark mb-6">
                  Informations complémentaires
                </h2>
                
                <div className="grid grid-2 gap-6">
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                      Site web
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="https://www.exemple.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="socialMedia" className="block text-sm font-medium text-gray-700 mb-2">
                      Réseaux sociaux
                    </label>
                    <input
                      type="text"
                      id="socialMedia"
                      name="socialMedia"
                      value={formData.socialMedia}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Facebook, Instagram, LinkedIn..."
                    />
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-dark mb-6">
                  Documents à joindre
                </h2>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Glissez-déposez vos documents ici ou cliquez pour sélectionner
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Formats acceptés : PDF, DOC, DOCX, JPG, PNG (max 10MB par fichier)
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="documents"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="documents"
                    className="btn btn-secondary cursor-pointer"
                  >
                    Sélectionner des fichiers
                  </label>
                </div>

                {formData.documents.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-3">Fichiers sélectionnés :</h4>
                    <div className="space-y-2">
                      {formData.documents.map((file, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <FileText className="w-5 h-5 text-gray-500" />
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <span className="text-xs text-gray-500">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bouton de soumission */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-large disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Envoi en cours...
                    </>
                  ) : (
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