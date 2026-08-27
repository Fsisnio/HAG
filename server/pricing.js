const VOTE_AMOUNT_GNF = 5000;

const TICKETS = [
  { name: 'Standard', price: 500000, maxQuantity: 10, unit: 'ticket' },
  { name: 'VIP', price: 1000000, maxQuantity: 10, unit: 'ticket' },
  { name: 'VVIP', price: 2000000, maxQuantity: 10, unit: 'ticket' },
  { name: 'Table entreprise', price: 10000000, maxQuantity: 5, unit: 'table' },
  { name: 'Table Prestige', price: 20000000, maxQuantity: 5, unit: 'table' }
];

const resolvePaymentAmount = ({ kind, ticketName, quantity } = {}) => {
  if (kind === 'ticket') {
    const ticket = TICKETS.find((item) => item.name === ticketName);
    if (!ticket) {
      const error = new Error('Type de ticket invalide');
      error.statusCode = 400;
      throw error;
    }
    const qty = Math.floor(Number(quantity) || 1);
    if (!Number.isFinite(qty) || qty < 1 || qty > ticket.maxQuantity) {
      const error = new Error(`Quantité invalide (1 à ${ticket.maxQuantity})`);
      error.statusCode = 400;
      throw error;
    }
    return {
      kind: 'ticket',
      ticketName: ticket.name,
      quantity: qty,
      unitPrice: ticket.price,
      amount: ticket.price * qty,
      unit: ticket.unit
    };
  }

  const qty = Math.floor(Number(quantity) || 1);
  if (!Number.isFinite(qty) || qty < 1 || !Number.isSafeInteger(VOTE_AMOUNT_GNF * qty)) {
    const error = new Error('Nombre de votes invalide');
    error.statusCode = 400;
    throw error;
  }

  return {
    kind: 'vote',
    ticketName: null,
    quantity: qty,
    unitPrice: VOTE_AMOUNT_GNF,
    amount: VOTE_AMOUNT_GNF * qty,
    unit: 'vote'
  };
};

module.exports = {
  VOTE_AMOUNT_GNF,
  TICKETS,
  resolvePaymentAmount
};
