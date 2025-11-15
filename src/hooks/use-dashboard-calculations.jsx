import { useMemo } from 'react';
import {
  calculateTotalSavings,
  calculateGameReturn,
  calculateFinalAmount,
} from '../utils/calculations';
import { GAME_RETURN_RATE } from '../constants/tiers';

export const useDashboardCalculations = (students, currentWeek) => {
  const totalSavings = useMemo(
    () => calculateTotalSavings(students, currentWeek),
    [students, currentWeek]
  );

  const gameReturn = useMemo(
    () => calculateGameReturn(totalSavings, GAME_RETURN_RATE),
    [totalSavings]
  );

  const finalAmount = useMemo(
    () => calculateFinalAmount(totalSavings, gameReturn),
    [totalSavings, gameReturn]
  );

  return { totalSavings, gameReturn, finalAmount };
};