'use client';
import React, { useState } from 'react';
import { Poppins } from 'next/font/google';
import TopBar from '../top-bar';

const poppinsFont = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

interface Campaign {
  id: number;
  name: string;
  book: string;
  duration: string;
  region: string;
  forwards: number;
  status: 'Active' | 'Paused' | 'Completed' | 'Verification Left';
}

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 1,
      name: 'Launch Promo',
      book: 'Book A',
      duration: '7 days',
      region: 'North',
      forwards: 120,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Summer Special',
      book: 'Book B',
      duration: '14 days',
      region: 'South',
      forwards: 250,
      status: 'Paused',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    book: '',
    duration: '',
    region: '',
    forwards: 0,
  });

  const handleAddCampaign = () => {
    const id = campaigns.length ? campaigns[campaigns.length - 1].id + 1 : 1;
    setCampaigns([
      ...campaigns,
      { ...newCampaign, id, status: 'Verification Left' as Campaign['status'] },
    ]);
    setShowModal(false);
    setNewCampaign({ name: '', book: '', duration: '', region: '', forwards: 0 });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter((c) => c.id !== id));
    }
  };

  const handleRefund = (id: number) => {
    alert(`Refund processed for campaign ID: ${id}`);
  };

  return (
    <div className='flex flex-col min-h-screen'>
    <TopBar showCurrency={true} title='Campaigns'/>
    <div className={`${poppinsFont.className} min-h-screen p-6`}>
        
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Campaigns</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-4 py-2 rounded-xl hover:bg-black/80 transition-all shadow-[4px_4px_0_rgba(0,0,0,1)]"
        >
          Add Campaign
        </button>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white border-4 border-black rounded-xl overflow-x-auto shadow-[6px_6px_0_rgba(0,0,0,1)]">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-100 border-b-2 border-black">
            <tr>
              <th className="px-4 py-2 border-r-2 border-black">#</th>
              <th className="px-4 py-2 border-r-2 border-black">Name</th>
              <th className="px-4 py-2 border-r-2 border-black">Book</th>
              <th className="px-4 py-2 border-r-2 border-black">Duration</th>
              <th className="px-4 py-2 border-r-2 border-black">Region</th>
              <th className="px-4 py-2 border-r-2 border-black">Forwards</th>
              <th className="px-4 py-2 border-r-2 border-black">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-200/80 transition-all border-b border-black cursor-pointer ">
                <td className="px-4 py-2 border-r-2 border-black">{campaign.id}</td>
                <td className="px-4 py-2 border-r-2 border-black">{campaign.name}</td>
                <td className="px-4 py-2 border-r-2 border-black">{campaign.book}</td>
                <td className="px-4 py-2 border-r-2 border-black">{campaign.duration}</td>
                <td className="px-4 py-2 border-r-2 border-black">{campaign.region}</td>
                <td className="px-4 py-2 border-r-2 border-black">{campaign.forwards}</td>
                <td className="px-4 py-2 border-r-2 border-black">{campaign.status}</td>
                <td className="px-4 py-2 flex gap-2 justify-center items-center flex-row">
                  <button
                    onClick={() => handleDelete(campaign.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-all text-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleRefund(campaign.id)}
                    className="bg-yellow-400 text-black px-2 py-1 rounded-lg hover:bg-yellow-300 transition-all text-sm"
                  >
                    Refund
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Campaign Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-gray-50 border-4 border-black rounded-xl p-6 w-full max-w-md shadow-[6px_6px_0_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-bold mb-4">Add New Campaign</h3>

            <div className="flex flex-col gap-3 mb-4">
              <input
                type="text"
                placeholder="Campaign Name"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                className="border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <select
                value={newCampaign.book}
                onChange={(e) => setNewCampaign({ ...newCampaign, book: e.target.value })}
                className="border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="">Select Book</option>
                <option value="Book A">Book A</option>
                <option value="Book B">Book B</option>
                <option value="Book C">Book C</option>
              </select>
              <input
                type="text"
                placeholder="Duration (e.g., 7 days)"
                value={newCampaign.duration}
                onChange={(e) => setNewCampaign({ ...newCampaign, duration: e.target.value })}
                className="border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <input
                type="text"
                placeholder="Region"
                value={newCampaign.region}
                onChange={(e) => setNewCampaign({ ...newCampaign, region: e.target.value })}
                className="border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <input
                type="number"
                placeholder="Number of People to Forward"
                value={newCampaign.forwards}
                onChange={(e) => setNewCampaign({ ...newCampaign, forwards: Number(e.target.value) })}
                className="border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-white border-2 border-black px-4 py-2 rounded-xl hover:bg-black/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCampaign}
                className="bg-black text-white px-4 py-2 rounded-xl hover:bg-black/80 transition-all"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default CampaignsPage;
