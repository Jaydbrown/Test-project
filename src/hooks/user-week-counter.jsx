import { useState } from 'react';

// Tracks the current week of the program/game and provides simple controls
// to move forward or restart the timeline.
export const useWeekCounter = () => {
  const [currentWeek, setCurrentWeek] = useState(0); // Starts at Week 0

  // Moves the system forward by one week.
  const advanceWeek = () => {
    setCurrentWeek(currentWeek + 1);
  };

  // Resets the week counter back to the beginning.
  const resetWeek = () => {
    setCurrentWeek(0);
  };

  return {
    currentWeek,
    advanceWeek,
    resetWeek,
  };
};
