import { OfficialCandidate } from '../data/officialCandidates';

/**
 * Interface pour les résultats de validation
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Valide l'unicité des candidats et leur association avec les catégories
 * @param candidates Liste des candidats à valider
 * @returns Résultat de la validation
 */
export function validateCandidatesUniqueness(candidates: OfficialCandidate[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Vérifier l'unicité des IDs
  const candidateIds = candidates.map(c => c.id);
  const uniqueIds = new Set(candidateIds);
  
  if (candidateIds.length !== uniqueIds.size) {
    const duplicateIds = candidateIds.filter((id, index) => candidateIds.indexOf(id) !== index);
    errors.push(`IDs de candidats dupliqués détectés: ${duplicateIds.join(', ')}`);
  }
  
  // Vérifier l'unicité des noms par catégorie
  const candidatesByCategory: { [key: string]: OfficialCandidate[] } = {};
  candidates.forEach(candidate => {
    if (!candidatesByCategory[candidate.category]) {
      candidatesByCategory[candidate.category] = [];
    }
    candidatesByCategory[candidate.category].push(candidate);
  });
  
  Object.keys(candidatesByCategory).forEach(category => {
    const categoryCandidates = candidatesByCategory[category];
    const candidateNames = categoryCandidates.map(c => c.name);
    const uniqueNames = new Set(candidateNames);
    
    if (candidateNames.length !== uniqueNames.size) {
      const duplicateNames = candidateNames.filter((name, index) => candidateNames.indexOf(name) !== index);
      errors.push(`Noms de candidats dupliqués dans la catégorie "${category}": ${duplicateNames.join(', ')}`);
    }
  });
  
  // Vérifier que chaque candidat a une catégorie valide
  candidates.forEach(candidate => {
    if (!candidate.category || candidate.category.trim() === '') {
      errors.push(`Candidat "${candidate.name}" (ID: ${candidate.id}) n'a pas de catégorie définie`);
    }
  });
  
  // Vérifier la cohérence des données
  candidates.forEach(candidate => {
    if (!candidate.name || candidate.name.trim() === '') {
      errors.push(`Candidat ID ${candidate.id} n'a pas de nom défini`);
    }
    
    if (candidate.votes !== undefined && candidate.votes < 0) {
      warnings.push(`Candidat "${candidate.name}" a un nombre de votes négatif: ${candidate.votes}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Valide qu'un vote est correctement associé à un candidat et une catégorie
 * @param candidateId ID du candidat
 * @param candidateName Nom du candidat
 * @param candidateCategory Catégorie du candidat
 * @param candidates Liste des candidats disponibles
 * @returns Résultat de la validation
 */
export function validateVote(
  candidateId: number, 
  candidateName: string, 
  candidateCategory: string, 
  candidates: OfficialCandidate[]
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Validation des paramètres d'entrée
  if (!candidateId || candidateId <= 0) {
    errors.push('ID du candidat invalide');
  }
  
  if (!candidateName || candidateName.trim() === '') {
    errors.push('Nom du candidat manquant');
  }
  
  if (!candidateCategory || candidateCategory.trim() === '') {
    errors.push('Catégorie du candidat manquante');
  }
  
  if (errors.length > 0) {
    return { isValid: false, errors, warnings };
  }
  
  // Trouver le candidat
  const candidate = candidates.find(c => c.id === candidateId);
  if (!candidate) {
    errors.push(`Candidat avec l'ID ${candidateId} non trouvé`);
    return { isValid: false, errors, warnings };
  }
  
  // Vérifier la correspondance du nom
  if (candidate.name !== candidateName) {
    errors.push(`Correspondance du nom incorrecte: attendu "${candidate.name}", reçu "${candidateName}"`);
  }
  
  // Vérifier la correspondance de la catégorie
  if (candidate.category !== candidateCategory) {
    errors.push(`Correspondance de la catégorie incorrecte: attendu "${candidate.category}", reçu "${candidateCategory}"`);
  }
  
  // Vérifier si le candidat peut recevoir des votes
  if (candidate.isVoted) {
    warnings.push(`Le candidat "${candidate.name}" a déjà reçu un vote`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Génère un identifiant unique pour un bouton de vote
 * @param candidateId ID du candidat
 * @param candidateCategory Catégorie du candidat
 * @param buttonType Type de bouton ('vote', 'premium-bronze', 'premium-silver', 'premium-gold')
 * @returns Identifiant unique du bouton
 */
export function generateButtonId(
  candidateId: number, 
  candidateCategory: string, 
  buttonType: 'vote' | 'premium-bronze' | 'premium-silver' | 'premium-gold' = 'vote'
): string {
  const sanitizedCategory = candidateCategory.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  return `${buttonType}-${candidateId}-${sanitizedCategory}`;
}

/**
 * Valide qu'un identifiant de bouton est correctement formaté
 * @param buttonId Identifiant du bouton à valider
 * @param expectedCandidateId ID du candidat attendu
 * @param expectedCategory Catégorie attendue
 * @param expectedButtonType Type de bouton attendu
 * @returns True si l'identifiant est valide
 */
export function validateButtonId(
  buttonId: string,
  expectedCandidateId: number,
  expectedCategory: string,
  expectedButtonType: 'vote' | 'premium-bronze' | 'premium-silver' | 'premium-gold' = 'vote'
): boolean {
  const expectedId = generateButtonId(expectedCandidateId, expectedCategory, expectedButtonType);
  return buttonId === expectedId;
}
