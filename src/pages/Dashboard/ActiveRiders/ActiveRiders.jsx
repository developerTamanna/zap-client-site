// src/pages/Dashboard/ActiveRiders/ActiveRiders.jsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FaUserSlash } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';


const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');

  /* ---------- fetch active riders ---------- */
  const {
    data: riders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['active-riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/active'); // <- API route
      return res.data;
    },
  });

  /* ---------- deactivate mutation ---------- */
  const deactivateMutation = useMutation({
    mutationFn: (id) =>
      axiosSecure.patch(`/riders/${id}`, { status: 'inactive' }),
    onSuccess: () => {
      toast.success('Rider deactivated');
      queryClient.invalidateQueries(['active-riders']);
    },
    onError: () => toast.error('Failed to deactivate'),
  });

  /* ---------- search filter ---------- */
  const filtered = riders.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------- helpers ---------- */
  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  /* ---------- UI ---------- */
  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <span className="w-12 h-12 border-4 border-dashed border-lime-500 rounded-full animate-spin" />
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-600 py-10">
        {error?.message || 'Failed to load riders'}
      </div>
    );

  return (
    <div className="space-y-6">
      {/* header + search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Active Riders&nbsp;
          <span className="text-lime-600">({filtered.length})</span>
        </h1>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name…"
          className="input input-bordered w-full sm:w-64"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No matching riders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-[850px] w-full text-sm">
            <thead className="bg-lime-500 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Region</th>
                <th className="px-4 py-3">District</th>
                <th className="px-4 py-3">Bike Reg.</th>
                <th className="px-4 py-3">Since</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((r, idx) => (
                <tr
                  key={r._id}
                  className="border-b last:border-b-0 hover:bg-lime-50/40"
                >
                  <td className="px-4 py-2 font-medium">{idx + 1}</td>
                  <td className="px-4 py-2">{r.name}</td>
                  <td className="px-4 py-2">{r.email}</td>
                  <td className="px-4 py-2">{r.phone}</td>
                  <td className="px-4 py-2">{r.region}</td>
                  <td className="px-4 py-2">{r.district}</td>
                  <td className="px-4 py-2">{r.bike_registration}</td>
                  <td className="px-4 py-2">{formatDate(r.created_at)}</td>

                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => deactivateMutation.mutate(r._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 flex items-center gap-1"
                    >
                      <FaUserSlash /> Deactivate
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

export default ActiveRiders;
