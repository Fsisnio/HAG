import React, { useState } from 'react';
import { X, CreditCard, Loader2, Shield, AlertCircle } from 'lucide-react';
import paydunya, { VotePaymentData } from '../services/paydunya';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateId: number;
  candidateName: string;
  candidateCategory: string;
  voteAmount: number; // Prix du vote en GNF ou USD
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  candidateId,
  candidateName,
  candidateCategory,
  voteAmount = 10000 // 10,000 GNF par défaut
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [voterEmail, setVoterEmail] = useState('');
  const [voterPhone, setVoterPhone] = useState('');

  const handlePayment = async () => {
    if (!voterEmail || !voterPhone) {
      setError('Veuillez remplir tous les champs requis');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const paymentData: VotePaymentData = {
        candidateId,
        candidateName,
        candidateCategory,
        voterEmail,
        voterPhone,
        amount: voteAmount,
        currency: 'GNF'
      };

      const response = await paydunya.createVoteInvoice(paymentData);

      if (response.response_code === '00' && response.invoice_url) {
        // Sauvegarder les données de vote en attente
        const pendingVote = {
          candidateId,
          candidateName,
          candidateCategory,
          voterEmail,
          voterPhone,
          amount: voteAmount,
          timestamp: new Date().toISOString(),
          status: 'pending'
        };

        localStorage.setItem('hag_pending_vote', JSON.stringify(pendingVote));

        // Rediriger vers Paydunya
        window.location.href = response.invoice_url;
      } else {
        throw new Error(response.description || 'Erreur lors de la création du paiement');
      }
    } catch (error) {
      console.error('Erreur de paiement:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors du paiement');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full mx-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-blue-dark">Voter pour</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isProcessing}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Candidate Info */}
          <div className="bg-gradient-to-r from-gold/10 to-yellow-400/10 p-4 rounded-xl border border-gold/20">
            <h3 className="font-semibold text-blue-dark mb-1">{candidateName}</h3>
            <p className="text-sm text-gray-600">{candidateCategory}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-medium text-blue-dark">Coût du vote :</span>
              <span className="text-lg font-bold text-gold">
                {voteAmount.toLocaleString()} GNF
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={voterEmail}
                onChange={(e) => setVoterEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="votre@email.com"
                required
                disabled={isProcessing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={voterPhone}
                onChange={(e) => setVoterPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="+224 XXX XXX XXX"
                required
                disabled={isProcessing}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          {/* Security Info */}
          <div className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <Shield className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <span className="text-sm text-blue-700">
              Paiement sécurisé via Paydunya. Vous ne pouvez voter qu'une seule fois par candidat.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isProcessing}
          >
            Annuler
          </button>
          <button
            onClick={handlePayment}
            disabled={isProcessing || !voterEmail || !voterPhone}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gold text-blue-dark rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Traitement...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                <span>Payer et Voter</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
