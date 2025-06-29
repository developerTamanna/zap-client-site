import { useState } from 'react';
import ceo from '../../assets/ceoavif.avif';
import cto from '../../assets/cto.jpeg';
import hed from '../../assets/head.jpg';
import success from '../../assets/SuccesLead.jpg';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('story');

  /* ─────────── tab content ─────────── */
  const copy = {
    story: `
We started with a simple promise — to make parcel delivery fast, reliable, and
completely stress‑free. What began in a single room with two delivery riders is
now a nationwide network powered by real‑time tracking, intelligent route‑planning,
and a culture of putting the customer first. From a birthday gift sent across town
to a mission‑critical business contract that must arrive before noon, we treat every
parcel with the same urgency and care. Today thousands trust us because we still
live by that founding promise: on time, every time.`,
    mission: `
Our mission is to bridge distances and bring people closer through seamless logistics.
We invest in green delivery fleets, AI‑driven scheduling, and a 24/7 support desk so
that every sender — individual or enterprise — can rely on a service that is fast,
transparent, and affordable. By 2030 we aim to make same‑day delivery possible in
all 64 districts while achieving a net‑zero carbon footprint.`,
    success: `
• 500 K+ parcels delivered with 98.7 % on‑time rate
• 1 000+ corporate partners across e‑commerce, healthcare, and banking
• 120 district hubs & micro‑warehouses ensuring average 6‑hour transit
• Winner of the "Best Last‑Mile Logistics Startup" award (2024)`,
  };

  /* ─────────── team profiles ─────────── */
  const team = [
    {
      name: 'Tamanna Akter',
      role: 'Founder & CEO',
      bio: 'Product thinker and ex‑rider who believes logistics should feel magical.',
      img: ceo,
    },
    {
      name: 'Jerin Rahman',
      role: 'CTO',
      bio: 'Leads the engineering team building our real‑time tracking platform.',
      img: cto,
    },
    {
      name: 'Lima Chowdhury',
      role: 'Head of Operations',
      bio: 'Optimises every route so a parcel never waits idle.',
      img: hed,
    },
    {
      name: 'Ruba Rahman',
      role: 'Customer Success Lead',
      bio: 'Turns feedback into features that make senders smile.',
      img: success,
    },
  ];

  const tabs = [
    { id: 'story', label: 'Story' },
    { id: 'mission', label: 'Mission' },
    { id: 'success', label: 'Success' },
    { id: 'team', label: 'Team & Others' },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 py-12 bg-white rounded-2xl shadow-md mt-6">
      {/* heading */}
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
        About
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Learn more about our story, goals, milestones, and the people behind
        them.
      </p>

      {/* dotted line with X */}
      <div className="relative mb-10">
        <div className="border-t-2 border-dotted border-gray-300 w-full" />
        <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 font-bold text-gray-700">
          X
        </div>
      </div>

      {/* tab buttons */}
      <div className="flex justify-center gap-4 flex-wrap mb-8">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-5 py-2 rounded-full border text-sm font-semibold transition
              ${
                activeTab === t.id
                  ? 'bg-lime-500 text-white border-lime-500'
                  : 'text-gray-600 border-gray-300 hover:bg-gray-100'
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* tab content */}
      {activeTab !== 'team' ? (
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner text-gray-700 whitespace-pre-line leading-relaxed">
          {copy[activeTab]}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <div
              key={m.name}
              className="bg-gray-50 p-6 rounded-lg shadow-inner text-center hover:shadow-md transition"
            >
              <img
                src={m.img}
                alt={m.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />
              <h4 className="font-bold text-gray-800">{m.name}</h4>
              <p className="text-lime-600 text-sm mb-2">{m.role}</p>
              <p className="text-gray-600 text-sm">{m.bio}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AboutUs;
