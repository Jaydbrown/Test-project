import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { describe, test, expect } from 'vitest';

describe('Savings Group Application', () => {
  test('renders application title', () => {
    render(<App />);
    expect(screen.getByText(/Savings Group Application/i)).toBeInTheDocument();
  });

  test('displays week counter', () => {
    render(<App />);
    expect(screen.getByText(/Current Week: 0/i)).toBeInTheDocument();
  });

  test('validates tier amount on registration', () => {
    render(<App />);
    
    const nameInput = screen.getByPlaceholderText(/Enter student name/i);
    const amountInput = screen.getByPlaceholderText(/Enter exact tier amount/i);
    const registerButton = screen.getByRole('button', { name: /Register Student/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(amountInput, { target: { value: '5000' } });
    fireEvent.click(registerButton);

    expect(screen.getByText(/requires exactly/i)).toBeInTheDocument();
  });

  test('registers student with correct tier amount', () => {
    render(<App />);
    
    const nameInput = screen.getByPlaceholderText(/Enter student name/i);
    const amountInput = screen.getByPlaceholderText(/Enter exact tier amount/i);
    const registerButton = screen.getByRole('button', { name: /Register Student/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(amountInput, { target: { value: '10000' } });
    fireEvent.click(registerButton);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('advances week counter', () => {
    render(<App />);
    
    const advanceButton = screen.getByRole('button', { name: /Advance Week/i });
    fireEvent.click(advanceButton);

    expect(screen.getByText(/Current Week: 1/i)).toBeInTheDocument();
  });

  test('calculates weekly interest correctly', () => {
    render(<App />);
    
    // Register a student
    const nameInput = screen.getByPlaceholderText(/Enter student name/i);
    const amountInput = screen.getByPlaceholderText(/Enter exact tier amount/i);
    const registerButton = screen.getByRole('button', { name: /Register Student/i });

    fireEvent.change(nameInput, { target: { value: 'Jane' } });
    fireEvent.change(amountInput, { target: { value: '10000' } });
    fireEvent.click(registerButton);

    // Advance week
    const advanceButton = screen.getByRole('button', { name: /Advance Week/i });
    fireEvent.click(advanceButton);

    // Should show interest: 10,000 * 5% * 1 week = 500
    expect(screen.getByText(/₦500/i)).toBeInTheDocument();
  });

  test('withdraws student and updates total', () => {
    render(<App />);
    
    // Register a student
    const nameInput = screen.getByPlaceholderText(/Enter student name/i);
    const amountInput = screen.getByPlaceholderText(/Enter exact tier amount/i);
    const registerButton = screen.getByRole('button', { name: /Register Student/i });

    fireEvent.change(nameInput, { target: { value: 'Bob' } });
    fireEvent.change(amountInput, { target: { value: '10000' } });
    fireEvent.click(registerButton);

    // Withdraw
    const withdrawButton = screen.getByRole('button', { name: /Withdraw/i });
    fireEvent.click(withdrawButton);

    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    expect(screen.getByText(/withdrew/i)).toBeInTheDocument();
  });
});