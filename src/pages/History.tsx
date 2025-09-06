import React from 'react';
import { Calendar, Award, Users, MapPin, Star, ArrowRight } from 'lucide-react';

const History: React.FC = () => {
  const editions = [
    {
      year: '2024',
      theme: 'Innovation et Excellence',
      location: 'Palais des Nations, Conakry',
      date: 'À venir - Décembre 2024',
      highlights: [
        '41 candidats officiels sélectionnés',
        '13 catégories de prix',
        'Première édition inaugurale',
        'Cérémonie de lancement historique',
        'Critères de sélection détaillés',
        'Vidéos de présentation pour chaque candidat'
      ],
      laureates: [
        { name: 'À déterminer', category: 'Meilleur Guide Touristique de l\'année' },
        { name: 'À déterminer', category: 'Meilleure Équipe en Housekeeping de l\'année' },
        { name: 'À déterminer', category: 'Meilleure Brigade de Cuisine de l\'année' }
      ],
      stats: { candidates: 41, categories: 13, attendees: 500, media: 25, videos: 41 }
    }
  ];

  const milestones = [
    {
      year: '2024',
      title: 'Création des HAG',
      description: 'Lancement officiel des Hospitality Awards Guinée par Faya Maurice MILLIMOUNO'
    },
    {
      year: '2024',
      title: 'Sélection des candidats',
      description: 'Identification et sélection de 41 candidats officiels dans 13 catégories'
    },
    {
      year: '2024',
      title: 'Lancement de la plateforme',
      description: 'Mise en ligne de la plateforme de vote et de candidature'
    },
    {
      year: '2024',
      title: 'Première édition',
      description: 'Organisation de la première cérémonie inaugurale des HAG'
    }
  ];

  return (
    <div className="History pt-20">
      {/* Section Héros */}
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <h1 className="mb-6">
            Historique des <span className="text-gold">éditions</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Découvrez l'évolution des Hospitality Awards Guinée depuis leur création 
            et revivez les moments forts de chaque édition.
          </p>
        </div>
      </section>

      {/* Section Éditions récentes */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-12">
            Éditions <span className="text-gold">récentes</span>
          </h2>
          
          <div className="space-y-12">
            {editions.map((edition, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-dark to-blue-deep p-8 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Calendar className="w-8 h-8 text-gold" />
                      <h3 className="text-3xl font-bold">Édition {edition.year}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-gold font-semibold">{edition.theme}</div>
                      <div className="text-sm opacity-90">{edition.date}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{edition.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{edition.stats.candidates} candidats</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span>{edition.stats.categories} catégories</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-2 gap-8 mb-8">
                    <div>
                      <h4 className="font-semibold text-blue-dark mb-4">Points forts :</h4>
                      <ul className="space-y-2">
                        {edition.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-gold" />
                            <span className="text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-blue-dark mb-4">Lauréats principaux :</h4>
                      <div className="space-y-3">
                        {edition.laureates.map((laureate, idx) => (
                          <div key={idx} className="bg-gray-light p-3 rounded-lg">
                            <div className="font-medium text-blue-dark">{laureate.name}</div>
                            <div className="text-sm text-gray-600">{laureate.category}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Statistiques */}
                  <div className="bg-gray-light p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-dark mb-4 text-center">Statistiques de l'édition</h4>
                    <div className="grid grid-5 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-gold">{edition.stats.candidates}</div>
                        <div className="text-sm text-gray-600">Candidats</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gold">{edition.stats.categories}</div>
                        <div className="text-sm text-gray-600">Catégories</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gold">{edition.stats.attendees}</div>
                        <div className="text-sm text-gray-600">Participants</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gold">{edition.stats.media}</div>
                        <div className="text-sm text-gray-600">Médias</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gold">{edition.stats.videos}</div>
                        <div className="text-sm text-gray-600">Vidéos</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Jalons historiques */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-12">
            Jalons <span className="text-gold">historiques</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Ligne de temps */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gold"></div>
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-blue-dark font-bold text-lg z-10">
                      {milestone.year}
                    </div>
                    
                    <div className="ml-8 bg-white p-6 rounded-lg shadow-md flex-1">
                      <h3 className="text-xl font-bold text-blue-dark mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Évolution des catégories */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-12">
            Évolution des <span className="text-gold">catégories</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-blue-dark mb-4">Première Édition 2024</h3>
                <p className="text-gray-600">13 catégories officielles sélectionnées pour cette édition inaugurale</p>
              </div>
              
              <div className="grid grid-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-blue-dark mb-4">Secteur Hôtelier</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Meilleure Équipe en Housekeeping de l'année</li>
                    <li>• Meilleure Brigade de Cuisine de l'année</li>
                    <li>• Meilleure Équipe de Service en Salle de l'année</li>
                    <li>• Meilleure Equipe d'accueil et Service Client de l'année</li>
                    <li>• Meilleur Hôtel Milieu de Gamme de l'année</li>
                    <li>• Meilleur Groupe Hôtelier de l'année</li>
                    <li>• Meilleur Écolodge ou écoresponsable de l'année</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-blue-dark mb-4">Secteur Touristique</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Meilleur Guide Touristique de l'année</li>
                    <li>• Meilleure Agence de Voyage de l'année</li>
                    <li>• Meilleur Club de Plage de l'année</li>
                    <li>• Meilleur projet Tourisme Culturel de l'année</li>
                    <li>• Meilleure Initiative RSE de l'année</li>
                    <li>• Meilleur Etablissement de Formation de l'année</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="section bg-blue-dark text-white">
        <div className="container text-center">
          <h2 className="mb-6">
            Faites partie de l'<span className="text-gold">histoire</span> HAG
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Participez à la prochaine édition des Hospitality Awards Guinée et 
            laissez votre empreinte dans l'histoire de l'hospitalité guinéenne.
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

export default History; 