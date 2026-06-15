

import { DollarSign, CarFront, Zap, PiggyBank } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="w-full font-[montserrat] mt-20">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left Content Section */}
        <div className="flex flex-col gap-10 max-w-5xl">
          {/* Main Heading */}
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-normal text-white leading-tight">
              GET INTO YOUR VEHICLE <span className="text-brand-gold">TODAY</span>
            </h1>
            <h2 className="text-5xl font-normal text-white mb-5">
              ANY <span className="text-brand-gold">MAKE</span> OR <span className="text-brand-gold">MODEL</span>
            </h2>
          </div>

          {/* Feature Boxes Grid */}
          <div className="grid grid-cols-2 max-w-sm gap-3.5">
            {/* 0$ Down Payment */}
            <div className="bg-card-dark/80 p-3 rounded-2xl flex flex-col items-start">
              <DollarSign className="w-8 h-8 text-white mb-1.5" />
              <h3 className="text-white text-lg font-semibold mb-1">0$</h3>
              <p className="text-gray-400 text-sm">Down Payment</p>
            </div>

            {/* Any Make */}
            <div className="bg-card-dark/80 p-3 rounded-2xl flex flex-col items-start">
              <CarFront className="w-8 h-8 text-white mb-1.5" />
              <h3 className="text-white text-lg font-semibold mb-1">Any Make</h3>
              <p className="text-gray-400 text-sm">All Brands Available</p>
            </div>

            {/* Fast Approval */}
            <div className="bg-card-dark/80 p-3 rounded-2xl flex flex-col items-start">
              <Zap className="w-8 h-8 text-white mb-1.5" />
              <h3 className="text-white text-lg font-semibold mb-1">Fast Approval</h3>
              <p className="text-gray-400 text-sm">Quick & easy process</p>
            </div>

            {/* Best Deals */}
            <div className="bg-card-dark/80 p-3 rounded-2xl flex flex-col items-start">
              <PiggyBank className="w-8 h-8 text-white mb-1.5" />
              <h3 className="text-white text-lg font-semibold mb-1">Best Deals</h3>
              <p className="text-gray-400 text-sm">Competitive pricing</p>
            </div>
          </div>

          {/* Request Quote Button */}
          <button className="bg-brand-gold hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded w-fit transition-colors">
            Request Quote
          </button>
        </div>

        {/* Right side - Car image is background */}
        <div className="flex-1"></div>
      </div>
    </div>
  );
}
