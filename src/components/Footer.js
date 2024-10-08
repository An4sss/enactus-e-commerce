"use client";
import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError('Email is required');
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
      // Handle the email submission logic here
      console.log('Email submitted:', email);
    }
  };

  return (
    <footer className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h3 className="text-base font-semibold text-black">NEWS</h3>
          <ul className="mt-4">
            <li><a href="#" className="text-sm text-black hover:text-gray-900">Search</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-semibold text-black">HOW TO ORDER</h3>
          <ul className="mt-4">
            <li><a href="#" className="text-sm text-black hover:text-gray-900">Search</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-semibold text-black">WHO ARE WE</h3>
          <p className="mt-4 text-sm text-black">Legend generation.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-base font-semibold text-black">Subscribe to our emails</h3>
            <form onSubmit={handleEmailSubmit} className="mt-4 flex">
              <input 
                type="email" 
                value={email}
                onChange={handleEmailChange}
                placeholder="Email" 
                className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-amber-400 text-white rounded-r-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                →
              </button>
            </form>
            {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
          </div>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/profile.php?id=61562255585939" className="text-black hover:text-gray-600">
              <FaFacebookF className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/enactus_isima?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-black hover:text-gray-600">
              <FaInstagram className="h-6 w-6" />
            </a>
            <a href="https://www.tiktok.com/@enactus.isima?_t=8pASTBLG9Xp&_r=1" className="text-black hover:text-gray-600">
              <FaTiktok className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 text-center text-sm text-black">
        © 2024, Enactus Web Site 
      </div>
    </footer>
  );
};

export default Footer;