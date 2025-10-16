'use client';
import React, { useState } from 'react';
import { Poppins } from 'next/font/google';

type Props = {};

const poppinsFont = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

type BillingTypes = 'monthly' | 'annual';

const Pricing = (props: Props) => {
  const [selectedBilling, setSelectedBilling] = useState<BillingTypes>('monthly');

  return (
    <div className="pricing flex flex-col justify-start items-center px-4 sm:px-8 lg:px-16 py-12">
      <h4 className={`${poppinsFont.className} text-3xl sm:text-4xl md:text-5xl font-semibold text-center`}>
        We've got a plan that's&nbsp;perfect for you
      </h4>

      {/* Billing toggle */}
      <div className="mt-6 flex justify-center items-center rounded-lg overflow-hidden border border-gray-300">
        {['monthly', 'annual'].map((type) => (
          <div
            key={type}
            className={`px-6 py-2 cursor-pointer transition-colors ${
              selectedBilling === type ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
            }`}
            onClick={() => setSelectedBilling(type as BillingTypes)}
          >
            {type === 'monthly' ? 'Monthly Billing' : 'Annual Billing'}
          </div>
        ))}
      </div>

      {/* Pricing cards */}
      <div className="pricing-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-7xl">
        <PricingCard
          planName="Freemium"
          price={0}
          billingCycle={selectedBilling}
          features={['Feature 1', 'Feature 2', 'Feature 3']}
        />
        <PricingCard
          planName="Pro"
          price={499}
          billingCycle={selectedBilling}
          features={['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5']}
        />
        <PricingCard
          planName="Enterprise"
          price={999}
          billingCycle={selectedBilling}
          features={['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5', 'Feature 6']}
        />
      </div>
    </div>
  );
};

export default Pricing;

export const PricingCard = ({
  planName,
  price,
  billingCycle,
  features,
}: {
  planName: string;
  price: number;
  billingCycle: BillingTypes;
  features: string[];
}) => {
  return (
    <div className="pricing-card flex flex-col justify-start items-center p-6 border rounded-xl shadow hover:shadow-lg transition-all w-full">
      <h4 className={`${poppinsFont.className} text-xl sm:text-2xl md:text-3xl font-semibold text-center`}>{planName}</h4>

      <h3 className={`${poppinsFont.className} text-lg sm:text-xl md:text-2xl font-semibold mt-4`}>
        ₹{price} {billingCycle === 'monthly' ? 'per month' : 'per year'}
      </h3>

      <div className="flex flex-col w-full mt-6 gap-3">
        <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-black/80 transition-all w-full">Get Started</button>
        <button className="bg-white border border-black text-black px-6 py-3 rounded-full hover:bg-black/10 transition-all w-full">Talk to sales</button>
      </div>

      <div className="divider w-full h-px bg-gray-300 my-6"></div>

      <h4 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">FEATURES</h4>
      <ul className="list-disc pl-5 space-y-2 w-full text-gray-700">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};
