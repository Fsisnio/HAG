# Script PowerShell pour réinitialiser les votes HAG
# Ce script ouvre l'application dans le navigateur et exécute le script de réinitialisation

Write-Host "🔄 Réinitialisation des votes HAG..." -ForegroundColor Blue

# Vérifier si l'application est en cours d'exécution
$processes = Get-Process | Where-Object {$_.ProcessName -eq "node"}
if ($processes) {
    Write-Host "✅ Application React détectée en cours d'exécution" -ForegroundColor Green
} else {
    Write-Host "⚠️ Application React non détectée. Démarrez 'npm start' d'abord." -ForegroundColor Yellow
}

# Ouvrir l'application dans le navigateur
Write-Host "🌐 Ouverture de l'application dans le navigateur..." -ForegroundColor Blue
Start-Process "http://localhost:3000"

# Attendre un peu pour que l'application se charge
Start-Sleep -Seconds 3

Write-Host "📋 Instructions pour réinitialiser les votes :" -ForegroundColor Cyan
Write-Host "1. Ouvrez la console du navigateur (F12)" -ForegroundColor White
Write-Host "2. Allez dans l'onglet 'Console'" -ForegroundColor White
Write-Host "3. Copiez et collez le contenu du fichier 'reset-votes-script.js'" -ForegroundColor White
Write-Host "4. Appuyez sur Entrée pour exécuter" -ForegroundColor White
Write-Host ""
Write-Host "Ou utilisez le fichier reset-local-votes.html pour une interface graphique" -ForegroundColor Yellow

# Afficher le contenu du script
Write-Host "`n📄 Contenu du script à exécuter :" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Gray
Get-Content "reset-votes-script.js" | ForEach-Object { Write-Host $_ -ForegroundColor White }
Write-Host "----------------------------------------" -ForegroundColor Gray

Write-Host "`n✅ Script prêt ! Suivez les instructions ci-dessus." -ForegroundColor Green
