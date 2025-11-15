import React from 'react';

function MemberCard({ student, calculation, onWithdraw }) {
  return (
    <div className="border-2 border-black p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-bold text-black text-lg">{student.name}</div>
          <div className="text-black text-sm">
            {student.tier.name} ({student.tier.interest}% per week)
          </div>
        </div>
        <button
          onClick={() => onWithdraw(student.id)}
          className="bg-black text-white px-4 py-2 font-bold hover:bg-white hover:text-black border-2 border-black"
        >
          Withdraw
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-black">
        <div>
          <div className="text-sm">Principal</div>
          <div className="font-bold">
            ₦{calculation.principal.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-sm">Weeks Active</div>
          <div className="font-bold">{calculation.weeksElapsed}</div>
        </div>
        <div>
          <div className="text-sm">Interest Earned</div>
          <div className="font-bold">
            ₦{calculation.interest.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-sm">Withdrawal Amount</div>
          <div className="font-bold text-lg">
            ₦{calculation.total.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberCard;