import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Globe, Award, Quote, Compass, TrendingUp, GraduationCap } from 'lucide-react';
import FirstEditionGallery from '../components/FirstEditionGallery';

const About: React.FC = () => {
  const objectives = [
    {
      icon: Award,
      title: 'Premièrement',
      description: 'Reconnaître les talents et les efforts des professionnels qui travaillent chaque jour pour améliorer la qualité des services.'
    },
    {
      icon: TrendingUp,
      title: 'Deuxièmement',
      description: 'Encourager les établissements à progresser en matière d’accueil, de confort, de qualité et d’expérience client.'
    },
    {
      icon: Users,
      title: 'Troisièmement',
      description: 'Créer une émulation positive entre les acteurs du secteur afin que chacun cherche à atteindre de meilleurs standards.'
    },
    {
      icon: GraduationCap,
      title: 'Quatrièmement',
      description: 'Promouvoir les métiers de l’hospitalité auprès des jeunes et montrer qu’il s’agit de véritables opportunités de carrière et d’entrepreneuriat.'
    },
    {
      icon: Globe,
      title: 'Enfin',
      description: 'Créer un espace de rencontre entre les professionnels, les investisseurs, les institutions et les partenaires qui souhaitent contribuer au développement du tourisme en Guinée.'
    }
  ];

  const values = [
    'L’excellence',
    'Le professionnalisme',
    'La formation',
    'L’innovation',
    'La satisfaction du client'
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
                Notre <span className="text-gold">vision</span>
              </h2>
              <p className="text-lg mb-6">
                Notre vision est de contribuer à faire de la Guinée une destination reconnue
                pour la qualité de son accueil et de ses services.
              </p>
              <p className="mb-4">
                Nous voulons construire une culture de l’hospitalité basée sur :
              </p>
              <ul className="space-y-2 mb-6">
                {values.map((value) => (
                  <li key={value} className="flex items-center space-x-3">
                    <span className="w-2.5 h-2.5 bg-gold rounded-full flex-shrink-0"></span>
                    <span className="text-lg">{value}{value === 'La satisfaction du client' ? '.' : ' ;'}</span>
                  </li>
                ))}
              </ul>
              <p className="mb-6">
                Notre ambition est que chaque visiteur qui arrive en Guinée reparte avec
                une image positive de notre pays grâce à la qualité de l’accueil qu’il aura reçu.
              </p>
              <p>
                À travers les Hospitality Awards Guinée, nous voulons créer un mouvement
                durable qui accompagne la transformation du secteur.
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
              Les Hospitality Awards Guinée poursuivent plusieurs objectifs.
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

      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              La <span className="text-gold">1ère édition</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Quelques images de la première soirée de distinction des Hospitality Awards Guinée.
            </p>
          </div>
          <FirstEditionGallery />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container text-center">
          <h2 className="mb-6">
            Édition <span className="text-gold">2026</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Les inscriptions sont ouvertes du 25 août au 20 septembre 2026. La soirée de remise des prix
            et le dîner gala se tiendront le 11 décembre 2026 à 17h00 à l’Hôtel Kaloum, Conakry.
          </p>
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