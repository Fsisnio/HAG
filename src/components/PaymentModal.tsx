import React, { useState } from 'react';
import { X, Smartphone, CheckCircle, AlertCircle, Copy } from 'lucide-react';
import { formatGnf, ORANGE_MONEY_NUMBER, ORANGE_MONEY_TEL, VOTE_AMOUNT_GNF } from '../data/event';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateId: number;
  candidateName: string;
  candidateCategory: string;
  voteAmount?: number;
  onPaymentConfirmed?: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  candidateId,
  candidateName,
  candidateCategory,
  voteAmount = VOTE_AMOUNT_GNF,
  onPaymentConfirmed
}) => {
  const [voterName, setVoterName] = useState('');
  const [voterPhone, setVoterPhone] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(ORANGE_MONEY_TEL.replace('+', ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleConfirm = () => {
    if (!voterName.trim() || !voterPhone.trim()) {
      setError('Indiquez votre nom et le numéro qui a envoyé le paiement.');
      return;
    }

    const confirmedVote = {
      candidateId,
      candidateName,
      candidateCategory,
      voterName,
      voterPhone,
      transactionId,
      amount: voteAmount,
      method: 'Orange Money',
      orangeMoneyNumber: ORANGE_MONEY_NUMBER,
      timestamp: new Date().toISOString(),
      status: 'reported'
    };

    const existingRaw = localStorage.getItem('hag_orange_money_votes');
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    localStorage.setItem('hag_orange_money_votes', JSON.stringify([confirmedVote, ...existing]));
    localStorage.setItem('hag_pending_vote', JSON.stringify(confirmedVote));

    onPaymentConfirmed?.();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full mx-auto shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-blue-dark">Vote payant</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-gradient-to-r from-gold/10 to-yellow-400/10 p-4 rounded-xl border border-gold/20">
            <h3 className="font-semibold text-blue-dark mb-1">{candidateName}</h3>
            <p className="text-sm text-gray-600">{candidateCategory}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-medium text-blue-dark">Prix du vote</span>
              <span className="text-lg font-bold text-gold">{formatGnf(voteAmount)}</span>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Smartphone className="w-5 h-5 text-orange-600" />
              <span className="font-semibold text-orange-800">Orange Money</span>
            </div>
            <p className="text-sm text-orange-900 mb-3">
              Envoyez <strong>{formatGnf(voteAmount)}</strong> au numéro ci-dessous, puis confirmez votre vote.
            </p>
            <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2">
              <a href={`tel:${ORANGE_MONEY_TEL}`} className="font-bold text-blue-dark text-lg">
                {ORANGE_MONEY_NUMBER}
              </a>
              <button
                type="button"
                onClick={copyNumber}
                className="text-sm text-gold font-semibold flex items-center space-x-1"
              >
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copié' : 'Copier'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Votre nom *</label>
              <input
                type="text"
                value={voterName}
                onChange={(e) => setVoterName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone Orange Money *
              </label>
              <input
                type="tel"
                value={voterPhone}
                onChange={(e) => setVoterPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="6XX XX XX XX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Référence de transaction (optionnel)
              </label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gold text-blue-dark rounded-lg hover:bg-yellow-400"
          >
            <CheckCircle className="w-5 h-5" />
            <span>J’ai envoyé {formatGnf(voteAmount)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
