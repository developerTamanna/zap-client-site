import React from 'react';
import profast from '../../../assets/logo.png';
import { FcGoogle } from 'react-icons/fc';
const Register = () => {
  return (
    <div className="bg-white p-10 rounded-lg shadow-lg">
      {/* Logo */}
      <div className='flex gap-2 text-xl font-bold'>
        <img src={profast} alt="Profast Logo" className="h-8 mb-4" />
        <h2>Profast</h2>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">Create an Account</h2>
      <p className="mb-6 text-sm text-gray-500">Register with Profast</p>

      {/* Form */}
      <form className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full px-4 py-2 border rounded"
        />
        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
        />
        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
        />
        {/* Photo URL */}
        <input
          type="url"
          name="photoURL"
          placeholder="Photo URL"
          className="w-full px-4 py-2 border rounded"
        />

        {/* Register Button */}
        <button
          type="submit"
          className="w-full py-2 bg-lime-400 hover:bg-lime-500 rounded text-white font-semibold"
        >
          Register
        </button>
      </form>

      {/* Already have account */}
      <p className="text-sm mt-4">
        Already have an account?{' '}
        <span className="text-lime-600 cursor-pointer font-medium">Login</span>
      </p>

      {/* OR Divider */}
      <div className="my-4 text-center text-gray-400">Or</div>

      {/* Google Register Button */}
      <button className="w-full flex items-center justify-center gap-2 py-2 border rounded bg-gray-100 hover:bg-gray-200">
        <FcGoogle className="w-5 h-5" />
        Register with Google
      </button>
    </div>
  );
};

export default Register;
