// Script de réinitialisation des votes pour HAG
// Exécuter ce script dans la console du navigateur (F12)

console.log('🏆 HAG - Script de réinitialisation des votes');

// Fonction pour réinitialiser tous les votes
function resetAllVotes() {
    try {
        // Supprimer toutes les données de vote du localStorage
        localStorage.removeItem('hag_candidates_votes');
        localStorage.removeItem('hag_candidates_ratings');
        
        console.log('✅ Tous les votes ont été réinitialisés !');
        console.log('📊 localStorage nettoyé :');
        console.log('   - hag_candidates_votes: supprimé');
        console.log('   - hag_candidates_ratings: supprimé');
        
        // Vérifier que la suppression a bien fonctionné
        const remainingVotes = localStorage.getItem('hag_candidates_votes');
        const remainingRatings = localStorage.getItem('hag_candidates_ratings');
        
        if (!remainingVotes && !remainingRatings) {
            console.log('🎉 Réinitialisation réussie ! Tous les votes ont été supprimés.');
            console.log('🔄 Rechargez la page pour voir les candidats dans leur état initial.');
        } else {
            console.warn('⚠️ Certaines données pourraient encore être présentes.');
        }
        
        return true;
    } catch (error) {
        console.error('❌ Erreur lors de la réinitialisation :', error);
        return false;
    }
}

// Fonction pour vérifier l'état actuel des votes
function checkVotesStatus() {
    console.log('📊 Vérification de l\'état des votes...');
    
    const votes = localStorage.getItem('hag_candidates_votes');
    const ratings = localStorage.getItem('hag_candidates_ratings');
    
    if (!votes && !ratings) {
        console.log('✅ Aucun vote enregistré - Système propre');
        return;
    }
    
    if (votes) {
        try {
            const votesData = JSON.parse(votes);
            const votedCandidates = votesData.filter(c => c.isVoted);
            const totalVotes = votesData.reduce((sum, c) => sum + c.votes, 0);
            
            console.log('🗳️ État des votes :');
            console.log(`   - Candidats votés : ${votedCandidates.length}`);
            console.log(`   - Total des votes : ${totalVotes}`);
            console.log('   - Candidats votés :', votedCandidates.map(c => `${c.name} (${c.votes} votes)`));
        } catch (error) {
            console.error('❌ Erreur lors de la lecture des votes :', error);
        }
    }
    
    if (ratings) {
        try {
            const ratingsData = JSON.parse(ratings);
            const ratedCandidates = ratingsData.filter(c => c.userRating);
            
            console.log('⭐ État des notes :');
            console.log(`   - Candidats notés : ${ratedCandidates.length}`);
            console.log('   - Candidats notés :', ratedCandidates.map(c => `${c.name} (${c.userRating} étoiles)`));
        } catch (error) {
            console.error('❌ Erreur lors de la lecture des notes :', error);
        }
    }
}

// Fonction pour recharger la page
function reloadPage() {
    console.log('🔄 Rechargement de la page...');
    window.location.reload();
}

// Exécution automatique
console.log('🚀 Script chargé. Commandes disponibles :');
console.log('   - resetAllVotes() : Réinitialiser tous les votes');
console.log('   - checkVotesStatus() : Vérifier l\'état actuel');
console.log('   - reloadPage() : Recharger la page');

// Vérifier l'état actuel
checkVotesStatus();

// Proposer la réinitialisation
console.log('\n💡 Pour réinitialiser tous les votes, exécutez : resetAllVotes()');

