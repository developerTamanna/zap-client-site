import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // ← Toaster সঙ্গে সঙ্গেই
import Swal from 'sweetalert2';
import { FaSearch, FaUserShield, FaUserTimes } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // ISO → DD Mon YYYY
  const formatDate = (iso) =>
    !iso
      ? '—'
      : new Date(iso).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });

  // 🔍 search handler
  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const { data } = await axiosSecure.get(
        `/users/search?email=${encodeURIComponent(query)}&limit=10`
      );
      setResults(data);
      if (!data.length) toast.error('No user found');
    } catch {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  // 🔐 confirm → update role
  const confirmAndUpdate = (id, newRole) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to make this user ${newRole}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#84cc16', // lime
      cancelButtonColor: '#d1d5db',
      background: '#ffffff',
    }).then((r) => r.isConfirmed && updateRole(id, newRole));
  };

  // 🚀 API call
  const updateRole = async (id, newRole) => {
    try {
      await axiosSecure.patch(`/users/${id}/role`, { role: newRole });
      toast.success(`✅ Role updated to ${newRole}`, {
        style: {
          background: '#ecfccb', // lime‑50
          color: '#365314', // lime‑800
          border: '1px solid #a3e635',
        },
      });
      setResults((p) =>
        p.map((u) => (u._id === id ? { ...u, role: newRole } : u))
      );
    } catch {
      toast.error('❌ Role update failed', {
        style: {
          background: '#fef2f2',
          color: '#7f1d1d',
          border: '1px solid #f87171',
        },
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Toaster ঠিক এখানেই ➡️ */}
      <Toaster position="top-right" />

      <h1 className="text-2xl font-bold text-gray-800">Make / Remove Admin</h1>

      {/* search box */}
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

      {/* result table */}
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
                      onClick={() => confirmAndUpdate(u._id, 'admin')}
                      className="btn btn-success btn-xs flex items-center gap-1"
                    >
                      <FaUserShield /> Admin
                    </button>
                    <button
                      disabled={u.role === 'user'}
                      onClick={() => confirmAndUpdate(u._id, 'user')}
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
