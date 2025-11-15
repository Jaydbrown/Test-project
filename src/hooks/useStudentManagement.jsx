import { useState } from 'react';
import { TIERS } from '../constants/tiers';

export const useStudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [selectedTier, setSelectedTier] = useState(1);
  const [depositAmount, setDepositAmount] = useState('');

  const addStudent = (currentWeek) => {
    const tier = TIERS.find((t) => t.id === selectedTier);
    const newStudent = {
      id: Date.now(),
      name: studentName.trim(),
      tier: tier,
      depositAmount: parseFloat(depositAmount),
      weekJoined: currentWeek,
    };

    setStudents([...students, newStudent]);
    setStudentName('');
    setDepositAmount('');
    setSelectedTier(1);

    return newStudent;
  };

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