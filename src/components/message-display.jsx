import React from 'react';

function MessageDisplay({ error, success }) {
  if (!error && !success) return null;

  return (
    <>
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
    </>
  );
}

export default MessageDisplay;