import {
  formatWeekAdvanceSuccess,
  formatWeekResetSuccess,
} from '../utils/message-formatters';

// Handles week-related actions for the system: advancing or resetting weeks.
// Provides clear feedback messages for the user after each action.
export const useWeekActions = (
  currentWeek,
  advanceWeek,
  resetWeek,
  showSuccess,
  clearMessages
) => {
  // Move the system forward by one week and show a success message
  const handleAdvanceWeek = () => {
    clearMessages();              // Remove any previous messages
    advanceWeek();                // Increment the week counter
    showSuccess(formatWeekAdvanceSuccess(currentWeek + 1)); // Show feedback
  };

  // Reset the week counter back to zero and show a success message
  const handleResetWeek = () => {
    clearMessages();              // Remove previous messages
    resetWeek();                  // Reset the week counter
    showSuccess(formatWeekResetSuccess()); // Show feedback
  };

  return { handleAdvanceWeek, handleResetWeek };
};
