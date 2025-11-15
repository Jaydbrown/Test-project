export const calculateWeeklyInterest = (amount, interestRate, weeksElapsed) => {
  return amount * (interestRate / 100) * weeksElapsed;
};

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

export const calculateTotalSavings = (students, currentWeek) => {
  return students.reduce((total, student) => {
    const studentTotal = calculateStudentTotal(student, currentWeek);
    return total + studentTotal.total;
  }, 0);
};

export const calculateGameReturn = (totalSavings, gameReturnRate) => {
  return totalSavings * gameReturnRate;
};

export const calculateFinalAmount = (totalSavings, gameReturn) => {
  return totalSavings + gameReturn;
};