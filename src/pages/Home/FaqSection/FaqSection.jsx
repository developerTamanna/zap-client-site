import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    question: 'How can I become a merchant?',
    answer:
      'You can register from our website by clicking "Become a Merchant" and filling out the necessary form.',
  },
  {
    question: 'What is your delivery time?',
    answer:
      'We deliver within 24 hours in most areas. You can track your parcel for live updates.',
  },
  {
    question: 'Is there any support for bulk deliveries?',
    answer:
      'Yes, we offer special support and pricing for bulk and corporate deliveries. Please contact us for details.',
  },
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mb-10">
          Get answers to the most commonly asked questions about our service.
        </p>
      </div>
      <div className="max-w-3xl mx-auto space-y-4 border border-[#5BCDD7] bg-[#E6F2F3] p-4 rounded-md">
        A posture corrector works by providing support and gentle alignment to
        your shoulders, back, and spine, encouraging you to maintain proper
        posture throughout the day. Here’s how it typically functions: A posture
        corrector works by providing support and gentle alignment to your
        shoulders.
      </div>
      <div className="max-w-3xl mx-auto space-y-4 mt-8">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`rounded-xl transition bg-blue-50/30 ${
                isOpen ? 'border border-[#5BCDD7]' : 'border border-transparent'
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center px-5 py-4 font-medium text-gray-800"
              >
                <span>{faq.question}</span>
                {isOpen ? (
                  <FaChevronUp className="text-blue-500" />
                ) : (
                  <FaChevronDown className="text-blue-500" />
                )}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-2 text-sm text-gray-700">
                  <p className="mb-2 text-gray-500">…</p>
                  <p>{faq.answer}</p>
                  <p className="mt-2 text-gray-400 italic">— End of Answer</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
