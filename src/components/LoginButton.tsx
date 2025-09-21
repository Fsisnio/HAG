import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const LoginButton: React.FC = () => {
  return (
    <Link
      to="/secret-admin-access-hag2025"
      className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-gray-50"
      title="Connexion Administrateur"
    >
      <Shield className="w-4 h-4" />
      <span className="hidden sm:inline">Connexion</span>
    </Link>
  );
};

export default LoginButton;
