import React from 'react';
import { Star, Award, Users, Globe, Heart, Zap, Mail, Phone } from 'lucide-react';

const Partners: React.FC = () => {
  const partners = [
    {
      name: 'Orange Guinée',
      category: 'Partenaire Principal',
      logo: '/orange-logo.png',
      description: 'Leader des télécommunications en Guinée, Orange soutient l\'innovation technologique dans l\'hospitalité.',
      benefits: ['Visibilité maximale', 'Stand d\'exposition', 'Présentation lors de la cérémonie'],
      website: 'https://www.orange.gn'
    },
    {
      name: 'PayCard Guinée',
      category: 'Partenaire Financier',
      logo: '/paycard-logo.png',
      description: 'Solution de paiement innovante pour le secteur touristique et hôtelier.',
      benefits: ['Logo sur tous les supports', 'Présentation des solutions', 'Networking exclusif'],
      website: 'https://www.paycard.gn'
    },
    {
      name: 'Visa Afrique',
      category: 'Partenaire International',
      logo: '/visa-logo.png',
      description: 'Leader mondial des solutions de paiement électronique.',
      benefits: ['Reconnaissance internationale', 'Présentation des innovations', 'Accès au réseau global'],
      website: 'https://www.visa.com'
    }
  ];

  const sponsorshipLevels = [
    {
      name: 'Diamant',
      amount: '50 000 000 GNF',
      benefits: [
        'Logo principal sur tous les supports',
        'Stand d\'exposition premium',
        'Présentation lors de la cérémonie',
        'Accès VIP à tous les événements',
        'Mention dans tous les communiqués',
        'Droit de parole lors de la cérémonie',
        'Pack médias complet',
        'Networking exclusif avec les lauréats'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Platine',
      amount: '30 000 000 GNF',
      benefits: [
        'Logo sur tous les supports',
        'Stand d\'exposition standard',
        'Mention lors de la cérémonie',
        'Accès VIP aux événements',
        'Pack médias standard',
        'Networking avec les participants'
      ],
      color: 'from-gray-400 to-gray-600'
    },
    {
      name: 'Or',
      amount: '20 000 000 GNF',
      benefits: [
        'Logo sur les supports principaux',
        'Stand d\'exposition',
        'Mention dans les communications',
        'Accès aux événements',
        'Pack médias de base'
      ],
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      name: 'Argent',
      amount: '10 000 000 GNF',
      benefits: [
        'Logo sur certains supports',
        'Mention dans les communications',
        'Accès aux événements principaux'
      ],
      color: 'from-gray-300 to-gray-500'
    }
  ];

  const advantages = [
    {
      icon: Star,
      title: 'Visibilité maximale',
      description: 'Bénéficiez d\'une exposition médiatique nationale et internationale'
    },
    {
      icon: Users,
      title: 'Réseau professionnel',
      description: 'Accédez à un réseau d\'experts et de décideurs du secteur'
    },
    {
      icon: Globe,
      title: 'Reconnaissance de marque',
      description: 'Associez votre image à l\'excellence en hospitalité'
    },
    {
      icon: Heart,
      title: 'Impact social',
      description: 'Participez au développement du tourisme guinéen'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Découvrez les dernières tendances et technologies'
    }
  ];

  return (
    <div className="Partners pt-20">
      {/* Section Héros */}
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <h1 className="mb-6">
            Nos <span className="text-gold">Partenaires</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Découvrez nos partenaires et sponsors qui soutiennent l\'excellence 
            en hospitalité et contribuent au succès des HAG.
          </p>
        </div>
      </section>

      {/* Section Partenaires actuels */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-12">
            Partenaires <span className="text-gold">actuels</span>
          </h2>
          
          <div className="grid grid-3 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-32 bg-gradient-to-br from-gold to-yellow-500 flex items-center justify-center">
                  <div className="text-2xl font-bold text-blue-dark">{partner.name}</div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-block bg-blue-dark text-white px-3 py-1 rounded-full text-sm font-medium">
                      {partner.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-blue-dark mb-3">{partner.name}</h3>
                  <p className="text-gray-600 mb-4">{partner.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-blue-dark mb-2">Avantages :</h4>
                    <ul className="space-y-1">
                      {partner.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <Star className="w-3 h-3 text-gold mr-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gold text-blue-dark px-4 py-2 rounded-lg font-medium hover:bg-blue-deep hover:text-white transition-colors"
                  >
                    Visiter le site
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Niveaux de sponsoring */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-12">
            Niveaux de <span className="text-gold">sponsoring</span>
          </h2>
          
          <div className="grid grid-2 gap-8">
            {sponsorshipLevels.map((level, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`h-24 bg-gradient-to-r ${level.color} flex items-center justify-center`}>
                  <h3 className="text-2xl font-bold text-white">{level.name}</h3>
                </div>
                
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-blue-dark">{level.amount}</div>
                    <div className="text-gray-600">Investissement</div>
                  </div>
                  
                  <h4 className="font-semibold text-blue-dark mb-4">Avantages inclus :</h4>
                  <ul className="space-y-2 mb-6">
                    {level.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <Award className="w-4 h-4 text-gold mr-2 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full btn btn-primary">
                    Devenir partenaire {level.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Avantages du partenariat */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-12">
            Pourquoi devenir <span className="text-gold">partenaire</span> ?
          </h2>
          
          <div className="grid grid-3 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <advantage.icon className="w-10 h-10 text-blue-dark" />
                </div>
                <h3 className="text-xl font-semibold text-blue-dark mb-4">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact pour partenariat */}
      <section className="section section-alt">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-dark mb-6">
              Intéressé par un <span className="text-gold">partenariat</span> ?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Contactez notre équipe pour discuter des opportunités de partenariat 
              et découvrir comment nous pouvons créer une collaboration gagnant-gagnant.
            </p>
            
            <div className="grid grid-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-blue-dark" />
                </div>
                <h3 className="font-semibold text-blue-dark mb-2">Par email</h3>
                <a href="mailto:Sorodou@gmail.com" className="text-gold hover:text-blue-deep">
                  Sorodou@gmail.com
                </a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-blue-dark" />
                </div>
                <h3 className="font-semibold text-blue-dark mb-2">Par téléphone</h3>
                <a href="tel:+224622586253" className="text-gold hover:text-blue-deep">
                  +224 622 586 253
                </a>
              </div>
            </div>
            
            <button className="btn btn-primary btn-large">
              Demander une proposition de partenariat
            </button>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="section bg-blue-dark text-white">
        <div className="container text-center">
          <h2 className="mb-6">
            Rejoignez l\'<span className="text-gold">aventure</span> HAG
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Devenez partenaire des Hospitality Awards Guinée et contribuez 
            au développement de l\'excellence en hospitalité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn btn-primary btn-large">
              Nous contacter
            </a>
            <a href="/a-propos" className="btn btn-secondary btn-large">
              En savoir plus
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners; 