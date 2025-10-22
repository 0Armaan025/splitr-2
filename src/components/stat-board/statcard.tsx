'use client';
import React from 'react';
import { Poppins } from 'next/font/google';

const poppinsFont = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

type UnitType = 'lak' | 'tho' | 'cro' | 'hun';

interface StatCardProps {
  title: string;
  statNow: number;
  isPercent?: boolean;
  unitType?: UnitType;
}

const StatCard = ({ title, statNow, isPercent = false, unitType }: StatCardProps) => {
  const getFormattedStat = () => {
    if (isPercent) return `${statNow.toFixed(1)}%`;
    if (unitType) {
      switch (unitType) {
        case 'lak':
          return `${statNow.toFixed(1)} Lak`;
        case 'tho':
          return `${statNow.toFixed(1)} Tho`;
        case 'cro':
          return `${statNow.toFixed(1)} Cro`;
        case 'hun':
          return `${statNow.toFixed(1)} Hun`;
        default:
          return statNow.toFixed(1);
      }
    }
    return statNow.toFixed(1);
  };

  return (
    <div
      className={`${poppinsFont.className} stat-card w-[15rem] sm:w-[18rem] h-[10rem] bg-white border-4 border-black rounded-xl 
      flex flex-col justify-between p-5 transition-all duration-200 
      shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] 
      hover:shadow-[3px_3px_0_rgba(0,0,0,1)] cursor-grab active:cursor-grabbing`}
    >
      <div className="flex justify-between items-center">
        <h4 className="text-lg sm:text-xl font-semibold text-black">{title}</h4>
      </div>

      <h3 className="text-3xl sm:text-4xl font-bold text-black mt-2">{getFormattedStat()}</h3>

      <div className="text-xs text-gray-600 italic mt-2">Drag to reorder</div>
    </div>
  );
};

export default StatCard;
