import React, { useState } from 'react';
import { X, CreditCard, AlertCircle, ExternalLink } from 'lucide-react';
import { buildFedaPayCheckoutUrl, FEDAPAY_PAYMENT_URL, FEDAPAY_RETURN_PATH, formatGnf, VOTE_AMOUNT_GNF } from '../data/event';
import { voteStore } from '../services/voteStore';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateId: number;
  candidateName: string;
  candidateCategory: string;
  voteAmount?: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  candidateId,
  candidateName,
  candidateCategory,
  voteAmount = VOTE_AMOUNT_GNF
}) => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handlePay = () => {
    if (!lastName.trim() || !firstName.trim() || !email.trim() || !phone.trim()) {
      setError('Renseignez nom, prénom, e-mail et téléphone pour continuer.');
      return;
    }

    voteStore.createPendingVote({
      candidateId,
      candidateName,
      candidateCategory,
      voterLastName: lastName,
      voterFirstName: firstName,
      voterEmail: email,
      voterPhone: phone
    });

    window.location.href = buildFedaPayCheckoutUrl({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      callbackUrl: `${window.location.origin}${FEDAPAY_RETURN_PATH}`
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full mx-auto shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-blue-dark">Payer pour voter</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-gradient-to-r from-gold/10 to-yellow-400/10 p-4 rounded-xl border border-gold/20">
            <h3 className="font-semibold text-blue-dark mb-1">{candidateName}</h3>
            <p className="text-sm text-gray-600">{candidateCategory}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-medium text-blue-dark">Montant du vote</span>
              <span className="text-lg font-bold text-gold">{formatGnf(voteAmount)}</span>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Un vote n’est valide que lorsque le paiement FedaPay est effectif.
            Vous serez redirigé vers la page sécurisée{' '}
            <a href={FEDAPAY_PAYMENT_URL} className="text-gold font-medium" target="_blank" rel="noreferrer">
              me.fedapay.com/HAG-Award
            </a>
            .
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prénom(s) *</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="6XX XX XX XX"
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
            onClick={handlePay}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gold text-blue-dark rounded-lg hover:bg-yellow-400 font-semibold"
          >
            <CreditCard className="w-5 h-5" />
            <span>Payer {formatGnf(voteAmount)}</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
