import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Building2, Mail, Phone, Star } from 'lucide-react';
import { partnerGroups, partnersWithLogos } from '../data/partners';
import { CONTACT } from '../data/event';

const sponsorshipLevels = [
  {
    name: 'Diamant',
    amount: '50 000 000 GNF',
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Platine',
    amount: '30 000 000 GNF',
    color: 'from-gray-400 to-gray-600'
  },
  {
    name: 'Or',
    amount: '20 000 000 GNF',
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    name: 'Argent',
    amount: '10 000 000 GNF',
    color: 'from-gray-300 to-gray-500'
  }
];

const Partners: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <h1 className="mb-6">
            Nos <span className="text-gold">partenaires</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Institutions, sponsors, médias, organisations professionnelles, écoles et entreprises
            qui portent les Hospitality Awards Guinée.
          </p>
        </div>
      </section>

      {partnersWithLogos.length > 0 && (
        <section className="section section-alt" id="logos">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl font-bold text-blue-dark mb-3">
                Ils <span className="text-gold">accompagnent</span> HAG 2026
              </h2>
              <p className="text-gray-600">
                Institutions et marques nationales associées à la reconnaissance de l’excellence
                hôtelière, touristique et gastronomique en Guinée.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {partnersWithLogos
                .filter((partner) => !partner.wide)
                .map((partner) => (
                  <a
                    key={partner.name}
                    href="#institutionnels"
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 min-h-[180px] flex items-center justify-center hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <img
                      src={partner.logo}
                      alt={`Logo ${partner.name}`}
                      className="max-h-32 max-w-full object-contain"
                    />
                  </a>
                ))}
            </div>
            {partnersWithLogos
              .filter((partner) => partner.wide)
              .map((partner) => (
                <a
                  key={partner.name}
                  href="#institutionnels"
                  className="mt-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center justify-center hover:shadow-md transition-all"
                >
                  <img
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    className="w-full max-h-72 object-contain"
                  />
                </a>
              ))}
          </div>
        </section>
      )}

      {partnerGroups.map((group) => (
        <section key={group.id} className="section" id={group.id}>
          <div className="container">
            <div className="max-w-3xl mb-8">
              <h2 className="text-3xl font-bold text-blue-dark mb-3">{group.title}</h2>
              <p className="text-gray-600">{group.intro}</p>
            </div>

            {group.partners.length === 0 ? (
              <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-8 text-center">
                <Building2 className="w-8 h-8 text-gold mx-auto mb-3" />
                <p className="text-gray-700">
                  Espace réservé aux {group.title.toLowerCase()}. Rejoignez l’édition 2026.
                </p>
                <Link to="/contact" className="inline-block mt-4 text-blue-700 font-medium hover:underline">
                  Devenir partenaire
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.partners.map((partner) => (
                  <article
                    key={partner.name}
                    className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col ${
                      partner.wide ? 'md:col-span-2 lg:col-span-3' : ''
                    }`}
                  >
                    {partner.logo && (
                      <div
                        className={`mb-5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-5 ${
                          partner.wide ? 'min-h-[240px]' : 'h-40'
                        }`}
                      >
                        <img
                          src={partner.logo}
                          alt={`Logo ${partner.name}`}
                          className={`max-w-full object-contain ${partner.wide ? 'max-h-56' : 'max-h-full'}`}
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-blue-dark">{partner.name}</h3>
                    <p className="text-sm text-gray-600 mt-2">{partner.description}</p>
                    {partner.website && (
                      <a href={partner.website} className="text-sm text-blue-700 mt-3 inline-block" target="_blank" rel="noreferrer">
                        Visiter le site
                      </a>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-10">
            Niveaux de <span className="text-gold">sponsoring</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipLevels.map((level) => (
              <div key={level.name} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className={`h-20 bg-gradient-to-r ${level.color} flex items-center justify-center`}>
                  <h3 className="text-xl font-bold text-white">{level.name}</h3>
                </div>
                <div className="p-5 text-center">
                  <p className="text-2xl font-bold text-blue-dark">{level.amount}</p>
                  <p className="text-sm text-gray-500 mt-1">Investissement indicatif</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-4xl text-center">
          <Star className="w-10 h-10 text-gold mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-blue-dark mb-4">Devenir partenaire HAG 2026</h2>
          <p className="text-gray-600 mb-8">
            Associez votre organisation à la reconnaissance de l’excellence hôtelière, touristique et gastronomique en Guinée.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <Mail className="w-8 h-8 text-gold mx-auto mb-3" />
              <a href={`mailto:${CONTACT.email}`} className="text-blue-dark font-medium">
                {CONTACT.email}
              </a>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <Phone className="w-8 h-8 text-gold mx-auto mb-3" />
              <a href={`tel:${CONTACT.phones[0].tel}`} className="text-blue-dark font-medium">
                {CONTACT.phones[0].display}
              </a>
            </div>
          </div>
          <Link to="/contact" className="btn btn-primary btn-large mt-8 inline-flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>Demander une proposition</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Partners;
