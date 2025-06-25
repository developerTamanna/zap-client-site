// src/components/HowItWorks.jsx
import {
  FaTruckPickup,
  FaMoneyBillWave,
  FaWarehouse,
  FaBuilding,
} from 'react-icons/fa6';

const steps = [
  {
    title: 'Booking Pick & Drop',
    icon: <FaTruckPickup />,
    description: 'Pickup and delivery services tailored to your needs.',
  },
  {
    title: 'Cash On Delivery',
    icon: <FaMoneyBillWave />,
    description: 'Collect payments easily at customer doorstep.',
  },
  {
    title: 'Delivery Hub',
    icon: <FaWarehouse />,
    description: 'Our smart delivery hubs ensure timely processing.',
  },
  {
    title: 'Booking SME & Corporate',
    icon: <FaBuilding />,
    description: 'Flexible booking for small to large businesses.',
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-slate-100 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          How it <span className="text-lime-500">Works</span>
        </h2>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ title, icon, description }, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm px-6 py-8 text-center hover:shadow-md hover:animate-bounce transition duration-300 ease-in-out"
            >
              {/* Icon */}
              <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-lime-100 text-lime-600 grid place-items-center text-2xl">
                {icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
