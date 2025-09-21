import React, { useState } from 'react';
import { Vote as VoteIcon, CheckCircle, Loader2, CreditCard } from 'lucide-react';
import PaymentModal from './PaymentModal';

interface VoteButtonProps {
  candidateId: number;
  candidateName: string;
  candidateCategory: string;
  isVoted: boolean;
  isVoting: boolean;
  onVote: (candidateId: number, candidateName: string, candidateCategory: string) => void;
  disabled?: boolean;
  voteAmount?: number; // Prix du vote
  enablePayment?: boolean; // Activer le système de paiement
}

const VoteButton: React.FC<VoteButtonProps> = ({
  candidateId,
  candidateName,
  candidateCategory,
  isVoted,
  isVoting,
  onVote,
  disabled = false,
  voteAmount = 10000, // 10,000 GNF par défaut
  enablePayment = true // Système de paiement activé par défaut
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Fonction de gestion du clic
  const handleVoteClick = () => {
    // Validation basique
    if (!candidateId || !candidateName || !candidateCategory) {
      console.error('VoteButton: Données manquantes', { candidateId, candidateName, candidateCategory });
      return;
    }

    if (enablePayment) {
      // Ouvrir le modal de paiement
      setShowPaymentModal(true);
    } else {
      // Vote gratuit (ancien système)
      onVote(candidateId, candidateName, candidateCategory);
    }
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
        {enablePayment ? <CreditCard className="w-5 h-5" /> : <VoteIcon className="w-5 h-5" />}
        <span>{enablePayment ? `Voter (${(voteAmount / 1000).toFixed(0)}k GNF)` : 'Voter'}</span>
      </span>
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={handleVoteClick}
        disabled={isButtonDisabled}
        className={getButtonStyles()}
        aria-label={isVoted ? `Voté pour ${candidateName} (${candidateCategory})` : `Voter pour ${candidateName} (${candidateCategory})`}
        data-candidate-id={candidateId}
        data-candidate-name={candidateName}
        data-candidate-category={candidateCategory}
        id={`vote-btn-${candidateId}-${candidateCategory.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
      >
        {getButtonContent()}
      </button>

      {/* Modal de paiement */}
      {enablePayment && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          candidateId={candidateId}
          candidateName={candidateName}
          candidateCategory={candidateCategory}
          voteAmount={voteAmount}
        />
      )}
    </>
  );
};

export default VoteButton;