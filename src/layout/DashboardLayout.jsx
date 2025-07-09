// src/layout/DashboardLayout.jsx
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router';
import { FiMenu, FiX } from 'react-icons/fi';
import {
  FaHome,
  FaBox,
  FaCreditCard,
  FaMapMarkerAlt,
  FaUserEdit,
  FaUserCheck,
  FaUserClock,
  FaUserShield,
  FaUsersCog,
  FaClipboardList,
  FaCheckCircle,
} from 'react-icons/fa';
import useUserRole from '../hooks/useUserRole';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ---- role hook ---- */
  const { role, isRoleLoading } = useUserRole(); // { role: 'admin' | 'user' | 'rider' }

  return (
    <div className="flex h-screen bg-white">
      {/* ---------- Sidebar ---------- */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-lime-500 text-white
          transform transition-transform duration-300 ease-in-out z-50
          ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
      >
        {/* sidebar header */}
        <div className="p-4 font-bold flex justify-between items-center border-b border-lime-600">
          Menu
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-xl"
          >
            <FiX />
          </button>
        </div>

        {/* ---------- Nav Links ---------- */}
        <ul className="p-4 space-y-2">
          {/* ----- common links ----- */}
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 hover:bg-lime-600 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              <FaHome /> Back Home
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/myParcels"
              className="flex items-center gap-2 px-4 py-2 hover:bg-lime-600 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              <FaBox /> My Parcels
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/paymentHistory"
              className="flex items-center gap-2 px-4 py-2 hover:bg-lime-600 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              <FaCreditCard /> Payment History
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/track"
              className="flex items-center gap-2 px-4 py-2 hover:bg-lime-600 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              <FaMapMarkerAlt /> Track Package
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/update-profile"
              className="flex items-center gap-2 px-4 py-2 hover:bg-lime-600 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              <FaUserEdit /> Update Profile
            </Link>
          </li>

          {/* rider links */}
          {!isRoleLoading && role === 'rider' && (
            <>
              <li>
                <Link
                  to="/dashboard/pending-deliveries" // ⬅️ যে রাউটে পেজ বানাবে
                  className="flex items-center gap-2 px-4 py-2 hover:bg-lime-600 rounded"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaClipboardList /> Pending Deliveries {/* ✅ উপযুক্ত আইকন */}
                </Link>
              </li>
              <Link
                to="/dashboard/completed-deliveries"
                className="flex items-center gap-2 px-4 py-2 hover:bg-lime-600 rounded"
              >
                <FaCheckCircle className="text-white" />
                Completed Deliveries
              </Link>
            </>
          )}
          {/* ----- admin‑only links ----- */}
          {!isRoleLoading && role === 'admin' && (
            <>
              <li>
                <Link
                  to="/dashboard/active-riders"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-lime-600 rounded"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaUserCheck /> Active Riders
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/pending-riders"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-lime-600 rounded"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaUserClock /> Pending Riders
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/make-admin"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-lime-600 rounded"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaUserShield /> Make&nbsp;Admin
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/assign-rider"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-lime-600 rounded"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaUsersCog /> Assign Rider
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* ---------- Main Area ---------- */}
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

        {/* nested routes outlet */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;








