import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { getCategoriesGrouped, categoryGroups } from '../data/categories';

const Categories: React.FC = () => {
  const eligibilityCriteria = [
    'Être basé en Guinée ou avoir une présence significative dans le pays',
    'Opérer dans le secteur de l\'hospitalité, du tourisme ou des services connexes',
    'Avoir au moins 2 ans d\'expérience dans le domaine',
    'Être en conformité avec les réglementations locales',
    'Avoir un dossier de candidature complet et à jour'
  ];

  const categoriesGrouped = getCategoriesGrouped();

  return (
    <div className="Categories pt-20">
      {/* Section Héros */}
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <h1 className="mb-6">
            Catégories <span className="text-gold">Officielles</span> des Prix
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Découvrez les 25 récompenses organisées en 7 catégories officielles des Hospitality Awards Guinée et 
            trouvez celle qui correspond le mieux à votre excellence.
          </p>
        </div>
      </section>

      {/* Section Catégories */}
      <section className="section relative overflow-hidden">
        {/* Motif de fond */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-dark rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-dark mb-6">
              Nos <span className="text-gold">25 récompenses</span> en 7 catégories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les récompenses officielles organisées par catégories par les Hospitality Awards Guinée pour récompenser l'excellence dans le secteur
            </p>
          </div>
          
          {/* Affichage par groupes */}
          {categoryGroups.map((groupName) => (
            <div key={groupName} className="mb-16">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-blue-dark mb-2">
                  <span className="text-gold">{groupName}</span>
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full"></div>
                <p className="text-gray-600 mt-3">
                  {categoriesGrouped[groupName]?.length} récompense{categoriesGrouped[groupName]?.length > 1 ? 's' : ''} dans cette catégorie
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {categoriesGrouped[groupName]?.map((category) => (
                  <div key={category.id} className="group">
                    <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden relative">
                      {/* Numéro de catégorie */}
                      <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-gold to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {category.id}
                      </div>
                      
                      {/* Indicateur de catégorie */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/20 to-yellow-500/20 rounded-full -translate-y-16 translate-x-16"></div>
                      
                      <div className="w-24 h-24 bg-gradient-to-br from-gold to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg ml-auto">
                        <category.icon className="w-12 h-12 text-blue-dark" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 text-blue-dark group-hover:text-gold transition-colors leading-tight">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed text-sm">{category.description}</p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-blue-dark mb-3 text-sm">Critères d'évaluation :</h4>
                        <ul className="space-y-2">
                          {category.criteria.slice(0, 3).map((criterion, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <Star className="w-3 h-3 text-gold mt-1 flex-shrink-0" />
                              <span className="text-gray-700 text-sm leading-relaxed">{criterion}</span>
                            </li>
                          ))}
                          {category.criteria.length > 3 && (
                            <li className="text-sm text-gold font-medium">
                              +{category.criteria.length - 3} autres critères...
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div className="bg-gold/10 p-4 rounded-lg border border-gold/20">
                        <h4 className="font-semibold text-gold mb-2 text-sm">Récompense :</h4>
                        <p className="text-blue-dark font-medium text-sm">{category.prize}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Critères d'éligibilité */}
      <section className="section section-alt">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">
              Critères d'<span className="text-gold">éligibilité</span>
            </h2>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {eligibilityCriteria.map((criterion, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700 leading-relaxed">{criterion}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Processus de sélection */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-12">
            Processus de <span className="text-gold">sélection</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-dark">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Candidature</h3>
              <p className="text-gray-600">
                Soumettez votre dossier complet via notre formulaire en ligne
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-dark">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Évaluation</h3>
              <p className="text-gray-600">
                Notre jury d'experts évalue chaque candidature selon des critères stricts
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-dark">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Cérémonie</h3>
              <p className="text-gray-600">
                Les lauréats sont annoncés lors de la cérémonie officielle de remise des prix
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="section bg-blue-dark text-white">
        <div className="container text-center">
          <h2 className="mb-6">
            Prêt à <span className="text-gold">candidater</span> ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Choisissez votre récompense parmi nos 25 récompenses organisées en 7 catégories officielles et soumettez votre candidature pour 
            les Hospitality Awards Guinée 2025.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/candidater" className="btn btn-primary btn-large">
              Candidater maintenant
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

export default Categories; 