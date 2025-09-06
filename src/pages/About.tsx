import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Globe, Award, Quote, Compass } from 'lucide-react';

const About: React.FC = () => {
  const objectives = [
    {
      icon: Target,
      title: 'Valoriser les talents',
      description: 'Reconnaître et récompenser l\'excellence dans le secteur de l\'hospitalité guinéenne'
    },
    {
      icon: Users,
      title: 'Encourager l\'innovation',
      description: 'Promouvoir les nouvelles approches et technologies dans le tourisme'
    },
    {
      icon: Globe,
      title: 'Renforcer la visibilité',
      description: 'Mettre en valeur le potentiel touristique de la Guinée sur la scène internationale'
    },
    {
      icon: Award,
      title: 'Fédérer les acteurs',
      description: 'Créer une communauté soudée autour de l\'excellence en hospitalité'
    }
  ];

  const values = [
    'Excellence et qualité de service',
    'Innovation et créativité',
    'Durabilité et responsabilité',
    'Inclusion et diversité',
    'Transparence et équité'
  ];

  return (
    <div className="About pt-20">
      {/* Section Héros */}
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <h1 className="mb-6">
            À propos des <span className="text-gold">HAG</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Les Hospitality Awards Guinée (HAG) sont l'événement de référence pour 
            célébrer l'excellence et l'innovation dans le secteur de l'hospitalité guinéenne.
          </p>
        </div>
      </section>

      {/* Section Mission et Vision */}
      <section className="section relative overflow-hidden">
        {/* Motif de fond */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-dark rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="grid grid-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">
                Notre <span className="text-gold">mission</span>
              </h2>
              <p className="text-lg mb-6">
                Promouvoir et valoriser l'excellence dans le secteur de l'hospitalité 
                en Guinée en récompensant les initiatives innovantes, les services 
                de qualité et les talents exceptionnels.
              </p>
              <p className="mb-6">
                Nous nous engageons à créer une plateforme qui encourage la 
                collaboration, partage les bonnes pratiques et contribue au 
                développement durable du tourisme guinéen.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-gold to-yellow-500 rounded-2xl shadow-2xl flex items-center justify-center">
                <Compass className="w-32 h-32 text-blue-dark opacity-90" />
              </div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-deep rounded-full flex items-center justify-center shadow-lg">
                <Target className="w-12 h-12 text-gold" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Objectifs */}
      <section className="section section-alt relative overflow-hidden">
        {/* Motif de fond */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-dark rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-dark mb-6">
              Nos <span className="text-gold">objectifs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des objectifs clairs pour un impact maximal sur le secteur de l'hospitalité
            </p>
          </div>
          
          <div className="grid grid-2 gap-8">
            {objectives.map((objective, index) => (
              <div key={index} className="group">
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                  <div className="w-20 h-20 bg-gradient-to-br from-gold to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <objective.icon className="w-10 h-10 text-blue-dark" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-dark mb-4 group-hover:text-gold transition-colors">{objective.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{objective.description}</p>
                  
                  {/* Ligne décorative */}
                  <div className="w-16 h-1 bg-gradient-to-r from-gold to-yellow-500 mt-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Valeurs */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-12">
            Nos <span className="text-gold">valeurs</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-light rounded-lg">
                  <div className="w-3 h-3 bg-gold rounded-full"></div>
                  <span className="text-lg font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Commissaire Général */}
      <section className="section section-alt">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Quote className="w-16 h-16 text-gold mx-auto mb-4" />
              <h2 className="mb-6">
                Mot du <span className="text-gold">Commissaire Général</span>
              </h2>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-gold to-yellow-500 rounded-full mx-auto mb-6"></div>
              <h3 className="text-2xl font-bold mb-4">Faya Maurice MILLIMOUNO</h3>
              <p className="text-lg text-gray-600 mb-6">
                Commissaire Général des Hospitality Awards Guinée
              </p>
              <blockquote className="text-lg italic text-gray-700 leading-relaxed">
                "Les Hospitality Awards Guinée représentent bien plus qu'une simple 
                cérémonie de remise de prix. C'est une célébration de l'excellence, 
                de l'innovation et de la passion qui animent notre secteur touristique. 
                Notre objectif est de créer une dynamique positive qui inspire et 
                encourage tous les acteurs de l'hospitalité à se dépasser, à innover 
                et à contribuer au rayonnement de la Guinée sur la scène internationale."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="section bg-blue-dark text-white">
        <div className="container text-center">
          <h2 className="mb-6">
            Rejoignez l'<span className="text-gold">aventure</span> HAG
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Découvrez comment participer aux Hospitality Awards Guinée et 
            faites partie de cette célébration de l'excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/categories" className="btn btn-primary btn-large">
              Voir les catégories
            </Link>
            <Link to="/candidater" className="btn btn-secondary btn-large">
              Candidater maintenant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 