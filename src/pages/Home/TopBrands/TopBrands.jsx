// src/components/TopBrands.jsx
import brandImg1 from '../../../assets/casio.png';
import brandImg2 from '../../../assets/amazon.png';
import brandImg3 from '../../../assets/moonstar.png';
import brandImg4 from '../../../assets/randstad.png';
import brandImg5 from '../../../assets/start.png';
import brandImg6 from '../../../assets/start-people 1.png';

export const TopBrands = () => (
  <section className="py-10 px-4 text-center">
    {/* উপরের লেখা */}
    <p className="font-bold text-gray-600 mb-6 text-2xl md:text-base">
      We've helped thousands of sales teams
    </p>

    {/* এক লাইনে সব img */}
    <div className="overflow-x-auto">
      <div className="flex justify-center items-center gap-10 min-w-[700px]">
        <img
          src={brandImg1}
          alt="Casio"
          className="h-6 md:h-8 object-contain"
        />
        <img
          src={brandImg2}
          alt="Amazon"
          className="h-6 md:h-8 object-contain"
        />
        <img
          src={brandImg3}
          alt="Moonstar"
          className="h-6 md:h-8 object-contain"
        />
        <img
          src={brandImg4}
          alt="Randstad"
          className="h-6 md:h-8 object-contain"
        />
        <img
          src={brandImg5}
          alt="Start"
          className="h-6 md:h-8 object-contain"
        />
        <img
          src={brandImg6}
          alt="Start People"
          className="h-6 md:h-8 object-contain"
        />
      </div>
    </div>
  </section>
);
