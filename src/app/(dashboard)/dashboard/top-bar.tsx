import React from "react";
import { Poppins } from "next/font/google";
import { Coins, CoinsIcon } from "lucide-react";

interface TopBarProps {
  title: string;
  showCurrency: boolean;
  currencyAmount?: number;
  username?: string;
}

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

const TopBar = ({
  title,
  showCurrency,
  currencyAmount = 700,
  username = "Armaan",
}: TopBarProps) => {
  return (
    <div
      className={`${poppins.className} w-[78vw] flex flex-col sm:flex-row justify-between items-center bg-white border-b border-gray-200 px-6 py-4`}
    >
      {/* Left section: Page Title */}
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
        {title}
      </h3>

      {/* Right section: Currency + Name */}
      <div className="flex flex-row items-center gap-6 mt-3 sm:mt-0">
        {/* Currency */}
        {showCurrency && (
          <div className="flex items-center gap-2 text-gray-700 border border-gray-300 rounded-lg px-4 py-2">
            <span className="font-medium">{currencyAmount}</span>
            <span className="text-sm text-gray-500"><CoinsIcon color="green"/></span>
          </div>
        )}

        {/* User name */}
        <div className="text-gray-800 font-medium">{username}</div>
      </div>
    </div>
  );
};

export default TopBar;
