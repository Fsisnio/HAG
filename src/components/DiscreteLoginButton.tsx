import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const DiscreteLoginButton: React.FC = () => {
  return (
    <Link
      to="/secret-admin-access-hag2025"
      className="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-blue-600 transition-colors duration-200 rounded-full hover:bg-gray-50"
      title="Connexion"
      aria-label="Connexion Administrateur"
    >
      <User className="w-4 h-4" />
    </Link>
  );
};

export default DiscreteLoginButton;
