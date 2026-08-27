import { voteStore } from './voteStore';
import { VoteRecord } from '../types/vote';
import { fetchChapChapStatus } from './chapchapClient';
import { VOTE_AMOUNT_GNF } from '../data/event';

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

      if (!result.paid || result.amount !== VOTE_AMOUNT_GNF) {
        return {
          success: false,
          cancelled: false,
          vote: pending,
          message: 'Le paiement n’est pas encore confirmé. Un vote n’est valide qu’après un paiement Chap Chap Pay effectif.'
        };
      }

      if (!pending) {
        return {
          success: false,
          cancelled: false,
          vote: null,
          message: 'Paiement reçu, mais aucun vote en attente n’a été trouvé sur cet appareil.'
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
        message: `Paiement confirmé. Votre vote pour ${paidVote.candidateName} a été enregistré.`
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
