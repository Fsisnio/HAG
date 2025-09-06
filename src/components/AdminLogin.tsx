import React, { useState } from 'react';
import { Award, Lock, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mot de passe admin - À CHANGER EN PRODUCTION
  const ADMIN_PASSWORD = 'HAG2024Admin!';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulation d'un délai de vérification
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password === ADMIN_PASSWORD) {
      // Stocker la session dans localStorage
      const sessionData = {
        isAuthenticated: true,
        loginTime: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24h
      };
      localStorage.setItem('hag_admin_session', JSON.stringify(sessionData));
      onLogin(true);
    } else {
      setError('Mot de passe incorrect');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-dark via-blue-deep to-blue-dark flex items-center justify-center p-4">
      {/* Motif de fond */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gold rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-gold to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-10 h-10 text-blue-dark" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">HAG Admin</h1>
          <p className="text-white/80">Accès au tableau de bord</p>
        </div>

        {/* Formulaire de connexion */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Mot de passe administrateur
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Entrez le mot de passe"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gold to-yellow-500 text-blue-dark font-semibold py-3 px-4 rounded-lg hover:from-yellow-500 hover:to-gold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-blue-dark border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          {/* Informations de sécurité */}
          <div className="mt-6 p-4 bg-blue-dark/20 rounded-lg">
            <p className="text-xs text-white/70 text-center">
              🔒 Accès sécurisé - Session valide 24h
            </p>
          </div>
        </div>

        {/* Retour au site */}
        <div className="text-center mt-6">
          <a 
            href="/" 
            className="text-white/70 hover:text-gold transition-colors text-sm"
          >
            ← Retour au site principal
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
