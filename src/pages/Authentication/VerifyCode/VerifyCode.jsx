import React from 'react';

const VerifyCode = () => {
  return (
    <div className="w-full max-w-sm bg-white p-10 rounded-lg shadow-lg">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-2 text-center">Enter Code</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Enter the 6‑digit code that we sent to your email address
      </p>

      {/* 6‑Digit input row */}
      <div className="flex justify-between gap-2 mb-6">
        <input
          type="text"
          maxLength="1"
          className="w-10 h-12 text-center text-lg border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
        />
        <input
          type="text"
          maxLength="1"
          className="w-10 h-12 text-center text-lg border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
        />
        <input
          type="text"
          maxLength="1"
          className="w-10 h-12 text-center text-lg border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
        />
        <input
          type="text"
          maxLength="1"
          className="w-10 h-12 text-center text-lg border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
        />
        <input
          type="text"
          maxLength="1"
          className="w-10 h-12 text-center text-lg border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
        />
        <input
          type="text"
          maxLength="1"
          className="w-10 h-12 text-center text-lg border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
        />
      </div>

      {/* Verify button */}
      <button className="w-full py-2 bg-lime-400 hover:bg-lime-500 text-white rounded font-semibold">
        Verify Code
      </button>
    </div>
  );
};

export default VerifyCode;
