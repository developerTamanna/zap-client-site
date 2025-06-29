import React from 'react';
import rider from '../../assets/agent-pending.png'; // Ensure you have the correct path to your image
const RiderForm = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-6xl p-10 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-10">
        {/* Left Side Form */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-green-900 mb-2">Be a Rider</h2>
          <p className="text-gray-600 mb-6">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700">Your Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Your Age</label>
                <input
                  type="number"
                  placeholder="Your Age"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Your Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Your Region</label>
                <select className="w-full border rounded-md px-4 py-2">
                  <option>Select your region</option>
                  <option>Dhaka</option>
                  <option>Chittagong</option>
                  <option>Khulna</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-700">NID</label>
                <input
                  type="text"
                  placeholder="NID"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Contact</label>
                <input
                  type="text"
                  placeholder="Contact"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-700">
                  Which warehouse you want to work?
                </label>
                <select className="w-full border rounded-md px-4 py-2">
                  <option>Select warehouse</option>
                  <option>Warehouse A</option>
                  <option>Warehouse B</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-lime-400 hover:bg-lime-500 text-black font-semibold px-6 py-2 rounded-md mt-4"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Side Image */}
        <div className="flex-1 hidden md:block">
          <img
            src={rider}
            alt="Rider Illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default RiderForm;
