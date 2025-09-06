// Script de réinitialisation des votes HAG
// À exécuter dans la console du navigateur (F12)

console.log('🔄 Réinitialisation des votes HAG...');

// Vérifier les données actuelles
const votesData = localStorage.getItem('hag_candidates_votes');
const ratingsData = localStorage.getItem('hag_candidates_ratings');

console.log('📊 Données actuelles :');
if (votesData) {
    const votes = JSON.parse(votesData);
    console.log(`Votes: ${votes.length} candidats`);
    votes.forEach(candidate => {
        console.log(`  • ${candidate.name}: ${candidate.votes} votes ${candidate.isVoted ? '(voté)' : ''}`);
    });
} else {
    console.log('Votes: Aucune donnée');
}

if (ratingsData) {
    const ratings = JSON.parse(ratingsData);
    console.log(`Notes: ${ratings.length} candidats`);
    ratings.forEach(candidate => {
        console.log(`  • ${candidate.name}: ${candidate.rating}/5 (${candidate.totalRatings} avis)`);
    });
} else {
    console.log('Notes: Aucune donnée');
}

// Réinitialiser les votes
localStorage.removeItem('hag_candidates_votes');
console.log('✅ Votes réinitialisés');

// Réinitialiser les notes
localStorage.removeItem('hag_candidates_ratings');
console.log('✅ Notes réinitialisées');

// Vérifier que tout a été supprimé
const remainingVotes = localStorage.getItem('hag_candidates_votes');
const remainingRatings = localStorage.getItem('hag_candidates_ratings');

if (!remainingVotes && !remainingRatings) {
    console.log('🎉 Réinitialisation complète réussie !');
    console.log('Toutes les données de vote et de notation ont été supprimées du localStorage.');
} else {
    console.log('⚠️ Erreur lors de la réinitialisation');
}

// Afficher un message de confirmation
alert('Votes réinitialisés avec succès !\n\nToutes les données de vote et de notation ont été supprimées du localStorage.');
