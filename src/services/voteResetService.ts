// Service de réinitialisation des votes HAG
export interface ResetResult {
  success: boolean;
  message: string;
  resetData: {
    votesReset: number;
    paymentsReset: number;
    ratingsReset: number;
    candidatesReset: number;
  };
}

class VoteResetService {
  // Clés du localStorage à réinitialiser
  private readonly STORAGE_KEYS = {
    VOTES: 'hag_candidates_votes',
    RATINGS: 'hag_candidates_ratings', 
    COMPLETED_VOTES: 'hag_completed_votes',
    PENDING_VOTE: 'hag_pending_vote',
    VOTE_COUNTS: 'hag_vote_counts',
    ADMIN_DATA: 'hag_admin_data',
    USER_VOTES: 'hag_user_votes'
  };

  /**
   * Réinitialiser tous les votes et données de paiement
   */
  async resetAllVotes(): Promise<ResetResult> {
    try {
      const resetData = {
        votesReset: 0,
        paymentsReset: 0,
        ratingsReset: 0,
        candidatesReset: 0
      };

      // 1. Compter les données existantes
      resetData.votesReset = this.countExistingVotes();
      resetData.paymentsReset = this.countExistingPayments();
      resetData.ratingsReset = this.countExistingRatings();
      resetData.candidatesReset = this.countAffectedCandidates();

      // 2. Supprimer toutes les données de vote
      this.clearAllVoteData();

      // 3. Réinitialiser les compteurs
      this.resetVoteCounts();

      // 4. Créer un log de la réinitialisation
      this.logReset(resetData);

      return {
        success: true,
        message: `Reset réussi ! ${resetData.votesReset} votes, ${resetData.paymentsReset} paiements et ${resetData.ratingsReset} évaluations ont été réinitialisés.`,
        resetData
      };

    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error);
      return {
        success: false,
        message: 'Erreur lors de la réinitialisation des votes',
        resetData: { votesReset: 0, paymentsReset: 0, ratingsReset: 0, candidatesReset: 0 }
      };
    }
  }

  /**
   * Réinitialiser seulement les votes gratuits (garder les votes payants)
   */
  async resetFreeVotesOnly(): Promise<ResetResult> {
    try {
      const votesData = localStorage.getItem(this.STORAGE_KEYS.VOTES);
      const votes = votesData ? JSON.parse(votesData) : [];
      
      const resetData = {
        votesReset: votes.length,
        paymentsReset: 0, // On garde les paiements
        ratingsReset: 0,
        candidatesReset: this.countAffectedCandidates()
      };

      // Supprimer seulement les votes gratuits
      localStorage.removeItem(this.STORAGE_KEYS.VOTES);
      localStorage.removeItem(this.STORAGE_KEYS.RATINGS);

      this.logReset(resetData, 'free_votes_only');

      return {
        success: true,
        message: `Reset des votes gratuits réussi ! ${resetData.votesReset} votes gratuits ont été réinitialisés.`,
        resetData
      };

    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la réinitialisation des votes gratuits',
        resetData: { votesReset: 0, paymentsReset: 0, ratingsReset: 0, candidatesReset: 0 }
      };
    }
  }

  /**
   * Compter les votes existants
   */
  private countExistingVotes(): number {
    const votesData = localStorage.getItem(this.STORAGE_KEYS.VOTES);
    return votesData ? JSON.parse(votesData).length : 0;
  }

  /**
   * Compter les paiements existants
   */
  private countExistingPayments(): number {
    const paymentsData = localStorage.getItem(this.STORAGE_KEYS.COMPLETED_VOTES);
    return paymentsData ? JSON.parse(paymentsData).length : 0;
  }

  /**
   * Compter les évaluations existantes
   */
  private countExistingRatings(): number {
    const ratingsData = localStorage.getItem(this.STORAGE_KEYS.RATINGS);
    return ratingsData ? Object.keys(JSON.parse(ratingsData)).length : 0;
  }

  /**
   * Compter les candidats affectés
   */
  private countAffectedCandidates(): number {
    const voteCountsData = localStorage.getItem(this.STORAGE_KEYS.VOTE_COUNTS);
    return voteCountsData ? Object.keys(JSON.parse(voteCountsData)).length : 0;
  }

  /**
   * Supprimer toutes les données de vote
   */
  private clearAllVoteData(): void {
    Object.values(this.STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  /**
   * Réinitialiser les compteurs de votes
   */
  private resetVoteCounts(): void {
    localStorage.setItem(this.STORAGE_KEYS.VOTE_COUNTS, JSON.stringify({}));
  }

  /**
   * Logger la réinitialisation
   */
  private logReset(resetData: any, type: string = 'full_reset'): void {
    const resetLog = {
      timestamp: new Date().toISOString(),
      type,
      data: resetData,
      userAgent: navigator.userAgent
    };

    const existingLogs = localStorage.getItem('hag_reset_logs');
    const logs = existingLogs ? JSON.parse(existingLogs) : [];
    logs.push(resetLog);
    
    // Garder seulement les 10 derniers logs
    if (logs.length > 10) {
      logs.splice(0, logs.length - 10);
    }
    
    localStorage.setItem('hag_reset_logs', JSON.stringify(logs));
    console.log('Reset effectué:', resetLog);
  }

  /**
   * Obtenir l'historique des réinitialisations
   */
  getResetHistory(): any[] {
    const logs = localStorage.getItem('hag_reset_logs');
    return logs ? JSON.parse(logs) : [];
  }

  /**
   * Vérifier s'il y a des données à réinitialiser
   */
  hasDataToReset(): {
    hasVotes: boolean;
    hasPayments: boolean;
    hasRatings: boolean;
    totalItems: number;
  } {
    return {
      hasVotes: this.countExistingVotes() > 0,
      hasPayments: this.countExistingPayments() > 0,
      hasRatings: this.countExistingRatings() > 0,
      totalItems: this.countExistingVotes() + this.countExistingPayments() + this.countExistingRatings()
    };
  }

  /**
   * Créer une sauvegarde avant reset
   */
  createBackup(): string {
    const backup: {
      timestamp: string;
      data: Record<string, any>;
    } = {
      timestamp: new Date().toISOString(),
      data: {}
    };

    // Sauvegarder toutes les données importantes
    Object.values(this.STORAGE_KEYS).forEach(key => {
      const data = localStorage.getItem(key);
      if (data) {
        backup.data[key] = JSON.parse(data);
      }
    });

    const backupString = JSON.stringify(backup);
    localStorage.setItem('hag_last_backup', backupString);
    
    return backupString;
  }

  /**
   * Restaurer depuis une sauvegarde
   */
  restoreFromBackup(backupString: string): boolean {
    try {
      const backup = JSON.parse(backupString);
      
      Object.entries(backup.data).forEach(([key, data]) => {
        localStorage.setItem(key, JSON.stringify(data));
      });

      this.logReset({ restored: true }, 'restore_backup');
      return true;
    } catch (error) {
      console.error('Erreur lors de la restauration:', error);
      return false;
    }
  }
}

const voteResetService = new VoteResetService();
export default voteResetService;
