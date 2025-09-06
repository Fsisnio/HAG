import React from 'react';
import { TrendingUp, Users, Award, BarChart3 } from 'lucide-react';

interface VoteStatsProps {
  totalVotes: number;
  totalCandidates: number;
  topCategory: string;
  participationRate: number;
  averageRating?: number;
}

const VoteStats: React.FC<VoteStatsProps> = ({
  totalVotes,
  totalCandidates,
  topCategory,
  participationRate,
  averageRating
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-blue-dark mb-6 text-center">
        Statistiques de vote en temps réel
      </h3>
      
      <div className="grid grid-2 gap-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-gold to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-blue-dark" />
          </div>
          <div className="text-2xl font-bold text-blue-dark mb-2">{totalVotes}</div>
          <div className="text-gray-600 text-sm">Votes totaux</div>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-dark to-blue-deep rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-gold" />
          </div>
          <div className="text-2xl font-bold text-blue-dark mb-2">{totalCandidates}</div>
          <div className="text-gray-600 text-sm">Candidats</div>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div className="text-2xl font-bold text-blue-dark mb-2">{participationRate}%</div>
          <div className="text-gray-600 text-sm">Taux de participation</div>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div className="text-lg font-bold text-blue-dark mb-2">{topCategory}</div>
          <div className="text-gray-600 text-sm">Catégorie la plus votée</div>
        </div>
        
        {averageRating && (
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <div className="text-2xl font-bold text-white">⭐</div>
            </div>
            <div className="text-2xl font-bold text-blue-dark mb-2">{averageRating.toFixed(1)}</div>
            <div className="text-gray-600 text-sm">Note moyenne</div>
          </div>
        )}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
            Les votes sont mis à jour en temps réel
          </p>
          <div className="w-3 h-3 bg-green-500 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default VoteStats; 