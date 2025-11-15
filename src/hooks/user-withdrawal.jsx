import { calculateStudentTotal } from '../utils/calculations';
import { formatWithdrawalSuccess } from '../utils/message-formatters';

// Handles the withdrawal process for a student:
// calculates their total payout, removes them from the group,
// and displays a formatted success message.
export const useWithdrawal = (
  students,
  currentWeek,
  removeStudent,
  showSuccess,
  clearMessages
) => {
  // Called when a student initiates a withdrawal
  const handleWithdraw = (studentId) => {
    clearMessages(); // Clear any previous messages

    // Find the student by ID
    const student = students.find((s) => s.id === studentId);
    if (!student) return; // Exit if student not found

    // Calculate principal, interest, and total payout
    const studentTotal = calculateStudentTotal(student, currentWeek);

    // Remove the student from the group
    removeStudent(studentId);

    // Format a clear success message for the user
    const message = formatWithdrawalSuccess(
      student.name,
      studentTotal.total,
      studentTotal.principal,
      studentTotal.interest
    );

    // Display the success message
    showSuccess(message);
  };

  return { handleWithdraw };
};
