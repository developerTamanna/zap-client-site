import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaSearch, FaUserShield, FaUserTimes } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // format ISO date to readable
  const formatDate = (iso) => {
    if (!iso) return '—';
    const d = new Date(iso);
    return isNaN(d)
      ? '—'
      : d.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
  };

  // handle search
  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axiosSecure.get(
        `/users/search?email=${encodeURIComponent(query)}&limit=10`
      );
      setResults(res.data);
      if (!res.data.length) toast.error('No user found');
    } catch {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  // role update
  const updateRole = async (id, newRole) => {
    try {
      await axiosSecure.patch(`/users/${id}/role`, { role: newRole });
      toast.success(`Role set to ${newRole}`);
      setResults((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
      );
    } catch {
      toast.error('Role update failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Make / Remove Admin</h1>

      {/* search */}
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by email…"
          className="input input-bordered flex-1"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          {loading ? 'Searching…' : <FaSearch />}
        </button>
      </div>

      {/* result */}
      {results.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-[700px] w-full text-sm">
            <thead className="bg-lime-500 text-white text-xs">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Joined</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((u) => (
                <tr key={u._id} className="border-b last:border-0">
                  <td className="px-4 py-2">{u.name || '—'}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2 capitalize">{u.role}</td>
                  <td className="px-4 py-2">{formatDate(u.created_at)}</td>
                  <td className="px-4 py-2 flex justify-end gap-2">
                    <button
                      disabled={u.role === 'admin'}
                      onClick={() => updateRole(u._id, 'admin')}
                      className="btn btn-success btn-xs flex items-center gap-1"
                    >
                      <FaUserShield /> Admin
                    </button>
                    <button
                      disabled={u.role === 'user'}
                      onClick={() => updateRole(u._id, 'user')}
                      className="btn btn-error btn-xs flex items-center gap-1"
                    >
                      <FaUserTimes /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
