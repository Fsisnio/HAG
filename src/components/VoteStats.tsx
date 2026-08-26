import React from 'react';
import { Users, Award, Vote, Trophy } from 'lucide-react';

interface VoteStatsProps {
  totalVotes: number;
  totalCandidates: number;
  totalPrizes: number;
  topCategory: string;
}

const VoteStats: React.FC<VoteStatsProps> = ({
  totalVotes,
  totalCandidates,
  totalPrizes,
  topCategory
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center">
              <Vote className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-dark">{totalVotes}</p>
              <p className="text-xs text-gray-500">Votes payés</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-dark">{totalCandidates}</p>
              <p className="text-xs text-gray-500">Nominés</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-dark">{totalPrizes}</p>
              <p className="text-xs text-gray-500">Prix officiels</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Trophy className="w-5 h-5 text-amber-700" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-blue-dark leading-snug line-clamp-2" title={topCategory}>
                {topCategory}
              </p>
              <p className="text-xs text-gray-500">Catégorie en tête</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteStats;
