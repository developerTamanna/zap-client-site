import React from 'react';
import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png';

const AuthLayout = () => {
  return (
    <div className='w-11/12 mx-auto bg-slate-100"'>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left Side - Form Content */}
        <div className="flex-1 flex items-center justify-center p-6 bg-white">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1 hidden md:flex items-center justify-center bg-lime-50">
          <img
            src={authImg}
            alt="Authentication"
            className="max-w-full max-h-screen object-contain p-4"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
