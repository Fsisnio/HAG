import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Trophy } from 'lucide-react';
import AdminButton from './AdminButton';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/a-propos', label: 'À propos' },
    { path: '/categories', label: 'Catégories' },
    // { path: '/laureats', label: 'Lauréats' }, // Masqué temporairement
    // { path: '/historique', label: 'Historique' }, // Masqué temporairement
    // { path: '/blog', label: 'Blog' }, // Masqué temporairement
    { path: '/partenaires', label: 'Partenaires' },
    { path: '/equipe', label: 'Équipe' },
    { path: '/contact', label: 'Contact' },
    // { path: '/voter', label: 'Voter' }, // Masqué temporairement
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-blue-dark shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo optimisé */}
          <Link to="/" className="flex items-center space-x-3 group flex-shrink-0" onClick={closeMenu}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg overflow-hidden">
              <img 
                src="/Logo HAG.png" 
                alt="Logo HAG" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback vers l'icône Trophy si l'image ne charge pas
                  e.currentTarget.style.display = 'none';
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextElement) {
                    nextElement.style.display = 'flex';
                  }
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-gold to-yellow-500 rounded-xl flex items-center justify-center" style={{display: 'none'}}>
                <Trophy className="w-7 h-7 text-blue-dark" />
              </div>
            </div>
            <div className="text-white">
              <div className="font-heading font-bold text-base leading-tight group-hover:text-gold transition-colors whitespace-nowrap">
                HOSPITALITY AWARDS
              </div>
              <div className="font-heading font-semibold text-xs text-gold leading-tight whitespace-nowrap">
                GUINÉE - HAG
              </div>
            </div>
          </Link>

          {/* Navigation Desktop optimisée - tous les éléments sur une ligne */}
          <nav className="hidden xl:flex items-center space-x-6 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-white hover:text-gold transition-colors duration-200 font-medium text-sm whitespace-nowrap ${
                  location.pathname === item.path ? 'text-gold font-semibold' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Boutons d'action */}
          <div className="hidden xl:flex items-center space-x-3 flex-shrink-0">
            <AdminButton />
            <Link
              to="/candidater"
              className="btn btn-primary text-sm px-4 py-2"
            >
              Candidater
            </Link>
          </div>

          {/* Bouton Menu Mobile */}
          <button
            onClick={toggleMenu}
            className="xl:hidden text-white p-2"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile optimisé */}
        {isMenuOpen && (
          <div className="xl:hidden bg-blue-dark border-t border-blue-deep">
            <nav className="py-4">
              {/* Navigation mobile en grille */}
              <div className="grid grid-2 gap-2 px-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 text-white hover:text-gold transition-colors duration-200 text-sm rounded-lg ${
                      location.pathname === item.path ? 'text-gold bg-blue-deep' : 'hover:bg-blue-deep/50'
                    }`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              {/* Boutons d'action mobile */}
              <div className="px-4 pt-4 space-y-2">
                <div onClick={closeMenu}>
                  <AdminButton />
                </div>
                <Link
                  to="/candidater"
                  className="btn btn-primary w-full text-center text-sm py-2"
                  onClick={closeMenu}
                >
                  Candidater
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 