// Exemple de gestionnaire de webhook côté serveur pour Paydunya
// Ce fichier doit être placé sur votre serveur backend

const express = require('express');
const crypto = require('crypto');
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Base de données simulée (remplacer par vraie DB)
const completedVotes = [];
const voteCounts = {};

/**
 * Endpoint pour recevoir les webhooks Paydunya
 */
app.post('/api/webhook/paydunya', async (req, res) => {
  try {
    const webhookData = req.body;
    const signature = req.headers['paydunya-signature'];
    
    // 1. Valider la signature du webhook (optionnel mais recommandé)
    if (!validateWebhookSignature(webhookData, signature)) {
      console.log('Signature webhook invalide');
      return res.status(401).json({ error: 'Signature invalide' });
    }
    
    // 2. Vérifier que le paiement est confirmé
    if (webhookData.status === 'completed' && webhookData.custom_data) {
      const {
        candidate_id,
        candidate_name,
        candidate_category,
        vote_timestamp,
        payment_type
      } = webhookData.custom_data;
      
      // 3. Vérifier que c'est bien un vote
      if (payment_type === 'vote') {
        // 4. Enregistrer le vote en base de données
        const vote = {
          candidateId: parseInt(candidate_id),
          candidateName: candidate_name,
          candidateCategory: candidate_category,
          transactionId: webhookData.receipt_number,
          amount: webhookData.total_amount,
          currency: webhookData.currency,
          paymentTimestamp: webhookData.created_at,
          voteTimestamp: vote_timestamp,
          voterEmail: webhookData.customer?.email,
          voterPhone: webhookData.customer?.phone,
          status: 'completed'
        };
        
        // Sauvegarder en base (exemple avec tableau en mémoire)
        completedVotes.push(vote);
        
        // 5. Incrémenter le compteur de votes
        const voteKey = `${candidate_id}-${candidate_category}`;
        if (!voteCounts[voteKey]) {
          voteCounts[voteKey] = 0;
        }
        voteCounts[voteKey]++;
        
        // 6. Optionnel: Envoyer une notification email/SMS
        await sendVoteConfirmation(vote);
        
        console.log(`Vote enregistré: ${candidate_name} - ${candidate_category}`);
        
        // 7. Répondre OK à Paydunya
        res.status(200).json({ 
          status: 'success',
          message: 'Vote enregistré avec succès' 
        });
      } else {
        res.status(400).json({ error: 'Type de paiement non reconnu' });
      }
    } else {
      res.status(400).json({ error: 'Paiement non confirmé' });
    }
    
  } catch (error) {
    console.error('Erreur traitement webhook:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * Valider la signature du webhook Paydunya
 */
function validateWebhookSignature(data, signature) {
  // Implémenter selon la documentation Paydunya
  // Exemple générique:
  const paydunyaPrivateKey = process.env.PAYDUNYA_PRIVATE_KEY;
  const computedSignature = crypto
    .createHmac('sha256', paydunyaPrivateKey)
    .update(JSON.stringify(data))
    .digest('hex');
  
  return computedSignature === signature;
}

/**
 * Envoyer confirmation de vote par email
 */
async function sendVoteConfirmation(vote) {
  // Implémenter l'envoi d'email/SMS
  console.log(`Confirmation envoyée pour: ${vote.voterEmail}`);
}

/**
 * API pour récupérer les statistiques de votes
 */
app.get('/api/votes/stats', (req, res) => {
  const totalVotes = completedVotes.length;
  const totalRevenue = completedVotes.reduce((sum, vote) => sum + vote.amount, 0);
  
  const votesPerCategory = {};
  completedVotes.forEach(vote => {
    votesPerCategory[vote.candidateCategory] = 
      (votesPerCategory[vote.candidateCategory] || 0) + 1;
  });
  
  res.json({
    totalVotes,
    totalRevenue,
    votesPerCategory,
    voteCounts
  });
});

/**
 * API pour récupérer les votes d'un candidat
 */
app.get('/api/votes/candidate/:id/:category', (req, res) => {
  const { id, category } = req.params;
  const voteKey = `${id}-${category}`;
  const count = voteCounts[voteKey] || 0;
  
  res.json({
    candidateId: parseInt(id),
    category: decodeURIComponent(category),
    voteCount: count
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur webhook HAG démarré sur le port ${PORT}`);
  console.log(`Endpoint webhook: http://localhost:${PORT}/api/webhook/paydunya`);
});

module.exports = app;
