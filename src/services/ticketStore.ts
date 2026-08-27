export type TicketPaymentStatus = 'pending_payment' | 'paid' | 'cancelled' | 'failed';

export interface TicketOrder {
  id: string;
  ticketName: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  buyerLastName: string;
  buyerFirstName: string;
  buyerEmail: string;
  buyerPhone: string;
  chapchapOperationId?: string;
  status: TicketPaymentStatus;
  createdAt: string;
  paidAt?: string;
}

const ORDERS_KEY = 'hag_tickets_v1';
const PENDING_ID_KEY = 'hag_pending_ticket_id';

const createId = () => `ticket_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

const readOrders = (): TicketOrder[] => {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeOrders = (orders: TicketOrder[]) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const ticketStore = {
  getPendingId(): string | null {
    return sessionStorage.getItem(PENDING_ID_KEY);
  },

  getPendingOrder(): TicketOrder | null {
    const pendingId = this.getPendingId();
    if (!pendingId) return null;
    return readOrders().find((order) => order.id === pendingId && order.status === 'pending_payment') || null;
  },

  createPending(input: Omit<TicketOrder, 'id' | 'status' | 'createdAt'>): TicketOrder {
    const order: TicketOrder = {
      ...input,
      id: createId(),
      status: 'pending_payment',
      createdAt: new Date().toISOString()
    };
    writeOrders([order, ...readOrders()]);
    sessionStorage.setItem(PENDING_ID_KEY, order.id);
    return order;
  },

  attachOperation(orderId: string, chapchapOperationId: string): TicketOrder | null {
    const orders = readOrders();
    const index = orders.findIndex((order) => order.id === orderId);
    if (index === -1) return null;
    orders[index] = { ...orders[index], chapchapOperationId };
    writeOrders(orders);
    return orders[index];
  },

  markPaid(orderId: string, transactionId: string): TicketOrder | null {
    const orders = readOrders();
    const alreadyPaid = orders.find(
      (order) => order.status === 'paid' && order.chapchapOperationId === transactionId
    );
    if (alreadyPaid) {
      sessionStorage.removeItem(PENDING_ID_KEY);
      return alreadyPaid;
    }
    const index = orders.findIndex((order) => order.id === orderId);
    if (index === -1) return null;
    const updated: TicketOrder = {
      ...orders[index],
      status: 'paid',
      chapchapOperationId: transactionId,
      paidAt: new Date().toISOString()
    };
    orders[index] = updated;
    writeOrders(orders);
    sessionStorage.removeItem(PENDING_ID_KEY);
    return updated;
  },

  markStatus(orderId: string, status: Exclude<TicketPaymentStatus, 'paid'>): void {
    writeOrders(
      readOrders().map((order) => (order.id === orderId ? { ...order, status } : order))
    );
    sessionStorage.removeItem(PENDING_ID_KEY);
  }
};
