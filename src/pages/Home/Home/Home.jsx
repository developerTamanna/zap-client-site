import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';

const Home = () => {
  return (
    <div>
      <div className='mt-10'>
        <Banner></Banner>
      </div>
      <div className='mt-10'>
        <HowItWorks></HowItWorks>
      </div>
    </div>
  );
};

export default Home;
