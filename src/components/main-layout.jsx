import React from 'react';

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;