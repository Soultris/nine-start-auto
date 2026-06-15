'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

export function NavBar() {
  const [isApplicationsOpen, setIsApplicationsOpen] = useState(false);

  // Scroll-driven UI states
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const lastScrollYRef = useRef<number>(0);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const hoverHideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const DIRECTION_DEADZONE = 16;

  useEffect(() => {
    lastScrollYRef.current = window.scrollY || 0;
    let ticking = false;

    const onScroll = () => {
      const run = () => {
        const y = window.scrollY;
        const scrolled = y > 0;
        const scrolledDown = y > 100;

        let direction: 'up' | 'down' | null = null;
        if (y > lastScrollYRef.current + DIRECTION_DEADZONE) direction = 'down';
        else if (y < lastScrollYRef.current - DIRECTION_DEADZONE) direction = 'up';

        lastScrollYRef.current = y;
        setIsScrolled(scrolled);
        setIsScrolledDown(scrolledDown);

        if (!scrolledDown) {
          if (direction === 'down') setShowNav(false);
        } else {
          if (direction === 'down') setShowNav(false);
          else if (direction === 'up') setShowNav(true);
        }
        ticking = false;
      };

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(run);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (hoverHideTimeoutRef.current) {
      clearTimeout(hoverHideTimeoutRef.current);
      hoverHideTimeoutRef.current = null;
    }
    setShowNav(true);
  }, []);

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      if (!navContainerRef.current) return;

      try {
        const relatedTarget = e.relatedTarget as Node | null;
        if (relatedTarget && navContainerRef.current.contains(relatedTarget)) return;

        hoverHideTimeoutRef.current = setTimeout(() => {
          if (isScrolledDown) setShowNav(false);
        }, 200);
      } catch {
        hoverHideTimeoutRef.current = setTimeout(() => {
          if (isScrolledDown) setShowNav(false);
        }, 200);
      }
    },
    [isScrolledDown]
  );

  useEffect(() => {
    return () => {
      if (hoverHideTimeoutRef.current) clearTimeout(hoverHideTimeoutRef.current);
    };
  }, []);

  const barBgClasses = isScrolled
    ? isScrolledDown && !showNav
      ? 'bg-transparent'
      : 'bg-black/80 backdrop-blur-md'
    : 'bg-black';

  const navVisibilityClasses = showNav
    ? 'opacity-100 translate-y-0 pointer-events-auto'
    : 'opacity-0 -translate-y-3 pointer-events-none';

  return (
    <nav
      ref={navContainerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full top-0 left-0 fixed right-0 z-50"
    >
      <div
        className={`${barBgClasses} text-white font-[montserrat] transition-all duration-300`}
      >
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

          {/* Navigation Menu */}
          <div
            className={`flex items-center gap-8 transition-all duration-300 ${navVisibilityClasses}`}
          >
            <Link href="/" className="hover:text-brand-gold transition-colors">
              Home
            </Link>
            <Link href="/hot-deals" className="hover:text-brand-gold transition-colors">
              Hot Deals
            </Link>
            <Link href="/services" className="hover:text-brand-gold transition-colors">
              Our Services
            </Link>

            {/* Applications dropdown — hover-driven like Co Spaces */}
            <div className="relative group hover:cursor-pointer">
              <button className="hover:text-brand-gold transition-colors flex items-center gap-1 peer">
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

            <Link href="/about" className="hover:text-brand-gold transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-brand-gold transition-colors">
              Contact Us
            </Link>
          </div>

          {/* Request Quote Button */}
          <button
            className={`bg-brand-gold text-gray-900 px-6 py-2 rounded font-semibold hover:bg-yellow-500 transition-colors duration-300 ${navVisibilityClasses}`}
          >
            Request Quote
          </button>
        </div>
      </div>
    </nav>
  );
}