import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const inputStyle =
  'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500';

const divisions = {
  Dhaka: ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail'],
  Chattogram: ['Chattogram', 'Cox’s Bazar', 'Cumilla', 'Noakhali'],
  Sylhet: ['Sylhet', 'Sunamganj', 'Moulvibazar', 'Habiganj'],
  Rajshahi: ['Rajshahi', 'Bogra', 'Natore', 'Naogaon'],
  Khulna: ['Khulna', 'Jessore', 'Satkhira', 'Bagerhat'],
  Barisal: ['Barisal', 'Patuakhali', 'Bhola', 'Jhalokathi'],
  Rangpur: ['Rangpur', 'Dinajpur', 'Thakurgaon', 'Kurigram'],
  Mymensingh: ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur'],
};

const calcCost = ({ parcelType, weight, senderService, receiverService }) => {
  let base = parcelType === 'document' ? 50 : 80;
  if (parcelType === 'non-document') {
    const wt = parseFloat(weight) || 0;
    base += wt * 10;
  }
  const extra = senderService !== receiverService ? 40 : 20;
  return base + extra;
};

export default function AddParcel() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { parcelType: 'document' } });

  const [dialog, setDialog] = useState({ open: false, cost: 0, draft: null });

  // Watch for dynamic dropdown
  const senderRegion = watch('senderRegion');
  const receiverRegion = watch('receiverRegion');
  const parcelType = watch('parcelType');

  const onSubmit = (data) => {
    const cost = calcCost(data);
    setDialog({ open: true, cost, draft: data });
    toast(`Your delivery cost is ৳${cost}`, { icon: '💰' });
  };

  const confirm = () => {
    console.log('Saved parcel data:', {
      ...dialog.draft,
      delivery_cost: dialog.cost,
      creation_date: new Date(),
    });
    toast.success('Parcel successfully added!');
    setDialog({ open: false, cost: 0, draft: null });
    reset();
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-10 max-w-6xl mx-auto mt-10 shadow-md">
      <Toaster position="top-center" />
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Add Parcel</h2>
      <p className="text-sm text-gray-500 mb-6">
        As this is a door-to-door delivery, we need both pickup and delivery
        location.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Parcel Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Parcel Information</h3>
          <div className="flex items-center gap-6 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="document"
                {...register('parcelType')}
                className="accent-green-600"
              />
              Document
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="non-document"
                {...register('parcelType')}
                className="accent-green-600"
              />
              Non-Document
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Parcel Title"
              {...register('parcelTitle', { required: true })}
              className={inputStyle}
            />
            {parcelType === 'non-document' && (
              <input
                placeholder="Parcel Weight (KG)"
                {...register('weight')}
                className={inputStyle}
              />
            )}
          </div>
        </div>

        {/* Sender Info */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Sender Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Sender Name"
              {...register('senderName', { required: true })}
              className={inputStyle}
            />
            <input
              placeholder="Sender Contact"
              {...register('senderContact', { required: true })}
              className={inputStyle}
            />
            <select
              {...register('senderRegion', { required: true })}
              className={inputStyle}
            >
              <option value="">Select Region</option>
              {Object.keys(divisions).map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <select
              {...register('senderService', { required: true })}
              className={inputStyle}
            >
              <option value="">Select Service Center</option>
              {(divisions[senderRegion] || []).map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <input
              placeholder="Address"
              {...register('senderAddress', { required: true })}
              className={inputStyle}
            />
            <textarea
              placeholder="Pickup Instruction"
              {...register('pickupInstruction')}
              className={`${inputStyle} md:col-span-2 h-24 resize-none`}
            ></textarea>
          </div>
        </div>

        {/* Receiver Info */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Receiver Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Receiver Name"
              {...register('receiverName', { required: true })}
              className={inputStyle}
            />
            <input
              placeholder="Receiver Contact"
              {...register('receiverContact', { required: true })}
              className={inputStyle}
            />
            <select
              {...register('receiverRegion', { required: true })}
              className={inputStyle}
            >
              <option value="">Select Region</option>
              {Object.keys(divisions).map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <select
              {...register('receiverService', { required: true })}
              className={inputStyle}
            >
              <option value="">Select Service Center</option>
              {(divisions[receiverRegion] || []).map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <input
              placeholder="Address"
              {...register('receiverAddress', { required: true })}
              className={inputStyle}
            />
            <textarea
              placeholder="Delivery Instruction"
              {...register('deliveryInstruction')}
              className={`${inputStyle} md:col-span-2 h-24 resize-none`}
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-6 rounded-md"
        >
          Calculate Cost
        </button>
      </form>

      {/* Confirmation Dialog */}
      {dialog.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl text-center w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Confirm Booking</h3>
            <p className="text-gray-700 mb-4">
              Your total cost will be:{' '}
              <span className="font-bold">৳{dialog.cost}</span>
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirm}
                className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600"
              >
                Confirm
              </button>
              <button
                onClick={() => setDialog({ open: false, cost: 0, draft: null })}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
