import React from 'react';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const articles = [
    {
      id: 1,
      title: 'Les Hospitality Awards Guinée 2024 : Première édition inaugurale',
      excerpt: 'Découvrez les détails de cette première édition historique des HAG avec 41 candidats officiels, 13 catégories et critères de sélection détaillés...',
      author: 'Équipe HAG',
      date: '15 Novembre 2024',
      category: 'Actualités',
      readTime: '5 min',
      image: '/blog-1.jpg'
    },
    {
      id: 2,
      title: 'Interview exclusive : Faya Maurice MILLIMOUNO lance les HAG',
      excerpt: 'Le commissaire général des HAG nous présente sa vision pour cette première édition...',
      author: 'Marie Konaté',
      date: '10 Novembre 2024',
      category: 'Interviews',
      readTime: '8 min',
      image: '/blog-2.jpg'
    },
    {
      id: 3,
      title: 'Innovation technologique dans l\'hospitalité : Les tendances 2024',
      excerpt: 'Comment la technologie transforme le secteur de l\'hospitalité en Guinée et en Afrique...',
      author: 'Dr. Amadou Diallo',
      date: '5 Novembre 2024',
      category: 'Innovation',
      readTime: '6 min',
      image: '/blog-3.jpg'
    },
    {
      id: 4,
      title: 'Présentation des 41 candidats officiels des HAG 2024',
      excerpt: 'Découvrez les candidats sélectionnés pour cette première édition dans 13 catégories avec leurs critères de sélection et vidéos de présentation...',
      author: 'Équipe HAG',
      date: '1 Novembre 2024',
      category: 'Candidats',
      readTime: '7 min',
      image: '/blog-4.jpg'
    },
    {
      id: 5,
      title: 'Le tourisme durable en Guinée : Un enjeu majeur pour l\'avenir',
      excerpt: 'Comment développer un tourisme responsable qui préserve nos ressources naturelles...',
      author: 'Fatoumata Camara',
      date: '28 Octobre 2024',
      category: 'Développement durable',
      readTime: '9 min',
      image: '/blog-5.jpg'
    },
    {
      id: 6,
      title: 'Formation et excellence : Les clés du succès en hospitalité',
      excerpt: 'L\'importance de la formation continue pour maintenir des standards de qualité élevés...',
      author: 'Prof. Mamadou Bah',
      date: '25 Octobre 2024',
      category: 'Formation',
      readTime: '6 min',
      image: '/blog-6.jpg'
    }
  ];

  const categories = [
    'Toutes', 'Actualités', 'Interviews', 'Innovation', 'Candidats', 'Développement durable', 'Formation'
  ];

  return (
    <div className="Blog pt-20">
      {/* Section Héros */}
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <h1 className="mb-6">
            Blog & <span className="text-gold">Actualités</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Restez informés des dernières nouvelles du secteur de l'hospitalité guinéenne 
            et découvrez des articles exclusifs sur les HAG.
          </p>
        </div>
      </section>

      {/* Section Articles */}
      <section className="section">
        <div className="container">
          {/* Filtres par catégorie */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  index === 0 
                    ? 'bg-gold text-blue-dark' 
                    : 'bg-gray-light text-blue-dark hover:bg-gold hover:text-blue-dark'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grille des articles */}
          <div className="grid grid-2 gap-8">
            {articles.map((article) => (
              <article key={article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-gold to-yellow-500 relative">
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-dark text-white px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 text-blue-dark px-2 py-1 rounded text-sm">
                    {article.readTime}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-blue-dark mb-3 leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <button className="inline-flex items-center text-gold font-semibold hover:text-blue-deep transition-colors">
                    Lire la suite
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-2">
              <button className="px-4 py-2 text-gray-500 hover:text-blue-dark disabled:opacity-50">
                Précédent
              </button>
              <button className="px-4 py-2 bg-gold text-blue-dark rounded-lg font-medium">1</button>
              <button className="px-4 py-2 text-gray-500 hover:text-blue-dark">2</button>
              <button className="px-4 py-2 text-gray-500 hover:text-blue-dark">3</button>
              <button className="px-4 py-2 text-gray-500 hover:text-blue-dark">
                Suivant
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* Section Newsletter */}
      <section className="section section-alt">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-dark mb-6">
              Restez <span className="text-gold">informés</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Recevez nos dernières actualités et articles directement dans votre boîte mail.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              />
              <button className="btn btn-primary">
                S'abonner
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              Nous respectons votre vie privée. Désabonnez-vous à tout moment.
            </p>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="section bg-blue-dark text-white">
        <div className="container text-center">
          <h2 className="mb-6">
            Participez aux <span className="text-gold">HAG 2024</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Découvrez nos articles et actualités, puis rejoignez-nous pour 
            célébrer l'excellence en hospitalité.
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

export default Blog; 