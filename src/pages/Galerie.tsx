import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Clapperboard, Mic, Quote, Sparkles, Image } from 'lucide-react';
import FirstEditionGallery from '../components/FirstEditionGallery';

const mediaTracks = [
  {
    icon: Camera,
    title: 'Portraits des nominés',
    text: 'Portraits officiels des nominés HAG 2026, à paraître au fil des validations.'
  },
  {
    icon: Clapperboard,
    title: 'Vidéos promotionnelles',
    text: 'Teasers, présentations de catégories et films de cérémonie.'
  },
  {
    icon: Mic,
    title: 'Interviews',
    text: 'Paroles de nominés, du comité d’organisation et des partenaires.'
  },
  {
    icon: Quote,
    title: 'Témoignages',
    text: 'Retours d’expérience des lauréats et des professionnels du secteur.'
  },
  {
    icon: Sparkles,
    title: 'Coulisses de l’organisation',
    text: 'Préparation du gala, panels, carnaval et moments d’équipe.'
  },
  {
    icon: Image,
    title: 'Galerie officielle de la cérémonie',
    text: 'Archives visuelles de la première édition, déjà disponibles ci-dessous.'
  }
];

const Galerie: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <h1 className="mb-4">
            Galerie <span className="text-gold">officielle</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Portraits, vidéos, interviews, témoignages et coulisses des Hospitality Awards Guinée.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {mediaTracks.map((track) => (
              <div key={track.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <track.icon className="w-8 h-8 text-gold mb-3" />
                <h2 className="text-lg font-bold text-blue-dark mb-2">{track.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{track.text}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-blue-dark text-center mb-8">
            Première édition — cérémonie
          </h2>
          <FirstEditionGallery />

          <div className="text-center mt-12">
            <Link to="/laureats" className="btn btn-primary">
              Consulter les lauréats
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Galerie;
