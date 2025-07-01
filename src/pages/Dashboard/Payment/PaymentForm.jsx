// src/pages/Dashboard/PaymentForm.jsx
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import UseAuth from '../../../hooks/UseAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../Loading';

const PaymentForm = () => {
  /* ---------- hooks ---------- */
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { parcelId } = useParams();
  const { user } = UseAuth(); // {displayName/email}

  /* ---------- ui state ---------- */
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [processing, setProcessing] = useState(false);

  /* ---------- fetch parcel ---------- */
  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ['parcel', parcelId],
    enabled: !!parcelId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) return <Loading />;

  /* ---------- helpers ---------- */
  const amount = parcelInfo.delivery_cost ?? 0; // ৳
  const amountInCents = Math.round(amount * 100); // paisa/cent
  const billingName = user?.displayName || user?.name || 'Customer';
  const billingEmail = user?.email || '';

  /* ---------- submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);
    try {
      /* 1️⃣ paymentMethod (billing + card) */
      const { error: pmError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: 'card',
          card,
          billing_details: { name: billingName, email: billingEmail },
        });
      if (pmError) throw pmError;
      console.log('🔹 paymentMethod:', paymentMethod);

      /* 2️⃣ server‑side PaymentIntent */
      const { data: intent } = await axiosSecure.post(
        '/create-payment-intent',
        {
          amountInCents,
          parcelId,
        }
      );
      const clientSecret = intent?.clientSecret;
      console.log('🔸 clientSecret:', clientSecret);
      if (!clientSecret) throw new Error('Failed to create payment intent');

      /* 3️⃣ confirm payment */
      const { error: confirmErr, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: { name: billingName, email: billingEmail },
          },
        });
      if (confirmErr) throw confirmErr;

      if (paymentIntent.status === 'succeeded') {
        setSuccessMessage('✅ Payment successful!');
        console.log('🎉 paymentIntent:', paymentIntent);
        // 👉 এখানেই DB/স্টেট আপডেট করো
        
      }
    } catch (err) {
      setErrorMessage(err.message || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  /* ---------- live validation ---------- */
  const handleCardChange = (e) =>
    setErrorMessage(e.error ? e.error.message : '');

  /* ---------- UI ---------- */
  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 border">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Secure Payment
      </h2>

      {/* test card */}
      <div className="bg-gray-100 p-3 rounded text-sm text-gray-600 mb-4">
        <p className="font-medium">💳 Test Card:</p>
        <p>4242 4242 4242 4242 • 12/34 • CVC 123</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 border rounded bg-gray-50 focus-within:border-lime-500">
          <CardElement
            onChange={handleCardChange}
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#32325d',
                  '::placeholder': { color: '#aab7c4' },
                },
                invalid: { color: '#fa755a', iconColor: '#fa755a' },
              },
            }}
          />
        </div>

        {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-600 text-sm">{successMessage}</p>
        )}

        <button
          type="submit"
          disabled={!stripe || processing}
          className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 rounded"
        >
          {processing ? 'Processing…' : `Pay ৳${amount} Now`}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
