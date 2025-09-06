const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Build pour Render - Démarrage...');

// Nettoyer le dossier build
if (fs.existsSync('build')) {
    console.log('🧹 Nettoyage du dossier build...');
    fs.rmSync('build', { recursive: true, force: true });
}

// Build React directement
console.log('📦 Build React en cours...');
try {
    execSync('npx react-scripts build', { stdio: 'inherit' });
    console.log('✅ Build React terminé');
} catch (error) {
    console.error('❌ Erreur lors du build React:', error.message);
    process.exit(1);
}

// Vérifier que le build a réussi
if (!fs.existsSync('build/index.html')) {
    console.error('❌ Erreur: Le fichier index.html n\'a pas été créé');
    process.exit(1);
}

// Copier les fichiers de configuration pour le routage SPA
console.log('📋 Configuration du routage SPA...');

// Copier _redirects vers le dossier build
if (fs.existsSync('public/_redirects')) {
    fs.copyFileSync('public/_redirects', 'build/_redirects');
    console.log('✅ Fichier _redirects copié');
} else if (fs.existsSync('_redirects')) {
    fs.copyFileSync('_redirects', 'build/_redirects');
    console.log('✅ Fichier _redirects copié depuis la racine');
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

console.log('🎉 Build pour Render terminé avec succès!');
console.log('📁 Dossier build prêt pour le déploiement');
