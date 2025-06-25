import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import ServicesSection from '../services/ServicesSection';
import { TopBrands } from '../TopBrands/TopBrands';

const Home = () => {
  return (
    <div>
      <div className='mt-10'>
        <Banner></Banner>
      </div>
      <div className='mt-10'>
        <HowItWorks></HowItWorks>
      </div>
      <div>
        <ServicesSection></ServicesSection>
      </div>
      <div className='mt-10'>
        <TopBrands></TopBrands>
      </div>
    </div>
  );
};

export default Home;
