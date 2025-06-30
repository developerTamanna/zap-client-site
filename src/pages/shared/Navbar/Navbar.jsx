// src/components/Navbar.jsx
import { useState } from 'react';
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi';
import { Link, NavLink } from 'react-router';
import UseAuth from '../../../hooks/UseAuth';

const navItems = [
  { name: 'Services', to: '/services' },
  { name: 'Coverage', to: '/coverage' },
  { name: 'About Us', to: '/about' },
  { name: 'Pricing', to: '/pricing' },
  { name: 'Contact', to: '/contact' },
  { name: 'Be a Rider', to: '/rider-form' },
  { name: 'Track Order', to: '/track-order' },
  { name: 'Add Parcel', to: '/add-parcel' },
];

const baseLink = 'text-sm transition-colors duration-150';
const activeLink =
  'bg-lime-300 text-gray-900 text-sm font-medium px-5 py-2 rounded-full hover:bg-lime-400';
const inactiveLink = 'text-gray-700 hover:text-gray-900';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = UseAuth();

  // user থাকলে ড্যাশবোর্ড লিংক যুক্ত হবে
  const menuItems = [
    ...navItems,
    ...(user ? [{ name: 'Dashboard', to: '/dashboard' }] : []),
  ];

  const avatar = user?.photoURL;

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rotate-45 bg-lime-300 rounded-sm" />
          <span className="text-xl font-bold text-gray-800">Profast</span>
        </Link>

        {/* Menu – Desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map(({ name, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              {name}
            </NavLink>
          ))}
        </nav>

        {/* Actions – Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <>
              {/* Avatar */}
              <div className="relative group">
                <img
                  src={avatar}
                  alt="profile"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                />
                <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-black/80 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  {user.displayName || 'User'}
                </span>
              </div>
              <button
                onClick={logout}
                className="px-5 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-lime-300 text-sm font-medium text-gray-900 rounded-lg hover:bg-lime-400"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Scroll‑top icon */}
          <a
            href="#top"
            className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800"
          >
            <FiArrowUpRight />
          </a>
        </div>

        {/* Hamburger – Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-2xl text-gray-700"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t">
          <div className="flex flex-col items-start px-4 py-4 space-y-4 bg-white">
            {menuItems.map(({ name, to }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeLink : inactiveLink}`
                }
              >
                {name}
              </NavLink>
            ))}

            {/* Mobile auth buttons */}
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="w-full px-4 py-2 border text-sm rounded-lg hover:bg-gray-50"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-3 pt-2 w-full">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 px-4 py-2 border text-sm rounded-lg hover:bg-gray-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 px-4 py-2 bg-lime-300 text-sm font-medium text-gray-900 rounded-lg hover:bg-lime-400"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
