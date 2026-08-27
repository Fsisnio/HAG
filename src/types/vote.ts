export type VotePaymentStatus = 'pending_payment' | 'paid' | 'cancelled' | 'failed';
export type VotePaymentProvider = 'chapchap' | 'fedapay';

export interface VoteRecord {
  id: string;
  candidateId: number;
  candidateName: string;
  candidateCategory: string;
  voterLastName: string;
  voterFirstName: string;
  voterEmail: string;
  voterPhone: string;
  amount: number;
  currency: 'GNF';
  paymentProvider: VotePaymentProvider;
  chapchapOperationId?: string;
  fedapayTransactionId?: string;
  status: VotePaymentStatus;
  createdAt: string;
  paidAt?: string;
}
