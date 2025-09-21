import React, { useState } from 'react';
import { X, AlertTriangle, RotateCcw, Download, Clock } from 'lucide-react';
import voteResetService, { ResetResult } from '../services/voteResetService';

interface VoteResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetComplete: (result: ResetResult) => void;
}

const VoteResetModal: React.FC<VoteResetModalProps> = ({
  isOpen,
  onClose,
  onResetComplete
}) => {
  const [resetType, setResetType] = useState<'full' | 'free_only'>('full');
  const [isResetting, setIsResetting] = useState(false);
  const [confirmationInput, setConfirmationInput] = useState('');
  const [showBackupOption, setShowBackupOption] = useState(true);

  const dataStatus = voteResetService.hasDataToReset();
  const resetHistory = voteResetService.getResetHistory();

  const handleReset = async () => {
    if (confirmationInput !== 'RESET') {
      alert('Veuillez taper "RESET" pour confirmer');
      return;
    }

    setIsResetting(true);

    try {
      // Créer une sauvegarde si demandé
      if (showBackupOption) {
        voteResetService.createBackup();
      }

      let result: ResetResult;
      if (resetType === 'full') {
        result = await voteResetService.resetAllVotes();
      } else {
        result = await voteResetService.resetFreeVotesOnly();
      }

      onResetComplete(result);
      
      if (result.success) {
        onClose();
      }
    } catch (error) {
      console.error('Erreur lors du reset:', error);
      onResetComplete({
        success: false,
        message: 'Erreur inattendue lors de la réinitialisation',
        resetData: { votesReset: 0, paymentsReset: 0, ratingsReset: 0, candidatesReset: 0 }
      });
    } finally {
      setIsResetting(false);
    }
  };

  const downloadBackup = () => {
    const backup = voteResetService.createBackup();
    const blob = new Blob([backup], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hag-votes-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full mx-auto shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-red-600 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2" />
            Réinitialisation des Votes
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isResetting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Statistiques actuelles */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-3">Données actuelles</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span>Votes gratuits:</span>
                <span className="font-medium">{dataStatus.hasVotes ? 'Oui' : 'Non'}</span>
              </div>
              <div className="flex justify-between">
                <span>Votes payants:</span>
                <span className="font-medium">{dataStatus.hasPayments ? 'Oui' : 'Non'}</span>
              </div>
              <div className="flex justify-between">
                <span>Évaluations:</span>
                <span className="font-medium">{dataStatus.hasRatings ? 'Oui' : 'Non'}</span>
              </div>
              <div className="flex justify-between">
                <span>Total éléments:</span>
                <span className="font-medium font-bold">{dataStatus.totalItems}</span>
              </div>
            </div>
          </div>

          {/* Type de réinitialisation */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800">Type de réinitialisation</h3>
            
            <label className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="resetType"
                value="full"
                checked={resetType === 'full'}
                onChange={(e) => setResetType(e.target.value as 'full')}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-red-600">Réinitialisation complète</div>
                <div className="text-sm text-gray-600">
                  Supprime TOUS les votes (gratuits ET payants), évaluations et données de paiement
                </div>
              </div>
            </label>

            <label className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="resetType"
                value="free_only"
                checked={resetType === 'free_only'}
                onChange={(e) => setResetType(e.target.value as 'free_only')}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-orange-600">Votes gratuits seulement</div>
                <div className="text-sm text-gray-600">
                  Supprime uniquement les votes gratuits, garde les votes payants
                </div>
              </div>
            </label>
          </div>

          {/* Option de sauvegarde */}
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <input
              type="checkbox"
              id="backup"
              checked={showBackupOption}
              onChange={(e) => setShowBackupOption(e.target.checked)}
            />
            <label htmlFor="backup" className="text-sm">
              <span className="font-medium">Créer une sauvegarde automatique</span>
              <span className="text-gray-600 block">Recommandé pour pouvoir restaurer les données si nécessaire</span>
            </label>
          </div>

          {/* Actions de sauvegarde */}
          <div className="flex space-x-2">
            <button
              onClick={downloadBackup}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger sauvegarde</span>
            </button>
          </div>

          {/* Historique des réinitialisations */}
          {resetHistory.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Dernières réinitialisations
              </h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {resetHistory.slice(-3).reverse().map((log, index) => (
                  <div key={index} className="text-xs text-gray-600 flex justify-between">
                    <span>{new Date(log.timestamp).toLocaleString()}</span>
                    <span className="font-medium">
                      {log.type === 'full_reset' ? 'Complète' : 'Votes gratuits'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Confirmation */}
          <div className="space-y-3">
            <label className="block">
              <span className="font-semibold text-gray-800">
                Tapez "RESET" pour confirmer cette action irréversible :
              </span>
              <input
                type="text"
                value={confirmationInput}
                onChange={(e) => setConfirmationInput(e.target.value.toUpperCase())}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="RESET"
                disabled={isResetting}
              />
            </label>
          </div>

          {/* Warning */}
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
              <div className="text-sm text-red-700">
                <div className="font-semibold mb-1">⚠️ Attention !</div>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Cette action est <strong>irréversible</strong></li>
                  <li>Tous les votes sélectionnés seront <strong>définitivement supprimés</strong></li>
                  <li>Les utilisateurs devront voter à nouveau</li>
                  <li>Assurez-vous d'avoir créé une sauvegarde</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isResetting}
          >
            Annuler
          </button>
          <button
            onClick={handleReset}
            disabled={isResetting || confirmationInput !== 'RESET' || dataStatus.totalItems === 0}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResetting ? (
              <>
                <RotateCcw className="w-5 h-5 animate-spin" />
                <span>Réinitialisation...</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-5 h-5" />
                <span>Réinitialiser</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoteResetModal;
