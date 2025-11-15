import { useState } from 'react';
import { TIERS } from '../constants/tiers';

// Manages the list of students joining the game,
// along with their chosen tier and deposit details.
export const useStudentManagement = () => {
  const [students, setStudents] = useState([]);            // All registered students
  const [studentName, setStudentName] = useState('');      // Name currently being typed in
  const [selectedTier, setSelectedTier] = useState(1);     // Tier the student selects (defaults to Tier 1)
  const [depositAmount, setDepositAmount] = useState('');  // Deposit amount input

  // Adds a new student to the system for the given week.
  const addStudent = (currentWeek) => {
    const tier = TIERS.find((t) => t.id === selectedTier);

    const newStudent = {
      id: Date.now(),                         // unique identifier
      name: studentName.trim(),               // student name
      tier: tier,                             // Full tier object (amount + interest)
      depositAmount: parseFloat(depositAmount), // Numeric deposit value
      weekJoined: currentWeek,                // Tracks which week they joined
    };

    setStudents([...students, newStudent]);

    // Reset the form fields after adding
    setStudentName('');
    setDepositAmount('');
    setSelectedTier(1);

    return newStudent; // Useful if the caller needs immediate access
  };

  // Removes a student using their ID and returns the removed record.
  const removeStudent = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    setStudents(students.filter((s) => s.id !== studentId));
    return student;
  };

  return {
    students,
    studentName,
    setStudentName,
    selectedTier,
    setSelectedTier,
    depositAmount,
    setDepositAmount,
    addStudent,
    removeStudent,
  };
};
