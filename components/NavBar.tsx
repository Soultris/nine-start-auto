'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export function NavBar() {
  return (
    <nav className="w-full top-0 left-0 fixed right-0 z-50">
      <div className="text-white font-[montserrat]" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-left gap-3">
            <Image
              src="/logo.png"
              alt="NineStarAuto Logo"
              width={500}
              height={100}
              className="w-40 h-10"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="hover:text-brand-gold transition-colors">
              Home
            </Link>
            <Link href="#hot-deals" className="hover:text-brand-gold transition-colors">
              Hot Deals
            </Link>
            <Link href="#services" className="hover:text-brand-gold transition-colors">
              Our Services
            </Link>

            {/* Applications dropdown */}
            <div className="relative group cursor-pointer">
              <button className="hover:text-brand-gold transition-colors flex items-center gap-1">
                Applications
                <ChevronDown
                  size={16}
                  className="transition-transform group-hover:rotate-180 duration-300"
                />
              </button>

              <div
                className="absolute top-full left-0 bg-gray-800 shadow-lg z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{
                  marginTop: '6px',
                  minWidth: '208px',
                  borderRadius: '8px',
                  paddingTop: '6px',
                  paddingBottom: '6px',
                }}
              >
                <Link
                  href="/applications/credit"
                  className="block px-4 py-2 hover:bg-gray-700 hover:text-brand-gold transition-colors"
                >
                  Credit Application
                </Link>
                <Link
                  href="/applications/business"
                  className="block px-4 py-2 hover:bg-gray-700 hover:text-brand-gold transition-colors"
                >
                  Business Application
                </Link>
              </div>
            </div>

            <Link href="#about" className="hover:text-brand-gold transition-colors">
              About
            </Link>
            <Link href="#contact" className="hover:text-brand-gold transition-colors">
              Contact Us
            </Link>
          </div>

          {/* Request Quote Button */}
          <button className="bg-brand-gold text-gray-900 px-6 py-2 rounded font-semibold hover:bg-yellow-500 transition-colors duration-300">
            Request Quote
          </button>
        </div>
      </div>
    </nav>
  );
}