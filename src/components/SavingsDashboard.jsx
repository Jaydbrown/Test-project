import React from 'react';

function SavingsDashboard({
  studentsCount,
  totalSavings,
  gameReturn,
  finalAmount,
}) {
  return (
    <div className="border-2 border-black p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">
        Savings Dashboard
      </h2>

      {studentsCount === 0 ? (
        <p className="text-black">No students registered yet</p>
      ) : (
        <div className="space-y-4">
          <div className="border-2 border-black p-4 bg-black text-white">
            <div className="text-sm">Total Savings</div>
            <div className="text-2xl font-bold">
              ₦{totalSavings.toLocaleString()}
            </div>
          </div>

          <div className="border-2 border-black p-4">
            <div className="text-sm text-black">Game Return (20%)</div>
            <div className="text-xl font-bold text-black">
              ₦{gameReturn.toLocaleString()}
            </div>
          </div>

          <div className="border-2 border-black p-4">
            <div className="text-sm text-black">Final Group Amount</div>
            <div className="text-xl font-bold text-black">
              ₦{finalAmount.toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SavingsDashboard;