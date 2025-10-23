'use client';
import React, { useState } from 'react';
import { Poppins } from 'next/font/google';

const poppinsFont = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

type BillingTypes = 'monthly' | 'annual' | 'lifetime';

type Plan = {
  planName: string;
  price: number;
  tokens: number;
  features: string[];
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    planName: 'Freemium',
    price: 0,
    tokens: 50,
    features: ['Access to core features', 'Basic analytics', 'Community support'],
  },
  {
    planName: 'Starter',
    price: 299,
    tokens: 300,
    features: ['Unlimited projects', 'Basic collaboration', 'Priority support'],
  },
  {
    planName: 'Pro',
    price: 799,
    tokens: 1000,
    features: ['Advanced collaboration', 'Custom branding', 'Team support'],
    highlight: true,
  },
  {
    planName: 'Enterprise',
    price: 1999,
    tokens: 5000,
    features: ['Dedicated account manager', 'Custom integrations', 'Premium support'],
  },
];

export default function Pricing() {
  const [selectedBilling, setSelectedBilling] = useState<BillingTypes>('monthly');

  return (
    <div className={`pricing-section flex flex-col justify-start items-center px-4 sm:px-8 lg:px-16 py-20 bg-gray-50 border-t-4 border-black ${poppinsFont.className}`}>
      <h4 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center max-w-3xl">
        We've got a plan that's&nbsp;
        <span className="text-blue-600 underline underline-offset-4 decoration-[3px]">
          perfect for you
        </span>
      </h4>

      {/* Billing toggle */}
      <div className="mt-8 flex justify-center items-center bg-white border-4 border-black rounded-full overflow-hidden shadow-[4px_4px_0_rgba(0,0,0,1)]">
        {['monthly', 'annual', 'lifetime'].map((type) => (
          <button
            key={type}
            className={`px-6 py-3 font-semibold transition-all ${selectedBilling === type ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
            onClick={() => setSelectedBilling(type as BillingTypes)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Pricing cards */}
      <div className="pricing-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14 w-full max-w-7xl">
        {plans.map((plan) => (
          <PricingCard key={plan.planName} plan={plan} billingCycle={selectedBilling} />
        ))}
      </div>
    </div>
  );
}

// ---------- PricingCard + Modal ----------
const PricingCard = ({ plan, billingCycle }: { plan: Plan; billingCycle: BillingTypes }) => {
  const { planName, price, tokens, features, highlight } = plan;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const openCheckout = async () => {
    // Freemium: instant activation
    if (price === 0) {
      grantTokens(planName, tokens);
      alert(`Freemium activated — you got ${tokens} tokens 🎉`);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/mock/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: price,
          currency: 'INR',
          planName,
          billingCycle,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setOrder(data.order);
        setIsModalOpen(true); // show simulated checkout modal
      } else {
        alert('Failed to create mock order: ' + (data.error || 'unknown'));
      }
    } catch (err: any) {
      console.error(err);
      alert('Network error creating order');
    } finally {
      setLoading(false);
    }
  };

  const completePayment = async (fakeCard: { number: string; name: string }) => {
    if (!order) return;
    setLoading(true);
    try {
      const res = await fetch('/api/mock/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          fakeCard,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // grant tokens and close modal
        grantTokens(planName, data.tokensGranted);
        alert(`Payment success! Granted ${data.tokensGranted} tokens. PaymentId: ${data.paymentId}`);
        setIsModalOpen(false);
        setOrder(null);
      } else {
        alert('Payment failed: ' + (data.error || 'unknown'));
      }
    } catch (err: any) {
      console.error(err);
      alert('Network/capture error');
    } finally {
      setLoading(false);
    }
  };

  // For demo: store tokens in localStorage
  const grantTokens = (planName: string, count: number) => {
    try {
      const key = 'mock_user_tokens';
      const cur = parseInt(localStorage.getItem(key) || '0', 10);
      localStorage.setItem(key, String(cur + count));
      console.log(`Granted ${count} tokens for ${planName}. Total: ${cur + count}`);
    } catch (e) {
      console.warn('localStorage unavailable');
    }
  };

  return (
    <>
      <div
        className={`pricing-card flex flex-col justify-start items-center p-8 rounded-xl border-4 border-black transition-all duration-200 shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_rgba(0,0,0,1)] ${highlight ? 'bg-yellow-200' : 'bg-white'}`}
      >
        <h4 className="text-2xl font-bold text-center">{planName}</h4>
        <h3 className="text-3xl font-semibold mt-4">
          ₹{price}{' '}
          <span className="text-base font-normal text-gray-700">
            {billingCycle === 'monthly' ? '/month' : billingCycle === 'annual' ? '/year' : '/lifetime'}
          </span>
        </h3>
        <h4 className="text-2xl mt-2 font-bold">{tokens} Tokens</h4>

        <div className="flex flex-col w-full mt-8 gap-3">
          <button
            onClick={openCheckout}
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-black/80 transition-all w-full border-2 border-black disabled:opacity-60"
          >
            {loading ? 'Processing...' : 'Get Started'}
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

      {/* Simulated Checkout Modal */}
      {isModalOpen && order && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white rounded-lg border-4 border-black p-6 shadow-[8px_8px_0_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-black mb-2">Mock Checkout</h3>
            <p className="text-sm text-gray-700 mb-4">Order: <strong>{order.id}</strong> — ₹{order.amount} {order.currency}</p>

            <div className="space-y-3">
              <label className="block">
                <span className="text-sm font-semibold">Card number (mock)</span>
                <input defaultValue="4242 4242 4242 4242" className="mt-1 w-full border-2 border-black p-2 rounded" />
              </label>

              <label className="block">
                <span className="text-sm font-semibold">Name on card</span>
                <input defaultValue="Test User" className="mt-1 w-full border-2 border-black p-2 rounded" />
              </label>

              <div className="flex gap-2">
                <input defaultValue="12/34" className="w-1/2 border-2 border-black p-2 rounded" />
                <input defaultValue="123" className="w-1/2 border-2 border-black p-2 rounded" />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  // read inputs (very basic)
                  const inputs = document.querySelectorAll('input');
                  const fakeCard = {
                    number: (inputs[0] as HTMLInputElement).value,
                    name: (inputs[1] as HTMLInputElement).value,
                    expiry: (inputs[2] as HTMLInputElement).value,
                  };
                  completePayment(fakeCard);
                }}
                className="flex-1 bg-black text-white py-3 rounded-full border-2 border-black"
                disabled={loading}
              >
                {loading ? 'Processing...' : `Pay ₹${order.amount}`}
              </button>

              <button
                onClick={() => { setIsModalOpen(false); setOrder(null); }}
                className="flex-1 bg-white text-black py-3 rounded-full border-2 border-black"
                disabled={loading}
              >
                Cancel
              </button>
            </div>

            <p className="mt-4 text-xs text-gray-500">This is a simulated checkout for development/demo purposes only.</p>
          </div>
        </div>
      )}
    </>
  );
};
