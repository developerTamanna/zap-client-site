// src/pages/Dashboard/PendingRiders/PendingRiders.jsx
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null); // rider object for modal

  /* ------------ fetch pending riders ------------ */
  const {
    data: riders = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['pending-riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/pending');
      return res.data;
    },
  });

  /* ------------ approve / reject mutation ------------ */
  const updateStatus = useMutation({
    mutationFn: ({ id, status, email }) =>
      axiosSecure.patch(`/riders/${id}/status`, { status, email }),
    onSuccess: () => {
      toast.success('Status updated');
      queryClient.invalidateQueries(['pending-riders']);
      setSelected(null);
    },
    onError: () => toast.error('Update failed'),
  });

  /* ------------ UI helpers ------------ */
  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  /* ------------ loading / error ------------ */
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
      <h1 className="text-2xl font-bold text-gray-800">
        Pending Riders&nbsp;
        <span className="text-lime-600">({riders.length})</span>
      </h1>

      {riders.length === 0 ? (
        <p className="text-gray-500">No pending applications 🎉</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-[800px] w-full text-sm">
            <thead className="bg-lime-500 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Region</th>
                <th className="px-4 py-3">District</th>
                <th className="px-4 py-3">Applied</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((r, idx) => (
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
                  <td className="px-4 py-2">{formatDate(r.created_at)}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => setSelected(r)}
                      className="px-3 py-1 bg-lime-500 text-white rounded text-xs hover:bg-lime-600"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ---------- Modal ---------- */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-3 text-xl"
            >
              ×
            </button>

            <h3 className="text-lg font-semibold mb-4">Rider Details</h3>

            <ul className="space-y-1 text-sm">
              {Object.entries(selected).map(([k, v]) => (
                <li key={k}>
                  <span className="font-medium capitalize">{k}:</span>{' '}
                  {typeof v === 'string' ? v : JSON.stringify(v)}
                </li>
              ))}
            </ul>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() =>
                  updateStatus.mutate({
                    id: selected._id,
                    status: 'active',
                    email: selected.email,
                  })
                }
                className="px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600 text-sm"
              >
                Accept
              </button>
              <button
                onClick={() =>
                  updateStatus.mutate({
                    id: selected._id,
                    status: 'rejected',
                    email: selected.email,
                  })
                }
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;
