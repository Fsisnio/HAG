const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Démarrage du build de production...');

// Nettoyer le dossier build
if (fs.existsSync('build')) {
    console.log('🧹 Nettoyage du dossier build...');
    fs.rmSync('build', { recursive: true, force: true });
}

// Build de production
console.log('📦 Build de production en cours...');
execSync('npm run build', { stdio: 'inherit' });

// Vérifier que le build a réussi
if (!fs.existsSync('build/index.html')) {
    console.error('❌ Erreur: Le build a échoué');
    process.exit(1);
}

// Copier les fichiers de configuration pour le routage SPA
console.log('📋 Configuration du routage SPA...');

// Copier _redirects vers le dossier build
if (fs.existsSync('public/_redirects')) {
    fs.copyFileSync('public/_redirects', 'build/_redirects');
    console.log('✅ Fichier _redirects copié');
}

// Créer un fichier .htaccess pour Apache (au cas où)
const htaccessContent = `# Configuration pour SPA React Router
RewriteEngine On
RewriteBase /

# Rediriger toutes les requêtes vers index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Headers de sécurité
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
`;

fs.writeFileSync('build/.htaccess', htaccessContent);
console.log('✅ Fichier .htaccess créé');

console.log('✅ Build terminé avec succès!');
console.log('📁 Dossier build prêt pour le déploiement');
