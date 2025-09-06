import React from 'react';
import { Award, Star, Calendar, MapPin, Quote } from 'lucide-react';

const Laureates: React.FC = () => {
  const currentLaureates = [
    {
      name: 'Hôtel Mariador Palace',
      category: 'Meilleur Hôtel de Luxe',
      year: '2023',
      location: 'Conakry',
      description: 'Excellence en service client et innovation technologique',
      achievements: ['5 étoiles', 'Certification internationale', 'Service 24h/24'],
      image: '/placeholder-hotel.jpg'
    },
    {
      name: 'Restaurant Le Gourmet',
      category: 'Meilleur Restaurant',
      year: '2023',
      location: 'Conakry',
      description: 'Cuisine fusion guinéenne-française d\'exception',
      achievements: ['Chef étoilé', 'Ingrédients locaux', 'Ambiance unique'],
      image: '/placeholder-restaurant.jpg'
    },
    {
      name: 'Transport Premium Guinée',
      category: 'Meilleur Service de Transport',
      year: '2023',
      location: 'Conakry',
      description: 'Transport de luxe avec service personnalisé',
      achievements: ['Flotte premium', 'Chauffeurs formés', 'Service VIP'],
      image: '/placeholder-transport.jpg'
    }
  ];

  const previousLaureates = [
    {
      year: '2022',
      laureates: [
        { name: 'Hôtel Royal', category: 'Meilleur Hôtel de Luxe' },
        { name: 'La Table du Chef', category: 'Meilleur Restaurant' },
        { name: 'Confort Express', category: 'Meilleur Service de Transport' }
      ]
    },
    {
      year: '2021',
      laureates: [
        { name: 'Hôtel Excellence', category: 'Meilleur Hôtel de Luxe' },
        { name: 'Le Petit Bistrot', category: 'Meilleur Restaurant' },
        { name: 'Voyages Guinée', category: 'Meilleur Service Touristique' }
      ]
    }
  ];

  return (
    <div className="Laureates pt-20">
      {/* Section Héros */}
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <h1 className="mb-6">
            Nos <span className="text-gold">Lauréats</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Découvrez les entreprises et organisations qui ont été récompensées 
            pour leur excellence dans le secteur de l'hospitalité guinéenne.
          </p>
        </div>
      </section>

      {/* Section Lauréats actuels */}
      <section className="section relative overflow-hidden">
        {/* Motif de fond */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-dark rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-dark mb-6">
              Lauréats <span className="text-gold">2023</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les entreprises et organisations récompensées pour leur excellence
            </p>
          </div>
          
          <div className="grid grid-3 gap-8">
            {currentLaureates.map((laureate, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="h-48 bg-gradient-to-br from-gold to-yellow-500 relative">
                    <div className="absolute top-4 right-4 bg-gold text-blue-dark px-3 py-1 rounded-full text-sm font-bold">
                      {laureate.year}
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <MapPin className="w-5 h-5 inline mr-2" />
                      {laureate.location}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <Award className="w-6 h-6 text-gold mr-2" />
                      <span className="text-sm text-gold font-semibold">{laureate.category}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-blue-dark mb-3">{laureate.name}</h3>
                    <p className="text-gray-600 mb-4">{laureate.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-blue-dark mb-2">Réalisations :</h4>
                      <ul className="space-y-1">
                        {laureate.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <Star className="w-3 h-3 text-gold mr-2" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-12">
            Témoignages des <span className="text-gold">lauréats</span>
          </h2>
          
          <div className="grid grid-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Quote className="w-12 h-12 text-gold mb-6" />
              <blockquote className="text-lg italic text-gray-700 mb-6">
                "Recevoir le prix du Meilleur Hôtel de Luxe aux HAG 2023 a été 
                un moment de fierté immense pour toute notre équipe. Cette reconnaissance 
                nous motive à continuer à innover et à offrir le meilleur service possible."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-yellow-500 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold text-blue-dark">Mamadou Diallo</div>
                  <div className="text-sm text-gray-600">Directeur Général, Hôtel Mariador Palace</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Quote className="w-12 h-12 text-gold mb-6" />
              <blockquote className="text-lg italic text-gray-700 mb-6">
                "Les Hospitality Awards Guinée ont mis en valeur notre engagement 
                pour une cuisine d'excellence. Cette récompense confirme que notre 
                passion pour la gastronomie guinéenne est reconnue et appréciée."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-yellow-500 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold text-blue-dark">Fatoumata Camara</div>
                  <div className="text-sm text-gray-600">Chef Propriétaire, Restaurant Le Gourmet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Historique des lauréats */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-12">
            Historique des <span className="text-gold">lauréats</span>
          </h2>
          
          <div className="space-y-8">
            {previousLaureates.map((year, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <Calendar className="w-8 h-8 text-gold mr-3" />
                  <h3 className="text-2xl font-bold text-blue-dark">Édition {year.year}</h3>
                </div>
                
                <div className="grid grid-3 gap-6">
                  {year.laureates.map((laureate, idx) => (
                    <div key={idx} className="text-center p-4 bg-gray-light rounded-lg">
                      <Award className="w-8 h-8 text-gold mx-auto mb-3" />
                      <h4 className="font-semibold text-blue-dark mb-2">{laureate.name}</h4>
                      <p className="text-sm text-gray-600">{laureate.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Galerie photos */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-12">
            Galerie <span className="text-gold">photos</span>
          </h2>
          
          <div className="grid grid-4 gap-4">
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="aspect-square bg-gradient-to-br from-gold to-yellow-500 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                  Photo {index + 1}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Découvrez les moments forts des cérémonies de remise des prix
            </p>
            <button className="btn btn-primary">
              Voir plus de photos
            </button>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="section bg-blue-dark text-white">
        <div className="container text-center">
          <h2 className="mb-6">
            Rejoignez les <span className="text-gold">lauréats</span> HAG
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Participez aux Hospitality Awards Guinée et faites partie de cette 
            célébration de l'excellence en hospitalité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/candidater" className="btn btn-primary btn-large">
              Candidater maintenant
            </a>
            <a href="/categories" className="btn btn-secondary btn-large">
              Voir les catégories
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Laureates; 