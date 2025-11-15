import React from 'react';

function WeekCounter({ currentWeek, onAdvanceWeek, onResetWeek }) {
  return (
    <div className="mb-8 border-2 border-black p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black">
            Current Week: {currentWeek}
          </h2>
          <p className="text-black text-sm">Simulate weekly progress</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onAdvanceWeek}
            className="bg-black text-white px-6 py-3 font-bold hover:bg-white hover:text-black border-2 border-black"
          >
            Advance Payment Week
          </button>
          <button
            onClick={onResetWeek}
            className="bg-white text-black px-6 py-3 font-bold hover:bg-black hover:text-white border-2 border-black"
          >
            Reset Payment Week
          </button>
        </div>
      </div>
    </div>
  );
}

export default WeekCounter;