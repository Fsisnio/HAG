import React, { useState } from 'react';
import { X, CreditCard, Building2, Smartphone, CheckCircle, AlertCircle } from 'lucide-react';

interface PremiumVoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  voteType: 'bronze' | 'silver' | 'gold';
  candidateName: string;
  candidateCategory: string;
}

interface VotePackage {
  name: string;
  price: number;
  weight: number;
  color: string;
  features: string[];
}

const PremiumVoteModal: React.FC<PremiumVoteModalProps> = ({
  isOpen,
  onClose,
  voteType,
  candidateName,
  candidateCategory
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'mobile'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const votePackages: Record<string, VotePackage> = {
    bronze: {
      name: 'Vote Bronze',
      price: 5000,
      weight: 2,
      color: 'from-gold to-yellow-500',
      features: ['Vote compté 2 fois', 'Support au candidat', 'Reçu fiscal']
    },
    silver: {
      name: 'Vote Argent',
      price: 15000,
      weight: 5,
      color: 'from-blue-dark to-blue-deep',
      features: ['Vote compté 5 fois', 'Support au candidat', 'Reçu fiscal', 'Mention spéciale']
    },
    gold: {
      name: 'Vote Or',
      price: 50000,
      weight: 10,
      color: 'from-purple-500 to-pink-600',
      features: ['Vote compté 10 fois', 'Support au candidat', 'Reçu fiscal', 'Mention spéciale', 'Invitation VIP cérémonie']
    }
  };

  const selectedPackage = votePackages[voteType];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simuler un processus de paiement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Fermer le modal après 3 secondes
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-blue-dark">
            Vote Premium - {selectedPackage.name}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Contenu */}
        <div className="p-6">
          {!isSuccess ? (
            <>
              {/* Résumé du vote */}
              <div className="bg-gradient-to-r from-blue-50 to-gold-50 p-6 rounded-2xl mb-6">
                <h3 className="text-lg font-semibold text-blue-dark mb-4">Résumé de votre vote premium</h3>
                <div className="grid grid-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Candidat</p>
                    <p className="font-semibold text-blue-dark">{candidateName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Catégorie</p>
                    <p className="font-semibold text-blue-dark">{candidateCategory}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Type de vote</p>
                    <p className="font-semibold text-gold">{selectedPackage.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Poids du vote</p>
                    <p className="font-semibold text-gold">{selectedPackage.weight}x</p>
                  </div>
                </div>
              </div>

              {/* Détails du package */}
              <div className="bg-white border border-gray-200 p-6 rounded-2xl mb-6">
                <h3 className="text-lg font-semibold text-blue-dark mb-4">Détails du package</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gold">{selectedPackage.price.toLocaleString()} GNF</span>
                  <div className={`w-16 h-16 bg-gradient-to-br ${selectedPackage.color} rounded-2xl flex items-center justify-center`}>
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <ul className="space-y-2">
                  {selectedPackage.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Méthodes de paiement */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-blue-dark mb-4">Choisissez votre méthode de paiement</h3>
                <div className="grid grid-3 gap-4">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-gold bg-gold/10'
                        : 'border-gray-200 hover:border-gold/50'
                    }`}
                  >
                    <CreditCard className={`w-8 h-8 mx-auto mb-2 ${
                      paymentMethod === 'card' ? 'text-gold' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      paymentMethod === 'card' ? 'text-gold' : 'text-gray-600'
                    }`}>Carte bancaire</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-gold bg-gold/10'
                        : 'border-gray-200 hover:border-gold/50'
                    }`}
                  >
                    <Building2 className={`w-8 h-8 mx-auto mb-2 ${
                      paymentMethod === 'bank' ? 'text-gold' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      paymentMethod === 'bank' ? 'text-gold' : 'text-gray-600'
                    }`}>Virement bancaire</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('mobile')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'mobile'
                        ? 'border-gold bg-gold/10'
                        : 'border-gray-200 hover:border-gold/50'
                    }`}
                  >
                    <Smartphone className={`w-8 h-8 mx-auto mb-2 ${
                      paymentMethod === 'mobile' ? 'text-gold' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      paymentMethod === 'mobile' ? 'text-gold' : 'text-gray-600'
                    }`}>Mobile Money</span>
                  </button>
                </div>
              </div>

              {/* Informations de paiement */}
              <div className="bg-blue-50 p-4 rounded-xl mb-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Informations importantes :</p>
                    <ul className="space-y-1">
                      <li>• Un reçu fiscal sera envoyé à votre email</li>
                      <li>• Votre vote sera compté immédiatement après confirmation</li>
                      <li>• Les fonds soutiennent le développement des HAG</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bouton de paiement */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-gradient-to-r from-gold to-yellow-500 text-blue-dark font-semibold rounded-xl hover:from-yellow-500 hover:to-gold hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-blue-dark border-t-transparent rounded-full animate-spin"></div>
                    <span>Traitement en cours...</span>
                  </div>
                ) : (
                  `Payer ${selectedPackage.price.toLocaleString()} GNF`
                )}
              </button>
            </>
          ) : (
            /* Message de succès */
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-4">Paiement réussi !</h3>
              <p className="text-gray-600 mb-6">
                Votre vote premium a été enregistré avec succès. 
                Un email de confirmation vous sera envoyé dans quelques minutes.
              </p>
              <div className="bg-green-50 p-4 rounded-xl">
                <p className="text-sm text-green-800">
                  <strong>Récapitulatif :</strong> Vote {selectedPackage.name} pour {candidateName} 
                  - Poids : {selectedPackage.weight}x
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PremiumVoteModal; 