import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Award, Users, Calendar } from 'lucide-react';
import Countdown from '../components/Countdown';
import { getTotalCategoriesCount, getGroupsCount } from '../data/categories';

const Home: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const stats = [
    { icon: Award, value: getTotalCategoriesCount().toString(), label: 'Récompenses officielles' },
    { icon: Star, value: getGroupsCount().toString(), label: 'Catégories principales' },
    { icon: Users, value: '250+', label: 'Candidats attendus' },
    { icon: Calendar, value: '2025', label: 'Édition HAG' }
  ];

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
    }
  ];

  return (
    <div className="Home">
      {/* Section Héros */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Image de couverture en arrière-plan */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/couverture.jpg)',
            backgroundAttachment: isMobile ? 'scroll' : 'fixed'
          }}
        ></div>
        
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-dark/80 via-blue-deep/70 to-blue-dark/80"></div>
        
        {/* Motif de grille subtil */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container relative z-10 text-center">
          {/* Logo et titre principal */}
          <div className="mb-8">
            <div className="w-48 h-48 rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden">
              <img 
                src="/Logo HAG.png" 
                alt="Logo HAG" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback vers l'icône Award si l'image ne charge pas
                  e.currentTarget.style.display = 'none';
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextElement) {
                    nextElement.style.display = 'flex';
                  }
                }}
              />
              <div className="w-full h-full bg-gold rounded-full flex items-center justify-center" style={{display: 'none'}}>
                <Award className="w-32 h-32 text-blue-dark" />
              </div>
            </div>
            <h1 className="text-white mb-4">
              HOSPITALITY AWARDS
              <span className="block text-gold">GUINÉE</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Innovation et proximité – Célébrons l'excellence en hospitalité avec 25 récompenses en 7 catégories
            </p>
          </div>

          {/* Compte à rebours */}
          <div className="mb-12">
            <Countdown />
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/candidater" className="btn btn-primary btn-large group">
              Candidater maintenant
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/categories" className="btn btn-secondary btn-large">
              Voir les catégories
            </Link>
            <Link to="/laureats" className="btn btn-secondary btn-large">
              Découvrir les lauréats
            </Link>
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="section bg-gradient-to-r from-gold via-yellow-400 to-gold relative overflow-hidden">
        {/* Motif de fond */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(13, 27, 42, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, rgba(13, 27, 42, 0.1) 0%, transparent 50%)`
          }}></div>
        </div>
        
        <div className="container relative z-10">
          <div className="grid grid-4 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="text-blue-dark group">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-dark rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <stat.icon className="w-8 h-8 text-gold" />
                  </div>
                </div>
                <div className="text-4xl font-bold font-heading mb-3 group-hover:text-blue-dark transition-colors">{stat.value}</div>
                <div className="text-lg font-medium text-blue-dark/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section À propos */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2 items-center gap-12">
            <div>
              <h2 className="mb-6">
                Célébrons l'<span className="text-gold">excellence</span> en hospitalité
              </h2>
              <p className="text-lg mb-6">
                Les Hospitality Awards Guinée (HAG) sont l'événement de référence pour 
                récompenser et valoriser les talents du secteur touristique et hôtelier guinéen avec 
                25 récompenses organisées en 7 catégories principales.
              </p>
              <p className="mb-8">
                Notre mission est de promouvoir l'innovation, encourager l'excellence 
                et renforcer la visibilité du tourisme guinéen sur la scène internationale à travers 
                une reconnaissance complète de tous les secteurs de l'hospitalité.
              </p>
              <Link to="/a-propos" className="btn btn-primary">
                En savoir plus
              </Link>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-gold to-yellow-500 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="w-48 h-48 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src="/Logo HAG.png" 
                    alt="Logo HAG" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback vers l'icône Star si l'image ne charge pas
                      e.currentTarget.style.display = 'none';
                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                      if (nextElement) {
                        nextElement.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center" style={{display: 'none'}}>
                    <Star className="w-24 h-24 text-blue-dark" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-deep rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-16 h-16 text-gold" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section className="section section-alt relative overflow-hidden">
        {/* Motif de fond */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-dark rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-dark mb-6">
              Pourquoi participer aux <span className="text-gold">HAG</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les avantages uniques de participer aux Hospitality Awards Guinée
            </p>
          </div>
          
          <div className="grid grid-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white p-8 rounded-3xl shadow-lg text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                  <div className="w-20 h-20 bg-gradient-to-br from-gold to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <feature.icon className="w-10 h-10 text-blue-dark" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-dark mb-4 group-hover:text-gold transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  
                  {/* Ligne décorative */}
                  <div className="w-16 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto mt-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="section bg-blue-dark text-white">
        <div className="container text-center">
          <h2 className="mb-6">
            Prêt à briller dans l'<span className="text-gold">hospitalité</span> ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez les Hospitality Awards Guinée et faites partie de cette 
            célébration de l'excellence et de l'innovation.
          </p>
                           <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Link to="/candidater" className="btn btn-primary btn-large">
                     Candidater maintenant
                   </Link>
                   {/* <Link to="/voter" className="btn btn-primary btn-large">
                     Voter maintenant
                   </Link> */}
                   <Link to="/contact" className="btn btn-secondary btn-large">
                     Nous contacter
                   </Link>
                 </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 