# Système de Vote Payant - HAG 2025

Ce document explique l'implémentation du système de vote payant avec Paydunya pour les Hospitality Awards Guinée 2025.

## 🔄 Flux de Paiement

### 1. **Initiation du Vote**
1. L'utilisateur clique sur "Voter (10k GNF)" pour un candidat
2. Un modal de paiement s'ouvre demandant email et téléphone
3. L'utilisateur remplit ses informations et clique "Payer et Voter"

### 2. **Création de la Facture**
1. L'application appelle l'API Paydunya pour créer une facture
2. Les données du vote sont incluses dans `custom_data`
3. Le vote est marqué comme "en attente" dans le localStorage
4. L'utilisateur est redirigé vers Paydunya

### 3. **Paiement Paydunya**
1. L'utilisateur effectue le paiement via Paydunya
2. Paydunya traite le paiement (Mobile Money, carte bancaire, etc.)
3. L'utilisateur est redirigé vers l'application HAG

### 4. **Confirmation et Webhook**
1. **Frontend**: Vérification du statut via l'API Paydunya
2. **Backend**: Réception du webhook serveur-à-serveur
3. Validation de la transaction et enregistrement du vote
4. Affichage de la confirmation à l'utilisateur

## 📁 Structure des Fichiers

### Frontend
```
src/
├── services/
│   ├── paydunya.ts              # Service d'intégration Paydunya
│   └── votePaymentHandler.ts    # Gestionnaire des votes payants
├── components/
│   ├── PaymentModal.tsx         # Modal de paiement
│   └── VoteButton.tsx           # Bouton de vote mis à jour
├── pages/
│   └── Vote.tsx                 # Page de vote avec gestion paiement
└── config/
    └── paydunya.example.ts      # Configuration exemple
```

### Backend (exemple)
```
backend-example/
└── webhook-handler.js           # Gestionnaire de webhook serveur
```

## ⚙️ Configuration

### 1. Variables d'environnement
Créez un fichier `.env` avec vos clés Paydunya :
```env
REACT_APP_PAYDUNYA_MODE=test
REACT_APP_PAYDUNYA_MASTER_KEY=your_master_key
REACT_APP_PAYDUNYA_PUBLIC_KEY=your_public_key  
REACT_APP_PAYDUNYA_PRIVATE_KEY=your_private_key
REACT_APP_PAYDUNYA_TOKEN=your_token
```

### 2. Configuration Paydunya
1. Créez un compte sur [Paydunya](https://paydunya.com)
2. Récupérez vos clés d'API dans le dashboard
3. Configurez votre webhook URL : `https://votre-domaine.com/api/webhook/paydunya`

## 💰 Tarification

- **Prix par vote** : 10,000 GNF (configurable)
- **Devise** : GNF (Franc Guinéen)
- **Méthodes de paiement** : Mobile Money, cartes bancaires, etc.

## 🛡️ Sécurité

### Anti-fraude
- **Un vote par email/candidat** : Vérification par email
- **Validation de signature** : Webhooks sécurisés
- **Vérification côté serveur** : Double validation des paiements

### Données protégées
- Informations de paiement traitées par Paydunya
- Données de vote stockées localement + serveur
- Signatures webhook validées

## 📊 Gestion des Données

### LocalStorage (Frontend)
```javascript
// Vote en attente
hag_pending_vote: {
  candidateId, candidateName, candidateCategory,
  voterEmail, voterPhone, amount, timestamp
}

// Votes complétés
hag_completed_votes: [{
  candidateId, candidateName, candidateCategory,
  voterEmail, transactionId, amount, timestamp
}]

// Compteurs de votes
hag_vote_counts: {
  "candidateId-category": { count: number }
}
```

### Base de données (Backend)
Recommandé d'implémenter une vraie base de données pour :
- Votes confirmés
- Statistiques en temps réel
- Audit trail
- Reporting

## 🔧 Fonctionnalités

### ✅ Implémentées
- [x] Intégration Paydunya complète
- [x] Modal de paiement responsive
- [x] Gestion des retours de paiement
- [x] Stockage local des votes
- [x] Validation anti-double vote
- [x] Interface utilisateur intuitive
- [x] Gestion des erreurs

### 🔄 À implémenter côté serveur
- [ ] Base de données persistante
- [ ] API REST pour les statistiques
- [ ] Tableau de bord admin en temps réel
- [ ] Notifications email/SMS
- [ ] Reporting et analytics
- [ ] Backup et recovery

## 🚀 Déploiement

### Frontend
1. Configurez vos variables d'environnement
2. Déployez sur Netlify/Vercel/etc.
3. Configurez le domaine personnalisé

### Backend
1. Déployez le gestionnaire de webhook
2. Configurez l'URL dans Paydunya
3. Testez la réception des webhooks

## 🧪 Tests

### Mode Test
- Utilisez les clés de test Paydunya
- Testez avec de faux paiements
- Vérifiez les webhooks en local avec ngrok

### Mode Production
- Basculez vers les clés live
- Testez avec de vrais paiements
- Surveillez les logs de webhook

## 📈 Statistiques

Le système fournit :
- **Nombre total de votes** payés
- **Revenus générés** par catégorie
- **Votes par candidat** en temps réel
- **Détails des transactions** pour audit

## 🆘 Support

### Problèmes courants
1. **Paiement bloqué** : Vérifier les clés API
2. **Webhook non reçu** : Vérifier l'URL publique
3. **Vote non comptabilisé** : Vérifier les logs serveur

### Logs utiles
- Console navigateur pour erreurs frontend
- Logs serveur pour webhooks
- Dashboard Paydunya pour transactions

---

*Ce système garantit un vote équitable et monétise efficacement l'engagement des utilisateurs HAG 2025.* ✨
