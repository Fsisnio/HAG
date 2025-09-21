import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Lock } from 'lucide-react';

const SecretAdmin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const navigate = useNavigate();

  // Mot de passe administrateur sécurisé
  const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'HAG2024Admin!SecretAccess';
  const MAX_ATTEMPTS = 3;

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const isAdminLoggedIn = localStorage.getItem('hag_admin_session') === 'true';
    if (isAdminLoggedIn) {
      navigate('/admin');
    }

    // Vérifier les tentatives précédentes
    const savedAttempts = localStorage.getItem('hag_admin_attempts');
    const lastAttemptTime = localStorage.getItem('hag_admin_last_attempt');
    
    if (savedAttempts && lastAttemptTime) {
      const attemptCount = parseInt(savedAttempts);
      const lastTime = parseInt(lastAttemptTime);
      const timeDiff = Date.now() - lastTime;
      
      // Bloquer pendant 30 minutes après 3 échecs
      if (attemptCount >= MAX_ATTEMPTS && timeDiff < 30 * 60 * 1000) {
        setIsBlocked(true);
        setAttempts(attemptCount);
      } else if (timeDiff >= 30 * 60 * 1000) {
        // Réinitialiser après 30 minutes
        localStorage.removeItem('hag_admin_attempts');
        localStorage.removeItem('hag_admin_last_attempt');
      }
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      setError('Accès bloqué. Réessayez dans 30 minutes.');
      return;
    }

    if (password === ADMIN_PASSWORD) {
      // Connexion réussie
      localStorage.setItem('hag_admin_session', 'true');
      localStorage.removeItem('hag_admin_attempts');
      localStorage.removeItem('hag_admin_last_attempt');
      navigate('/admin');
    } else {
      // Échec de connexion
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setError(`Mot de passe incorrect. Tentative ${newAttempts}/${MAX_ATTEMPTS}`);
      
      localStorage.setItem('hag_admin_attempts', newAttempts.toString());
      localStorage.setItem('hag_admin_last_attempt', Date.now().toString());
      
      if (newAttempts >= MAX_ATTEMPTS) {
        setIsBlocked(true);
        setError('Trop de tentatives échouées. Accès bloqué pendant 30 minutes.');
      }
      
      setPassword('');
    }
  };

  const getRemainingTime = () => {
    const lastAttemptTime = localStorage.getItem('hag_admin_last_attempt');
    if (!lastAttemptTime) return 0;
    
    const timeDiff = Date.now() - parseInt(lastAttemptTime);
    const remainingMs = 30 * 60 * 1000 - timeDiff;
    return Math.max(0, Math.ceil(remainingMs / 60000)); // en minutes
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-dark to-blue-deep flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* En-tête */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-dark to-blue-deep rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-blue-dark mb-2">
              Accès Administrateur
            </h1>
            <p className="text-gray-600 text-sm">
              Interface réservée aux administrateurs HAG 2025
            </p>
          </div>

          {/* Formulaire de connexion */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe administrateur
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  placeholder="Entrez le mot de passe"
                  disabled={isBlocked}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isBlocked}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
                {isBlocked && (
                  <div className="mt-2 text-xs">
                    Temps restant : {getRemainingTime()} minutes
                  </div>
                )}
              </div>
            )}

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={isBlocked || !password}
              className="w-full bg-blue-dark text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-deep transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Lock className="w-5 h-5" />
              <span>{isBlocked ? 'Accès Bloqué' : 'Se Connecter'}</span>
            </button>
          </form>

          {/* Informations de sécurité */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center text-xs text-gray-500 space-y-1">
              <p>🔒 Accès sécurisé et surveillé</p>
              <p>⚠️ 3 tentatives maximum puis blocage 30 min</p>
              <p>📱 Contact d'urgence : +221 773 542 551</p>
            </div>
          </div>
        </div>

        {/* Instructions discrètes */}
        <div className="mt-6 text-center">
          <p className="text-white/70 text-xs">
            HAG 2025 - Interface Administrateur Sécurisée
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecretAdmin;
