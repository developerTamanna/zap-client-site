import { Link } from 'react-router';
import { FaBan } from 'react-icons/fa';

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md space-y-4">
        <FaBan className="text-6xl text-lime-500 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
        <p className="text-gray-600">
          You don’t have permission to access this page. Please contact an
          administrator if you think this is a mistake.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-5 py-2 bg-lime-500 text-white rounded hover:bg-lime-600 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
