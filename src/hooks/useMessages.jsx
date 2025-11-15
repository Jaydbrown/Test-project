import { useState } from 'react';

export const useMessages = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const showError = (message) => {
    setError(message);
    setSuccess('');
  };

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