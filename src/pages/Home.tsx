import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Award, Users, Calendar } from 'lucide-react';
import Countdown from '../components/Countdown';
import { getTotalCategoriesCount, getGroupsCount } from '../data/categories';
import { EVENT_YEAR, SLOGAN } from '../data/event';

const Home: React.FC = () => {
  const stats = [
    { icon: Award, value: getTotalCategoriesCount().toString(), label: 'Récompenses officielles' },
    { icon: Star, value: getGroupsCount().toString(), label: 'Catégories principales' },
    { icon: Users, value: '250+', label: 'Candidats attendus' },
    { icon: Calendar, value: String(EVENT_YEAR), label: 'Édition HAG' }
  ];

  return (
    <div className="Home">
      {/* Section Héros */}
      <section className="relative min-h-screen flex items-end justify-center overflow-hidden">
        {/* Image de couverture en arrière-plan */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/couverture-hag-2026.jpg)' }}
          role="img"
          aria-label="Logo Hospitality Awards Guinée"
        ></div>

        {/* Overlay léger : le logo de la bannière reste visible, le texte reste lisible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10"></div>

        <div className="container relative z-10 text-center pb-16 pt-40">
          <h1 className="sr-only">Hospitality Awards Guinée</h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto leading-relaxed drop-shadow mb-8">
            {SLOGAN} — {getTotalCategoriesCount()} prix en {getGroupsCount()} catégories
          </p>

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
            <Link to="/voter" className="btn btn-secondary btn-large">
              Voter
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

      {/* Haut patronage */}
      <section className="section section-alt">
        <div className="container">
          <div className="grid grid-2 items-center gap-12">
            <div className="overflow-hidden rounded-2xl shadow-xl bg-white">
              <img
                src="/patronage/moussa-moise-sylla.png"
                alt="Son Excellence Monsieur Moussa Moïse Sylla, Ministre de la Culture, du Tourisme et de l’Artisanat"
                className="w-full h-auto block object-cover"
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gold font-semibold mb-4">
                Haut patronage
              </p>
              <h2 className="mb-6 normal-case tracking-normal text-2xl md:text-3xl leading-snug">
                Sous le Haut Patronage de Son Excellence Monsieur{' '}
                <span className="text-gold">Moussa Moïse Sylla</span>, Ministre de la Culture, du
                Tourisme et de l’Artisanat
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Le Groupe LM, en collaboration avec le Ministère de la Culture, du Tourisme et de
                l’Artisanat et le Guinea Development Board (GDB), à travers la Direction Générale en
                charge de l’attractivité et du rayonnement de la Guinée, présente la deuxième
                édition des Hospitality Awards Guinée.
              </p>
              <p className="text-gray-600 mb-2">Placée sous le thème :</p>
              <p className="text-xl md:text-2xl font-heading font-bold text-blue-dark italic">
                « Célébrons l’Excellence de l’
                <span className="text-gold">Hospitalité Guinéenne</span> »
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section À propos */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2 items-center gap-12">
            <div>
              <h2 className="mb-6 normal-case tracking-normal text-3xl md:text-4xl leading-snug">
                Et si nous commencions enfin à célébrer celles et ceux qui font rayonner l’
                <span className="text-gold">hospitalité guinéenne</span> ?
              </h2>
              <p className="text-lg mb-4">
                Les <strong>Hospitality Awards Guinée</strong> sont bien plus qu’une cérémonie de remise de prix.
                C’est une initiative qui vise à mettre en lumière, valoriser et célébrer les talents, les
                entreprises et les initiatives qui contribuent chaque jour au développement de l’hospitalité
                en Guinée.
              </p>
              <p className="mb-8">
                Hôtellerie, restauration, tourisme, formation, culture, artisanat, innovation et expérience
                client : les Hospitality Awards Guinée créent un espace où l’excellence, le savoir-faire et
                l’innovation sont reconnus et récompensés.
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
                   <Link to="/voter" className="btn btn-primary btn-large">
                     Voter maintenant
                   </Link>
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