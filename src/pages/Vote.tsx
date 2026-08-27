import React, { useState, useEffect } from 'react';
import { Vote as VoteIcon, Heart, Users, Award, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import VoteStats from '../components/VoteStats';
import VoteButton from '../components/VoteButton';
import { officialCategories, getCategoriesGrouped } from '../data/categories';
import { getAllOfficialCandidates, getCandidatesByCategory } from '../data/officialCandidates';
import votePaymentHandler from '../services/votePaymentHandler';
import { formatGnf, isVotingOpen, VOTE_AMOUNT_GNF, VOTES_END, VOTES_START } from '../data/event';
import { fetchVoteTotals } from '../services/adminData';

interface Candidate {
  id: number;
  name: string;
  organization: string;
  category: string;
  description: string;
  votes: number;
}

const VotePage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentView, setCurrentView] = useState<'categories' | 'candidates'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [paymentMessage, setPaymentMessage] = useState<string>('');
  const [paymentMessageType, setPaymentMessageType] = useState<'success' | 'error' | ''>('');
  const [sortBy, setSortBy] = useState<'votes' | 'name'>('votes');
  const [isLoadingVotes, setIsLoadingVotes] = useState(true);
  const groupedCategories = getCategoriesGrouped();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let cancelled = false;

    votePaymentHandler.handlePaymentReturn(urlParams).then((result) => {
      if (cancelled || !result.message) return;
      setPaymentMessage(result.message);
      setPaymentMessageType(result.success ? 'success' : 'error');
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => {
        setPaymentMessage('');
        setPaymentMessageType('');
      }, 6000);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const loadCandidates = async () => {
      setIsLoadingVotes(true);
      const officialCandidates = getAllOfficialCandidates();
      let counts: Record<number, number> = {};
      try {
        const totals = await fetchVoteTotals();
        counts = totals.reduce<Record<number, number>>((acc, row) => {
          acc[row.candidate_id] = row.votes || 0;
          return acc;
        }, {});
      } catch {
        counts = {};
      }

      setCandidates(
        officialCandidates.map((candidate) => ({
          id: candidate.id,
          name: candidate.name,
          organization: candidate.name,
          category: candidate.category,
          description: candidate.description || 'Nominé officiel des Hospitality Awards Guinée',
          votes: counts[candidate.id] || 0
        }))
      );
      setIsLoadingVotes(false);
    };

    loadCandidates();
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('candidates');
  };

  const filteredCandidates = selectedCategory
    ? candidates.filter((candidate) => candidate.category === selectedCategory)
    : candidates;

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === 'votes') return b.votes - a.votes;
    return a.name.localeCompare(b.name);
  });

  const leadingCandidate = candidates.reduce<Candidate | null>(
    (top, current) => (!top || current.votes > top.votes ? current : top),
    null
  );
  const topCategory = leadingCandidate && leadingCandidate.votes > 0
    ? leadingCandidate.category
    : 'Aucun vote payé';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-dark to-blue-deep text-white pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-semibold uppercase tracking-wide mb-3">Hospitality Awards Guinée 2026</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Votez pour l’excellence</h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Chaque vote coûte {formatGnf(VOTE_AMOUNT_GNF)}. Vous pouvez en acheter plusieurs d’un coup : 4 votes = {formatGnf(VOTE_AMOUNT_GNF * 4)}.
            Un vote n’est validé qu’après un paiement Chap Chap Pay.
            Votes ouverts du {VOTES_START.split('-').reverse().join('/')} au {VOTES_END.split('-').reverse().join('/')}.
          </p>
          {!isVotingOpen() && (
            <p className="mt-4 inline-flex px-4 py-2 rounded-full bg-gold/20 text-gold font-semibold">
              La période officielle de vote n’est pas encore ouverte. Vous pouvez déjà découvrir les nominés.
            </p>
          )}
          <p className="mt-4 text-sm text-blue-100">
            Paiement sécurisé via Chap Chap Pay (Orange Money, MTN MoMo, PayCard, cartes bancaires).
          </p>
        </div>
      </div>

      {paymentMessage && (
        <div className="max-w-xl mx-auto px-4 mt-6">
          <div className={`p-4 rounded-xl shadow-lg flex items-center space-x-2 ${
            paymentMessageType === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}>
            {paymentMessageType === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span>{paymentMessage}</span>
          </div>
        </div>
      )}

      <VoteStats
        totalVotes={candidates.reduce((sum, candidate) => sum + candidate.votes, 0)}
        totalCandidates={candidates.length}
        totalPrizes={officialCategories.length}
        topCategory={topCategory}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentView === 'categories' ? (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Choisissez un prix</h2>
              <p className="text-lg text-gray-600">
                {officialCategories.length} prix, regroupés en {Object.keys(groupedCategories).length} catégories officielles
              </p>
            </div>

            {Object.entries(groupedCategories).map(([group, prizes]) => (
              <section key={group}>
                <h3 className="text-xl font-semibold text-blue-dark mb-4 pb-2 border-b border-gray-200">
                  {group}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {prizes.map((category) => {
                    const IconComponent = category.icon;
                    const nominees = getCandidatesByCategory(category.title);
                    const prizeVotes = candidates
                      .filter((candidate) => candidate.category === category.title)
                      .reduce((sum, candidate) => sum + candidate.votes, 0);

                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleCategorySelect(category.title)}
                        className="text-left bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-lg hover:border-blue-200 transition-all"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-semibold text-gray-900 leading-snug mb-1">{category.title}</h4>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-3">{category.description}</p>
                            <div className="flex flex-wrap gap-3 text-xs font-medium text-blue-700">
                              <span className="inline-flex items-center space-x-1">
                                <Users className="w-3.5 h-3.5" />
                                <span>{nominees.length} nominé{nominees.length > 1 ? 's' : ''}</span>
                              </span>
                              <span className="inline-flex items-center space-x-1">
                                <Heart className="w-3.5 h-3.5 text-red-500" />
                                <span>{isLoadingVotes ? '…' : `${prizeVotes} vote${prizeVotes > 1 ? 's' : ''}`}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <button
                onClick={() => {
                  setCurrentView('categories');
                  setSelectedCategory('');
                }}
                className="flex items-center space-x-2 text-blue-700 hover:text-blue-900 font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Retour aux prix</span>
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'votes' | 'name')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="votes">Trier par votes</option>
                <option value="name">Trier par nom</option>
              </select>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-dark leading-snug">{selectedCategory}</h2>
              <p className="text-gray-600 mt-1">{sortedCandidates.length} nominé(s)</p>
            </div>

            {sortedCandidates.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <VoteIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun nominé dans ce prix</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedCandidates.map((candidate, index) => (
                  <div key={candidate.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-36 bg-gradient-to-br from-blue-dark to-blue-deep flex items-center justify-center relative">
                      <span className="absolute top-3 left-3 bg-white/90 text-blue-dark text-xs font-bold px-2 py-1 rounded-full">
                        #{index + 1}
                      </span>
                      <div className="text-white text-center px-4">
                        <Award className="w-8 h-8 mx-auto mb-2 text-gold" />
                        <p className="text-sm font-medium leading-snug">{candidate.name}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 text-sm mb-4">{candidate.description}</p>
                      <div className="flex items-center justify-between mb-4 text-sm">
                        <span className="inline-flex items-center space-x-1 text-gray-700 font-medium">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span>{candidate.votes} vote{candidate.votes > 1 ? 's' : ''} payé{candidate.votes > 1 ? 's' : ''}</span>
                        </span>
                      </div>
                      <VoteButton
                        candidateId={candidate.id}
                        candidateName={candidate.name}
                        candidateCategory={candidate.category}
                        isVoted={false}
                        isVoting={false}
                        disabled={false}
                        enablePayment={true}
                        voteAmount={VOTE_AMOUNT_GNF}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-12 bg-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-900 mb-1">1. Choisissez</h3>
              <p className="text-blue-700 text-sm">Sélectionnez un prix puis le nominé que vous souhaitez soutenir</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <VoteIcon className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-900 mb-1">2. Payez</h3>
              <p className="text-blue-700 text-sm">Choisissez le nombre de votes. Vous payez {formatGnf(VOTE_AMOUNT_GNF)} × ce nombre via Chap Chap Pay.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Award className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-900 mb-1">3. Célébrons</h3>
              <p className="text-blue-700 text-sm">Les gagnants seront annoncés le 11 décembre 2026 à l’Hôtel Kaloum</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotePage;
