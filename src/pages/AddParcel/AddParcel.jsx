import React from 'react';

const AddParcel = () => {
  const inputClass =
    'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500';

  return (
    <div className="bg-white rounded-2xl p-6 md:p-10 max-w-6xl mx-auto mt-10 shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Add Parcel</h2>
      <hr className="mb-6" />

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Enter your parcel details
        </h3>
        <div className="flex items-center gap-6 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="parcelType"
              value="document"
              defaultChecked
              className="accent-green-600"
            />
            Document
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="parcelType"
              value="non-document"
              className="accent-green-600"
            />
            Not-Document
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Parcel Name" className={inputClass} />
          <input
            type="text"
            placeholder="Parcel Weight (KG)"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="font-semibold text-lg mb-4">Sender Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Sender Name"
              className={inputClass}
            />
            <select className={inputClass}>
              <option>Select Wire house</option>
              <option>Dhaka Warehouse</option>
              <option>Chattogram Warehouse</option>
              <option>Khulna Warehouse</option>
            </select>
            <input type="text" placeholder="Address" className={inputClass} />
            <input
              type="text"
              placeholder="Sender Contact No"
              className={inputClass}
            />
            <select className={inputClass}>
              <option>Select your region</option>
              <option>Dhaka</option>
              <option>Chattogram</option>
              <option>Rajshahi</option>
              <option>Khulna</option>
              <option>Barisal</option>
              <option>Sylhet</option>
              <option>Rangpur</option>
              <option>Mymensingh</option>
            </select>
            <textarea
              placeholder="Pickup Instruction"
              className={`${inputClass} md:col-span-2 h-24 resize-none`}
            ></textarea>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Receiver Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Receiver Name"
              className={inputClass}
            />
            <select className={inputClass}>
              <option>Select Wire house</option>
              <option>Dhaka Warehouse</option>
              <option>Chattogram Warehouse</option>
              <option>Khulna Warehouse</option>
            </select>
            <input type="text" placeholder="Address" className={inputClass} />
            <input
              type="text"
              placeholder="Receiver Contact No"
              className={inputClass}
            />
            <select className={inputClass}>
              <option>Select your region</option>
              <option>Dhaka</option>
              <option>Chattogram</option>
              <option>Rajshahi</option>
              <option>Khulna</option>
              <option>Barisal</option>
              <option>Sylhet</option>
              <option>Rangpur</option>
              <option>Mymensingh</option>
            </select>
            <textarea
              placeholder="Delivery Instruction"
              className={`${inputClass} md:col-span-2 h-24 resize-none`}
            ></textarea>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        * PickUp Time 4pm–7pm Approx.
      </p>

      <button className="mt-6 bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-6 rounded-md">
        Proceed to Confirm Booking
      </button>
    </div>
  );
};

export default AddParcel;
