'use client';
import React from 'react';
import { Poppins } from 'next/font/google';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const poppinsFont = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

interface GraphCardsProps {
  pieData: { labels: string[]; values: number[] };
  barData: { labels: string[]; values: number[] };
}

const GraphCards = ({ pieData, barData }: GraphCardsProps) => {
  const pieChartData = {
    labels: pieData.labels,
    datasets: [
      {
        label: 'Users by Area',
        data: pieData.values,
        backgroundColor: ['#3b82f6', '#facc15', '#10b981', '#ef4444', '#8b5cf6'],
        borderWidth: 2,
        borderColor: '#000',
      },
    ],
  };

  const barChartData = {
    labels: barData.labels,
    datasets: [
      {
        label: 'Other Data',
        data: barData.values,
        backgroundColor: '#3b82f6',
        borderColor: '#000',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
plugins: {
      legend: { labels: { color: '#000', font: { weight: 'bold' } } },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="wrapper w-full max-w-7xl ml-14">
    <div className={`${poppinsFont.className} mt-8 flex flex-col lg:flex-row gap-6 w-full px-4 sm:px-8 lg:px-0`}>
      {/* Pie Chart Card */}
      <div className="flex-1 p-6 bg-white border-4 border-black rounded-xl shadow-[6px_6px_0_rgba(0,0,0,1)]">
        <h3 className="text-xl font-bold mb-4 text-center">Users by Area</h3>
        <div className="h-64">
          <Pie data={pieChartData} options={chartOptions as any} />
        </div>
      </div>

      {/* Bar Chart Card */}
      <div className="flex-1 p-6 bg-white border-4 border-black rounded-xl shadow-[6px_6px_0_rgba(0,0,0,1)]">
        <h3 className="text-xl font-bold mb-4 text-center">Other Data</h3>
        <div className="h-64">
          <Bar data={barChartData} options={chartOptions as any} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default GraphCards;
