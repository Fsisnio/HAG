import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Target, Star } from 'lucide-react';

const teamMembers = [
  {
    name: 'M. Maurice Millimouno',
    role: 'Président du comité d’organisation',
    photo: '/equipe/maurice-millimouno.png'
  },
  {
    name: 'M. Ézeckiel Saoromou',
    role: 'Vice-président, Coordinateur général',
    photo: '/equipe/ezeckiel-saoromou.png'
  },
  {
    name: 'M. Ibrahim Sory Bah',
    role: 'Secrétaire général',
    photo: '/equipe/ibrahim-sory-bah.png'
  },
  {
    name: 'M. Firas Mohamed Challoub',
    role: 'Ambassadeur responsable de la production, logistique et protocole',
    photo: '/equipe/firas-mohamed-challoub.png'
  },
  {
    name: 'Mme Hawa Kouyaté',
    role: 'Responsable partenariats et sponsoring',
    photo: '/equipe/hawa-kouyate.png'
  },
  {
    name: 'M. Elie Tounkara',
    role: 'Responsable contrôle et finances',
    photo: '/equipe/elie-tounkara.png'
  },
  {
    name: 'M. Elhadj Oumar Diallo',
    role: 'Responsable candidatures et votes',
    photo: '/equipe/elhadj-oumar-diallo.png'
  },
  {
    name: 'Mlle Clémence Richard',
    role: 'Responsable panels et dîner gala',
    photo: '/equipe/clemence-richard.png'
  },
  {
    name: 'Mlle Saoudatou Barry',
    role: 'Responsable commerciale et développement des ventes',
    photo: '/equipe/saoudatou-barry.png'
  },
  {
    name: 'M. Joseph Ndono',
    role: 'Communication et relations publiques',
    photo: '/equipe/joseph-ndono.png'
  },
  {
    name: 'M. Mamadou Sarifou Sow',
    role: 'Responsable carnaval',
    photo: '/equipe/mamadou-sarifou-sow.png'
  },
  {
    name: 'M. Mamadou Dian Diallo',
    role: 'Community manager',
    photo: '/equipe/mamadou-dian-diallo.png'
  }
];

const Team: React.FC = () => {
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
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <h1 className="mb-6">
            Notre <span className="text-gold">Équipe</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Découvrez le comité d’organisation des Hospitality Awards Guinée,
            engagé à célébrer l’excellence de l’hospitalité guinéenne.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-center mb-12">
            Le <span className="text-gold">comité</span> d’organisation
          </h2>

          <div className="grid grid-2 gap-8">
            {teamMembers.map((member) => (
              <article
                key={member.name}
                className="bg-blue-dark rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={member.photo}
                  alt={`${member.name} — ${member.role}`}
                  className="w-full h-auto block"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-gold font-medium leading-snug">{member.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container text-center">
          <h2 className="mb-4">Le <span className="text-gold">jury</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Le jury HAG 2026 sera présenté avec photo, fonction, organisation, domaine d’expertise
            et biographie professionnelle.
          </p>
          <Link to="/jury" className="btn btn-primary">Découvrir le jury</Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-center mb-12">
            Nos <span className="text-gold">valeurs</span>
          </h2>

          <div className="grid grid-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
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

            <Link to="/contact" className="btn btn-primary btn-large">
              Nous contacter pour collaborer
            </Link>
          </div>
        </div>
      </section>

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
            <Link to="/contact" className="btn btn-primary btn-large">
              Nous contacter
            </Link>
            <Link to="/a-propos" className="btn btn-secondary btn-large">
              En savoir plus
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
