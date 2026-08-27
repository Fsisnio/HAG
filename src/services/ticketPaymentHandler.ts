import { ticketStore, TicketOrder } from './ticketStore';
import { fetchChapChapStatus } from './chapchapClient';

const CANCELLED_STATUSES = new Set(['canceled', 'cancelled', 'declined', 'failed', 'expired', 'cancel']);

export interface TicketPaymentReturnResult {
  success: boolean;
  cancelled: boolean;
  order: TicketOrder | null;
  message: string;
}

class TicketPaymentHandler {
  async handlePaymentReturn(params: URLSearchParams): Promise<TicketPaymentReturnResult> {
    const pending = ticketStore.getPendingOrder();
    const statusParam = (params.get('status') || params.get('payment') || '').toLowerCase();
    const operationId = params.get('operation_id') || params.get('operationId') || pending?.chapchapOperationId || '';
    const orderId = params.get('order_id') || params.get('orderId') || pending?.id || '';
    const awaitingReturn = sessionStorage.getItem('hag_awaiting_chapchap_ticket') === '1';

    if (!statusParam && !operationId && !params.get('order_id') && !awaitingReturn) {
      return { success: false, cancelled: false, order: pending, message: '' };
    }

    sessionStorage.removeItem('hag_awaiting_chapchap_ticket');

    if (CANCELLED_STATUSES.has(statusParam)) {
      if (pending) ticketStore.markStatus(pending.id, 'cancelled');
      return {
        success: false,
        cancelled: true,
        order: pending,
        message: 'Paiement annulé. Le ticket n’a pas été réservé.'
      };
    }

    if (!operationId && !orderId) {
      return { success: false, cancelled: false, order: pending, message: '' };
    }

    try {
      const result = await fetchChapChapStatus({
        operationId: operationId || undefined,
        orderId: orderId || undefined
      });

      if (result.cancelled) {
        if (pending) ticketStore.markStatus(pending.id, 'cancelled');
        return {
          success: false,
          cancelled: true,
          order: pending,
          message: 'Paiement annulé. Le ticket n’a pas été réservé.'
        };
      }

      if (!pending) {
        return {
          success: false,
          cancelled: false,
          order: null,
          message: result.paid
            ? 'Paiement reçu, mais aucune commande de ticket en attente n’a été trouvée sur cet appareil.'
            : ''
        };
      }

      if (!result.paid || result.amount !== pending.amount) {
        return {
          success: false,
          cancelled: false,
          order: pending,
          message: 'Le paiement n’est pas encore confirmé. La réservation n’est validée qu’après un paiement Chap Chap Pay au montant du ticket.'
        };
      }

      const paidOrder = ticketStore.markPaid(pending.id, result.operationId);
      if (!paidOrder) {
        return {
          success: false,
          cancelled: false,
          order: pending,
          message: 'Impossible de valider la réservation. Contactez l’organisation HAG.'
        };
      }

      return {
        success: true,
        cancelled: false,
        order: paidOrder,
        message: `Paiement confirmé. ${paidOrder.quantity} × ${paidOrder.ticketName} réservé(s).`
      };
    } catch {
      return {
        success: false,
        cancelled: false,
        order: pending,
        message: 'Impossible de vérifier le paiement Chap Chap Pay pour le moment.'
      };
    }
  }
}

const ticketPaymentHandler = new TicketPaymentHandler();
export default ticketPaymentHandler;
