"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoMdSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

const Navbar = ({ aboutUsRef }) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const handleClick = () => {
    router.push('/my_Cart');
  };

  return (
    <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-20 py-4 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80' : 'bg-white shadow-md'}`}>
      <div className="flex items-center">
        <Link href="/">
          <img
            src="/enactus_isima_logo_white.png"
            alt="Logo"
            className="h-12 w-12 md:h-16 md:w-16"
            style={{ transform: 'scale(2.2)', marginLeft: '20px', marginRight: 'auto' }}
          />
        </Link>
      </div>

      <div className="flex space-x-4 md:space-x-8" style={{ marginBottom: '-20px' }}>
        <Link href="/" className="relative text-base text-black md:text-lg font-medium group">
          Home
          <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
        </Link>
        <button
          onClick={() => scrollToSection(aboutUsRef)}
          className="relative text-base text-black md:text-lg font-medium group"
        >
          About Us
          <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
        </button>
        <Link href="https://www.facebook.com/profile.php?id=61562255585939" className="relative text-base text-black md:text-lg font-medium group">
          Contact
          <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
        </Link>
      </div>

      <div className="flex space-x-8 items-center" style={{ marginBottom: '-20px' }}>
      <IoCartOutline
      className="h-5 w-5 md:h-6 md:w-6 cursor-pointer hover:text-[#FEA836] transition-colors duration-300"
      onClick={handleClick}
    />
        <FaRegCircleUser className='h-5 w-5 md:h-6 md:w-6 cursor-pointer hover:text-[#FEA836] transition-colors duration-300' />
        <IoMdSearch className='h-5 w-5 md:h-6 md:w-6 cursor-pointer hover:text-[#FEA836] transition-colors duration-300' />
      </div>
    </nav>
  );
};

export default Navbar;