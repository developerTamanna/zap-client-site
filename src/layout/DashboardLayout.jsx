import React, { useState } from 'react';
import { Link, Outlet } from 'react-router';
import { FiMenu, FiX } from 'react-icons/fi';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white">
      {/* --- Sidebar --- */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-lime-500 text-white
          transform transition-transform duration-300 ease-in-out z-50
          ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
      >
        <div className="p-4 font-bold flex justify-between items-center border-b border-lime-600">
          Menu
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-xl"
          >
            <FiX />
          </button>
        </div>

        <ul className="p-4 space-y-2">
          <li>
            <Link
              to="/"
              className="block px-4 py-2 hover:bg-lime-600 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              🏠 Back Home
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/myParcels"
              className="block px-4 py-2 hover:bg-lime-600 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              📦 My Parcels
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/item1"
              className="block px-4 py-2 hover:bg-lime-600 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              Sidebar Item 1
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/item2"
              className="block px-4 py-2 hover:bg-lime-600 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              Sidebar Item 2
            </Link>
          </li>
        </ul>
      </div>

      {/* --- Main Area --- */}
      <div className="flex-1 flex flex-col w-full ml-0 lg:ml-64">
        {/* top navbar */}
        <div className="flex items-center justify-between bg-white p-4 border-b">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-2xl"
          >
            <FiMenu />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rotate-45 bg-lime-300 rounded-sm" />
            <span className="text-xl font-bold">Profast</span>
          </Link>
        </div>

        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet /> {/* <- nested route content now renders here */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
