import React from 'react';
import { Award, Users, Target, Star, Mail, Phone, Linkedin } from 'lucide-react';

const Team: React.FC = () => {
  const teamMembers = [
    {
      name: 'Faya Maurice MILLIMOUNO',
      role: 'Commissaire Général',
      photo: '/faya-millimouno.jpg',
      description: 'Visionnaire et leader reconnu dans le secteur du tourisme guinéen, Faya Maurice MILLIMOUNO dirige les HAG avec passion et détermination.',
      expertise: ['Stratégie touristique', 'Développement durable', 'Relations internationales'],
      contact: {
        email: 'faya.millimouno@hag-guinee.com',
        phone: '+224 622 586 253',
        linkedin: 'https://linkedin.com/in/faya-millimouno'
      }
    },
    {
      name: 'Fatoumata Camara',
      role: 'Directrice Exécutive',
      photo: '/fatoumata-camara.jpg',
      description: 'Experte en gestion d\'événements et en communication, Fatoumata coordonne l\'ensemble des opérations des HAG.',
      expertise: ['Gestion d\'événements', 'Communication', 'Logistique'],
      contact: {
        email: 'fatoumata.camara@hag-guinee.com',
        phone: '+224 622 586 254',
        linkedin: 'https://linkedin.com/in/fatoumata-camara'
      }
    },
    {
      name: 'Dr. Amadou Diallo',
      role: 'Directeur Technique',
      photo: '/amadou-diallo.jpg',
      description: 'Spécialiste en innovation technologique et en transformation digitale du secteur touristique.',
      expertise: ['Innovation technologique', 'Transformation digitale', 'Stratégie IT'],
      contact: {
        email: 'amadou.diallo@hag-guinee.com',
        phone: '+224 622 586 255',
        linkedin: 'https://linkedin.com/in/amadou-diallo'
      }
    },
    {
      name: 'Marie Konaté',
      role: 'Responsable Communication',
      photo: '/marie-konate.jpg',
      description: 'Professionnelle de la communication et des relations médias, Marie assure la visibilité des HAG.',
      expertise: ['Relations médias', 'Communication digitale', 'Marketing'],
      contact: {
        email: 'marie.konate@hag-guinee.com',
        phone: '+224 622 586 256',
        linkedin: 'https://linkedin.com/in/marie-konate'
      }
    },
    {
      name: 'Mamadou Bah',
      role: 'Responsable Partenariats',
      photo: '/mamadou-bah.jpg',
      description: 'Expert en développement de partenariats stratégiques et en relations institutionnelles.',
      expertise: ['Partenariats stratégiques', 'Relations institutionnelles', 'Développement commercial'],
      contact: {
        email: 'mamadou.bah@hag-guinee.com',
        phone: '+224 622 586 257',
        linkedin: 'https://linkedin.com/in/mamadou-bah'
      }
    },
    {
      name: 'Aissatou Barry',
      role: 'Responsable Événements',
      photo: '/aissatou-barry.jpg',
      description: 'Spécialiste en organisation d\'événements et en gestion de projets culturels.',
      expertise: ['Organisation d\'événements', 'Gestion de projets', 'Coordination'],
      contact: {
        email: 'aissatou.barry@hag-guinee.com',
        phone: '+224 622 586 258',
        linkedin: 'https://linkedin.com/in/aissatou-barry'
      }
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans tout ce que nous entreprenons'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Nous croyons en la force du travail d\'équipe et de la coopération'
    },
    {
      icon: Star,
      title: 'Innovation',
      description: 'Nous encourageons la créativité et l\'innovation dans nos approches'
    },
    {
      icon: Award,
      title: 'Intégrité',
      description: 'Nous agissons avec honnêteté et transparence dans toutes nos actions'
    }
  ];

  return (
    <div className="Team pt-20">
      {/* Section Héros */}
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <h1 className="mb-6">
            Notre <span className="text-gold">Équipe</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Découvrez les professionnels passionnés qui font des Hospitality Awards Guinée 
            un événement d\'exception et une référence en Afrique.
          </p>
        </div>
      </section>

      {/* Section Équipe principale */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-12">
            L\'<span className="text-gold">équipe</span> dirigeante
          </h2>
          
          <div className="grid grid-2 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-gold to-yellow-500 flex items-center justify-center">
                  <div className="text-2xl font-bold text-blue-dark text-center">
                    {member.name.split(' ').map(name => <div key={name}>{name}</div>)}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-block bg-gold text-blue-dark px-3 py-1 rounded-full text-sm font-medium">
                      {member.role}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-blue-dark mb-3">{member.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{member.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-blue-dark mb-2">Expertise :</h4>
                    <ul className="space-y-1">
                      {member.expertise.map((skill, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <Star className="w-3 h-3 text-gold mr-2" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center space-x-3 text-sm">
                      <a href={`mailto:${member.contact.email}`} className="text-gold hover:text-blue-deep">
                        <Mail className="w-4 h-4" />
                      </a>
                      <a href={`tel:${member.contact.phone}`} className="text-gold hover:text-blue-deep">
                        <Phone className="w-4 h-4" />
                      </a>
                      <a href={member.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-blue-deep">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Valeurs de l'équipe */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-12">
            Nos <span className="text-gold">valeurs</span>
          </h2>
          
          <div className="grid grid-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-10 h-10 text-blue-dark" />
                </div>
                <h3 className="text-xl font-semibold text-blue-dark mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Mission de l'équipe */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-dark mb-8">
              Notre <span className="text-gold">mission</span> en tant qu'équipe
            </h2>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                En tant qu'équipe dédiée aux Hospitality Awards Guinée, notre mission est de créer 
                un événement d'excellence qui valorise et récompense les talents du secteur touristique 
                et hôtelier guinéen.
              </p>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Nous nous engageons à promouvoir l'innovation, encourager l'excellence et renforcer 
                la visibilité du tourisme guinéen sur la scène internationale, tout en créant des 
                opportunités de networking et de développement pour tous les acteurs du secteur.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Notre équipe travaille avec passion, professionnalisme et détermination pour faire 
                des HAG un événement de référence en Afrique de l'Ouest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Rejoindre l'équipe */}
      <section className="section section-alt">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-dark mb-6">
              Rejoignez notre <span className="text-gold">équipe</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Vous souhaitez contribuer au succès des Hospitality Awards Guinée ? 
              Découvrez nos opportunités de collaboration et de partenariat.
            </p>
            
            <div className="grid grid-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-blue-dark mb-2">Collaboration ponctuelle</h3>
                <p className="text-gray-600 text-sm">
                  Contribuez à des projets spécifiques selon vos compétences
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-blue-dark mb-2">Partenariat stratégique</h3>
                <p className="text-gray-600 text-sm">
                  Développez des projets communs avec notre équipe
                </p>
              </div>
            </div>
            
            <button className="btn btn-primary btn-large">
              Nous contacter pour collaborer
            </button>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="section bg-blue-dark text-white">
        <div className="container text-center">
          <h2 className="mb-6">
            Une équipe au service de l'<span className="text-gold">excellence</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Notre équipe dédiée et passionnée travaille chaque jour pour faire des 
            Hospitality Awards Guinée un événement d'exception.
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

export default Team; 