'use client';
import React, { useState } from 'react';
import { Gift, Check, X, Sparkles, Coins, Clock, AlertCircle } from 'lucide-react';

interface RedeemedCode {
  code: string;
  tokens: number;
  redeemedAt: string;
}

const GiftCodePage = () => {
  const [giftCode, setGiftCode] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | null; text: string }>({ 
    type: null, 
    text: '' 
  });
  const [redeemedCodes, setRedeemedCodes] = useState<RedeemedCode[]>([
    {
      code: 'WELCOME2024',
      tokens: 500,
      redeemedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      code: 'CREATOR100',
      tokens: 1000,
      redeemedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    },
  ]);

  const validCodes: { [key: string]: number } = {
    'UPES': 5000,
    'WELCOME': 500,
    'BONUS2024': 1000,
    'CREATOR': 2000,
  };

  const handleRedeem = () => {
    const upperCode = giftCode.toUpperCase().trim();
    
    if (!upperCode) {
      setMessage({ type: 'error', text: 'Please enter a gift code!' });
      return;
    }

    // Check if already redeemed
    if (redeemedCodes.some(rc => rc.code === upperCode)) {
      setMessage({ type: 'error', text: 'You have already redeemed this code!' });
      return;
    }

    setIsRedeeming(true);

    // Simulate API call
    setTimeout(() => {
      if (validCodes[upperCode]) {
        const tokens = validCodes[upperCode];
        setRedeemedCodes([
          {
            code: upperCode,
            tokens,
            redeemedAt: new Date().toISOString(),
          },
          ...redeemedCodes,
        ]);
        setMessage({ 
          type: 'success', 
          text: `🎉 Success! You received ${tokens.toLocaleString()} tokens!` 
        });
        setGiftCode('');
      } else {
        setMessage({ type: 'error', text: 'Invalid gift code. Please try again!' });
      }
      setIsRedeeming(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRedeem();
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-black mb-4 bg-yellow-300 inline-block px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            GIFT CODES
          </h1>
          <p className="text-lg font-bold mt-4">Redeem gift codes to unlock free tokens</p>
        </div>

        {/* Redeem Card */}
        <div className="mb-8 bg-gradient-to-br from-purple-300 to-pink-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
          <div className="flex items-center gap-3 mb-6">
            <Gift className="w-10 h-10" />
            <h2 className="text-3xl font-black">REDEEM CODE</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-black uppercase block mb-2">Enter Gift Code</label>
              <input
                type="text"
                value={giftCode}
                onChange={(e) => setGiftCode(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="UPES"
                className="w-full px-4 py-4 border-4 border-black font-bold text-xl uppercase focus:outline-none focus:ring-4 focus:ring-yellow-300"
                disabled={isRedeeming}
              />
            </div>

            <button
              onClick={handleRedeem}
              disabled={isRedeeming}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-black text-white border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] disabled:translate-x-0 disabled:translate-y-0"
            >
              {isRedeeming ? (
                <>
                  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  REDEEMING...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  REDEEM NOW
                </>
              )}
            </button>

            {/* Message */}
            {message.type && (
              <div
                className={`flex items-start gap-3 p-4 border-4 border-black font-bold ${
                  message.type === 'success' ? 'bg-green-300' : 'bg-red-300'
                }`}
              >
                {message.type === 'success' ? (
                  <Check className="w-6 h-6 flex-shrink-0" />
                ) : (
                  <X className="w-6 h-6 flex-shrink-0" />
                )}
                <p>{message.text}</p>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mb-8 bg-blue-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-black mb-2">HOW IT WORKS</h3>
              <ul className="space-y-2 font-bold">
                <li>• Enter your gift code in the box above</li>
                <li>• Click "Redeem Now" to claim your tokens</li>
                <li>• Each code can only be redeemed once</li>
                <li>• Tokens are added instantly to your account</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Redeemed Codes History */}
        <div>
          <h2 className="text-3xl font-black mb-6 flex items-center gap-2">
            <Clock className="w-8 h-8" />
            REDEEMED CODES
          </h2>
          
          {redeemedCodes.length === 0 ? (
            <div className="bg-gray-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
              <Gift className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-xl font-black mb-2">NO CODES REDEEMED YET</p>
              <p className="font-bold text-gray-600">Enter your first gift code to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {redeemedCodes.map((redemption, index) => (
                <div
                  key={index}
                  className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-300 border-4 border-black flex items-center justify-center">
                      <Check className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xl font-black">{redemption.code}</p>
                      <p className="text-sm font-bold text-gray-600">
                        {new Date(redemption.redeemedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-yellow-300 border-4 border-black">
                    <Coins className="w-5 h-5" />
                    <span className="text-xl font-black">+{redemption.tokens.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Available Codes Hint (for demo purposes) */}
        <div className="mt-8 bg-yellow-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
          <h3 className="text-xl font-black mb-3">🎁 TRY THESE CODES:</h3>
          <div className="flex flex-wrap gap-3">
            {Object.keys(validCodes)
              .filter(code => !redeemedCodes.some(rc => rc.code === code))
              .map(code => (
                <button
                  key={code}
                  onClick={() => setGiftCode(code)}
                  className="px-4 py-2 bg-white border-2 border-black font-black text-sm hover:bg-black hover:text-white transition-colors"
                >
                  {code}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCodePage;