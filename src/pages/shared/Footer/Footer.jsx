// src/components/Footer.jsx
import { Link } from 'react-router';
import { FaLinkedinIn, FaFacebookF, FaYoutube } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';

const links = [
  { name: 'Services', to: '/services' },
  { name: 'Coverage', to: '/coverage' },
  { name: 'About Us', to: '/about' },
  { name: 'Pricing', to: '/pricing' },
  { name: 'Blog', to: '/blog' },
  { name: 'Contact', to: '/contact' },
];

const socials = [
  {
    href: 'https://www.linkedin.com',
    icon: <FaLinkedinIn className="text-xl" />,
    bg: 'bg-white/10 text-sky-500 hover:bg-white/20',
    label: 'LinkedIn',
  },
  {
    href: 'https://twitter.com',
    icon: <FaXTwitter className="text-xl" />,
    bg: 'bg-white text-gray-800 hover:bg-gray-100',
    label: 'Twitter / X',
  },
  {
    href: 'https://facebook.com',
    icon: <FaFacebookF className="text-xl" />,
    bg: 'bg-white/10 text-sky-600 hover:bg-white/20',
    label: 'Facebook',
  },
  {
    href: 'https://youtube.com',
    icon: <FaYoutube className="text-xl" />,
    bg: 'bg-red-600 hover:bg-red-700',
    label: 'YouTube',
  },
];

const Footer = () => {
  return (
    <footer className=" py-14 px-4">
      {/* inner container */}
      <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-black text-white text-center px-6 py-14 lg:px-20">
        {/* logo */}
        <Link to="/" className="inline-flex items-center gap-2 select-none">
          <span className="block w-5 h-5 rotate-45 bg-lime-300 rounded-sm" />
          <span className="text-2xl font-bold">Profast</span>
        </Link>

        {/* subtitle */}
        <p className="max-w-xl mx-auto mt-4 text-sm leading-relaxed text-gray-300">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        {/* dashed line 1 */}
        <hr className="mt-10 border-t border-dashed border-gray-700" />

        {/* nav links */}
        <nav className="mt-6 flex flex-wrap justify-center gap-8 text-sm">
          {links.map(({ name, to }) => (
            <Link
              key={to}
              to={to}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* dashed line 2 */}
        <hr className="mt-6 mb-8 border-t border-dashed border-gray-700" />

        {/* social icons */}
        <div className="flex justify-center gap-4">
          {socials.map(({ href, icon, bg, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${bg} transition-colors duration-150`}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
