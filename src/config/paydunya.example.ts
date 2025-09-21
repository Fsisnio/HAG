// Configuration Paydunya pour les votes HAG
// Copiez ce fichier vers paydunya.config.ts et remplissez vos vraies clés

export const paydunyaConfig = {
  // Mode: 'test' pour sandbox, 'live' pour production
  mode: 'test' as 'test' | 'live',
  
  // Clés d'API Paydunya (à récupérer depuis votre dashboard Paydunya)
  masterKey: 'your_master_key_here',
  publicKey: 'your_public_key_here', 
  privateKey: 'your_private_key_here',
  token: 'your_token_here',
  
  // Configuration des votes
  voteAmount: 10000, // Prix du vote en GNF
  currency: 'GNF',
  
  // URL du webhook pour les notifications de paiement
  // Cette URL doit être accessible publiquement pour recevoir les webhooks Paydunya
  webhookUrl: 'https://votre-domaine.com/api/webhook/paydunya',
  
  // Informations de la boutique
  store: {
    name: "Hospitality Awards Guinée",
    tagline: "Système de vote officiel HAG 2025",
    phone: "+224 xxx xxx xxx",
    postalAddress: "Conakry, Guinée",
    websiteUrl: "https://hag-awards.com",
    logoUrl: "/Logo HAG.png"
  }
};
