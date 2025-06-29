import { useState } from 'react';

const Pricing = () => {
  const [parcelType, setParcelType] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [cost, setCost] = useState(null);

  const calculateCost = () => {
    let baseCost = 50;
    if (parcelType === 'Document') baseCost += 20;
    if (destination === 'Outside City') baseCost += 30;
    if (parseFloat(weight) > 1) baseCost += (parseFloat(weight) - 1) * 10;
    setCost(baseCost);
  };

  const resetForm = () => {
    setParcelType('');
    setDestination('');
    setWeight('');
    setCost(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-4xl font-bold text-[#003B29] text-center mb-2">
        Pricing Calculator
      </h1>
      <p className="text-center mb-8 text-gray-600 max-w-2xl mx-auto">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      <hr className="my-8" />

      <h2 className="text-xl font-semibold text-[#003B29] text-center mb-8">
        Calculate Your Cost
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="space-y-4 w-full max-w-sm">
          <div>
            <label className="block mb-1 text-gray-700">Parcel type</label>
            <select
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none"
              value={parcelType}
              onChange={(e) => setParcelType(e.target.value)}
            >
              <option value="">Select Parcel type</option>
              <option value="Document">Document</option>
              <option value="Package">Package</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-700">
              Delivery Destination
            </label>
            <select
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="">Select Delivery Destination</option>
              <option value="Inside City">Inside City</option>
              <option value="Outside City">Outside City</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Weight (KG)</label>
            <input
              type="number"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none"
              placeholder="Contact"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={calculateCost}
              className="px-6 py-2 bg-lime-400 text-black rounded hover:bg-lime-500"
            >
              Calculate
            </button>
          </div>
        </div>

        {cost !== null && (
          <div className="text-5xl font-extrabold text-black whitespace-nowrap">
            {cost} Tk
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;
