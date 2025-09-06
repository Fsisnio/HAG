# Script simple pour réinitialiser les votes HAG
Write-Host "Reinitialisation des votes HAG..." -ForegroundColor Blue

# Ouvrir l'application
Start-Process "http://localhost:3000"

Write-Host "Instructions:" -ForegroundColor Cyan
Write-Host "1. Ouvrez la console du navigateur (F12)" -ForegroundColor White
Write-Host "2. Collez ce code dans la console:" -ForegroundColor White
Write-Host ""
Write-Host "localStorage.removeItem('hag_candidates_votes');" -ForegroundColor Yellow
Write-Host "localStorage.removeItem('hag_candidates_ratings');" -ForegroundColor Yellow
Write-Host "alert('Votes reinitialises!');" -ForegroundColor Yellow
Write-Host ""
Write-Host "Ou utilisez le fichier reset-local-votes.html" -ForegroundColor Green
