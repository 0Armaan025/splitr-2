'use client';
import React, { useState } from 'react';
import { Poppins } from 'next/font/google';
import TopBar from '../top-bar';

const poppinsFont = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [institution, setInstitution] = useState('');
  const [phone, setPhone] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setProfilePic(e.target.files[0]);
  };

  const handleSave = () => alert('Profile saved!');
  const handleUpdate = () => alert('Profile updated!');

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar showCurrency={true} title='Campaigns'/>
    
    <div className={`${poppinsFont.className} ml-12 min-h-screen flex justify-center items-start py-12 `}>
      <div className="w-full max-w-3xl bg-gray-50 border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-bold mb-8 text-center">Author Profile</h2>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-36 h-36 rounded-full border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] overflow-hidden flex justify-center items-center bg-gray-200 text-gray-600 font-bold text-xl mb-4">
            {profilePic ? (
              <img
                src={URL.createObjectURL(profilePic)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              'Upload'
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="cursor-pointer text-sm font-semibold"
          />
        </div>

        {/* Info Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-black rounded-lg px-4 py-3 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input
            type="text"
            placeholder="Class"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="border-2 border-black rounded-lg px-4 py-3 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input
            type="text"
            placeholder="Institution"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            className="border-2 border-black rounded-lg px-4 py-3 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-2 border-black rounded-lg px-4 py-3 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleSave}
            className="bg-black text-white font-bold px-6 py-3 rounded-xl hover:bg-black/80 transition-all shadow-[4px_4px_0_rgba(0,0,0,1)]"
          >
            Save
          </button>
          <button
            onClick={handleUpdate}
            className="bg-white border-2 border-black text-black font-bold px-6 py-3 rounded-xl hover:bg-black/10 transition-all shadow-[4px_4px_0_rgba(0,0,0,1)]"
          >
            Update
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
