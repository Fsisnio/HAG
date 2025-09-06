# Guide de Déploiement - Hospitality Awards Guinée

## Déploiement sur Render

### Prérequis
- Compte Render.com
- Repository Git (GitHub, GitLab, ou Bitbucket)
- Node.js 18+ installé localement

### Étapes de déploiement

#### 1. Préparation du code
```bash
# Installer les dépendances
npm install

# Tester le build local
npm run build

# Vérifier que le build fonctionne
npm run build:prod
```

#### 2. Configuration Render

1. **Connecter le repository** à Render
2. **Sélectionner le type de service** : Static Site
3. **Configuration** :
   - **Build Command** : `npm install && npm run build`
   - **Publish Directory** : `build`
   - **Node Version** : 18.x

#### 3. Variables d'environnement (optionnel)
Si vous utilisez des variables d'environnement, les ajouter dans Render :
- `REACT_APP_SITE_NAME`
- `REACT_APP_CONTACT_EMAIL`
- `REACT_APP_PHONE`
- etc.

#### 4. Configuration du routing SPA
Le fichier `_redirects` est déjà configuré pour gérer le routing SPA.

### Optimisations de production

#### Build optimisé
- Source maps désactivés pour réduire la taille
- Minification automatique
- Tree shaking activé

#### Headers de sécurité
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

#### Cache
- Assets statiques : 1 an
- Pages HTML : pas de cache

### Vérifications post-déploiement

1. **Fonctionnalités principales** :
   - [ ] Page d'accueil se charge correctement
   - [ ] Navigation entre les pages
   - [ ] Formulaire de candidature
   - [ ] Système de vote
   - [ ] Dashboard admin

2. **Performance** :
   - [ ] Temps de chargement < 3s
   - [ ] Images optimisées
   - [ ] CSS/JS minifiés

3. **SEO** :
   - [ ] Meta tags présents
   - [ ] Open Graph configuré
   - [ ] Sitemap (si nécessaire)

### Commandes utiles

```bash
# Build de production
npm run build:prod

# Test local du build
npx serve -s build

# Vérification des erreurs
npm run build 2>&1 | grep -i error
```

### Support
Pour toute question sur le déploiement, contacter l'équipe technique.
