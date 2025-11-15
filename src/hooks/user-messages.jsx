import { useState } from 'react';

// A simple message handler for showing errors and success notifications.
// Keeps UI feedback consistent and easy to control across components.
export const useMessages = () => {
  const [error, setError] = useState('');       // Holds the latest error message
  const [success, setSuccess] = useState('');   // Holds the latest success message

  // Clears both error and success messages.
  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  // Displays an error and ensures all success messages are cleared.
  const showError = (message) => {
    setError(message);
    setSuccess('');
  };

  // Displays a success message and clears any existing errors.
  const showSuccess = (message) => {
    setSuccess(message);
    setError('');
  };

  return {
    error,
    success,
    clearMessages,
    showError,
    showSuccess,
  };
};
