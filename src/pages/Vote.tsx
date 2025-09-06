import React, { useState, useEffect } from 'react';
import { Vote as VoteIcon, Heart, Users, Award, Star, CheckCircle, XCircle } from 'lucide-react';
import VoteStats from '../components/VoteStats';
import PremiumVoteModal from '../components/PremiumVoteModal';
import { officialCategories } from '../data/categories';
import { getAllOfficialCandidates, getCandidatesByCategory, getCategoriesWithCandidates } from '../data/officialCandidates';

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

  // Charger les candidats officiels
  useEffect(() => {
    try {
      // Charger les candidats officiels
      const officialCandidates = getAllOfficialCandidates();
      
      // Convertir au format attendu
      const formattedCandidates = officialCandidates.map(candidate => ({
        id: candidate.id,
        name: candidate.name,
        organization: candidate.name,
        category: candidate.category,
        description: candidate.description || 'Candidat officiel des Hospitality Awards Guinée',
        image: '/placeholder-hotel.jpg',
        votes: candidate.votes || 0,
        isVoted: candidate.isVoted || false,
        rating: candidate.rating || 4.0,
        totalRatings: candidate.totalRatings || 0,
        userRating: candidate.userRating
      }));

      setCandidates(formattedCandidates);

      // Charger les notes et votes sauvegardés
      const savedRatings = localStorage.getItem('hag_candidates_ratings');
      const savedVotes = localStorage.getItem('hag_candidates_votes');
      
      if (savedRatings || savedVotes) {
        const ratingsData = savedRatings ? JSON.parse(savedRatings) : [];
        const votesData = savedVotes ? JSON.parse(savedVotes) : [];
        
        setCandidates(prev => prev.map(candidate => {
          const savedRating = ratingsData.find((c: any) => c.id === candidate.id);
          const savedVote = votesData.find((c: any) => c.id === candidate.id);
          
          return {
            ...candidate,
            rating: savedRating?.rating || candidate.rating,
            totalRatings: savedRating?.totalRatings || candidate.totalRatings,
            userRating: savedRating?.userRating,
            votes: savedVote?.votes || candidate.votes,
            isVoted: savedVote?.isVoted || candidate.isVoted
          };
        }));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des candidats:', error);
    }
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [sortBy, setSortBy] = useState<'votes' | 'name'>('votes');
  const [showVoteSuccess, setShowVoteSuccess] = useState(false);
  const [votedCandidate, setVotedCandidate] = useState<string>('');
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedPremiumVote, setSelectedPremiumVote] = useState<{
    type: 'bronze' | 'silver' | 'gold';
    candidateName: string;
    candidateCategory: string;
  } | null>(null);

  const categories = ['Toutes', ...getCategoriesWithCandidates()];

  const handleVote = (candidateId: number) => {
    setCandidates(prev => prev.map(candidate => {
      if (candidate.id === candidateId) {
        return {
          ...candidate,
          votes: candidate.votes + 1,
          isVoted: true
        };
      }
      return candidate;
    }));

    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      setVotedCandidate(candidate.name);
      setShowVoteSuccess(true);
      
      // Sauvegarder les votes dans localStorage
      const updatedCandidates = candidates.map(c => {
        if (c.id === candidateId) {
          return {
            ...c,
            votes: c.votes + 1,
            isVoted: true
          };
        }
        return c;
      });
      localStorage.setItem('hag_candidates_votes', JSON.stringify(updatedCandidates));
      
      // Masquer le message de succès après 3 secondes
      setTimeout(() => {
        setShowVoteSuccess(false);
      }, 3000);
    }
  };

  // Gérer la notation avec des étoiles
  const handleRating = (candidateId: number, rating: number) => {
    setCandidates(prev => prev.map(candidate => {
      if (candidate.id === candidateId) {
        const newTotalRatings = candidate.totalRatings + 1;
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
    }));

    // Sauvegarder dans localStorage
    const updatedCandidates = candidates.map(candidate => {
      if (candidate.id === candidateId) {
        return {
          ...candidate,
          rating: candidate.rating,
          totalRatings: candidate.totalRatings,
          userRating: rating
        };
      }
      return candidate;
    });
    localStorage.setItem('hag_candidates_ratings', JSON.stringify(updatedCandidates));
  };

  const handlePremiumVote = (type: 'bronze' | 'silver' | 'gold', candidateName: string, candidateCategory: string) => {
    setSelectedPremiumVote({ type, candidateName, candidateCategory });
    setShowPremiumModal(true);
  };

  // Filtrer les candidats par catégorie
  const filteredCandidates = selectedCategory === 'Toutes' 
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
          {/* Filtres et tri */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="min-w-[200px]">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
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

            <div className="text-sm text-gray-600">
              {filteredCandidates.length} candidat(s) trouvé(s)
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
              {selectedCategory === 'Toutes' 
                ? 'Aucun candidat n\'est disponible pour le moment.' 
                : `Aucun candidat trouvé dans la catégorie "${selectedCategory}".`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCandidates.map((candidate) => (
              <div key={candidate.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                {/* Image du candidat */}
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3 overflow-hidden">
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
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                      {candidate.category}
                    </span>
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
                    
                  {/* Actions */}
                     <div className="space-y-3">
                       <button
                         onClick={() => handleVote(candidate.id)}
                         disabled={candidate.isVoted}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                           candidate.isVoted
                          ? 'bg-green-100 text-green-800 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                         }`}
                       >
                         {candidate.isVoted ? (
                        <span className="flex items-center justify-center space-x-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>Voté</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center space-x-2">
                          <VoteIcon className="w-4 h-4" />
                          <span>Voter</span>
                        </span>
                         )}
                       </button>

                    <div className="grid grid-cols-3 gap-2">
                           <button
                             onClick={() => handlePremiumVote('bronze', candidate.name, candidate.category)}
                        className="py-2 px-3 text-xs font-medium bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors"
                           >
                        Bronze
                           </button>
                           <button
                             onClick={() => handlePremiumVote('silver', candidate.name, candidate.category)}
                        className="py-2 px-3 text-xs font-medium bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                           >
                        Argent
                           </button>
                           <button
                             onClick={() => handlePremiumVote('gold', candidate.name, candidate.category)}
                        className="py-2 px-3 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
                           >
                        Or
                           </button>
                     </div>
                  </div>
                </div>
              </div>
            ))}
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
              <p className="text-blue-700">Sélectionnez votre candidat préféré dans la catégorie de votre choix</p>
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

      {/* Modal de vote premium */}
       {selectedPremiumVote && (
        <PremiumVoteModal
          isOpen={showPremiumModal}
           onClose={() => setShowPremiumModal(false)}
          voteType={selectedPremiumVote.type}
          candidateName={selectedPremiumVote.candidateName}
          candidateCategory={selectedPremiumVote.candidateCategory}
        />
      )}
    </div>
  );
};

export default VotePage; 