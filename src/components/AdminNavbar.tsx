import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Award, 
  BarChart3, 
  Users, 
  Vote, 
  DollarSign, 
  Settings, 
  User,
  LogOut,
  Bell,
  Search
} from 'lucide-react';

const AdminNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: 'Tableau de bord', icon: BarChart3 },
    { path: '/admin/candidates', label: 'Candidats', icon: Users },
    { path: '/admin/votes', label: 'Votes', icon: Vote },
    { path: '/admin/payments', label: 'Paiements', icon: DollarSign },
    { path: '/admin/users', label: 'Utilisateurs', icon: Users },
    { path: '/admin/settings', label: 'Paramètres', icon: Settings },
    { path: '/admin/profile', label: 'Profil', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et titre */}
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-yellow-500 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-dark" />
              </div>
              <div className="hidden md:block">
                <div className="text-lg font-bold text-blue-dark">HAG Admin</div>
                <div className="text-xs text-gray-500">Hospitality Awards Guinée</div>
              </div>
            </Link>
          </div>

          {/* Navigation desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-dark text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center space-x-4">
            {/* Barre de recherche */}
            <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none w-48"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Menu utilisateur */}
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-gold to-yellow-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-dark" />
                </div>
                <span className="hidden md:block text-sm font-medium">Admin</span>
              </button>
            </div>

            {/* Bouton déconnexion */}
            <button className="flex items-center space-x-2 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="hidden md:block text-sm font-medium">Déconnexion</span>
            </button>

            {/* Bouton menu mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-dark text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            
            {/* Barre de recherche mobile */}
            <div className="mt-4 px-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none flex-1"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar; 