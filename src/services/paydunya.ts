// Service d'intégration Paydunya pour les votes HAG
export interface PaydunyaConfig {
  masterKey: string;
  publicKey: string;
  privateKey: string;
  token: string;
  mode: 'live' | 'test';
}

export interface VotePaymentData {
  candidateId: number;
  candidateName: string;
  candidateCategory: string;
  voterEmail?: string;
  voterPhone?: string;
  amount: number;
  currency: string;
}

export interface PaydunyaResponse {
  response_code: string;
  response_text: string;
  description: string;
  invoice_url?: string;
  invoice_token?: string;
}

class PaydunyaService {
  private config: PaydunyaConfig;
  private baseUrl: string;

  constructor(config: PaydunyaConfig) {
    this.config = config;
    this.baseUrl = config.mode === 'live' 
      ? 'https://app.paydunya.com/api/v1' 
      : 'https://app.paydunya.com/sandbox-api/v1';
  }

  /**
   * Créer une facture de vote
   */
  async createVoteInvoice(paymentData: VotePaymentData): Promise<PaydunyaResponse> {
    const invoiceData = {
      invoice: {
        total_amount: paymentData.amount,
        description: `Vote pour ${paymentData.candidateName} - ${paymentData.candidateCategory}`,
      },
      store: {
        name: "Hospitality Awards Guinée",
        tagline: "Système de vote officiel HAG 2025",
        phone: "+224 xxx xxx xxx",
        postal_address: "Conakry, Guinée",
        website_url: window.location.origin,
        logo_url: `${window.location.origin}/Logo HAG.png`
      },
      custom_data: {
        candidate_id: paymentData.candidateId,
        candidate_name: paymentData.candidateName,
        candidate_category: paymentData.candidateCategory,
        vote_timestamp: new Date().toISOString(),
        payment_type: 'vote'
      },
      actions: {
        cancel_url: `${window.location.origin}/voter?payment=cancelled`,
        return_url: `${window.location.origin}/voter?payment=success`,
        callback_url: `${window.location.origin}/api/webhook/paydunya` // URL du webhook
      }
    };

    try {
      const response = await fetch(`${this.baseUrl}/checkout-invoice/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'PAYDUNYA-MASTER-KEY': this.config.masterKey,
          'PAYDUNYA-PRIVATE-KEY': this.config.privateKey,
          'PAYDUNYA-TOKEN': this.config.token
        },
        body: JSON.stringify(invoiceData)
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erreur lors de la création de la facture Paydunya:', error);
      throw new Error('Impossible de créer la facture de paiement');
    }
  }

  /**
   * Vérifier le statut d'une facture
   */
  async checkInvoiceStatus(invoiceToken: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/checkout-invoice/confirm/${invoiceToken}`, {
        method: 'GET',
        headers: {
          'PAYDUNYA-MASTER-KEY': this.config.masterKey,
          'PAYDUNYA-PRIVATE-KEY': this.config.privateKey,
          'PAYDUNYA-TOKEN': this.config.token
        }
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erreur lors de la vérification du statut:', error);
      throw new Error('Impossible de vérifier le statut du paiement');
    }
  }

  /**
   * Valider un webhook Paydunya
   */
  validateWebhook(data: any, signature: string): boolean {
    // Implémenter la validation de signature selon la documentation Paydunya
    // Cette fonction sera utilisée côté serveur
    return true; // Placeholder
  }
}

// Configuration pour l'environnement de développement
const paydunya = new PaydunyaService({
  masterKey: process.env.REACT_APP_PAYDUNYA_MASTER_KEY || 'test-master-key',
  publicKey: process.env.REACT_APP_PAYDUNYA_PUBLIC_KEY || 'test-public-key',
  privateKey: process.env.REACT_APP_PAYDUNYA_PRIVATE_KEY || 'test-private-key',
  token: process.env.REACT_APP_PAYDUNYA_TOKEN || 'test-token',
  mode: (process.env.REACT_APP_PAYDUNYA_MODE as 'live' | 'test') || 'test'
});

export { PaydunyaService };
export default paydunya;
