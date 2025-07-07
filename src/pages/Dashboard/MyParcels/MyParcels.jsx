import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import { IoCubeOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router';
import UseAuth from '../../../hooks/UseAuth';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyParcels = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  /* ---------- fetch parcels ---------- */
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
  //handlepay
  const handlePay = (id) => {
    console.log('Pay for parcel:', id);
    navigate(`/dashboard/payment/${id}`);
  };
  /* ---------- delete mutation (optimistic) ---------- */
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/parcels/${id}`),

    onMutate: async (id) => {
      await queryClient.cancelQueries(['my-parcels', user?.email]);
      const previous = queryClient.getQueryData(['my-parcels', user?.email]);
      queryClient.setQueryData(['my-parcels', user?.email], (old = []) =>
        old.filter((p) => p._id !== id)
      );
      return { previous };
    },

    onError: (_err, _id, ctx) => {
      queryClient.setQueryData(
        ['my-parcels', user?.email],
        ctx?.previous || []
      );
      toast.error('❌ Delete failed');
    },

    onSuccess: () => toast.success('🗑️ Parcel deleted'),

    onSettled: () => queryClient.invalidateQueries(['my-parcels', user?.email]),
  });

  const handleDelete = (id) => {
    toast(
      (t) => (
        <span>
          Delete this parcel?
          <button
            onClick={() => {
              deleteMutation.mutate(id);
              toast.dismiss(t.id);
            }}
            className="ml-3 px-2 py-1 bg-red-500 text-white rounded text-xs"
          >
            Yes
          </button>
        </span>
      ),
      { duration: 6000 }
    );
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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
        {error?.message || 'Failed to load parcels'}
      </div>
    );

  return (
    <div className="space-y-6">
      <Toaster position="top-center" />

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
          <table className="min-w-[820px] w-full text-sm">
            <thead className="bg-lime-500 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Tracking ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Cost</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment</th>
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
                  <td className="px-4 py-2">৳{p.delivery_cost}</td>
                  <td className="px-4 py-2">{formatDate(p.creation_date)}</td>
                  <td className="px-4 py-2 capitalize">{p.delivery_status}</td>

                  {/* ----- Payment column ----- */}
                  <td className="px-4 py-2">
                    {p.payment_status === 'paid' ? (
                      <span className="px-2 py-1 text-xs rounded bg-lime-100 text-lime-700">
                        Paid
                      </span>
                    ) : (
                      <Link
                        onClick={() => handlePay(p._id)}
                        className="text-xs px-2 py-1 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500"
                      >
                        Pay Now
                      </Link>
                    )}
                  </td>

                  {/* ----- Action buttons ----- */}
                  <td className="px-4 py-2 flex justify-end gap-2 whitespace-nowrap">
                    <Link
                      to={`/dashboard/parcels/${p._id}`}
                      className="px-3 py-1 border border-lime-500 text-lime-600 rounded hover:bg-lime-50 text-xs"
                    >
                      View
                    </Link>
                    <Link
                      to={`/dashboard/parcels/edit/${p._id}`}
                      className="px-3 py-1 bg-lime-500 text-white rounded hover:bg-lime-600 text-xs"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                    >
                      Delete
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

export default MyParcels;
