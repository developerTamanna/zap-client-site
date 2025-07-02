// src/pages/Dashboard/PaymentHistory.jsx
import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../hooks/UseAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../Loading';

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  /* ---------- fetch ---------- */
  const {
    isPending,
    data: payments = [],
    error,
  } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`); // ← back‑tick fix
      return res.data;
    },
  });

  /* ---------- state ---------- */
  if (isPending) return <Loading />;
  if (error)
    return (
      <p className="text-center text-red-600">Failed to load payment history</p>
    );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Payment History&nbsp;
        <span className="text-lime-600">({payments.length})</span>
      </h1>

      {payments.length === 0 ? (
        <p className="text-gray-500">No payments yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-[700px] w-full text-sm">
            <thead className="bg-lime-500 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Txn ID</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Paid At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, idx) => (
                <tr
                  key={p._id}
                  className="border-b last:border-b-0 hover:bg-lime-50/40"
                >
                  <td className="px-4 py-2 font-medium">{idx + 1}</td>
                  <td className="px-4 py-2 font-mono break-all">
                    {p.transactionId}
                  </td>
                  <td className="px-4 py-2">৳{(p.amount / 100).toFixed(2)}</td>
                  <td className="px-4 py-2 capitalize">{p.paymentMethod}</td>
                  <td className="px-4 py-2">
                    {new Date(p.paidAt).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
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

export default PaymentHistory;
