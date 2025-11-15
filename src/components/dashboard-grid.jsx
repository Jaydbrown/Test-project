import React from 'react';

function DashboardGrid({ children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {children}
    </div>
  );
}

export default DashboardGrid;