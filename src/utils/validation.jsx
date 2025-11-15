// Validates all fields required to register a new student.
// Ensures the name is provided, not duplicated, the deposit amount is valid,
// and the amount matches the selected tier’s exact requirement.
export const validateStudentRegistration = (
  studentName,
  students,
  depositAmount,
  selectedTier,
  maxStudents
) => {
  const trimmedName = studentName.trim();

  // Name must not be empty.
  if (!trimmedName) {
    return { isValid: false, error: 'Please enter a student name' };
  }

  // Prevent adding more than the allowed number of students.
  if (students.length >= maxStudents) {
    return { isValid: false, error: `Maximum ${maxStudents} students allowed` };
  }

  // Ensure names are unique (case-insensitive).
  if (students.find((s) => s.name.toLowerCase() === trimmedName.toLowerCase())) {
    return { isValid: false, error: 'Student name already exists' };
  }

  const amount = parseFloat(depositAmount);

  // Deposit amount must be a valid number.
  if (!depositAmount || isNaN(amount)) {
    return { isValid: false, error: 'Please enter a valid deposit amount' };
  }

  // Deposit amount must match the exact tier amount requirement.
  const tier = selectedTier;
  if (amount !== tier.amount) {
    return {
      isValid: false,
      error: `${tier.name} requires exactly ₦${tier.amount.toLocaleString()}`,
    };
  }

  // All checks passed.
  return { isValid: true, error: null };
};
