// Gestionnaire des votes payants après confirmation de paiement
import paydunya from './paydunya';

export interface PendingVote {
  candidateId: number;
  candidateName: string;
  candidateCategory: string;
  voterEmail: string;
  voterPhone: string;
  amount: number;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
}

export interface CompletedVote {
  candidateId: number;
  candidateName: string;
  candidateCategory: string;
  voterEmail: string;
  voterPhone: string;
  amount: number;
  transactionId: string;
  paymentTimestamp: string;
  voteTimestamp: string;
  status: 'completed';
}

class VotePaymentHandler {
  private readonly PENDING_VOTES_KEY = 'hag_pending_votes';
  private readonly COMPLETED_VOTES_KEY = 'hag_completed_votes';
  private readonly VOTE_COUNTS_KEY = 'hag_vote_counts';

  /**
   * Traiter le retour de paiement depuis Paydunya
   */
  async handlePaymentReturn(urlParams: URLSearchParams): Promise<boolean> {
    const paymentStatus = urlParams.get('payment');
    const invoiceToken = urlParams.get('token');

    if (paymentStatus === 'success' && invoiceToken) {
      return await this.processSuccessfulPayment(invoiceToken);
    } else if (paymentStatus === 'cancelled') {
      this.handleCancelledPayment();
      return false;
    }

    return false;
  }

  /**
   * Traiter un paiement réussi
   */
  private async processSuccessfulPayment(invoiceToken: string): Promise<boolean> {
    try {
      // Vérifier le statut du paiement avec Paydunya
      const paymentInfo = await paydunya.checkInvoiceStatus(invoiceToken);

      if (paymentInfo.status === 'completed' && paymentInfo.custom_data) {
        const { candidate_id } = paymentInfo.custom_data;

        // Récupérer le vote en attente
        const pendingVote = this.getPendingVote();

        if (pendingVote && pendingVote.candidateId === parseInt(candidate_id)) {
          // Enregistrer le vote comme complété
          const completedVote: CompletedVote = {
            candidateId: pendingVote.candidateId,
            candidateName: pendingVote.candidateName,
            candidateCategory: pendingVote.candidateCategory,
            voterEmail: pendingVote.voterEmail,
            voterPhone: pendingVote.voterPhone,
            amount: pendingVote.amount,
            transactionId: paymentInfo.receipt_number || invoiceToken,
            paymentTimestamp: paymentInfo.created_at,
            voteTimestamp: new Date().toISOString(),
            status: 'completed'
          };

          this.saveCompletedVote(completedVote);
          this.incrementVoteCount(pendingVote.candidateId, pendingVote.candidateCategory);
          this.clearPendingVote();

          return true;
        }
      }
    } catch (error) {
      console.error('Erreur lors du traitement du paiement:', error);
    }

    return false;
  }

  /**
   * Traiter un paiement annulé
   */
  private handleCancelledPayment(): void {
    // Supprimer le vote en attente
    this.clearPendingVote();
  }

  /**
   * Sauvegarder un vote complété
   */
  private saveCompletedVote(vote: CompletedVote): void {
    const existingVotes = this.getCompletedVotes();
    existingVotes.push(vote);
    localStorage.setItem(this.COMPLETED_VOTES_KEY, JSON.stringify(existingVotes));
  }

  /**
   * Incrémenter le nombre de votes pour un candidat
   */
  private incrementVoteCount(candidateId: number, category: string): void {
    const voteCounts = this.getVoteCounts();
    const key = `${candidateId}-${category}`;
    
    if (!voteCounts[key]) {
      voteCounts[key] = {
        candidateId,
        category,
        count: 0
      };
    }
    
    voteCounts[key].count += 1;
    localStorage.setItem(this.VOTE_COUNTS_KEY, JSON.stringify(voteCounts));
  }

  /**
   * Récupérer le vote en attente
   */
  private getPendingVote(): PendingVote | null {
    const pendingVoteData = localStorage.getItem('hag_pending_vote');
    return pendingVoteData ? JSON.parse(pendingVoteData) : null;
  }

  /**
   * Supprimer le vote en attente
   */
  private clearPendingVote(): void {
    localStorage.removeItem('hag_pending_vote');
  }

  /**
   * Récupérer tous les votes complétés
   */
  public getCompletedVotes(): CompletedVote[] {
    const votesData = localStorage.getItem(this.COMPLETED_VOTES_KEY);
    return votesData ? JSON.parse(votesData) : [];
  }

  /**
   * Récupérer les comptes de votes
   */
  private getVoteCounts(): { [key: string]: any } {
    const countsData = localStorage.getItem(this.VOTE_COUNTS_KEY);
    return countsData ? JSON.parse(countsData) : {};
  }

  /**
   * Récupérer le nombre de votes pour un candidat
   */
  public getVoteCountForCandidate(candidateId: number, category: string): number {
    const voteCounts = this.getVoteCounts();
    const key = `${candidateId}-${category}`;
    return voteCounts[key]?.count || 0;
  }

  /**
   * Vérifier si un utilisateur a déjà voté pour un candidat
   */
  public hasUserVoted(candidateId: number, category: string, userEmail: string): boolean {
    const completedVotes = this.getCompletedVotes();
    return completedVotes.some(vote => 
      vote.candidateId === candidateId && 
      vote.candidateCategory === category && 
      vote.voterEmail.toLowerCase() === userEmail.toLowerCase()
    );
  }

  /**
   * Obtenir les statistiques de votes
   */
  public getVoteStatistics(): {
    totalVotes: number;
    totalRevenue: number;
    votesPerCategory: { [category: string]: number };
  } {
    const completedVotes = this.getCompletedVotes();
    
    const totalVotes = completedVotes.length;
    const totalRevenue = completedVotes.reduce((sum, vote) => sum + vote.amount, 0);
    
    const votesPerCategory: { [category: string]: number } = {};
    completedVotes.forEach(vote => {
      votesPerCategory[vote.candidateCategory] = (votesPerCategory[vote.candidateCategory] || 0) + 1;
    });

    return {
      totalVotes,
      totalRevenue,
      votesPerCategory
    };
  }
}

const votePaymentHandler = new VotePaymentHandler();
export default votePaymentHandler;
