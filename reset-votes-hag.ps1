# Script PowerShell pour réinitialiser les votes HAG 2025
# Utilisation : .\reset-votes-hag.ps1

Write-Host "=== Réinitialisation des votes HAG 2025 ===" -ForegroundColor Yellow
Write-Host ""

# Demander confirmation
$confirmation = Read-Host "Êtes-vous sûr de vouloir réinitialiser TOUS les votes ? (tapez 'OUI' pour confirmer)"

if ($confirmation -ne "OUI") {
    Write-Host "Opération annulée." -ForegroundColor Red
    exit
}

Write-Host "Réinitialisation en cours..." -ForegroundColor Green

# Créer le script JavaScript de réinitialisation
$jsScript = @"
// Script de réinitialisation des votes HAG
const keysToReset = [
    'hag_candidates_votes',
    'hag_candidates_ratings',
    'hag_completed_votes',
    'hag_pending_vote',
    'hag_vote_counts',
    'hag_user_votes'
];

let resetCount = 0;
keysToReset.forEach(key => {
    if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
        resetCount++;
        console.log('✓ Supprimé:', key);
    }
});

// Log de la réinitialisation
const resetLog = {
    timestamp: new Date().toISOString(),
    type: 'powershell_reset',
    resetCount: resetCount,
    userAgent: navigator.userAgent
};

const existingLogs = localStorage.getItem('hag_reset_logs');
const logs = existingLogs ? JSON.parse(existingLogs) : [];
logs.push(resetLog);

if (logs.length > 10) {
    logs.splice(0, logs.length - 10);
}

localStorage.setItem('hag_reset_logs', JSON.stringify(logs));

console.log('Réinitialisation terminée!', resetCount, 'éléments supprimés');
alert('Réinitialisation réussie! ' + resetCount + ' éléments ont été supprimés. Rechargez la page.');
"@

# Sauvegarder le script dans un fichier temporaire
$tempFile = "$env:TEMP\hag-reset.js"
$jsScript | Out-File -FilePath $tempFile -Encoding UTF8

Write-Host "Script JavaScript créé: $tempFile" -ForegroundColor Cyan

# Instructions pour l'utilisateur
Write-Host ""
Write-Host "=== INSTRUCTIONS ===" -ForegroundColor Yellow
Write-Host "1. Ouvrez votre navigateur web" -ForegroundColor White
Write-Host "2. Allez sur l'application HAG (http://localhost:3000)" -ForegroundColor White
Write-Host "3. Ouvrez les outils de développement (F12)" -ForegroundColor White
Write-Host "4. Allez dans l'onglet 'Console'" -ForegroundColor White
Write-Host "5. Copiez et collez le contenu du fichier: $tempFile" -ForegroundColor White
Write-Host "6. Appuyez sur Entrée pour exécuter" -ForegroundColor White
Write-Host ""

# Optionnel : ouvrir le fichier dans le bloc-notes
$openFile = Read-Host "Voulez-vous ouvrir le fichier script ? (O/N)"
if ($openFile -eq "O" -or $openFile -eq "o") {
    notepad $tempFile
}

Write-Host ""
Write-Host "Script terminé." -ForegroundColor Green
Write-Host "Le fichier sera supprimé automatiquement au prochain redémarrage." -ForegroundColor Gray
