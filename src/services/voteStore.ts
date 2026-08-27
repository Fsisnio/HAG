import { VOTE_AMOUNT_GNF } from '../data/event';
import { VoteRecord, VotePaymentStatus } from '../types/vote';

const VOTES_KEY = 'hag_votes_v2';
const PENDING_VOTE_ID_KEY = 'hag_pending_vote_id';

const createId = () =>
  `vote_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

const readVotes = (): VoteRecord[] => {
  try {
    const raw = localStorage.getItem(VOTES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeVotes = (votes: VoteRecord[]) => {
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
};

export const voteStore = {
  getAll(): VoteRecord[] {
    return readVotes();
  },

  getPaidVotes(): VoteRecord[] {
    return readVotes().filter((vote) => vote.status === 'paid');
  },

  getPaidCountForCandidate(candidateId: number): number {
    return this.getPaidVotes().reduce((sum, vote) => {
      if (vote.candidateId !== candidateId) return sum;
      return sum + (vote.quantity || 1);
    }, 0);
  },

  getPaidCountsByCandidate(): Record<number, number> {
    return this.getPaidVotes().reduce<Record<number, number>>((counts, vote) => {
      counts[vote.candidateId] = (counts[vote.candidateId] || 0) + (vote.quantity || 1);
      return counts;
    }, {});
  },

  getPendingId(): string | null {
    return sessionStorage.getItem(PENDING_VOTE_ID_KEY);
  },

  getPendingVote(): VoteRecord | null {
    const pendingId = this.getPendingId();
    if (!pendingId) return null;
    return readVotes().find((vote) => vote.id === pendingId && vote.status === 'pending_payment') || null;
  },

  createPendingVote(input: {
    candidateId: number;
    candidateName: string;
    candidateCategory: string;
    voterLastName: string;
    voterFirstName: string;
    voterEmail: string;
    voterPhone: string;
    quantity?: number;
  }): VoteRecord {
    const quantity = Math.max(1, Math.floor(input.quantity || 1));
    const vote: VoteRecord = {
      id: createId(),
      candidateId: input.candidateId,
      candidateName: input.candidateName,
      candidateCategory: input.candidateCategory,
      voterLastName: input.voterLastName.trim(),
      voterFirstName: input.voterFirstName.trim(),
      voterEmail: input.voterEmail.trim().toLowerCase(),
      voterPhone: input.voterPhone.trim(),
      quantity,
      amount: VOTE_AMOUNT_GNF * quantity,
      currency: 'GNF',
      paymentProvider: 'chapchap',
      status: 'pending_payment',
      createdAt: new Date().toISOString()
    };

    writeVotes([vote, ...readVotes()]);
    sessionStorage.setItem(PENDING_VOTE_ID_KEY, vote.id);
    return vote;
  },

  attachOperation(voteId: string, chapchapOperationId: string): VoteRecord | null {
    const votes = readVotes();
    const index = votes.findIndex((vote) => vote.id === voteId);
    if (index === -1) return null;
    votes[index] = { ...votes[index], chapchapOperationId };
    writeVotes(votes);
    return votes[index];
  },

  markPaid(voteId: string, transactionId: string): VoteRecord | null {
    const votes = readVotes();
    const alreadyPaid = votes.find(
      (vote) =>
        vote.status === 'paid' &&
        (vote.chapchapOperationId === transactionId || vote.fedapayTransactionId === transactionId)
    );
    if (alreadyPaid) {
      sessionStorage.removeItem(PENDING_VOTE_ID_KEY);
      return alreadyPaid;
    }

    const index = votes.findIndex((vote) => vote.id === voteId);
    if (index === -1) return null;

    const updated: VoteRecord = {
      ...votes[index],
      status: 'paid',
      chapchapOperationId: transactionId,
      paidAt: new Date().toISOString()
    };
    votes[index] = updated;
    writeVotes(votes);
    sessionStorage.removeItem(PENDING_VOTE_ID_KEY);
    return updated;
  },

  markStatus(voteId: string, status: Exclude<VotePaymentStatus, 'paid'>): void {
    const votes = readVotes().map((vote) =>
      vote.id === voteId ? { ...vote, status } : vote
    );
    writeVotes(votes);
    sessionStorage.removeItem(PENDING_VOTE_ID_KEY);
  }
};
