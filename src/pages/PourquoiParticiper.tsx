import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Star, TrendingUp, GraduationCap, Globe } from 'lucide-react';

const PourquoiParticiper: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'Reconnaissance d\'excellence',
      description: 'Valorisez vos talents et innovations dans le secteur de l\'hospitalité'
    },
    {
      icon: Users,
      title: 'Réseau professionnel',
      description: 'Rejoignez une communauté d\'experts et de passionnés du tourisme'
    },
    {
      icon: Star,
      title: 'Visibilité nationale',
      description: 'Bénéficiez d\'une exposition médiatique et d\'une reconnaissance officielle'
    },
    {
      icon: TrendingUp,
      title: 'Émulation positive',
      description: 'Inspirez-vous des meilleurs standards et faites progresser votre établissement'
    },
    {
      icon: GraduationCap,
      title: 'Promotion des métiers',
      description: 'Montrez que l’hospitalité offre de vraies carrières et des opportunités d’entreprendre'
    },
    {
      icon: Globe,
      title: 'Rencontres & partenariats',
      description: 'Échangez avec les professionnels, institutions et partenaires du tourisme guinéen'
    }
  ];

  return (
    <div className="pt-20">
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <h1 className="mb-6">
            Pourquoi participer aux <span className="text-gold">HAG</span> ?
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Découvrez les avantages uniques de participer aux Hospitality Awards Guinée.
          </p>
        </div>
      </section>

      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-dark rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="group">
                <div className="bg-white p-8 rounded-3xl shadow-lg text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full">
                  <div className="w-20 h-20 bg-gradient-to-br from-gold to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <feature.icon className="w-10 h-10 text-blue-dark" />
                  </div>
                  <h2 className="text-2xl font-bold text-blue-dark mb-4 group-hover:text-gold transition-colors">
                    {feature.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <div className="w-16 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto mt-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/candidater" className="btn btn-primary btn-large">
              Candidater maintenant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PourquoiParticiper;
