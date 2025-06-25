// src/components/Navbar.jsx
import { useState } from 'react';
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi';
import { Link, NavLink } from 'react-router';

const navItems = [
  { name: 'Services', to: '/services' },
  { name: 'Coverage', to: '/coverage' },
  { name: 'About Us', to: '/about' },
  { name: 'Pricing', to: '/pricing' },
];

const baseLink = 'text-sm transition-colors duration-150';
const activeLink =
  'bg-lime-300 text-gray-900 text-sm font-medium px-5 py-2 rounded-full hover:bg-lime-400';
const inactiveLink = 'text-gray-700 hover:text-gray-900';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rotate-45 bg-lime-300 rounded-sm" />
          <span className="text-xl font-bold text-gray-800">Profast</span>
        </Link>

        {/* Menu Links – Desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map(({ name, to }) => (
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

          <Link
            to="/be-a-rider"
            className="bg-lime-300 text-gray-900 text-sm font-medium px-5 py-2 rounded-full hover:bg-lime-400"
          >
            Be a Rider
          </Link>
        </nav>

        {/* Actions – Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/signin"
            className="px-5 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 bg-lime-300 text-sm font-medium text-gray-900 rounded-lg hover:bg-lime-400"
          >
            Sign Up
          </Link>
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
            {navItems.map(({ name, to }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)} // লিঙ্কে ক্লিক করলে মেনু বন্ধ
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeLink : inactiveLink}`
                }
              >
                {name}
              </NavLink>
            ))}

            <Link
              to="/be-a-rider"
              onClick={() => setOpen(false)}
              className="bg-lime-300 text-gray-900 text-sm font-medium px-4 py-2 rounded-full hover:bg-lime-400 w-full text-center"
            >
              Be a Rider
            </Link>

            {/* Mobile Action Buttons */}
            <div className="flex gap-3 pt-2 w-full">
              <Link
                to="/signin"
                onClick={() => setOpen(false)}
                className="flex-1 px-4 py-2 border text-sm rounded-lg hover:bg-gray-50"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="flex-1 px-4 py-2 bg-lime-300 text-sm font-medium text-gray-900 rounded-lg hover:bg-lime-400"
              >
                Sign Up
              </Link>
              <a
                href="#top"
                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800"
              >
                <FiArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
