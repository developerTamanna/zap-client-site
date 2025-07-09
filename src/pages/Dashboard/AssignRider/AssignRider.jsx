import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import { FaMotorcycle, FaTimes } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  /* 🔹 1. fetch assign‑able parcels */
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ['assignableParcels'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/parcels', {
        params: {
          payment_status: 'paid',
          delivery_status: 'not collected', // space → will be encoded
        },
      });
      return data.sort(
        (a, b) => new Date(a.creation_date) - new Date(b.creation_date)
      );
    },
  });

  /* modal state */
  const [open, setOpen] = useState(false);
  const [parcel, setParcel] = useState(null);
  const [riders, setRiders] = useState([]);
  const [loadingRiders, setLoadingRiders] = useState(false);

  /* 🔹 2. open modal + load riders (district === senderService) */
  const showModal = async (p) => {
    setParcel(p);
    setOpen(true);
    setLoadingRiders(true);
    try {
      const { data } = await axiosSecure.get('/riders/available', {
        params: { district: p.senderService },

      });
      setRiders(data);
      console.log(data)
      console.log(p.senderService)
    } catch {
      toast.error('Failed to load riders');
    } finally {
      setLoadingRiders(false);
    }
  };

  /* 🔹 3. assign rider mutation */
  const assignMut = useMutation({
    mutationFn: ({ parcelId, rider }) =>
      axiosSecure.patch(`/parcels/${parcelId}/assign`, {
        riderId: rider._id,
        riderEmail: rider.email,
        riderName: rider.name,
      }),
    onSuccess: () => {
      qc.invalidateQueries(['assignableParcels']);
      toast.success('Rider assigned');
      setOpen(false);
    },
    onError: () => toast.error('Assign failed'),
  });

  const fmt = (d) =>
    new Date(d).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-4">
        Assign Rider <span className="text-lime-600">({parcels.length})</span>
      </h2>

      {isLoading ? (
        <p className="text-gray-500">Loading parcels…</p>
      ) : parcels.length === 0 ? (
        <p className="text-gray-500">No parcels waiting for rider.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-[930px] w-full text-sm">
            <thead className="bg-lime-500 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Tracking</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Sender Svc</th>
                <th className="px-4 py-3">Receiver Svc</th>
                <th className="px-4 py-3">Cost</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((p, i) => (
                <tr
                  key={p._id}
                  className="border-b last:border-b-0 hover:bg-lime-50/40"
                >
                  <td className="px-4 py-2 font-medium">{i + 1}</td>
                  <td className="px-4 py-2">{p.tracking_id}</td>
                  <td className="px-4 py-2">{p.parcelTitle}</td>
                  <td className="px-4 py-2">{p.senderService}</td>
                  <td className="px-4 py-2">{p.receiverService}</td>
                  <td className="px-4 py-2">৳{p.delivery_cost}</td>
                  <td className="px-4 py-2">{fmt(p.creation_date)}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => showModal(p)}
                      className="btn btn-xs bg-lime-500 hover:bg-lime-600 text-white flex items-center gap-1"
                    >
                      <FaMotorcycle /> Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ---------- Modal ---------- */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                Riders in&nbsp;
                <span className="text-lime-600">{parcel.senderService}</span>
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            {loadingRiders ? (
              <p className="text-gray-500">Loading riders…</p>
            ) : riders.length === 0 ? (
              <p className="text-red-600">No rider available.</p>
            ) : (
              <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
                {riders.map((r) => (
                  <li
                    key={r._id}
                    className="flex justify-between items-center border rounded px-3 py-2 hover:bg-lime-50/60"
                  >
                    <div>
                      <p className="font-medium">{r.name}</p>
                      <p className="text-xs text-gray-500">{r.phone}</p>
                    </div>
                    <button
                      onClick={() =>
                        assignMut.mutate({ parcelId: parcel._id, rider: r })
                      }
                      className="btn btn-xs bg-lime-500 hover:bg-lime-600 text-white"
                    >
                      Select
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="text-right pt-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-1 hover:bg-gray-100 rounded text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
