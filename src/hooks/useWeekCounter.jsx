import { useState } from 'react';

export const useWeekCounter = () => {
  const [currentWeek, setCurrentWeek] = useState(0);

  const advanceWeek = () => {
    setCurrentWeek(currentWeek + 1);
  };

  const resetWeek = () => {
    setCurrentWeek(0);
  };

  return {
    currentWeek,
    advanceWeek,
    resetWeek,
  };
};