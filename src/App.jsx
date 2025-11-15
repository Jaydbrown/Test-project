import React from 'react';
import MainLayout from './components/main-layout';
import Header from './components/app-header';
import WeekCounter from './components/week-counter';
import MessageDisplay from './components/message-display';
import RegistrationForm from './components/registration-form';
import SavingsDashboard from './components/savings-dashboard';
import MembersList from './components/members-list';
import DashboardGrid from './components/dashboard-grid';
import { useStudentManagement } from './hooks/application-student-management';
import { useWeekCounter } from './hooks/user-week-counter';
import { useMessages } from './hooks/user-messages';
import { useRegistration } from './hooks/user-registration';
import { useWithdrawal } from './hooks/user-withdrawal';
import { useWeekActions } from './hooks/use-week-actions';
import { useDashboardCalculations } from './hooks/use-dashboard-calculations';
import { MAX_STUDENTS } from './constants/tiers';
import { calculateStudentTotal } from './utils/calculations';

function App() {
  // State Management Hooks
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

  // Business Logic Hooks
  const { handleRegister } = useRegistration(
    students,
    studentName,
    selectedTier,
    depositAmount,
    currentWeek,
    addStudent,
    showError,
    showSuccess,
    clearMessages
  );

  const { handleWithdraw } = useWithdrawal(
    students,
    currentWeek,
    removeStudent,
    showSuccess,
    clearMessages
  );

  const { handleAdvanceWeek, handleResetWeek } = useWeekActions(
    currentWeek,
    advanceWeek,
    resetWeek,
    showSuccess,
    clearMessages
  );

  // Calculation Hook
  const { totalSavings, gameReturn, finalAmount } = useDashboardCalculations(
    students,
    currentWeek
  );

  return (
    <MainLayout>
      <Header />

      <WeekCounter
        currentWeek={currentWeek}
        onAdvanceWeek={handleAdvanceWeek}
        onResetWeek={handleResetWeek}
      />

      <MessageDisplay error={error} success={success} />

      <DashboardGrid>
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
      </DashboardGrid>

      <MembersList
        students={students}
        calculateStudentTotal={(student) =>
          calculateStudentTotal(student, currentWeek)
        }
        onWithdraw={handleWithdraw}
      />
    </MainLayout>
  );
}

export default App;