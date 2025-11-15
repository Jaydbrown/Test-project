import { TIERS, MAX_STUDENTS } from '../constants/tiers';
import { validateStudentRegistration } from '../utils/validation';
import { formatRegistrationSuccess } from '../utils/message-formatters';

// Manages the student registration flow:
// validates input, adds the student, and shows appropriate messages.
export const useRegistration = (
  students,
  studentName,
  selectedTier,
  depositAmount,
  currentWeek,
  addStudent,
  showError,
  showSuccess,
  clearMessages
) => {
  // Handles the registration form submission
  const handleRegister = (e) => {
    e.preventDefault();
    clearMessages(); // Clear any existing error or success messages

    // Find the tier object based on the selected tier ID
    const tier = TIERS.find((t) => t.id === selectedTier);

    // Validate the registration details
    const validation = validateStudentRegistration(
      studentName,
      students,
      depositAmount,
      tier,
      MAX_STUDENTS
    );

    // If validation fails, show the error and stop
    if (!validation.isValid) {
      showError(validation.error);
      return;
    }

    // Add the new student to the list
    const newStudent = addStudent(currentWeek);

    // Show a friendly success message
    showSuccess(formatRegistrationSuccess(newStudent.name));
  };

  return { handleRegister };
};
