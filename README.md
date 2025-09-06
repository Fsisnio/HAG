# Hospitality Awards Guinée - HAG

Site officiel des Hospitality Awards Guinée (HAG) - Innovation et proximité, célébrons l'excellence en hospitalité.

## 🎯 Objectif

Le site HAG vise à :
- Mettre en valeur l'événement annuel
- Centraliser les candidatures
- Informer le public
- Fédérer les acteurs du tourisme et de l'hospitalité guinéens

## 🏗️ Structure du projet

```
HAG/
├── public/                 # Fichiers publics et HTML
├── src/                    # Code source React/TypeScript
│   ├── components/         # Composants réutilisables
│   │   ├── Header.tsx     # Navigation principale
│   │   ├── Footer.tsx     # Pied de page
│   │   └── Countdown.tsx  # Compte à rebours
│   ├── pages/             # Pages de l'application
│   │   ├── Home.tsx       # Page d'accueil
│   │   ├── About.tsx      # À propos
│   │   ├── Categories.tsx # Catégories de prix
│   │   ├── Contact.tsx    # Contact
│   │   └── ...            # Autres pages
│   ├── App.tsx            # Composant principal
│   ├── index.tsx          # Point d'entrée
│   └── index.css          # Styles globaux
├── package.json            # Dépendances et scripts
└── tsconfig.json          # Configuration TypeScript
```

## 🎨 Charte graphique

### Couleurs
- **Or prestige** (#D4AF37) : Titres, icônes, boutons primaires
- **Bleu nuit** (#0D1B2A) : Fond principal, menu, footer
- **Bleu profond** (#1B263B) : Survol des boutons, encarts
- **Blanc pur** (#FFFFFF) : Fond secondaire, texte sur fond sombre
- **Gris clair** (#F5F5F5) : Fonds de sections neutres

### Typographie
- **Titres** : Montserrat Bold (capitales pour l'impact)
- **Texte courant** : Open Sans Regular (lecture fluide)
- **Mises en avant** : Montserrat Semi-Bold Italic

## 🚀 Installation et démarrage

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation
1. Clonez le repository :
```bash
git clone [URL_DU_REPO]
cd HAG
```

2. Installez les dépendances :
```bash
npm install
```

3. Démarrez le serveur de développement :
```bash
npm start
```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Scripts disponibles
- `npm start` : Démarre le serveur de développement
- `npm run build` : Construit l'application pour la production
- `npm test` : Lance les tests
- `npm run eject` : Éjecte la configuration (irréversible)

## 📱 Fonctionnalités

### Pages principales
- **Accueil** : Landing page avec compte à rebours et boutons d'action
- **À propos** : Mission, objectifs et mot du commissaire général
- **Catégories** : Liste des prix et critères d'éligibilité
- **Lauréats** : Présentation des gagnants
- **Historique** : Rétrospective des éditions précédentes
- **Blog** : Actualités et articles
- **Partenaires** : Sponsors et partenaires
- **Équipe** : Notre équipe organisatrice
- **Contact** : Formulaire de contact et coordonnées
- **Candidature** : Formulaire de candidature en ligne

### Fonctionnalités avancées
- **Compte à rebours dynamique** vers la cérémonie
- **Formulaire de candidature** avec validation
- **Design responsive** adapté mobile/tablette
- **Animations CSS** pour une meilleure UX
- **Navigation intelligente** avec état actif

## 🛠️ Technologies utilisées

- **React 18** : Bibliothèque UI moderne
- **TypeScript** : Typage statique pour la robustesse
- **React Router** : Navigation entre les pages
- **Lucide React** : Icônes modernes et cohérentes
- **CSS Variables** : Système de design flexible
- **Responsive Design** : Adaptation mobile-first

## 📁 Structure des composants

### Header
- Navigation principale avec logo HAG
- Menu responsive pour mobile
- Changement de style au scroll
- Bouton "Candidater" en évidence

### Footer
- Informations de contact (email, téléphone)
- Liens vers les réseaux sociaux
- Navigation rapide vers les pages principales
- Copyright et mentions légales

### Countdown
- Compte à rebours vers la cérémonie
- Affichage jours/heures/minutes/secondes
- Mise à jour en temps réel
- Design avec la charte graphique HAG

## 🎯 Pages principales

### Home (Accueil)
- Section héros avec slogan et logo
- Compte à rebours vers la cérémonie
- Statistiques clés (catégories, candidats, lauréats)
- Présentation de la mission HAG
- Boutons d'action (Candidater, Voir catégories, Découvrir lauréats)

### About (À propos)
- Mission et objectifs des HAG
- Valeurs de l'organisation
- Mot du commissaire général Faya Maurice MILLIMOUNO
- Présentation de l'équipe

### Categories
- Liste des 8 catégories de prix
- Critères d'évaluation détaillés
- Processus de sélection
- Critères d'éligibilité

### ApplicationForm
- Formulaire de candidature complet
- Validation des champs obligatoires
- Upload de documents
- Confirmation d'envoi

## 🔧 Configuration

### Variables CSS personnalisées
Le projet utilise des variables CSS pour maintenir la cohérence du design :
```css
:root {
  --color-gold: #D4AF37;
  --color-blue-dark: #0D1B2A;
  --color-blue-deep: #1B263B;
  --color-white: #FFFFFF;
  --color-gray-light: #F5F5F5;
  
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Open Sans', sans-serif;
  
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --spacing-xxl: 4rem;
}
```

### Responsive Design
- **Mobile** : < 768px (grilles en colonne unique)
- **Tablet** : 768px - 1024px (grilles adaptatives)
- **Desktop** : > 1024px (grilles multi-colonnes)

## 📱 Responsive et accessibilité

- Design mobile-first
- Navigation tactile optimisée
- Contraste des couleurs respectant les standards WCAG
- Structure sémantique HTML5
- Support des lecteurs d'écran

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

### Déploiement sur serveur
1. Construisez l'application : `npm run build`
2. Uploadez le contenu du dossier `build/` sur votre serveur web
3. Configurez votre serveur pour servir `index.html` pour toutes les routes

### Variables d'environnement
Créez un fichier `.env` à la racine du projet :
```env
REACT_APP_API_URL=https://api.hag-guinee.com
REACT_APP_CONTACT_EMAIL=Sorodou@gmail.com
REACT_APP_PHONE=+224622586253
```

## 🤝 Contribution

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est propriétaire des Hospitality Awards Guinée (HAG).

## 📞 Contact

- **Email** : Sorodou@gmail.com
- **Téléphone** : +224 622 586 253
- **Adresse** : Conakry, Guinée

---

**Hospitality Awards Guinée - HAG**  
*Innovation et proximité – Célébrons l'excellence en hospitalité* 