import React from 'react';
import { Vote as VoteIcon, CheckCircle, Loader2 } from 'lucide-react';

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
  // Fonction de gestion du clic simplifiée
  const handleVoteClick = () => {
    // Validation basique
    if (!candidateId || !candidateName) {
      console.error('VoteButton: Données manquantes', { candidateId, candidateName });
      return;
    }

    // Appeler la fonction de vote
    onVote(candidateId, candidateName);
  };

  // Déterminer l'état du bouton
  const isButtonDisabled = disabled || isVoted || isVoting;

  // Styles de base
  const baseStyles = "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Styles conditionnels
  const getButtonStyles = () => {
    if (isVoted) {
      return `${baseStyles} bg-green-500 text-white cursor-not-allowed focus:ring-green-500`;
    }
    if (isVoting) {
      return `${baseStyles} bg-yellow-500 text-white cursor-not-allowed focus:ring-yellow-500`;
    }
    if (isButtonDisabled) {
      return `${baseStyles} bg-gray-300 text-gray-500 cursor-not-allowed focus:ring-gray-300`;
    }
    return `${baseStyles} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800`;
  };

  // Contenu du bouton
  const getButtonContent = () => {
    if (isVoted) {
      return (
        <span className="flex items-center justify-center space-x-2">
          <CheckCircle className="w-5 h-5" />
          <span>Voté</span>
        </span>
      );
    }
    
    if (isVoting) {
      return (
        <span className="flex items-center justify-center space-x-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Vote en cours...</span>
        </span>
      );
    }
    
    return (
      <span className="flex items-center justify-center space-x-2">
        <VoteIcon className="w-5 h-5" />
        <span>Voter</span>
      </span>
    );
  };

  return (
    <button
      type="button"
      onClick={handleVoteClick}
      disabled={isButtonDisabled}
      className={getButtonStyles()}
      aria-label={isVoted ? `Voté pour ${candidateName}` : `Voter pour ${candidateName}`}
      data-candidate-id={candidateId}
      data-candidate-name={candidateName}
    >
      {getButtonContent()}
    </button>
  );
};

export default VoteButton;