import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const DevAdminLink: React.FC = () => {
  // Vérifier si on est en mode développement
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Ne pas afficher le lien en production
  if (!isDevelopment) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link
        to="/admin"
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
        title="Accès Admin (Développement uniquement)"
      >
        <Shield className="w-4 h-4" />
        <span>Admin</span>
      </Link>
    </div>
  );
};

export default DevAdminLink;
