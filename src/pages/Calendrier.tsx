import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { EVENT_YEAR, CALENDAR, GALA_VENUE, APPLICATION_PERIOD_LABEL } from '../data/event';

const Calendrier: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <h1 className="mb-6">
            Calendrier <span className="text-gold">HAG {EVENT_YEAR}</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            {APPLICATION_PERIOD_LABEL} • Gala à l’{GALA_VENUE}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm text-gray-500">Cérémonie</div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CALENDAR.map((item, index) => (
              <div key={item.label} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-gold to-yellow-500 rounded-full flex items-center justify-center text-blue-dark font-bold mb-4">
                  {index + 1}
                </div>
                <div className="text-sm text-gold font-semibold mb-1">{item.label}</div>
                <div className="text-blue-dark font-bold">{item.date}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/candidater" className="btn btn-primary">
              Candidater
            </Link>
            <Link to="/tickets" className="btn btn-secondary">
              Réserver un ticket
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calendrier;
