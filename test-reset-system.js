// Script de test pour le système de réinitialisation HAG 2025
console.log('=== Test du Système de Réinitialisation HAG 2025 ===');

// Créer des données de test
const testData = {
  hag_candidates_votes: [
    { candidateId: 1, candidateName: 'Test Hotel 1', category: 'Hôtellerie', timestamp: new Date().toISOString() },
    { candidateId: 2, candidateName: 'Test Restaurant 1', category: 'Restauration', timestamp: new Date().toISOString() },
    { candidateId: 3, candidateName: 'Test Guide 1', category: 'Tourisme', timestamp: new Date().toISOString() }
  ],
  hag_candidates_ratings: {
    '1': 4.5,
    '2': 4.2,
    '3': 4.8
  },
  hag_completed_votes: [
    { candidateId: 1, amount: 10000, transactionId: 'PAY123', status: 'completed' },
    { candidateId: 2, amount: 10000, transactionId: 'PAY124', status: 'completed' }
  ],
  hag_vote_counts: {
    '1': 15,
    '2': 12,
    '3': 8
  },
  hag_pending_vote: {
    candidateId: 4,
    candidateName: 'Test Pending',
    timestamp: new Date().toISOString()
  }
};

// Injecter les données de test
console.log('1. Injection des données de test...');
Object.entries(testData).forEach(([key, data]) => {
  localStorage.setItem(key, JSON.stringify(data));
  console.log(`   ✅ ${key}: ${Array.isArray(data) ? data.length : Object.keys(data).length} éléments`);
});

// Vérifier que les données sont là
console.log('\n2. Vérification des données injectées...');
const totalItems = Object.keys(testData).reduce((sum, key) => {
  const stored = localStorage.getItem(key);
  if (stored) {
    const parsed = JSON.parse(stored);
    const count = Array.isArray(parsed) ? parsed.length : Object.keys(parsed).length;
    console.log(`   📊 ${key}: ${count} éléments`);
    return sum + count;
  }
  return sum;
}, 0);

console.log(`\n📈 Total: ${totalItems} éléments de test créés`);

// Instructions pour tester
console.log('\n=== Instructions de Test ===');
console.log('1. Allez sur http://localhost:3000/reset-votes.html');
console.log('2. Vérifiez que les statistiques affichent les données de test');
console.log('3. Testez la création de sauvegarde');
console.log('4. Testez la réinitialisation (votes gratuits seulement)');
console.log('5. Vérifiez que les votes payants sont conservés');
console.log('6. Testez la réinitialisation complète');
console.log('\nOU');
console.log('1. Allez sur http://localhost:3000/admin');
console.log('2. Connectez-vous avec: HAG2024Admin!');
console.log('3. Cliquez sur le bouton "Reset Votes" rouge');
console.log('4. Testez le modal de réinitialisation');

console.log('\n✨ Données de test prêtes ! Commencez vos tests de réinitialisation.');
