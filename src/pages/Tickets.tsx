import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { CONTACT, GALA_VENUE, TICKETS, formatGnf } from '../data/event';

const Tickets: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <h1 className="mb-4">
            Tickets du <span className="text-gold">dîner gala</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Réservez votre place pour la soirée de remise des prix HAG 2026.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm text-gray-500">Date</div>
                <div className="font-semibold text-blue-dark">11 décembre 2026 • 17h00</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm text-gray-500">Lieu</div>
                <div className="font-semibold text-blue-dark">{GALA_VENUE}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {TICKETS.map((ticket) => (
              <div key={ticket.name} className="bg-blue-dark text-white rounded-2xl p-5 text-center flex flex-col">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3">
                  <Ticket className="w-5 h-5 text-gold" />
                </div>
                <div className="text-gold font-bold mb-2">{ticket.name}</div>
                <div className="text-xl font-heading mb-2">{formatGnf(ticket.price)}</div>
                <p className="text-sm text-white/80 flex-1">{ticket.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Pour réserver un ticket ou une table, contactez l’organisation à{' '}
              <a href={`mailto:${CONTACT.email}`} className="text-blue-700 underline">
                {CONTACT.email}
              </a>
              .
            </p>
            <Link to="/contact" className="btn btn-primary">
              Demander une réservation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tickets;
