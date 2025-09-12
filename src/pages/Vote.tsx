import React, { useState, useEffect } from 'react';
import { Vote as VoteIcon, Heart, Users, Award, Star, CheckCircle, ArrowLeft } from 'lucide-react';
import VoteStats from '../components/VoteStats';
import VoteButton from '../components/VoteButton';
import { officialCategories } from '../data/categories';
import { getAllOfficialCandidates, getCandidatesByCategory } from '../data/officialCandidates';
import { validateVote, validateCandidatesUniqueness } from '../utils/voteValidation';

// Composant pour l'affichage des étoiles de notation
const StarRating: React.FC<{
  rating: number;
  totalRatings: number;
  userRating?: number;
  onRatingChange: (rating: number) => void;
  interactive?: boolean;
}> = ({ rating, totalRatings, userRating, onRatingChange, interactive = true }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= (hoverRating || userRating || rating);
          const isHovered = star <= hoverRating;
          
          return (
            <button
              key={star}
              type="button"
              onClick={() => interactive && onRatingChange(star)}
              onMouseEnter={() => interactive && setHoverRating(star)}
              onMouseLeave={() => interactive && setHoverRating(0)}
              disabled={!interactive}
              className={`transition-colors ${
                interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
              }`}
            >
              <Star 
                className={`w-4 h-4 ${
                  isFilled 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                } ${isHovered ? 'text-yellow-300' : ''}`}
              />
            </button>
          );
        })}
      </div>
      <span className="text-sm text-gray-600">
        {rating.toFixed(1)} ({totalRatings} avis)
      </span>
    </div>
  );
};

interface Candidate {
  id: number;
  name: string;
  organization: string;
  category: string;
  description: string;
  image: string;
  votes: number;
  isVoted: boolean;
  rating: number;
  totalRatings: number;
  userRating?: number; // Note donnée par l'utilisateur actuel
}

const VotePage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentView, setCurrentView] = useState<'categories' | 'candidates'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Charger les candidats officiels
  useEffect(() => {
    try {
      // Effacer les anciennes données de ratings pour repartir à zéro
      localStorage.removeItem('hag_candidates_ratings');
      
      // Charger les candidats officiels
      const officialCandidates = getAllOfficialCandidates();
      
      // Charger seulement les votes sauvegardés (pas les ratings)
      const savedVotes = localStorage.getItem('hag_candidates_votes');
      
      const votesData = savedVotes ? JSON.parse(savedVotes) : [];
      
      // Convertir au format attendu et utiliser les nouvelles données (rating: 0)
      const formattedCandidates = officialCandidates.map(candidate => {
        const savedVote = votesData.find((c: any) => c.id === candidate.id);
        
        // Validation des données de vote sauvegardées
        const votes = savedVote?.votes !== undefined ? savedVote.votes : (candidate.votes || 0);
        const isVoted = savedVote?.isVoted === true ? true : (candidate.isVoted || false);
        
        return {
          id: candidate.id,
          name: candidate.name,
          organization: candidate.name,
          category: candidate.category,
          description: candidate.description || 'Candidat officiel des Hospitality Awards Guinée',
          image: '/placeholder-hotel.jpg',
          votes: Math.max(0, votes), // S'assurer que les votes ne sont pas négatifs
          isVoted: isVoted,
          rating: candidate.rating || 0, // Utiliser les nouvelles données (0)
          totalRatings: candidate.totalRatings || 0, // Utiliser les nouvelles données (0)
          userRating: undefined // Pas de rating utilisateur au début
        };
      });

      setCandidates(formattedCandidates);
      
      // Valider l'unicité des candidats
      const validation = validateCandidatesUniqueness(formattedCandidates);
      if (!validation.isValid) {
        console.error('❌ Problèmes de validation des candidats:', validation.errors);
      }
      if (validation.warnings.length > 0) {
        console.warn('⚠️ Avertissements de validation:', validation.warnings);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des candidats:', error);
    }
  }, []);

  const [sortBy, setSortBy] = useState<'votes' | 'name'>('votes');
  const [showVoteSuccess, setShowVoteSuccess] = useState(false);
  const [votedCandidate, setVotedCandidate] = useState<string>('');
  const [votingInProgress, setVotingInProgress] = useState<Set<number>>(new Set());


  // Fonction pour sélectionner une catégorie
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('candidates');
  };

  // Fonction pour retourner aux catégories
  const handleBackToCategories = () => {
    setCurrentView('categories');
    setSelectedCategory('');
  };

  const handleVote = (candidateId: number, candidateName: string, candidateCategory: string) => {
    console.log('🔄 Vote pour:', candidateName, 'ID:', candidateId, 'Catégorie:', candidateCategory);
    
    // Validation complète du vote
    const validation = validateVote(candidateId, candidateName, candidateCategory, candidates);
    
    if (!validation.isValid) {
      console.error('❌ Validation échouée:', validation.errors);
      return;
    }
    
    if (validation.warnings.length > 0) {
      console.warn('⚠️ Avertissements:', validation.warnings);
    }
    
    // Trouver le candidat
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate) {
      console.error('❌ Candidat non trouvé:', candidateId);
      return;
    }
    
    // Vérifier si déjà voté
    if (candidate.isVoted) {
      console.warn('⚠️ Déjà voté pour:', candidate.name);
      return;
    }
    
    // Vérifier si vote en cours
    if (votingInProgress.has(candidateId)) {
      console.warn('⚠️ Vote en cours pour:', candidate.name);
      return;
    }

    // Marquer comme en cours
    setVotingInProgress(prev => new Set(prev).add(candidateId));

    // Simuler un délai de traitement
    setTimeout(() => {
      // Mettre à jour le candidat
      setCandidates(prev => {
        const updated = prev.map(c => 
          c.id === candidateId 
            ? { ...c, votes: c.votes + 1, isVoted: true }
            : c
        );
        
        // Sauvegarder seulement les données de vote (pas tout l'objet candidat)
        const voteData = updated.map(c => ({
          id: c.id,
          votes: c.votes,
          isVoted: c.isVoted
        }));
        localStorage.setItem('hag_candidates_votes', JSON.stringify(voteData));
        
        return updated;
      });

      // Afficher succès
      setVotedCandidate(candidate.name);
      setShowVoteSuccess(true);
      
      // Masquer le message après 3 secondes
      setTimeout(() => setShowVoteSuccess(false), 3000);
      
      // Retirer du vote en cours
      setVotingInProgress(prev => {
        const newSet = new Set(prev);
        newSet.delete(candidateId);
        return newSet;
      });
    }, 500);
  };

  // Gérer la notation avec des étoiles
  const handleRating = (candidateId: number, rating: number) => {
    setCandidates(prev => {
      const updatedCandidates = prev.map(candidate => {
        if (candidate.id === candidateId) {
          // Si c'est le premier rating de cet utilisateur
          const newTotalRatings = candidate.userRating ? candidate.totalRatings : candidate.totalRatings + 1;
          const newRating = candidate.userRating 
            ? ((candidate.rating * candidate.totalRatings - candidate.userRating + rating) / candidate.totalRatings)
            : ((candidate.rating * candidate.totalRatings + rating) / newTotalRatings);
          
          return {
            ...candidate,
            rating: Math.round(newRating * 10) / 10, // Arrondir à 1 décimale
            totalRatings: newTotalRatings,
            userRating: rating
          };
        }
        return candidate;
      });

      // Sauvegarder seulement les données de rating dans localStorage
      const ratingData = updatedCandidates.map(c => ({
        id: c.id,
        rating: c.rating,
        totalRatings: c.totalRatings,
        userRating: c.userRating
      }));
      localStorage.setItem('hag_candidates_ratings', JSON.stringify(ratingData));
      
      return updatedCandidates;
    });
  };

  // Filtrer les candidats par catégorie
  const filteredCandidates = selectedCategory === '' 
    ? candidates 
    : candidates.filter(candidate => candidate.category === selectedCategory);

  // Trier les candidats
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === 'votes') {
      return b.votes - a.votes;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Votez pour l'Excellence</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Participez aux Hospitality Awards Guinée en votant pour vos établissements préférés. 
              Chaque vote compte pour récompenser l'excellence dans le secteur touristique guinéen.
            </p>
            </div>
          </div>
        </div>

          {/* Statistiques de vote */}
            <VoteStats
              totalVotes={candidates.reduce((sum, candidate) => sum + candidate.votes, 0)}
              totalCandidates={candidates.length}
              topCategory={candidates.length > 0 ? candidates.reduce((top, current) => 
                current.votes > top.votes ? current : top
              ).category : 'Aucune'}
              participationRate={candidates.length > 0 ? Math.round((candidates.reduce((sum, candidate) => sum + candidate.votes, 0) / (candidates.length * 100)) * 100) : 0}
              averageRating={candidates.length > 0 ? candidates.reduce((sum, candidate) => sum + candidate.rating, 0) / candidates.length : 0}
            />

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentView === 'categories' ? (
          // Vue des catégories
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choisissez une catégorie</h2>
              <p className="text-lg text-gray-600">Sélectionnez la catégorie pour laquelle vous souhaitez voter</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {officialCategories.map((category) => {
                const IconComponent = category.icon;
                const candidateCount = getCandidatesByCategory(category.title).length;
                
                return (
                  <div
                    key={category.id}
                    onClick={() => handleCategorySelect(category.title)}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-sm text-blue-600 font-medium">
                        <Users className="w-4 h-4" />
                        <span>{candidateCount} candidat{candidateCount > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // Vue des candidats
          <div>
            {/* En-tête de la catégorie sélectionnée */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToCategories}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Retour aux catégories</span>
                </button>
              </div>
              <div className="text-sm text-gray-600">
                {filteredCandidates.length} candidat(s) dans cette catégorie
              </div>
            </div>

            {/* Filtres et tri */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="min-w-[150px]">
                    <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                      Trier par
                    </label>
                    <select
                      id="sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'votes' | 'name')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="votes">Popularité</option>
                      <option value="name">Nom</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Message de succès */}
            {showVoteSuccess && (
              <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Vote enregistré pour {votedCandidate} !</span>
              </div>
            )}

            {/* Liste des candidats */}
            {sortedCandidates.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <VoteIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun candidat trouvé</h3>
                <p className="text-gray-500">
                  Aucun candidat n'est disponible dans cette catégorie pour le moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedCandidates.map((candidate) => {
                  console.log('🎨 Rendu du candidat:', { id: candidate.id, name: candidate.name, isVoted: candidate.isVoted });
                  return (
                  <div key={candidate.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                    {/* Image du candidat */}
                    <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3 overflow-hidden">
                          <img 
                            src="./Logo HAG.png" 
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
                          <div className="w-full h-full flex items-center justify-center" style={{display: 'none'}}>
                            <Award className="w-8 h-8" />
                          </div>
                        </div>
                        <p className="text-sm font-medium">{candidate.organization}</p>
                      </div>
                    </div>
                    
                    {/* Informations du candidat */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{candidate.name}</h3>
                        <p className="text-gray-600 text-sm">{candidate.description}</p>
                      </div>
                        
                      {/* Statistiques */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-gray-600">{candidate.votes} votes</span>
                        </div>
                        <StarRating
                          rating={candidate.rating}
                          totalRatings={candidate.totalRatings}
                          userRating={candidate.userRating}
                          onRatingChange={(rating) => handleRating(candidate.id, rating)}
                          interactive={true}
                        />
                      </div>
                      
                      {/* Action de vote */}
                      <div className="space-y-3">
                        <VoteButton
                          candidateId={candidate.id}
                          candidateName={candidate.name}
                          candidateCategory={candidate.category}
                          isVoted={candidate.isVoted}
                          isVoting={votingInProgress.has(candidate.id)}
                          onVote={handleVote}
                          disabled={false}
                        />
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Informations sur le vote */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">1. Choisissez</h3>
              <p className="text-blue-700">Sélectionnez une catégorie puis votre candidat préféré</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <VoteIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">2. Votez</h3>
              <p className="text-blue-700">Cliquez sur "Voter" pour donner votre voix au candidat</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">3. Gagnez</h3>
              <p className="text-blue-700">Les gagnants seront annoncés lors de la cérémonie des awards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotePage; 