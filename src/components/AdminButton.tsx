import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, LogIn, LogOut } from 'lucide-react';

const AdminButton: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const sessionData = localStorage.getItem('hag_admin_session');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        const now = new Date();
        const expiresAt = new Date(session.expiresAt);
        
        if (session.isAuthenticated && now < expiresAt) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de la session admin:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('hag_admin_session');
    setIsAuthenticated(false);
    // Optionnel: rediriger vers la page d'accueil
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-white text-sm px-3 py-2 rounded-lg">
        <Shield className="w-4 h-4 animate-pulse" />
        <span>...</span>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <Link
          to="/admin"
          className="flex items-center space-x-2 text-gold hover:text-yellow-300 transition-colors duration-200 text-sm px-3 py-2 rounded-lg hover:bg-blue-deep/50"
          title="Dashboard administrateur"
        >
          <Shield className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-white hover:text-red-300 transition-colors duration-200 text-sm px-3 py-2 rounded-lg hover:bg-red-500/20"
          title="Se déconnecter"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Déconnexion</span>
        </button>
      </div>
    );
  }

  return (
    <Link
      to="/admin"
      className="flex items-center space-x-2 text-white hover:text-gold transition-colors duration-200 text-sm px-3 py-2 rounded-lg hover:bg-blue-deep/50"
      title="Accès administrateur"
    >
      <LogIn className="w-4 h-4" />
      <span>Admin</span>
    </Link>
  );
};

export default AdminButton;
