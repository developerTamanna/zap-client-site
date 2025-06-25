// src/components/SatisfactionBanner.jsx
import location1 from '../../../assets/location-merchant.png';
import merchant from '../../../assets/be-a-merchant-bg.png';

export const SatisfactionBanner = () => (
  /* বাইরের সেকশন—Features কার্ডের সমান প্রস্থ */
  <section className="mt-8">
    {/* ইননার কার্ড */}
    <div className="relative max-w-5xl mx-auto bg-[#042E46] text-white rounded-xl overflow-hidden px-6 md:px-10 py-12">
      {/* কনটেন্ট ফ্লেক্স বক্স */}
      <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* টেক্সট পার্ট */}
        <div className="md:max-w-md">
          <h2 className="text-3xl font-bold leading-snug">
            Merchant and Customer Satisfaction Is Our First Priority
          </h2>
          <p className="mt-4 text-gray-200">
            We ensure you get the best service to keep merchants and customers
            happy.
          </p>

          {/* বোতাম */}
          <div className="mt-8 flex gap-4 flex-wrap">
            <button className="bg-lime-300 text-black px-6 py-2 rounded hover:bg-lime-400 transition">
              Become a Merchant
            </button>
            <button className="rounded-2xl border border-lime-500 text-lime-500 px-6 py-2 font-semibold hover:bg-lime-500 hover:text-white transition duration-300">
              Earn with Profast Courier
            </button>
          </div>
        </div>

        {/* সাইড ইমেজ */}
        <img
          src={location1}
          alt="Graph Illustration"
          className="mt-10 md:mt-0 md:h-64 lg:h-72 object-contain"
        />
      </div>

      {/* ব্যাকগ্রাউন্ড শেপ */}
      <img
        src={merchant}
        alt="Background Shape"
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      />
    </div>
  </section>
);
