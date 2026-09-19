import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/a-propos', label: 'À propos' },
    { path: '/souvenirs', label: 'Souvenirs' },
    { path: '/pourquoi-participer', label: 'Pourquoi HAG' },
    { path: '/calendrier', label: 'Calendrier' },
    { path: '/categories', label: 'Catégories' },
    { path: '/laureats', label: 'Lauréats' },
    { path: '/partenaires', label: 'Partenaires' },
    { path: '/sponsoring', label: 'Sponsoring' },
    { path: '/equipe', label: 'Équipe' },
    { path: '/faq', label: 'FAQ' },
    { path: '/tickets', label: 'Tickets' },
    { path: '/contact', label: 'Contact' },
    { path: '/voter', label: 'Voter' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-blue-dark shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={menuRef}>
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center space-x-3 group flex-shrink-0" onClick={closeMenu}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg overflow-hidden">
              <img
                src="/Logo HAG.png"
                alt="Logo HAG"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextElement) {
                    nextElement.style.display = 'flex';
                  }
                }}
              />
              <div
                className="w-full h-full bg-gradient-to-br from-gold to-yellow-500 rounded-xl flex items-center justify-center"
                style={{ display: 'none' }}
              >
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

          <div className="flex items-center gap-3">
            <Link to="/candidater" className="btn btn-primary text-sm px-4 py-2 hidden sm:inline-flex">
              Candidater
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
              aria-controls="main-menu"
            >
              <span className="flex flex-col justify-center items-end gap-[5px] w-7 h-7">
                <span
                  className={`block h-[2px] bg-white rounded-full transition-all duration-200 ${
                    isMenuOpen ? 'w-7 translate-y-[7px] rotate-45' : 'w-7'
                  }`}
                />
                <span
                  className={`block h-[2px] bg-white rounded-full transition-all duration-200 ${
                    isMenuOpen ? 'w-0 opacity-0' : 'w-7'
                  }`}
                />
                <span
                  className={`block h-[2px] bg-white rounded-full transition-all duration-200 ${
                    isMenuOpen ? 'w-7 -translate-y-[7px] -rotate-45' : 'w-7'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          id="main-menu"
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
            isMenuOpen ? 'max-h-[min(70vh,640px)] opacity-100 pb-4' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <nav className="border-t border-white/10 pt-3 overflow-y-auto max-h-[min(70vh,640px)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-0 content-start auto-rows-min">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2.5 text-white hover:text-gold hover:bg-white/5 rounded-lg transition-colors text-sm font-medium ${
                    location.pathname === item.path ? 'text-gold bg-white/10' : ''
                  }`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="px-4 pt-4 sm:hidden">
              <Link to="/candidater" className="btn btn-primary w-full text-center text-sm py-2" onClick={closeMenu}>
                Candidater
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
