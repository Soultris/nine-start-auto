'use client';

import { DollarSign, CarFront, Zap, PiggyBank } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="w-full font-[montserrat]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left Content Section */}
        <div className="flex flex-col items-center sm:items-start gap-6 sm:gap-8 lg:gap-10 w-full lg:max-w-5xl">
          {/* Main Heading */}
          <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
              GET INTO YOUR VEHICLE{' '}
              <span className="text-brand-gold">TODAY</span>
            </h1>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-2 sm:mb-4 lg:mb-5">
              ANY <span className="text-brand-gold">MAKE</span> OR{' '}
              <span className="text-brand-gold">MODEL</span>
            </h2>
          </div>

          {/* Feature Boxes Grid */}
          <div className="grid grid-cols-2 w-full max-w-sm sm:max-w-md gap-4 sm:gap-6 mx-auto sm:mx-0">
            {/* 0$ Down Payment */}
            <div className="bg-card-dark/80 px-4 py-3 sm:px-6 sm:py-4.5 rounded-2xl flex flex-col items-center sm:items-start">
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-white mb-2 sm:mb-3 font-medium" />
              <h3 className="text-white text-center text-base sm:text-lg font-medium mb-0.5">
                0$
              </h3>
              <p className="text-gray-400 text-center text-xs sm:text-sm font-normal">
                Down Payment
              </p>
            </div>

            {/* Any Make */}
            <div className="bg-card-dark/80 px-4 py-3 sm:px-6 sm:py-4.5 rounded-2xl flex flex-col items-center sm:items-start">
              <CarFront className="w-6 h-6 sm:w-8 sm:h-8 text-white mb-2 sm:mb-3 font-medium" />
              <h3 className="text-white text-base sm:text-lg font-medium mb-0.5">
                Any Make
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm font-normal">
                All Brands Available
              </p>
            </div>

            {/* Fast Approval */}
            <div className="bg-card-dark/80 px-4 py-3 sm:px-6 sm:py-4.5 rounded-2xl flex flex-col items-center sm:items-start">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white mb-2 sm:mb-3 font-medium" />
              <h3 className="text-white text-center text-base sm:text-lg font-medium mb-0.5">
                Fast Approval
              </h3>
              <p className="text-gray-400 text-center text-xs sm:text-sm font-normal">
                Quick &amp; easy process
              </p>
            </div>

            {/* Best Deals */}
            <div className="bg-card-dark/80 px-4 py-3 sm:px-6 sm:py-4.5 rounded-2xl flex flex-col items-center sm:items-start">
              <PiggyBank className="w-6 h-6 sm:w-8 sm:h-8 text-white mb-2 sm:mb-3 font-medium" />
              <h3 className="text-white text-center text-base sm:text-lg font-medium mb-0.5">
                Best Deals
              </h3>
              <p className="text-gray-400 text-center text-xs sm:text-sm font-normal">
                Competitive pricing
              </p>
            </div>
          </div>

          {/* Request Quote Button */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-instant-quote'))}
            className="bg-brand-gold hover:bg-brand-gold-hover text-black font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded w-fit text-sm transition-all active:scale-95 cursor-pointer"
          >
            Request Quote
          </button>
        </div>

        {/* Right side - Car image is background */}
        <div className="hidden lg:flex flex-1" />
      </div>
    </div>
  );
}