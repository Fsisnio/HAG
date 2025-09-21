import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Hook pour détecter une séquence de touches secrète
export const useSecretAccess = () => {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const navigate = useNavigate();
  
  // Séquence secrète : Ctrl + Shift + A + D + M + I + N
  const SECRET_SEQUENCE = ['Control', 'Shift', 'KeyA', 'KeyD', 'KeyM', 'KeyI', 'KeyN'];
  const SEQUENCE_TIMEOUT = 5000; // 5 secondes pour compléter la séquence

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Éviter les actions sur les champs de saisie
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      const key = event.code || event.key;
      
      // Ajouter la touche à la séquence
      setKeySequence(prev => {
        const newSequence = [...prev, key];
        
        // Vérifier si on a la séquence complète
        if (newSequence.length >= SECRET_SEQUENCE.length) {
          const lastKeys = newSequence.slice(-SECRET_SEQUENCE.length);
          
          // Vérifier si la séquence correspond
          const isCorrectSequence = SECRET_SEQUENCE.every((secretKey, index) => 
            lastKeys[index] === secretKey
          );
          
          if (isCorrectSequence) {
            console.log('🔓 Séquence secrète détectée !');
            navigate('/secret-admin-access-hag2025');
            return [];
          }
        }
        
        // Limiter la longueur de la séquence
        return newSequence.slice(-10);
      });

      // Réinitialiser la séquence après un délai
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setKeySequence([]);
      }, SEQUENCE_TIMEOUT);
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  return { keySequence: keySequence.slice(-SECRET_SEQUENCE.length) };
};

export default useSecretAccess;
