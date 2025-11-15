export const formatRegistrationSuccess = (studentName) => {
  return `${studentName} successfully registered!`;
};

export const formatWithdrawalSuccess = (name, total, principal, interest) => {
  return `${name} withdrew ₦${total.toLocaleString()} (Principal: ₦${principal.toLocaleString()}, Interest: ₦${interest.toLocaleString()})`;
};

export const formatWeekAdvanceSuccess = (weekNumber) => {
  return `Advanced to Week ${weekNumber}`;
};

export const formatWeekResetSuccess = () => {
  return 'Week counter reset to 0';
};