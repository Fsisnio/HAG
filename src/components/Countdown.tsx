import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC = () => {
  const getTargetDate = () => {
    try {
      const targetDate = new Date('2026-12-11T17:00:00+00:00');
      if (isNaN(targetDate.getTime())) {
        return new Date('2026-12-11T17:00:00Z').getTime();
      }
      return targetDate.getTime();
    } catch (error) {
      console.error('Erreur lors de la création de la date cible:', error);
      return new Date('2026-12-11T17:00:00Z').getTime();
    }
  };
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [targetDate] = useState(getTargetDate());
  const [isEventPassed, setIsEventPassed] = useState(false);

  useEffect(() => {
    // Fonction pour calculer le temps restant
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setIsEventPassed(false);
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
      } else {
        setIsEventPassed(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    // Calculer immédiatement
    setTimeLeft(calculateTimeLeft());

    // Mettre à jour toutes les secondes
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Jours', value: timeLeft.days },
    { label: 'Heures', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Secondes', value: timeLeft.seconds }
  ];

  // Formater la date cible pour l'affichage
  const formatTargetDate = () => {
    const target = new Date(targetDate);
    return target.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Africa/Conakry'
    });
  };

  return (
    <div className="text-center">
      <h3 className="text-white text-xl font-semibold mb-8">
        {isEventPassed ? 'Cérémonie terminée' : 'Cérémonie de remise des prix'}
      </h3>
      
      {isEventPassed ? (
        <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-8 border-2 border-gold/30 shadow-lg max-w-md mx-auto">
          <div className="text-white text-center">
            <div className="text-4xl font-bold mb-4">🎉</div>
            <div className="text-xl font-semibold mb-2">Événement terminé</div>
            <div className="text-sm opacity-90">
              La cérémonie s'est déroulée le {formatTargetDate()}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {timeUnits.map((unit, index) => (
              <div key={index} className="group flex-shrink-0">
                <div className="bg-gradient-to-br from-blue-deep to-blue-dark rounded-2xl p-4 border-2 border-gold/30 hover:border-gold transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl relative overflow-hidden min-w-[120px]">
                  {/* Effet de brillance */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="text-gold text-3xl font-bold font-heading mb-2 group-hover:text-yellow-300 transition-colors">
                      {unit.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-white text-xs font-medium uppercase tracking-wider">
                      {unit.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-white">
            <p className="text-xl font-medium mb-2">{formatTargetDate()} • 17h00</p>
            <p className="text-gold font-semibold text-lg">Hôtel Kaloum, Conakry – Guinée</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Countdown; 