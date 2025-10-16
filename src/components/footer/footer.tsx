// Footer.tsx
'use client';
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="text-center text-gray-500 py-4 text-sm">
      All rights reserved, © Splitr {year}
    </footer>
  );
};

export default Footer;
