import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Ticket, AlertCircle, CheckCircle } from 'lucide-react';
import { CONTACT, GALA_VENUE, TICKETS, formatGnf } from '../data/event';
import TicketPaymentModal from '../components/TicketPaymentModal';
import ticketPaymentHandler from '../services/ticketPaymentHandler';

const Tickets: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [paymentMessageType, setPaymentMessageType] = useState<'success' | 'error' | ''>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let cancelled = false;

    ticketPaymentHandler.handlePaymentReturn(params).then((result) => {
      if (cancelled || !result.message) return;
      setPaymentMessage(result.message);
      setPaymentMessageType(result.success ? 'success' : 'error');
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => {
        setPaymentMessage('');
        setPaymentMessageType('');
      }, 8000);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="pt-20">
      <section className="section bg-gradient-to-br from-blue-dark to-blue-deep text-white">
        <div className="container text-center">
          <h1 className="mb-4">
            Tickets du <span className="text-gold">dîner gala</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Réservez et payez votre place en ligne via Chap Chap Pay. Chaque formule est débité au tarif officiel.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {paymentMessage && (
            <div className={`max-w-2xl mx-auto mb-10 p-4 rounded-xl shadow-lg flex items-center space-x-2 ${
              paymentMessageType === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {paymentMessageType === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span>{paymentMessage}</span>
            </div>
          )}

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
                <p className="text-sm text-white/80 flex-1 mb-4">{ticket.description}</p>
                <button
                  type="button"
                  onClick={() => setSelectedTicket(ticket.name)}
                  className="btn btn-primary w-full text-sm py-2"
                >
                  Payer
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-12 max-w-2xl mx-auto">
            Un reçu de paiement Chap Chap Pay confirme la réservation. Pour une facture entreprise, écrivez à{' '}
            <a href={`mailto:${CONTACT.email}`} className="text-blue-700 underline">
              {CONTACT.email}
            </a>
            .
          </p>
        </div>
      </section>

      <TicketPaymentModal
        isOpen={Boolean(selectedTicket)}
        ticketName={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
    </div>
  );
};

export default Tickets;
