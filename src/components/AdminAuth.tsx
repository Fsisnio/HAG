import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import AdminLogin from './AdminLogin';

interface AdminAuthProps {
  children: React.ReactNode;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const sessionData = localStorage.getItem('hag_admin_session');
      if (!sessionData) {
        setIsAuthenticated(false);
        return;
      }

      if (sessionData === 'true') {
        setIsAuthenticated(true);
        return;
      }

      const session = JSON.parse(sessionData);
      const expiresAt = new Date(session.expiresAt);

      if (session.isAuthenticated && new Date() < expiresAt) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('hag_admin_session');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de la session:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success);
  };

  const handleLogout = () => {
    localStorage.removeItem('hag_admin_session');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-dark via-blue-deep to-blue-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Barre de navigation admin avec bouton de déconnexion */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-br from-gold to-yellow-500 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-blue-dark" />
              </div>
              <div>
                <div className="text-base font-bold text-blue-dark">HAG Admin</div>
                <div className="text-xs text-gray-500">Édition 2026</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AdminAuth;
