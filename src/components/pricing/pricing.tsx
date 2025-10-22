'use client';
import React, { useState } from 'react';
import { Poppins } from 'next/font/google';

const poppinsFont = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

type BillingTypes = 'monthly' | 'annual';

const Pricing = () => {
  const [selectedBilling, setSelectedBilling] = useState<BillingTypes>('monthly');

  return (
    <div
      className={`pricing-section flex flex-col justify-start items-center px-4 sm:px-8 lg:px-16 py-20 bg-gray-50 border-t-4 border-black ${poppinsFont.className}`}
    >
      <h4 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center max-w-3xl">
        We've got a plan that's&nbsp;
        <span className="text-blue-600 underline underline-offset-4 decoration-[3px]">
          perfect for you
        </span>
      </h4>

      {/* Billing toggle */}
      <div className="mt-8 flex justify-center items-center bg-white border-4 border-black rounded-full overflow-hidden shadow-[4px_4px_0_rgba(0,0,0,1)]">
        {['monthly', 'annual'].map((type) => (
          <button
            key={type}
            className={`px-8 py-3 font-semibold transition-all ${
              selectedBilling === type
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
            onClick={() => setSelectedBilling(type as BillingTypes)}
          >
            {type === 'monthly' ? 'Monthly Billing' : 'Annual Billing'}
          </button>
        ))}
      </div>

      {/* Pricing cards */}
      <div className="pricing-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14 w-full max-w-7xl">
        <PricingCard
          planName="Freemium"
          price={0}
          billingCycle={selectedBilling}
          features={['Access to core features', 'Basic analytics', 'Community support']}
          highlight={false}
        />
        <PricingCard
          planName="Pro"
          price={499}
          billingCycle={selectedBilling}
          features={[
            'Unlimited projects',
            'Advanced collaboration',
            'Priority support',
            'Custom branding',
          ]}
          highlight={true}
        />
        <PricingCard
          planName="Enterprise"
          price={999}
          billingCycle={selectedBilling}
          features={[
            'Dedicated account manager',
            'Custom integrations',
            'Team analytics',
            'Premium support',
          ]}
          highlight={false}
        />
      </div>
    </div>
  );
};

export default Pricing;

// --- PricingCard ---
const PricingCard = ({
  planName,
  price,
  billingCycle,
  features,
  highlight,
}: {
  planName: string;
  price: number;
  billingCycle: BillingTypes;
  features: string[];
  highlight?: boolean;
}) => {
  return (
    <div
      className={`pricing-card flex flex-col justify-start items-center p-8 rounded-xl border-4 border-black bg-white 
      transition-all duration-200 
      shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_rgba(0,0,0,1)]
      ${highlight ? 'bg-yellow-200' : 'bg-white'}`}
    >
      <h4 className="text-2xl font-bold text-center">{planName}</h4>

      <h3 className="text-3xl font-semibold mt-4">
        ₹{price}{' '}
        <span className="text-base font-normal text-gray-700">
          {billingCycle === 'monthly' ? '/month' : '/year'}
        </span>
      </h3>

      <div className="flex flex-col w-full mt-8 gap-3">
        <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-black/80 transition-all w-full border-2 border-black">
          Get Started
        </button>
        <button className="bg-white border-2 border-black text-black px-6 py-3 rounded-full hover:bg-black/10 transition-all w-full">
          Talk to Sales
        </button>
      </div>

      <div className="divider w-full h-[2px] bg-black my-6"></div>

      <h4 className="text-lg font-semibold mb-3 text-left w-full">Features</h4>
      <ul className="list-disc pl-5 space-y-2 w-full text-gray-800">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};
