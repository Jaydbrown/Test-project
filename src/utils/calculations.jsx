// Calculates simple interest based on the deposit amount, the tier's interest rate,
// and how many weeks have passed since the student joined.
export const calculateWeeklyInterest = (amount, interestRate, weeksElapsed) => {
  return amount * (interestRate / 100) * weeksElapsed;
};

// Computes the full breakdown for a single student:
// - principal (original deposit)
// - interest earned so far
// - total accumulated amount
// - number of weeks they've been in the system
export const calculateStudentTotal = (student, currentWeek) => {
  const weeksElapsed = currentWeek - student.weekJoined;

  const interest = calculateWeeklyInterest(
    student.depositAmount,
    student.tier.interest,
    weeksElapsed
  );

  return {
    principal: student.depositAmount,
    interest: interest,
    total: student.depositAmount + interest,
    weeksElapsed: weeksElapsed,
  };
};

// Calculates the combined total balance for all students,
// including both their deposit amounts and accumulated interest.
export const calculateTotalSavings = (students, currentWeek) => {
  return students.reduce((total, student) => {
    const studentTotal = calculateStudentTotal(student, currentWeek);
    return total + studentTotal.total;
  }, 0);
};

// Calculates the game’s return based on the current total savings
// and the configured return rate.
export const calculateGameReturn = (totalSavings, gameReturnRate) => {
  return totalSavings * gameReturnRate;
};

// Final amount after adding the game’s return on top of all savings.
export const calculateFinalAmount = (totalSavings, gameReturn) => {
  return totalSavings + gameReturn;
};
