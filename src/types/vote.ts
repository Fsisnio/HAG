export type VotePaymentStatus = 'pending_payment' | 'paid' | 'cancelled' | 'failed';

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
  paymentProvider: 'fedapay';
  fedapayTransactionId?: string;
  status: VotePaymentStatus;
  createdAt: string;
  paidAt?: string;
}
