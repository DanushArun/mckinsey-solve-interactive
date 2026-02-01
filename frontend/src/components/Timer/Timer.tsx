import { useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';

export const Timer: React.FC = () => {
  const timeRemaining = useGameStore(state => state.timeRemaining);
  const decrementTimer = useGameStore(state => state.decrementTimer);

  useEffect(() => {
    const interval = setInterval(decrementTimer, 1000);
    return () => clearInterval(interval);
  }, [decrementTimer]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const isLowTime = timeRemaining < 5 * 60; // Last 5 minutes

  return (
    <div className={`
      text-center py-2 px-6 rounded-lg font-mono text-xl font-bold
      ${isLowTime ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 text-gray-800'}
    `}>
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
};
