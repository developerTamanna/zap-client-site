/* ---------- PendingDeliveries.jsx (one‑file ready) ---------- */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import UseAuth from '../../../hooks/UseAuth';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = UseAuth();
  const [parcels, setParcels] = useState([]);

  /* ── fetch parcels assigned to this rider ── */
  const { isLoading, isError } = useQuery({
    queryKey: ['riderParcels', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/parcels?email=${encodeURIComponent(user.email)}`
      );
      setParcels(res.data); // → local state (UI stays)
      return res.data;
    },
  });

  /* ── confirm‑toast + status update ── */
  const confirmUpdate = ({ id, newStatus, label }) => {
    toast((t) => (
      <span>
        {label} ?
        <button
          onClick={async () => {
            try {
              /* server patch */
              await axiosSecure.patch(`/parcels/${id}/status`, {
                status: newStatus,
              });
              /* local cache row update → table doesn’t vanish */
              queryClient.setQueryData(
                ['riderParcels', user?.email],
                (old = []) =>
                  old.map((p) =>
                    p._id === id ? { ...p, delivery_status: newStatus } : p
                  )
              );
              setParcels((old) =>
                old.map((p) =>
                  p._id === id ? { ...p, delivery_status: newStatus } : p
                )
              );
              toast.success('Status updated');
            } catch {
              toast.error('Update failed');
            } finally {
              toast.dismiss(t.id);
            }
          }}
          className="ml-3 bg-lime-500 hover:bg-lime-600 text-white px-2 py-1 rounded text-xs"
        >
          OK
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="ml-2 bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded text-xs"
        >
          Cancel
        </button>
      </span>
    ));
  };

  /* ── loading / error UI ── */
  if (isLoading)
    return (
      <>
        <Toaster position="top-center" />
        <div className="flex justify-center py-20">
          <span className="w-12 h-12 border-4 border-dashed border-lime-500 rounded-full animate-spin" />
        </div>
      </>
    );

  if (isError)
    return (
      <>
        <Toaster position="top-center" />
        <div className="text-center text-red-600 py-10">
          Failed to load deliveries
        </div>
      </>
    );

  /* ── main table ── */
  return (
    <>
      <Toaster position="top-center" />

      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          Pending / In‑Transit Parcels&nbsp;
          <span className="text-lime-600">({parcels.length})</span>
        </h1>

        {parcels.length === 0 ? (
          <p className="text-gray-500">No tasks right now 🎉</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-[900px] w-full text-sm">
              <thead className="bg-lime-500 text-white uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Tracking ID</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Sender → Receiver</th>
                  <th className="px-4 py-3">Cost</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {parcels.map((p, idx) => (
                  <tr
                    key={p._id}
                    className="border-b last:border-b-0 hover:bg-lime-50/40"
                  >
                    <td className="px-4 py-2 font-medium">{idx + 1}</td>
                    <td className="px-4 py-2">{p.tracking_id}</td>
                    <td className="px-4 py-2">{p.parcelTitle}</td>
                    <td className="px-4 py-2">
                      {p.senderService} → {p.receiverService}
                    </td>
                    <td className="px-4 py-2">৳{p.delivery_cost}</td>
                    <td className="px-4 py-2 capitalize">
                      {p.delivery_status.replace('_', ' ')}
                    </td>
                    <td className="px-4 py-2 text-right space-x-2">
                      {p.delivery_status === 'rider-assigned' && (
                        <button
                          onClick={() =>
                            confirmUpdate({
                              id: p._id,
                              newStatus: 'in_transit',
                              label: 'Mark as Picked Up',
                            })
                          }
                          className="btn btn-xs btn-warning"
                        >
                          Mark Picked Up
                        </button>
                      )}
                      {p.delivery_status === 'in_transit' && (
                        <button
                          onClick={() =>
                            confirmUpdate({
                              id: p._id,
                              newStatus: 'delivered',
                              label: 'Mark as Delivered',
                            })
                          }
                          className="btn btn-xs btn-success"
                        >
                          Mark Delivered
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default PendingDeliveries;
