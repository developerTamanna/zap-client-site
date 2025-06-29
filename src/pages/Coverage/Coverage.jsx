import React from 'react';
import { useLoaderData } from 'react-router';
import BangladeshMap from '../Bangladeshmap';

const Coverage = () => {
  const serviceCenters = useLoaderData();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 mt-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        We are available in 64 districts
      </h1>

      <BangladeshMap serviceCenters={serviceCenters} />
    </div>
  );
};

export default Coverage;
