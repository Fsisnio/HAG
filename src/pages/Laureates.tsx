import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Calendar } from 'lucide-react';
import { laureateEditions } from '../data/laureates';
import FirstEditionGallery from '../components/FirstEditionGallery';

const Laureates: React.FC = () => {
  const [activeYear, setActiveYear] = useState(2025);
  const edition = laureateEditions.find((item) => item.year === activeYear) || laureateEditions[0];

  return (
    <div className="pt-20">
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <Award className="w-12 h-12 text-gold mx-auto mb-4" />
          <h1 className="mb-4">
            Les <span className="text-gold">lauréats</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Mémoire officielle de l’excellence de l’hospitalité guinéenne, édition après édition.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {laureateEditions.map((item) => (
              <button
                key={item.year}
                type="button"
                onClick={() => setActiveYear(item.year)}
                className={`px-5 py-2 rounded-full text-sm font-medium ${
                  activeYear === item.year
                    ? 'bg-blue-dark text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Lauréats {item.year}
              </button>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-dark mb-3">{edition.title}</h2>
            <p className="text-gray-600 leading-relaxed">{edition.summary}</p>
          </div>

          {edition.laureates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {edition.laureates.map((laureate) => (
                <article key={`${laureate.name}-${laureate.category}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {laureate.photo && (
                    <div className="aspect-[16/10] bg-blue-dark">
                      <img src={laureate.photo} alt={laureate.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-sm font-semibold text-gold">{laureate.category}</p>
                    <h3 className="text-xl font-bold text-blue-dark mt-1">{laureate.name}</h3>
                    {laureate.organization && (
                      <p className="text-sm text-gray-600 mt-1">{laureate.organization}</p>
                    )}
                    {laureate.justification && (
                      <p className="text-sm text-gray-700 mt-3 leading-relaxed">{laureate.justification}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="max-w-xl mx-auto text-center bg-gray-50 rounded-2xl p-10 mb-16">
              <Calendar className="w-10 h-10 text-gold mx-auto mb-3" />
              <p className="text-gray-700">
                {edition.status === 'upcoming'
                  ? 'Les fiches des lauréats 2026 seront publiées après la cérémonie du 11 décembre.'
                  : 'Cette archive sera ouverte à l’issue de l’édition concernée.'}
              </p>
            </div>
          )}

          {activeYear === 2025 && (
            <div>
              <h3 className="text-2xl font-bold text-blue-dark text-center mb-8">
                Galerie officielle de la cérémonie
              </h3>
              <FirstEditionGallery />
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/galerie" className="btn btn-secondary">
              Voir la galerie HAG
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Laureates;
