import React, { useState } from 'react';

const TIERS = [
  { id: 1, name: 'Tier 1', amount: 10000, interest: 5 },
  { id: 2, name: 'Tier 2', amount: 20000, interest: 10 },
  { id: 3, name: 'Tier 3', amount: 30000, interest: 20 },
];

const GAME_RETURN_RATE = 0.2; // 20% return per gameplay
const MAX_STUDENTS = 12;

function App() {
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [selectedTier, setSelectedTier] = useState(1);
  const [depositAmount, setDepositAmount] = useState('');
  const [currentWeek, setCurrentWeek] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    clearMessages();

    // Validation
    if (!studentName.trim()) {
      setError('Please enter a student name');
      return;
    }

    if (students.length >= MAX_STUDENTS) {
      setError('Maximum 12 students allowed');
      return;
    }

    if (students.find(s => s.name.toLowerCase() === studentName.trim().toLowerCase())) {
      setError('Student name already exists');
      return;
    }

    const tier = TIERS.find(t => t.id === selectedTier);
    const amount = parseFloat(depositAmount);

    // Tier validation
    if (!depositAmount || isNaN(amount)) {
      setError('Please enter a valid deposit amount');
      return;
    }

    if (amount !== tier.amount) {
      setError(`${tier.name} requires exactly ₦${tier.amount.toLocaleString()}`);
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: studentName.trim(),
      tier: tier,
      depositAmount: amount,
      weekJoined: currentWeek,
    };

    setStudents([...students, newStudent]);
    setStudentName('');
    setDepositAmount('');
    setSelectedTier(1);
    setSuccess(`${newStudent.name} successfully registered!`);
  };

  const calculateWeeklyInterest = (amount, interestRate, weeksElapsed) => {
    return amount * (interestRate / 100) * weeksElapsed;
  };

  const calculateStudentTotal = (student) => {
    const weeksElapsed = currentWeek - student.weekJoined;
    const interest = calculateWeeklyInterest(student.depositAmount, student.tier.interest, weeksElapsed);
    return {
      principal: student.depositAmount,
      interest: interest,
      total: student.depositAmount + interest,
      weeksElapsed: weeksElapsed,
    };
  };

  const calculateTotalSavings = () => {
    return students.reduce((total, student) => {
      const studentTotal = calculateStudentTotal(student);
      return total + studentTotal.total;
    }, 0);
  };

  const calculateGameReturn = () => {
    const totalSavings = calculateTotalSavings();
    return totalSavings * GAME_RETURN_RATE;
  };

  const calculateFinalAmount = () => {
    return calculateTotalSavings() + calculateGameReturn();
  };

  const handleWithdraw = (studentId) => {
    clearMessages();
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const studentTotal = calculateStudentTotal(student);
    setStudents(students.filter(s => s.id !== studentId));
    setSuccess(
      `${student.name} withdrew ₦${studentTotal.total.toLocaleString()} (Principal: ₦${studentTotal.principal.toLocaleString()}, Interest: ₦${studentTotal.interest.toLocaleString()})`
    );
  };

  const advanceWeek = () => {
    clearMessages();
    setCurrentWeek(currentWeek + 1);
    setSuccess(`Advanced to Week ${currentWeek + 1}`);
  };

  const resetWeek = () => {
    clearMessages();
    setCurrentWeek(0);
    setSuccess('Week counter reset to 0');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 border-b-2 border-black pb-4">
          <h1 className="text-4xl font-bold text-black mb-2">Savings Group Application</h1>
          <p className="text-black">Collective investment in Play-to-Earn blockchain game (20% return)</p>
        </div>

        {/* Week Counter */}
        <div className="mb-8 border-2 border-black p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-black">Current Week: {currentWeek}</h2>
              <p className="text-black text-sm">Simulate weekly progress</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={advanceWeek}
                className="bg-black text-white px-6 py-3 font-bold hover:bg-white hover:text-black border-2 border-black"
              >
                Advance Week
              </button>
              <button
                onClick={resetWeek}
                className="bg-white text-black px-6 py-3 font-bold hover:bg-black hover:text-white border-2 border-black"
              >
                Reset Week
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 bg-black text-white p-4 border-2 border-black">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 bg-white text-black p-4 border-2 border-black">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Registration Form */}
          <div className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4 text-black">Student Registration</h2>
            <p className="text-black mb-4">
              Students registered: {students.length}/{MAX_STUDENTS}
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-black font-bold mb-2">Student Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-black text-black"
                  placeholder="Enter student name"
                />
              </div>

              <div>
                <label className="block text-black font-bold mb-2">Select Tier</label>
                <select
                  value={selectedTier}
                  onChange={(e) => {
                    const tierId = Number(e.target.value);
                    setSelectedTier(tierId);
                    const tier = TIERS.find(t => t.id === tierId);
                    setDepositAmount(tier.amount.toString());
                  }}
                  className="w-full px-3 py-2 border-2 border-black text-black"
                >
                  {TIERS.map(tier => (
                    <option key={tier.id} value={tier.id}>
                      {tier.name} - ₦{tier.amount.toLocaleString()} ({tier.interest}% per week)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-black font-bold mb-2">Deposit Amount (₦)</label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-black text-black"
                  placeholder="Enter exact tier amount"
                />
                <p className="text-black text-sm mt-1">
                  Required: ₦{TIERS.find(t => t.id === selectedTier)?.amount.toLocaleString()}
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 font-bold hover:bg-white hover:text-black border-2 border-black"
                disabled={students.length >= MAX_STUDENTS}
              >
                Register Student
              </button>
            </form>

            {/* Tier Information */}
            <div className="mt-6 border-t-2 border-black pt-6">
              <h3 className="font-bold text-black mb-3">Tier Requirements</h3>
              {TIERS.map(tier => (
                <div key={tier.id} className="mb-2 text-black">
                  <span className="font-bold">{tier.name}:</span> ₦{tier.amount.toLocaleString()} ({tier.interest}% interest per week)
                </div>
              ))}
            </div>
          </div>

          {/* Savings Dashboard */}
          <div className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4 text-black">Savings Dashboard</h2>
            
            {students.length === 0 ? (
              <p className="text-black">No students registered yet</p>
            ) : (
              <div className="space-y-4">
                <div className="border-2 border-black p-4 bg-black text-white">
                  <div className="text-sm">Total Savings</div>
                  <div className="text-2xl font-bold">₦{calculateTotalSavings().toLocaleString()}</div>
                </div>

                <div className="border-2 border-black p-4">
                  <div className="text-sm text-black">Game Return (20%)</div>
                  <div className="text-xl font-bold text-black">₦{calculateGameReturn().toLocaleString()}</div>
                </div>

                <div className="border-2 border-black p-4">
                  <div className="text-sm text-black">Final Group Amount</div>
                  <div className="text-xl font-bold text-black">₦{calculateFinalAmount().toLocaleString()}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Members List */}
        {students.length > 0 && (
          <div className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4 text-black">Members & Contributions</h2>
            
            <div className="space-y-4">
              {students.map(student => {
                const calc = calculateStudentTotal(student);
                return (
                  <div key={student.id} className="border-2 border-black p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold text-black text-lg">{student.name}</div>
                        <div className="text-black text-sm">{student.tier.name} ({student.tier.interest}% per week)</div>
                      </div>
                      <button
                        onClick={() => handleWithdraw(student.id)}
                        className="bg-black text-white px-4 py-2 font-bold hover:bg-white hover:text-black border-2 border-black"
                      >
                        Withdraw
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-black">
                      <div>
                        <div className="text-sm">Principal</div>
                        <div className="font-bold">₦{calc.principal.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm">Weeks Active</div>
                        <div className="font-bold">{calc.weeksElapsed}</div>
                      </div>
                      <div>
                        <div className="text-sm">Interest Earned</div>
                        <div className="font-bold">₦{calc.interest.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm">Withdrawal Amount</div>
                        <div className="font-bold text-lg">₦{calc.total.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;