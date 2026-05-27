'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function NavBar() {
  const [isApplicationsOpen, setIsApplicationsOpen] = useState(false);

  return (
    <nav className="bg-black text-white font-[montserrat]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo and Company Name */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="NineStarAuto Logo"
            width={500}
            height={100}
            className="w-40 h-10"
          />
          {/* <span className="text-xl font-bold text-yellow-400">NineStarAuto</span> */}
        </div>

        {/* Navigation Menu */}
        <div className="flex items-center gap-8">
          <Link href="/" className="hover:text-[##D4AC1D] transition-colors">
            Home
          </Link>
          <Link href="/hot-deals" className="hover:text-[#D4AC1D] transition-colors">
            Hot Deals
          </Link>
          <Link href="/services" className="hover:text-[#D4AC1D] transition-colors">
            Our Services
          </Link>
          <div className="relative">
            <button
              onClick={() => setIsApplicationsOpen(!isApplicationsOpen)}
              className="hover:text-[#D4AC1D] transition-colors flex items-center gap-1"
            >
              Applications
              <ChevronDown size={16} className={`transition-transform ${isApplicationsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isApplicationsOpen && (
              <div className="absolute top-full left-0 mt-2 bg-gray-800 rounded shadow-lg py-2 min-w-52 z-50">
                <Link
                  href="/applications/credit"
                  className="block px-4 py-2 hover:bg-gray-700 hover:text-[#D4AC1D] transition-colors"
                  onClick={() => setIsApplicationsOpen(false)}
                >
                  Credit Application
                </Link>
                <Link
                  href="/applications/business"
                  className="block px-4 py-2 hover:bg-gray-700 hover:text-[#D4AC1D] transition-colors"
                  onClick={() => setIsApplicationsOpen(false)}
                >
                  Business Application
                </Link>
              </div>
            )}
          </div>
          <Link href="/about" className="hover:text-[#D4AC1D] transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-[#D4AC1D] transition-colors">
            Contact Us
          </Link>
        </div>

        {/* Request Quote Button */}
        <button className="bg-[#D4AC1D] text-gray-900 px-6 py-2 rounded font-semibold hover:bg-yellow-500 transition-colors">
          Request Quote
        </button>
      </div>
    </nav>
  );
}
