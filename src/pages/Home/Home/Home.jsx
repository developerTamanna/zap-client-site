import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import ServicesSection from '../services/ServicesSection';
import { TopBrands } from '../TopBrands/TopBrands';
import { Features } from '../Features/Features';
import { SatisfactionBanner } from '../SatisfactionBanner/SatisfactionBanner';
import { CustomerTestimonials } from '../CustomerSayings/CustomerTestimonials';
import { FaqSection } from '../FaqSection/FaqSection';


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
      <div className=''>
        <Features></Features>
      </div>
      <div>
        <SatisfactionBanner></SatisfactionBanner>
      </div>
      <div>
        <CustomerTestimonials></CustomerTestimonials>
      </div>
      <div>
        <FaqSection></FaqSection>
      </div>
    </div>
  );
};

export default Home;
