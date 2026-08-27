import { voteStore } from './voteStore';
import { VoteRecord } from '../types/vote';
import { fetchChapChapStatus } from './chapchapClient';

const CANCELLED_STATUSES = new Set(['canceled', 'cancelled', 'declined', 'failed', 'expired', 'cancel']);

export interface PaymentReturnResult {
  success: boolean;
  cancelled: boolean;
  vote: VoteRecord | null;
  message: string;
}

class VotePaymentHandler {
  async handlePaymentReturn(params: URLSearchParams): Promise<PaymentReturnResult> {
    const pending = voteStore.getPendingVote();
    const statusParam = (params.get('status') || params.get('payment') || '').toLowerCase();
    const operationId = params.get('operation_id') || params.get('operationId') || pending?.chapchapOperationId || '';
    const orderId = params.get('order_id') || params.get('orderId') || pending?.id || '';
    const awaitingReturn = sessionStorage.getItem('hag_awaiting_chapchap') === '1';

    if (!statusParam && !operationId && !params.get('order_id') && !awaitingReturn) {
      return { success: false, cancelled: false, vote: pending, message: '' };
    }

    sessionStorage.removeItem('hag_awaiting_chapchap');

    if (CANCELLED_STATUSES.has(statusParam)) {
      if (pending) voteStore.markStatus(pending.id, 'cancelled');
      return {
        success: false,
        cancelled: true,
        vote: pending,
        message: 'Paiement annulé. Le vote n’a pas été enregistré.'
      };
    }

    if (!operationId && !orderId) {
      return { success: false, cancelled: false, vote: pending, message: '' };
    }

    try {
      const result = await fetchChapChapStatus({
        operationId: operationId || undefined,
        orderId: orderId || undefined
      });

      if (result.cancelled) {
        if (pending) voteStore.markStatus(pending.id, 'cancelled');
        return {
          success: false,
          cancelled: true,
          vote: pending,
          message: 'Paiement annulé. Le vote n’a pas été enregistré.'
        };
      }

      if (!pending) {
        return {
          success: false,
          cancelled: false,
          vote: null,
          message: result.paid
            ? 'Paiement reçu, mais aucun vote en attente n’a été trouvé sur cet appareil.'
            : ''
        };
      }

      if (!result.paid || result.amount !== pending.amount) {
        return {
          success: false,
          cancelled: false,
          vote: pending,
          message: 'Le paiement n’est pas encore confirmé. Un vote n’est valide qu’après un paiement Chap Chap Pay effectif.'
        };
      }

      const paidVote = voteStore.markPaid(pending.id, result.operationId);
      if (!paidVote) {
        return {
          success: false,
          cancelled: false,
          vote: pending,
          message: 'Impossible de valider le vote. Contactez l’organisation HAG.'
        };
      }

      return {
        success: true,
        cancelled: false,
        vote: paidVote,
        message: `Paiement confirmé. ${paidVote.quantity} vote${paidVote.quantity > 1 ? 's' : ''} pour ${paidVote.candidateName} ${paidVote.quantity > 1 ? 'ont' : 'a'} été enregistré${paidVote.quantity > 1 ? 's' : ''}.`
      };
    } catch {
      return {
        success: false,
        cancelled: false,
        vote: pending,
        message: 'Impossible de vérifier le paiement Chap Chap Pay pour le moment.'
      };
    }
  }
}

const votePaymentHandler = new VotePaymentHandler();
export default votePaymentHandler;
