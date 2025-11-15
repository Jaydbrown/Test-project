import React from 'react';

const TIERS = [
  { id: 1, name: 'Tier 1', amount: 10000, interest: 5 },
  { id: 2, name: 'Tier 2', amount: 20000, interest: 10 },
  { id: 3, name: 'Tier 3', amount: 30000, interest: 20 },
];

function RegistrationForm({
  studentName,
  setStudentName,
  selectedTier,
  setSelectedTier,
  depositAmount,
  setDepositAmount,
  onRegister,
  studentsCount,
  maxStudents,
}) {
  return (
    <div className="border-2 border-black p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">
        Student Registration
      </h2>
      <p className="text-black mb-4">
        Students registered: {studentsCount}/{maxStudents}
      </p>

      <form onSubmit={onRegister} className="space-y-4">
        <div>
          <label className="block text-black font-bold mb-2">
            Student Name
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full px-3 py-2 border-2 border-black text-black"
            placeholder="Enter student name"
          />
        </div>

        <div>
          <label className="block text-black font-bold mb-2">
            Select Tier
          </label>
          <select
            value={selectedTier}
            onChange={(e) => {
              const tierId = Number(e.target.value);
              setSelectedTier(tierId);
              const tier = TIERS.find((t) => t.id === tierId);
              setDepositAmount(tier.amount.toString());
            }}
            className="w-full px-3 py-2 border-2 border-black text-black"
          >
            {TIERS.map((tier) => (
              <option key={tier.id} value={tier.id}>
                {tier.name} - ₦{tier.amount.toLocaleString()} ({tier.interest}
                % per week)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-black font-bold mb-2">
            Deposit Amount (₦)
          </label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="w-full px-3 py-2 border-2 border-black text-black"
            placeholder="Enter exact tier amount"
          />
          <p className="text-black text-sm mt-1">
            Required: ₦
            {TIERS.find((t) => t.id === selectedTier)?.amount.toLocaleString()}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 font-bold hover:bg-white hover:text-black border-2 border-black"
          disabled={studentsCount >= maxStudents}
        >
          Register Student
        </button>
      </form>

      <TierInformation />
    </div>
  );
}

function TierInformation() {
  return (
    <div className="mt-6 border-t-2 border-black pt-6">
      <h3 className="font-bold text-black mb-3">Tier Requirements</h3>
      {TIERS.map((tier) => (
        <div key={tier.id} className="mb-2 text-black">
          <span className="font-bold">{tier.name}:</span> ₦
          {tier.amount.toLocaleString()} ({tier.interest}% interest per week)
        </div>
      ))}
    </div>
  );
}

export default RegistrationForm;