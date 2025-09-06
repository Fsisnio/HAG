# Accès au Dashboard Administrateur - HAG

## 🔐 Authentification

### Mot de passe par défaut
```
HAG2024Admin!
```

### Comment accéder au dashboard

1. **URL d'accès** : `https://votre-domaine.com/admin`
2. **Page de connexion** : Saisir le mot de passe administrateur
3. **Session** : Valide pendant 24 heures
4. **Déconnexion** : Bouton "Déconnexion" en haut à droite

## 🛡️ Sécurité

### Changer le mot de passe en production

**IMPORTANT** : Changez le mot de passe par défaut avant la mise en production !

1. Ouvrir le fichier : `src/components/AdminLogin.tsx`
2. Modifier la ligne 12 :
   ```typescript
   const ADMIN_PASSWORD = 'VOTRE_NOUVEAU_MOT_DE_PASSE_SECURISE';
   ```
3. Redéployer l'application

### Recommandations de sécurité

- **Mot de passe fort** : Minimum 12 caractères, majuscules, minuscules, chiffres, symboles
- **Exemple sécurisé** : `HAG2024!Admin@Secure#`
- **Changement régulier** : Tous les 3 mois
- **Accès limité** : Seulement les administrateurs autorisés

## 📊 Fonctionnalités du Dashboard

### Tableau de bord principal (`/admin`)
- Statistiques en temps réel
- Gestion des candidats
- Suivi des votes
- Analytics et rapports

### Profil administrateur (`/admin/profile`)
- Informations personnelles
- Paramètres de sécurité
- Historique des connexions

## 🔧 Configuration avancée

### Variables d'environnement (optionnel)
Pour une sécurité renforcée, vous pouvez utiliser des variables d'environnement :

1. Créer un fichier `.env.local` :
   ```
   REACT_APP_ADMIN_PASSWORD=VOTRE_MOT_DE_PASSE_SECURISE
   ```

2. Modifier `AdminLogin.tsx` :
   ```typescript
   const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'HAG2024Admin!';
   ```

### Authentification multi-utilisateurs (futur)
Pour une authentification plus avancée avec plusieurs utilisateurs :
- Base de données utilisateurs
- Rôles et permissions
- Authentification par email/mot de passe
- 2FA (Two-Factor Authentication)

## 🆘 Support

En cas de problème d'accès :
1. Vérifier que l'URL est correcte
2. Vider le cache du navigateur
3. Vérifier la session dans localStorage
4. Contacter l'équipe technique

## 📝 Logs de sécurité

Le système enregistre automatiquement :
- Tentatives de connexion
- Heures de connexion/déconnexion
- Sessions expirées
- Erreurs d'authentification

Ces logs sont visibles dans la console du navigateur (F12).
