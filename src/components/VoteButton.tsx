import React from 'react';
import { Vote as VoteIcon, CheckCircle } from 'lucide-react';

interface VoteButtonProps {
  candidateId: number;
  candidateName: string;
  isVoted: boolean;
  isVoting: boolean;
  onVote: (candidateId: number, candidateName: string) => void;
  disabled?: boolean;
}

const VoteButton: React.FC<VoteButtonProps> = ({
  candidateId,
  candidateName,
  isVoted,
  isVoting,
  onVote,
  disabled = false
}) => {
  const handleClick = () => {
    console.log('🖱️ Clic sur VoteButton pour:', candidateName, 'ID:', candidateId);
    
    // Validation stricte avant d'appeler onVote
    if (!candidateId || !candidateName) {
      console.error('❌ Données de candidat invalides:', { candidateId, candidateName });
      alert('Erreur: Données de candidat invalides');
      return;
    }
    
    onVote(candidateId, candidateName);
  };

  const isDisabled = disabled || isVoted || isVoting;

  return (
    <button
      id={`vote-button-${candidateId}`}
      data-candidate-id={candidateId}
      data-candidate-name={candidateName}
      onClick={handleClick}
      disabled={isDisabled}
      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
        isVoted
          ? 'bg-green-100 text-green-800 cursor-not-allowed'
          : isVoting
          ? 'bg-yellow-100 text-yellow-800 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
      aria-label={`Voter pour ${candidateName}`}
    >
      {isVoted ? (
        <span className="flex items-center justify-center space-x-2">
          <CheckCircle className="w-4 h-4" />
          <span>Voté</span>
        </span>
      ) : isVoting ? (
        <span className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-2 border-yellow-800 border-t-transparent rounded-full animate-spin"></div>
          <span>En cours...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center space-x-2">
          <VoteIcon className="w-4 h-4" />
          <span>Voter</span>
        </span>
      )}
    </button>
  );
};

export default VoteButton;
