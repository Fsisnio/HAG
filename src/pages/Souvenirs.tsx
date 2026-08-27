import React from 'react';
import { Link } from 'react-router-dom';
import FirstEditionGallery from '../components/FirstEditionGallery';

const Souvenirs: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <h1 className="mb-6">
            Souvenirs de la <span className="text-gold">1ère édition</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Revivez la soirée de distinction organisée par Le Groupe LM :
            discours, remise des Étoiles d’Honneur, lauréats et équipe d’accueil.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <FirstEditionGallery />
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/laureats" className="btn btn-primary">
              Voir les lauréats
            </Link>
            <Link to="/galerie" className="btn btn-secondary">
              Galerie officielle
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Souvenirs;
