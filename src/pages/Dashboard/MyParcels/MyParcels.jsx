import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../../hooks/UseAuth';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import { IoCubeOutline } from 'react-icons/io5';

const MyParcels = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  /* ——— react‑query fetch ——— */
  const {
    data: parcels = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['my-parcels', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  /* ——— helper to prettify date ——— */
  const formatDate = (iso) =>
    new Date(iso).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  /* ——— UI ——— */
  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20">
        <span className="w-12 h-12 border-4 border-lime-500 border-dashed rounded-full animate-spin" />
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-600 py-10">
        {error?.message || 'Failed to load parcels'}
      </div>
    );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <IoCubeOutline className="text-lime-500" /> My Parcels&nbsp;
        <span className="text-lime-600">({parcels.length})</span>
      </h1>

      {parcels.length === 0 ? (
        <p className="text-center text-gray-500 py-20">
          You haven’t created any parcel yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-[600px] w-full text-sm text-left">
            <thead className="bg-lime-500 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Tracking ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Cost (৳)</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Status</th>
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
                  <td className="px-4 py-2 capitalize">{p.parcelType}</td>
                  <td className="px-4 py-2">{p.delivery_cost}</td>
                  <td className="px-4 py-2">{formatDate(p.creation_date)}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold
                      ${
                        p.delivery_status === 'delivered'
                          ? 'bg-lime-100 text-lime-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {p.delivery_status}
                    </span>
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

export default MyParcels;
