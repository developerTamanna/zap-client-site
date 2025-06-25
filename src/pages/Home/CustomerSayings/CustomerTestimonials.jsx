// src/components/CustomerTestimonials.jsx
import { useState } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import customerTop from '../../../assets/customer-top.png';
import userIcon from '../../../assets/image-upload-icon.png';

const testimonials = [
  {
    id: 1,
    name: 'Tamanna Akter',
    role: 'Frontend Developer',
    message:
      'Profast gave me peace of mind when delivering parcels. Truly fast and reliable!',
    image: userIcon,
  },
  {
    id: 2,
    name: 'Lima Sultana',
    role: 'UI Designer',
    message:
      'Very responsive team. I can rely on them anytime I need something shipped.',
    image: userIcon,
  },
  {
    id: 3,
    name: 'Riyad Hasan',
    role: 'Product Manager',
    message: 'My parcels always reach on time. 100% recommended.',
    image: userIcon,
  },
  {
    id: 4,
    name: 'Nusrat Jahan',
    role: 'Marketing Lead',
    message:
      'Love the live tracking feature. It saves a lot of my follow-up time.',
    image: userIcon,
  },
  {
    id: 5,
    name: 'Emon Khan',
    role: 'Full Stack Developer',
    message: 'Safe delivery and professional support. I use Profast regularly.',
    image: userIcon,
  },
  {
    id: 6,
    name: 'Mitu Rahman',
    role: 'Entrepreneur',
    message: 'They treat my parcels like their own. Very satisfied.',
    image: userIcon,
  },
];

export const CustomerTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = testimonials.length;

  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % total);

  // helper to get index with wrap
  const wrap = (i) => (i + total) % total;

  const visible = [wrap(activeIndex - 1), activeIndex, wrap(activeIndex + 1)];

  return (
    <section className="py-16 px-4 bg-gray-50 text-center">
      {/* header */}
      <img
        src={customerTop}
        alt="Customers"
        className="mx-auto h-30 w-30 object-cover rounded-full mb-4"
      />
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        What Our Customers Are Saying
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-10">
        We value every feedback from our users and are proud to share their
        experiences.
      </p>

      {/* carousel wrapper */}
      <div className="relative max-w-4xl mx-auto flex items-center">
        {/* prev arrow */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-lime-50 transition"
          aria-label="Previous Review"
        >
          <FaChevronLeft className="text-xl text-gray-600" />
        </button>

        {/* cards container */}
        <div className="flex w-full justify-center gap-4 overflow-hidden">
          {visible.map((idx) => {
            const item = testimonials[idx];
            const isCenter = idx === activeIndex;
            return (
              <div
                key={item.id}
                className={`relative w-64 md:w-72 px-4 py-5 bg-white rounded-xl shadow-md transition-all duration-500 ease-in-out ${
                  isCenter ? 'opacity-100 scale-100' : 'opacity-40 scale-90'
                }`}
              >
                <FaQuoteLeft className="text-lime-500 text-2xl md:text-3xl mb-2" />
                <p className="text-gray-700 mb-5 text-sm md:text-base line-clamp-5">
                  {item.message}
                </p>
                <hr className="border-dotted border-t mb-4" />
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800 text-sm md:text-base">
                      {item.name}
                    </h4>
                    <span className="text-xs text-gray-500">{item.role}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* next arrow */}
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-lime-50 transition"
          aria-label="Next Review"
        >
          <FaChevronRight className="text-xl text-gray-600" />
        </button>
      </div>

      {/* dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'bg-lime-500 scale-125' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
