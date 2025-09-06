// Script Node.js pour réinitialiser les votes HAG
// Ce script simule la réinitialisation du localStorage côté serveur

const fs = require('fs');
const path = require('path');

console.log('🔄 Réinitialisation des votes HAG...');

// Chemin vers le build de l'application
const buildPath = path.join(__dirname, 'build');
const publicPath = path.join(__dirname, 'public');

// Créer un script de réinitialisation à injecter dans l'application
const resetScript = `
// Script de réinitialisation automatique
(function() {
    console.log('🔄 Réinitialisation automatique des votes...');
    
    // Supprimer les données de vote
    localStorage.removeItem('hag_candidates_votes');
    localStorage.removeItem('hag_candidates_ratings');
    
    // Vérifier que tout a été supprimé
    const votesData = localStorage.getItem('hag_candidates_votes');
    const ratingsData = localStorage.getItem('hag_candidates_ratings');
    
    if (!votesData && !ratingsData) {
        console.log('✅ Votes réinitialisés avec succès !');
        alert('Votes réinitialisés avec succès !\\n\\nToutes les données de vote et de notation ont été supprimées.');
    } else {
        console.log('⚠️ Erreur lors de la réinitialisation');
    }
})();
`;

// Créer un fichier HTML de réinitialisation
const resetHTML = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réinitialisation des Votes - HAG</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 class="text-2xl font-bold mb-6 text-gray-900">Réinitialisation des Votes</h1>
        
        <div class="mb-6">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 class="font-semibold text-blue-900 mb-2">État actuel :</h3>
                <div id="status" class="text-sm text-blue-700">Vérification en cours...</div>
            </div>
        </div>

        <button 
            onclick="resetAll()" 
            class="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors mb-4"
        >
            Réinitialiser tous les votes
        </button>
        
        <button 
            onclick="window.close()" 
            class="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
        >
            Fermer
        </button>

        <div id="result" class="mt-6 hidden">
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <div id="result-text" class="text-sm text-green-700"></div>
            </div>
        </div>
    </div>

    <script>
        function checkStatus() {
            const votesData = localStorage.getItem('hag_candidates_votes');
            const ratingsData = localStorage.getItem('hag_candidates_ratings');
            
            let status = '';
            if (votesData || ratingsData) {
                status = 'Données trouvées dans le localStorage';
            } else {
                status = 'Aucune donnée dans le localStorage';
            }
            
            document.getElementById('status').textContent = status;
        }

        function resetAll() {
            localStorage.removeItem('hag_candidates_votes');
            localStorage.removeItem('hag_candidates_ratings');
            
            document.getElementById('result-text').textContent = 'Votes réinitialisés avec succès !';
            document.getElementById('result').classList.remove('hidden');
            
            setTimeout(() => {
                checkStatus();
            }, 1000);
        }

        // Vérifier au chargement
        window.onload = checkStatus;
    </script>
</body>
</html>`;

// Écrire le fichier de réinitialisation
fs.writeFileSync('reset-votes-final.html', resetHTML);

console.log('✅ Fichier de réinitialisation créé : reset-votes-final.html');
console.log('');
console.log('📋 Instructions :');
console.log('1. Ouvrez le fichier reset-votes-final.html dans votre navigateur');
console.log('2. Cliquez sur "Réinitialiser tous les votes"');
console.log('3. Ou utilisez la console du navigateur avec ces commandes :');
console.log('');
console.log('localStorage.removeItem("hag_candidates_votes");');
console.log('localStorage.removeItem("hag_candidates_ratings");');
console.log('alert("Votes réinitialisés !");');
console.log('');
console.log('🎉 Réinitialisation prête !');
