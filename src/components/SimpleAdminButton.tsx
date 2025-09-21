import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const SimpleAdminButton: React.FC = () => {
  return (
    <Link
      to="/admin"
      className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors duration-200 text-sm px-3 py-2 rounded-lg hover:bg-blue-800/50"
      title="Accès administrateur"
    >
      <Shield className="w-4 h-4" />
      <span>Admin</span>
    </Link>
  );
};

export default SimpleAdminButton;


