import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useLoaderData } from 'react-router';
import UseAuth from '../../hooks/UseAuth';

const generateTrackingId = () => {
  const date = new Date();

  // ① YYYYMMDD
  const datePart = date.toISOString().split('T')[0].replace(/-/g, '');

  // ② 5‑char random alphanumeric, uppercase
  const randPart = Math.random().toString(36).substring(2, 7).toUpperCase();

  // ③ final ID ⇒ PCL-20250630-AB12C
  return `PCL-${datePart}-${randPart}`;
};

/* ---------- UI helpers ---------- */
const cssInput =
  'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500';

/* ---------- pricing helper ---------- */
const priceCalc = ({ parcelType, weight, sameRegion }) => {
  // base charge
  let base =
    parcelType === 'document' ? (sameRegion ? 60 : 80) : sameRegion ? 110 : 150;

  let weightExtra = 0;
  let regionExtra = 0;

  if (parcelType === 'non-document') {
    const kg = parseFloat(weight) || 0;
    if (kg > 3) {
      const extraKg = Math.ceil(kg - 3);
      weightExtra = extraKg * 40;
      if (!sameRegion) regionExtra = 40; // outside‑region extra fee
    }
  }

  return {
    total: base + weightExtra + regionExtra,
    breakdown: { base, weightExtra, regionExtra },
  };
};

export default function AddParcel() {
  /** JSON loaded by react‑router loader:
   *  [
   *   { region:'Mymensingh', district:'Sherpur', ... },
   *   ...
   *  ]
   */
  const serviceCenters = useLoaderData();

  /* unique region list */
  const regions = useMemo(
    () => [...new Set(serviceCenters.map((c) => c.region))],
    [serviceCenters]
  );

  /* react‑hook‑form */
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { parcelType: 'document' } });

  //useAuth user import
  const { user } = UseAuth();

  /* watch for dynamic dropdown */
  const senderRegion = watch('senderRegion');
  const receiverRegion = watch('receiverRegion');
  const parcelType = watch('parcelType');

  const senderCenters = serviceCenters.filter((c) => c.region === senderRegion);
  const receiverCenters = serviceCenters.filter(
    (c) => c.region === receiverRegion
  );

  /* dialog state */
  const [dialog, setDialog] = useState({
    open: false,
    cost: 0,
    breakdown: { base: 0, weightExtra: 0, regionExtra: 0 },
    draft: null,
  });

  /* ------------ submit → show break‑down ------------ */
  const onSubmit = (data) => {
    const { total, breakdown } = priceCalc({
      ...data,
      sameRegion: data.senderRegion === data.receiverRegion,
    });
    setDialog({ open: true, cost: total, breakdown, draft: data });
    toast(`Delivery cost: ৳${total}`, { icon: '💰' });
  };

  /* ------------ confirm → save (here console.log) ---- */
  const confirm = () => {
    const payload = {
      ...dialog.draft,
      delivery_cost: dialog.cost,
      created_by: user?.email,
      delivery_status: 'not collected',
      payment_status: 'unpaid',
      creation_date: new Date(),
      tracking_id: generateTrackingId(),
    };
    console.log('Saved parcel:', payload); // ⬅️ replace with API POST
    toast.success('Parcel confirmed!');
    reset();
    setDialog({ ...dialog, open: false });
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-10 max-w-6xl mx-auto mt-10 shadow-md">
      <Toaster position="top-center" />

      <h2 className="text-3xl font-bold text-gray-800 mb-4">Add Parcel</h2>
      <p className="text-sm text-gray-500 mb-6">
        Door‑to‑door service requires both pickup &amp; delivery details.
      </p>

      {/* ===================================================== */}
      {/* =====================   FORM   ====================== */}
      {/* ===================================================== */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* ---------- Parcel Info ---------- */}
        <section>
          <h3 className="text-lg font-semibold mb-2">Parcel Information</h3>

          <div className="flex items-center gap-6 mb-4">
            {['document', 'non-document'].map((t) => (
              <label key={t} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={t}
                  {...register('parcelType')}
                  className="accent-green-600"
                />
                {t === 'document' ? 'Document' : 'Non‑Document'}
              </label>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Parcel Title"
              {...register('parcelTitle', { required: true })}
              className={cssInput}
            />

            {parcelType === 'non-document' && (
              <input
                type="number"
                step="0.1"
                placeholder="Weight (KG)"
                {...register('weight', {
                  required: parcelType === 'non-document',
                  min: 0.1,
                })}
                className={cssInput}
              />
            )}
          </div>
        </section>

        {/* ---------- Sender ---------- */}
        <section>
          <h3 className="font-semibold text-lg mb-2">Sender Information</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Name"
              {...register('senderName', { required: true })}
              className={cssInput}
            />
            <input
              placeholder="Contact No"
              {...register('senderContact', { required: true })}
              className={cssInput}
            />

            <select
              {...register('senderRegion', { required: true })}
              className={cssInput}
            >
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <select
              {...register('senderService', { required: true })}
              className={cssInput}
            >
              <option value="">Select Service Center</option>
              {senderCenters.map((c) => (
                <option key={c.district}>{c.district}</option>
              ))}
            </select>

            <input
              placeholder="Address"
              {...register('senderAddress', { required: true })}
              className={`md:col-span-2 ${cssInput}`}
            />
            <textarea
              placeholder="Pickup Instruction"
              {...register('pickupInstruction')}
              className={`md:col-span-2 h-24 resize-none ${cssInput}`}
            />
          </div>
        </section>

        {/* ---------- Receiver ---------- */}
        <section>
          <h3 className="font-semibold text-lg mb-2">Receiver Information</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Name"
              {...register('receiverName', { required: true })}
              className={cssInput}
            />
            <input
              placeholder="Contact No"
              {...register('receiverContact', { required: true })}
              className={cssInput}
            />

            <select
              {...register('receiverRegion', { required: true })}
              className={cssInput}
            >
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <select
              {...register('receiverService', { required: true })}
              className={cssInput}
            >
              <option value="">Select Service Center</option>
              {receiverCenters.map((c) => (
                <option key={c.district}>{c.district}</option>
              ))}
            </select>

            <input
              placeholder="Address"
              {...register('receiverAddress', { required: true })}
              className={`md:col-span-2 ${cssInput}`}
            />
            <textarea
              placeholder="Delivery Instruction"
              {...register('deliveryInstruction')}
              className={`md:col-span-2 h-24 resize-none ${cssInput}`}
            />
          </div>
        </section>

        <button
          type="submit"
          className="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-8 rounded-md"
        >
          Calculate Cost
        </button>
      </form>

      {/* ===================================================== */}
      {/* ===============  BREAKDOWN DIALOG  ================== */}
      {/* ===================================================== */}
      {dialog.open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 text-center shadow-lg">
            <h4 className="text-xl font-semibold mb-4">Cost Breakdown</h4>

            <div className="text-left text-sm mb-4 space-y-1">
              <p>
                Base charge:{' '}
                <span className="font-medium">৳{dialog.breakdown.base}</span>
              </p>
              {dialog.breakdown.weightExtra > 0 && (
                <p>
                  Weight surcharge:{' '}
                  <span className="font-medium">
                    ৳{dialog.breakdown.weightExtra}
                  </span>
                </p>
              )}
              {dialog.breakdown.regionExtra > 0 && (
                <p>
                  Outside‑region fee:{' '}
                  <span className="font-medium">
                    ৳{dialog.breakdown.regionExtra}
                  </span>
                </p>
              )}
              <hr />
              <p className="font-bold text-lg">Total:&nbsp;৳{dialog.cost}</p>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={confirm}
                className="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-6 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => setDialog({ ...dialog, open: false })}
                className="border border-gray-300 py-2 px-6 rounded hover:bg-gray-50"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
