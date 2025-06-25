// src/components/Features.jsx
import delivery from '../../../assets/safe-delivery.png';
import tracking from '../../../assets/live-tracking.png';

export const Features = () => (
  <section className="py-12 px-4">
    {/* ─── ড্যাশড লাইন (উপরে) ─── */}
    <hr className="border-t border-dashed border-gray-300 mb-10" />

    {/* Box গুলো নিচে নিচে থাকবে */}
    <div className="max-w-5xl mx-auto grid gap-6">
      {/* 1 */}
      <div className="flex items-start gap-4 bg-white shadow rounded-xl p-6">
        <img
          src={tracking}
          alt="Tracking"
          className="h-20 w-20 object-contain shrink-0"
        />
        <div>
          <h3 className="font-semibold text-lg">Live Parcel Tracking</h3>
          <p className="text-gray-500 text-sm">
            Real-time tracking for complete peace of mind.
          </p>
        </div>
      </div>

      {/* 2 */}
      <div className="flex items-start gap-4 bg-white shadow rounded-xl p-6">
        <img
          src={delivery}
          alt="Safe Delivery"
          className="h-20 w-20 object-contain shrink-0"
        />
        <div>
          <h3 className="font-semibold text-lg">100% Safe Delivery</h3>
          <p className="text-gray-500 text-sm">
            Guaranteed safe delivery with proper handling.
          </p>
        </div>
      </div>

      {/* 3 */}
      <div className="flex items-start gap-4 bg-white shadow rounded-xl p-6">
        <img
          src={delivery}
          alt="Support"
          className="h-20 w-20 object-contain shrink-0"
        />
        <div>
          <h3 className="font-semibold text-lg">24/7 Call Center Support</h3>
          <p className="text-gray-500 text-sm">
            Our team is ready to assist you at any time.
          </p>
        </div>
      </div>
    </div>

    {/* ─── ড্যাশড লাইন (নিচে) ─── */}
    <hr className="border-t border-dashed border-gray-300 mt-16" />
  </section>
);
