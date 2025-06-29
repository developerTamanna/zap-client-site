import React from 'react';
import profast from '../../../assets/logo.png';

const ForgotPassword = () => {
  return (
    <div className="w-full max-w-sm bg-white p-10 rounded-lg shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-bold mb-6">
        <img src={profast} alt="Profast Logo" className="h-8" />
        <h2>Profast</h2>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">Forgot Password</h2>
      <p className="mb-6 text-sm text-gray-500">
        Enter your email address and we’ll send you a reset link.
      </p>

      {/* Form */}
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-lime-400"
        />
        <button
          type="submit"
          className="w-full py-2 bg-lime-400 hover:bg-lime-500 text-white rounded font-semibold"
        >
          Send
        </button>
      </form>

      {/* Bottom link */}
      <p className="text-sm mt-4 text-center">
        Remember your password?{' '}
        <span className="text-lime-600 font-medium cursor-pointer hover:underline">
          Login
        </span>
      </p>
    </div>
  );
};

export default ForgotPassword;
