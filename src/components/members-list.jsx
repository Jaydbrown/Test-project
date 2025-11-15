import React from 'react';
import MemberCard from './member-card';

function MembersList({ students, calculateStudentTotal, onWithdraw }) {
  if (students.length === 0) return null;

  return (
    <div className="border-2 border-black p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">
        Members & Contributions
      </h2>

      <div className="space-y-4">
        {students.map((student) => {
          const calc = calculateStudentTotal(student);
          return (
            <MemberCard
              key={student.id}
              student={student}
              calculation={calc}
              onWithdraw={onWithdraw}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MembersList;