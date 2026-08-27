import React, { useEffect, useMemo, useState } from 'react';
import { X, CreditCard, AlertCircle, ExternalLink, Loader2 } from 'lucide-react';
import { CHAPCHAP_TICKET_RETURN_PATH, formatGnf, getTicketByName } from '../data/event';
import { createChapChapCheckout } from '../services/chapchapClient';
import { ticketStore } from '../services/ticketStore';

interface TicketPaymentModalProps {
  isOpen: boolean;
  ticketName: string | null;
  onClose: () => void;
}

const TicketPaymentModal: React.FC<TicketPaymentModalProps> = ({ isOpen, ticketName, onClose }) => {
  const ticket = ticketName ? getTicketByName(ticketName) : undefined;
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setError('');
  }, [ticketName]);

  const total = useMemo(() => (ticket ? ticket.price * quantity : 0), [ticket, quantity]);
  const unitLabel = ticket?.unit === 'table' ? 'table' : 'ticket';

  const handlePay = async () => {
    if (!ticket) return;
    if (!lastName.trim() || !firstName.trim() || !email.trim() || !phone.trim()) {
      setError('Renseignez nom, prénom, e-mail et téléphone pour continuer.');
      return;
    }

    setError('');
    setIsPaying(true);

    const order = ticketStore.createPending({
      ticketName: ticket.name,
      quantity,
      unitPrice: ticket.price,
      amount: ticket.price * quantity,
      buyerLastName: lastName.trim(),
      buyerFirstName: firstName.trim(),
      buyerEmail: email.trim(),
      buyerPhone: phone.trim()
    });

    try {
      const returnUrl = `${window.location.origin}${CHAPCHAP_TICKET_RETURN_PATH}?order_id=${encodeURIComponent(order.id)}`;
      const checkout = await createChapChapCheckout({
        orderId: order.id,
        kind: 'ticket',
        ticketName: ticket.name,
        quantity,
        description: `Ticket HAG ${ticket.name} x${quantity} — ${firstName.trim()} ${lastName.trim()}`,
        returnUrl,
        cancelUrl: `${returnUrl}&status=canceled`
      });

      ticketStore.attachOperation(order.id, checkout.operationId);
      sessionStorage.setItem('hag_awaiting_chapchap_ticket', '1');
      window.location.href = checkout.paymentUrl;
    } catch (payError) {
      ticketStore.markStatus(order.id, 'failed');
      setIsPaying(false);
      setError(
        payError instanceof Error
          ? payError.message
          : 'Impossible de créer le paiement Chap Chap Pay.'
      );
    }
  };

  if (!isOpen || !ticket) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full mx-auto shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-blue-dark">Payer un ticket</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full" disabled={isPaying}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-gradient-to-r from-gold/10 to-yellow-400/10 p-4 rounded-xl border border-gold/20">
            <h3 className="font-semibold text-blue-dark mb-1">{ticket.name}</h3>
            <p className="text-sm text-gray-600">{ticket.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-medium text-blue-dark">Prix unitaire</span>
              <span className="text-lg font-bold text-gold">{formatGnf(ticket.price)}</span>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Paiement sécurisé Chap Chap Pay. Le montant envoyé est celui du tarif officiel, multiplié par la quantité.
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de {unitLabel}s *
            </label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              {Array.from({ length: ticket.maxQuantity }, (_, index) => index + 1).map((value) => (
                <option key={value} value={value}>
                  {value} — {formatGnf(ticket.price * value)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prénom(s) *</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="6XX XX XX XX"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            disabled={isPaying}
          >
            Annuler
          </button>
          <button
            onClick={handlePay}
            disabled={isPaying}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gold text-blue-dark rounded-lg hover:bg-yellow-400 font-semibold disabled:opacity-70"
          >
            {isPaying ? <Loader2 className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
            <span>{isPaying ? 'Redirection…' : `Payer ${formatGnf(total)}`}</span>
            {!isPaying && <ExternalLink className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketPaymentModal;
