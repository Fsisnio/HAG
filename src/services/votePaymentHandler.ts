import { voteStore } from './voteStore';
import { VoteRecord } from '../types/vote';

const PAID_STATUSES = new Set(['approved', 'successful', 'paid', 'completed']);
const CANCELLED_STATUSES = new Set(['canceled', 'cancelled', 'declined', 'failed']);

export interface PaymentReturnResult {
  success: boolean;
  cancelled: boolean;
  vote: VoteRecord | null;
  message: string;
}

const getTransactionId = (params: URLSearchParams): string | null =>
  params.get('id') || params.get('transaction_id') || params.get('transaction[id]');

const getPaymentStatus = (params: URLSearchParams): string =>
  (params.get('status') || params.get('transaction[status]') || '').toLowerCase();

class VotePaymentHandler {
  handlePaymentReturn(params: URLSearchParams): PaymentReturnResult {
    const status = getPaymentStatus(params);
    const transactionId = getTransactionId(params);
    const pending = voteStore.getPendingVote();

    if (!status && !transactionId) {
      return { success: false, cancelled: false, vote: pending, message: '' };
    }

    if (CANCELLED_STATUSES.has(status)) {
      if (pending) voteStore.markStatus(pending.id, 'cancelled');
      return {
        success: false,
        cancelled: true,
        vote: pending,
        message: 'Paiement annulé. Le vote n’a pas été enregistré.'
      };
    }

    if (!PAID_STATUSES.has(status) || !transactionId) {
      return {
        success: false,
        cancelled: false,
        vote: pending,
        message: 'Le paiement n’est pas confirmé. Un vote n’est valide qu’après un paiement effectif.'
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

    const paidVote = voteStore.markPaid(pending.id, transactionId);
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
  }
}

const votePaymentHandler = new VotePaymentHandler();
export default votePaymentHandler;
