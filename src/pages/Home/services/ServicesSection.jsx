import { motion } from 'framer-motion';

const services = [
  {
    title: 'Express & Standard Delivery',
    description:
      'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.',
    icon: 'https://cdn-icons-png.flaticon.com/512/10414/10414546.png',
  },
  {
    title: 'Nationwide Delivery',
    description:
      'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.',
    highlight: true,
    icon: 'https://cdn-icons-png.flaticon.com/512/10414/10414549.png',
  },
  {
    title: 'Fulfillment Solution',
    description:
      'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.',
    icon: 'https://cdn-icons-png.flaticon.com/512/10414/10414538.png',
  },
  {
    title: 'Cash on Home Delivery',
    description:
      '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.',
    icon: 'https://cdn-icons-png.flaticon.com/512/10414/10414558.png',
  },
  {
    title: 'Corporate Service / Contract In Logistics',
    description:
      'Customized corporate services which includes warehouse and inventory management support.',
    icon: 'https://cdn-icons-png.flaticon.com/512/10414/10414545.png',
  },
  {
    title: 'Parcel Return',
    description:
      'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.',
    icon: 'https://cdn-icons-png.flaticon.com/512/10414/10414550.png',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-[#06333C] py-16 px-4 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Our Services</h2>
        <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-2xl shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-[1.03] cursor-pointer ${
                service.highlight
                  ? 'bg-lime-300 hover:bg-lime-400 text-black'
                  : 'bg-white hover:bg-lime-400 text-black'
              }`}
            >
              <div className="flex justify-center mb-4">
                <img
                  src={service.icon}
                  alt="Service Icon"
                  className="w-14 h-14"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {service.title}
              </h3>
              <p className="text-center text-sm text-gray-700">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
