import React from 'react';
import Header from './components/Header';
import WeekCounter from './components/WeekCounter';
import MessageDisplay from './components/MessageDisplay';
import RegistrationForm from './components/RegistrationForm';
import SavingsDashboard from './components/SavingsDashboard';
import MembersList from './components/MembersList';
import { useStudentManagement } from './hooks/useStudentManagement';
import { useWeekCounter } from './hooks/useWeekCounter';
import { useMessages } from './hooks/useMessages';
import { TIERS, GAME_RETURN_RATE, MAX_STUDENTS } from './constants/tiers';
import {
  calculateStudentTotal,
  calculateTotalSavings,
  calculateGameReturn,
  calculateFinalAmount,
} from './utils/calculations';

function App() {
  const {
    students,
    studentName,
    setStudentName,
    selectedTier,
    setSelectedTier,
    depositAmount,
    setDepositAmount,
    addStudent,
    removeStudent,
  } = useStudentManagement();

  const { currentWeek, advanceWeek, resetWeek } = useWeekCounter();
  const { error, success, clearMessages, showError, showSuccess } = useMessages();

  const handleRegister = (e) => {
    e.preventDefault();
    clearMessages();

    // Validation
    if (!studentName.trim()) {
      showError('Please enter a student name');
      return;
    }

    if (students.length >= MAX_STUDENTS) {
      showError('Maximum 12 students allowed');
      return;
    }

    if (
      students.find(
        (s) => s.name.toLowerCase() === studentName.trim().toLowerCase()
      )
    ) {
      showError('Student name already exists');
      return;
    }

    const tier = TIERS.find((t) => t.id === selectedTier);
    const amount = parseFloat(depositAmount);

    if (!depositAmount || isNaN(amount)) {
      showError('Please enter a valid deposit amount');
      return;
    }

    if (amount !== tier.amount) {
      showError(`${tier.name} requires exactly ₦${tier.amount.toLocaleString()}`);
      return;
    }

    const newStudent = addStudent(currentWeek);
    showSuccess(`${newStudent.name} successfully registered!`);
  };

  const handleWithdraw = (studentId) => {
    clearMessages();
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    const studentTotal = calculateStudentTotal(student, currentWeek);
    removeStudent(studentId);
    showSuccess(
      `${student.name} withdrew ₦${studentTotal.total.toLocaleString()} (Principal: ₦${studentTotal.principal.toLocaleString()}, Interest: ₦${studentTotal.interest.toLocaleString()})`
    );
  };

  const handleAdvanceWeek = () => {
    clearMessages();
    advanceWeek();
    showSuccess(`Advanced to Week ${currentWeek + 1}`);
  };

  const handleResetWeek = () => {
    clearMessages();
    resetWeek();
    showSuccess('Week counter reset to 0');
  };

  const totalSavings = calculateTotalSavings(students, currentWeek);
  const gameReturn = calculateGameReturn(totalSavings, GAME_RETURN_RATE);
  const finalAmount = calculateFinalAmount(totalSavings, gameReturn);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6">
        <Header />

        <WeekCounter
          currentWeek={currentWeek}
          onAdvanceWeek={handleAdvanceWeek}
          onResetWeek={handleResetWeek}
        />

        <MessageDisplay error={error} success={success} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <RegistrationForm
            studentName={studentName}
            setStudentName={setStudentName}
            selectedTier={selectedTier}
            setSelectedTier={setSelectedTier}
            depositAmount={depositAmount}
            setDepositAmount={setDepositAmount}
            onRegister={handleRegister}
            studentsCount={students.length}
            maxStudents={MAX_STUDENTS}
          />

          <SavingsDashboard
            studentsCount={students.length}
            totalSavings={totalSavings}
            gameReturn={gameReturn}
            finalAmount={finalAmount}
          />
        </div>

        <MembersList
          students={students}
          calculateStudentTotal={(student) =>
            calculateStudentTotal(student, currentWeek)
          }
          onWithdraw={handleWithdraw}
        />
      </div>
    </div>
  );
}

export default App;