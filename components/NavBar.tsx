'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import InstantQuote from './Pop-ups/instantQuote';

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [applicationsOpen, setApplicationsOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setApplicationsOpen(false);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeMenu]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = (
    <>
      <Link
        href="/"
        onClick={closeMenu}
        className="hover:text-yellow-400 transition-colors duration-200 whitespace-nowrap"
      >
        Home
      </Link>
      <Link
        href="#hot-deals"
        onClick={closeMenu}
        className="hover:text-yellow-400 transition-colors duration-200 whitespace-nowrap"
      >
        Hot Deals
      </Link>
      <Link
        href="#services"
        onClick={closeMenu}
        className="hover:text-yellow-400 transition-colors duration-200 whitespace-nowrap"
      >
        Our Services
      </Link>
    </>
  );

  return (
    <>
      <nav className="w-full top-0 left-0 fixed right-0 z-50">
        <div
          className={`text-white font-[montserrat] transition-all duration-300 ${
            isScrolled ? 'bg-black shadow-md' : 'bg-transparent'
          }`}
        >
          <div
            className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ${
              isScrolled ? 'py-3' : 'py-5 sm:py-6'
            }`}
          >

            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="NineStarAuto Logo"
                width={500}
                height={100}
                className={`object-contain transition-all duration-300 ${
                  isScrolled ? 'w-28 h-7 md:w-36 md:h-9' : 'w-32 h-8 md:w-40 md:h-10'
                }`}
              />
            </div>

            {/* Desktop Navigation Links — hidden on mobile */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm xl:text-base">
              {navLinks}

              {/* Applications Dropdown */}
              <div className="relative group cursor-pointer">
                <button
                  className="hover:text-yellow-400 transition-colors duration-200 flex items-center gap-1 whitespace-nowrap"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Applications
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-300 group-hover:rotate-180"
                  />
                </button>

                <div
                  className="absolute top-full left-0 bg-gray-900 border border-gray-700 shadow-xl z-50
                    invisible group-hover:visible opacity-0 group-hover:opacity-100
                    translate-y-1 group-hover:translate-y-0
                    transition-all duration-300 ease-in-out
                    mt-1.5 min-w-[210px] rounded-lg py-1.5"
                >
                  <Link
                    href="/applications/credit"
                    className="block px-4 py-2.5 text-sm hover:bg-gray-800 hover:text-yellow-400 transition-colors duration-150"
                  >
                    Credit Application
                  </Link>
                  <Link
                    href="/applications/business"
                    className="block px-4 py-2.5 text-sm hover:bg-gray-800 hover:text-yellow-400 transition-colors duration-150"
                  >
                    Business Application
                  </Link>
                </div>
              </div>

              <Link
                href="#about"
                className="hover:text-yellow-400 transition-colors duration-200 whitespace-nowrap"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="hover:text-yellow-400 transition-colors duration-200 whitespace-nowrap"
              >
                Contact Us
              </Link>
            </div>

            {/* Desktop Request Quote — hidden on mobile */}
            <div className="hidden lg:block flex-shrink-0">
              <button
                onClick={() => setQuoteOpen(true)}
                className="bg-brand-gold hover:bg-yellow-600 text-black py-2.5 sm:py-3 px-6 sm:px-8 rounded font-semibold text-sm transition-colors active:scale-95"
              >
                Request Quote
              </button>
            </div>

            {/* Hamburger — visible on mobile/tablet only */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-yellow-400" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      />

      {/* Slide-in Mobile Menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`lg:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] z-50 bg-gray-950 border-l border-gray-800 shadow-2xl
          flex flex-col transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800 bg-black">
          <Image
            src="/logo.png"
            alt="NineStarAuto Logo"
            width={500}
            height={100}
            className="w-28 h-7 object-contain"
          />
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="p-2 rounded-md hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <X size={20} className="text-yellow-400" />
          </button>
        </div>

        {/* Mobile Nav Links */}
        <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-1 font-[montserrat]">
          <Link
            href="/"
            onClick={closeMenu}
            className="block px-3 py-3 rounded-md text-white hover:bg-gray-800 hover:text-yellow-400 transition-colors duration-150"
          >
            Home
          </Link>
          <Link
            href="#hot-deals"
            onClick={closeMenu}
            className="block px-3 py-3 rounded-md text-white hover:bg-gray-800 hover:text-yellow-400 transition-colors duration-150"
          >
            Hot Deals
          </Link>
          <Link
            href="#services"
            onClick={closeMenu}
            className="block px-3 py-3 rounded-md text-white hover:bg-gray-800 hover:text-yellow-400 transition-colors duration-150"
          >
            Our Services
          </Link>

          {/* Applications Accordion */}
          <div>
            <button
              onClick={() => setApplicationsOpen((prev) => !prev)}
              aria-expanded={applicationsOpen}
              className="w-full flex items-center justify-between px-3 py-3 rounded-md text-white hover:bg-gray-800 hover:text-yellow-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-inset"
            >
              <span>Applications</span>
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${applicationsOpen ? 'rotate-180 text-yellow-400' : ''}`}
              />
            </button>

            {/* Accordion Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${applicationsOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <div className="mt-1 ml-3 border-l-2 border-yellow-400/40 pl-3 space-y-1">
                <Link
                  href="/applications/credit"
                  onClick={closeMenu}
                  className="block px-3 py-2.5 rounded-md text-gray-300 hover:bg-gray-800 hover:text-yellow-400 text-sm transition-colors duration-150"
                >
                  Credit Application
                </Link>
                <Link
                  href="/applications/business"
                  onClick={closeMenu}
                  className="block px-3 py-2.5 rounded-md text-gray-300 hover:bg-gray-800 hover:text-yellow-400 text-sm transition-colors duration-150"
                >
                  Business Application
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="#about"
            onClick={closeMenu}
            className="block px-3 py-3 rounded-md text-white hover:bg-gray-800 hover:text-yellow-400 transition-colors duration-150"
          >
            About
          </Link>
          <Link
            href="#contact"
            onClick={closeMenu}
            className="block px-3 py-3 rounded-md text-white hover:bg-gray-800 hover:text-yellow-400 transition-colors duration-150"
          >
            Contact Us
          </Link>
        </nav>

        {/* Request Quote — bottom of mobile menu */}
        <div className="px-5 py-5 border-t border-gray-800 bg-black/50">
          <button
            onClick={() => { closeMenu(); setQuoteOpen(true); }}
            className="w-full bg-brand-gold hover:bg-yellow-600 text-black py-2.5 sm:py-3 px-6 sm:px-8 rounded font-semibold text-sm transition-colors active:scale-95"
          >
            Request Quote
          </button>
        </div>
      </div>

      {/* Instant Quote Popup */}
      <InstantQuote isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}