import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import DiscreteLoginButton from './DiscreteLoginButton';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-dark text-white">
      <div className="container">
        {/* Section principale du footer */}
        <div className="grid grid-4 py-12">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg overflow-hidden">
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
                <div className="w-full h-full bg-gradient-to-br from-gold to-yellow-500 rounded-2xl flex items-center justify-center" style={{display: 'none'}}>
                  <Trophy className="w-7 h-7 text-blue-dark" />
                </div>
              </div>
              <div>
                <div className="font-heading font-bold text-lg group-hover:text-gold transition-colors">HAG</div>
                <div className="text-sm text-gold">Hospitality Awards Guinée</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Innovation et proximité – Célébrons l'excellence en hospitalité en Guinée.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-gold">Liens rapides</h4>
                               <ul className="space-y-2">
                     <li><Link to="/a-propos" className="text-gray-300 hover:text-gold transition-colors">À propos</Link></li>
                     <li><Link to="/categories" className="text-gray-300 hover:text-gold transition-colors">Catégories</Link></li>
                     {/* <li><Link to="/laureats" className="text-gray-300 hover:text-gold transition-colors">Lauréats</Link></li> */}
                     <li><Link to="/candidater" className="text-gray-300 hover:text-gold transition-colors">Candidater</Link></li>
                     {/* <li><Link to="/voter" className="text-gray-300 hover:text-gold transition-colors">Voter</Link></li> */}
                   </ul>
          </div>

          {/* Informations */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-gold">Informations</h4>
            <ul className="space-y-2">
              {/* <li><Link to="/historique" className="text-gray-300 hover:text-gold transition-colors">Historique</Link></li> */}
              {/* <li><Link to="/blog" className="text-gray-300 hover:text-gold transition-colors">Blog</Link></li> */}
              <li><Link to="/partenaires" className="text-gray-300 hover:text-gold transition-colors">Partenaires</Link></li>
              <li><Link to="/equipe" className="text-gray-300 hover:text-gold transition-colors">Notre équipe</Link></li>
            </ul>
          </div>

          {/* Contact et réseaux sociaux */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-gold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gold" />
                <a href="mailto:Sorodou@gmail.com" className="text-gray-300 hover:text-gold transition-colors text-sm">
                  Sorodou@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gold" />
                <a href="tel:+224622586253" className="text-gray-300 hover:text-gold transition-colors text-sm">
                  +224 622 586 253
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gold" />
                <span className="text-gray-300 text-sm">Conakry, Guinée</span>
              </div>
            </div>
            
            {/* Réseaux sociaux */}
            <div className="pt-2">
              <h5 className="font-heading font-semibold text-gold mb-3">Suivez-nous</h5>
              <div className="flex space-x-3">
                <a href="#" className="w-12 h-12 bg-gradient-to-br from-blue-deep to-blue-dark rounded-2xl flex items-center justify-center hover:from-gold hover:to-yellow-500 hover:scale-110 transition-all duration-300 shadow-lg group">
                  <Facebook className="w-6 h-6 text-white group-hover:text-blue-dark" />
                </a>
                <a href="#" className="w-12 h-12 bg-gradient-to-br from-blue-deep to-blue-dark rounded-2xl flex items-center justify-center hover:from-gold hover:to-yellow-500 hover:scale-110 transition-all duration-300 shadow-lg group">
                  <Instagram className="w-6 h-6 text-white group-hover:text-blue-dark" />
                </a>
                <a href="#" className="w-12 h-12 bg-gradient-to-br from-blue-deep to-blue-dark rounded-2xl flex items-center justify-center hover:from-gold hover:to-yellow-500 hover:scale-110 transition-all duration-300 shadow-lg group">
                  <Linkedin className="w-6 h-6 text-white group-hover:text-blue-dark" />
                </a>
                <a href="#" className="w-12 h-12 bg-gradient-to-br from-blue-deep to-blue-dark rounded-2xl flex items-center justify-center hover:from-gold hover:to-yellow-500 hover:scale-110 transition-all duration-300 shadow-lg group">
                  <Twitter className="w-6 h-6 text-white group-hover:text-blue-dark" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Barre de séparation */}
        <div className="border-t border-blue-deep"></div>

        {/* Copyright et mentions légales */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-300 text-sm">
            © {currentYear} Hospitality Awards Guinée - HAG. Tous droits réservés.
            {/* Lien administrateur caché - Triple clic sur le point pour accéder */}
            <span 
              className="text-blue-600 cursor-pointer opacity-20 hover:opacity-100 transition-opacity text-xs ml-2"
              onClick={(e) => {
                if (e.detail === 3) { // Triple clic
                  window.location.href = '/secret-admin-access-hag2025';
                }
              }}
              title="Administration"
            >
              •
            </span>
          </div>
          <div className="flex space-x-6 text-sm">
            <Link to="/mentions-legales" className="text-gray-300 hover:text-gold transition-colors">
              Mentions légales
            </Link>
            <Link to="/politique-confidentialite" className="text-gray-300 hover:text-gold transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/conditions-utilisation" className="text-gray-300 hover:text-gold transition-colors">
              Conditions d'utilisation
            </Link>
            <DiscreteLoginButton />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 