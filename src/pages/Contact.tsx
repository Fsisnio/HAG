import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulation d'envoi - à remplacer par l'API réelle
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'Sorodou@gmail.com',
      link: 'mailto:Sorodou@gmail.com'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+224 622 586 253',
      link: 'tel:+224622586253'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      value: 'Conakry, Guinée',
      link: null
    },
    {
      icon: Clock,
      title: 'Horaires',
      value: 'Lun-Ven: 9h-18h',
      link: null
    }
  ];

  if (isSubmitted) {
    return (
      <div className="Contact pt-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-12">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-green-800 mb-4">
                Message envoyé !
              </h1>
              <p className="text-lg text-green-700 mb-6">
                Votre message a été reçu avec succès. Nous vous répondrons dans les plus brefs délais.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn btn-primary"
              >
                Envoyer un autre message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="Contact pt-20">
      {/* Section Héros */}
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <h1 className="mb-6">
            Contactez <span className="text-gold">HAG</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Nous sommes là pour répondre à toutes vos questions sur les Hospitality Awards Guinée. 
            N'hésitez pas à nous contacter !
          </p>
        </div>
      </section>

      {/* Section Contact */}
      <section className="section relative overflow-hidden">
        {/* Motif de fond */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-dark rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="grid grid-2 gap-12">
            {/* Informations de contact */}
            <div>
              <h2 className="text-3xl font-bold text-blue-dark mb-8">
                Nos <span className="text-gold">coordonnées</span>
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="group">
                    <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                      <div className="w-14 h-14 bg-gradient-to-br from-gold to-yellow-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <info.icon className="w-7 h-7 text-blue-dark" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-dark mb-2 text-lg">{info.title}</h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-gray-600 hover:text-gold transition-colors text-lg font-medium"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-600 text-lg font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Réseaux sociaux */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-blue-dark mb-4">Suivez-nous</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-blue-deep rounded-full flex items-center justify-center hover:bg-gold transition-colors">
                    <span className="text-white font-bold">f</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-deep rounded-full flex items-center justify-center hover:bg-gold transition-colors">
                    <span className="text-white font-bold">in</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-deep rounded-full flex items-center justify-center hover:bg-gold transition-colors">
                    <span className="text-white font-bold">@</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div>
              <h2 className="text-3xl font-bold text-blue-dark mb-8">
                Envoyez-nous un <span className="text-gold">message</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Votre nom complet"
                    />
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
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="Sujet de votre message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="Votre message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-large w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-12">
            Questions <span className="text-gold">fréquentes</span>
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-transparent hover:border-gold">
                <h3 className="font-bold text-blue-dark mb-4 text-xl flex items-center">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-dark font-bold text-sm">?</span>
                  </div>
                  Comment participer aux Hospitality Awards Guinée ?
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Pour participer, remplissez le formulaire de candidature en ligne, 
                  sélectionnez votre catégorie et soumettez tous les documents requis.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-transparent hover:border-gold">
                <h3 className="font-bold text-blue-dark mb-4 text-xl flex items-center">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-dark font-bold text-sm">?</span>
                  </div>
                  Quelles sont les dates importantes ?
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Les candidatures sont ouvertes jusqu'au 30 novembre 2024. 
                  La cérémonie de remise des prix aura lieu le 15 décembre 2024.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-transparent hover:border-gold">
                <h3 className="font-bold text-blue-dark mb-4 text-xl flex items-center">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-dark font-bold text-sm">?</span>
                  </div>
                  Comment le jury évalue-t-il les candidatures ?
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Notre jury d'experts évalue chaque candidature selon des critères 
                  stricts incluant la qualité du service, l'innovation et l'impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 