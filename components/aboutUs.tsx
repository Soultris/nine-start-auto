'use client';

import React, { useState } from 'react';

export default function AboutUs() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" aria-label="About us" className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 font-[montserrat]">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-medium text-black mb-4 tracking-wider">ABOUT US</h2>
          <p className="text-muted text-md max-w-3xl leading-relaxed font-light">
            Learn more about our mission to provide high-quality pre-owned vehicles and build lasting relationships with our customers.
          </p>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative overflow-hidden rounded-2xl w-[90%]">
              <img
                src="/AboutUs/aboutUs.png"
                alt="Happy customer hugging red car"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right Column: Paragraphs */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Mobile/Tablet: collapsible content with fade */}
            <div className="lg:hidden relative">
              <div
                className={`flex flex-col gap-6 text-[#000000] text-base leading-relaxed font-medium overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                  expanded ? 'max-h-[2000px]' : 'max-h-[210px]'
                }`}
              >
                <p>
                  Welcome to Nine Star Auto, your trusted destination for quality pre-owned vehicles. We are committed to providing an exceptional car-buying experience with a carefully selected inventory of used cars, trucks, and SUVs for every budget and lifestyle.
                </p>
                <p>
                  Our experienced team works hard to ensure every vehicle meets high standards of quality, reliability, and value. Whether you're looking to purchase your next vehicle, trade in your current one, or explore financing solutions, we're here to guide you through every step of the process.
                </p>
                <p>
                  At Nine Star Auto, we believe buying a vehicle should be simple, transparent, and stress-free. We take pride in building long-term relationships with our customers through honest service, competitive pricing, and a commitment to customer satisfaction.
                </p>
              </div>

              {/* Fade overlay hiding the rest of the content */}
              {!expanded && (
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              )}
            </div>

            {/* Toggle button - mobile/tablet only */}
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="lg:hidden mt-4 self-start text-sm font-semibold text-brand-gold hover:opacity-80 transition-opacity duration-300"
            >
              {expanded ? 'View Less' : 'View More'}
            </button>

            {/* Desktop: always full content, unchanged */}
            <div className="hidden lg:flex flex-col gap-6 text-[#000000] text-lg leading-relaxed font-medium">
              <p>
                Welcome to Nine Star Auto, your trusted destination for quality pre-owned vehicles. We are committed to providing an exceptional car-buying experience with a carefully selected inventory of used cars, trucks, and SUVs for every budget and lifestyle.
              </p>
              <p>
                Our experienced team works hard to ensure every vehicle meets high standards of quality, reliability, and value. Whether you're looking to purchase your next vehicle, trade in your current one, or explore financing solutions, we're here to guide you through every step of the process.
              </p>
              <p>
                At Nine Star Auto, we believe buying a vehicle should be simple, transparent, and stress-free. We take pride in building long-term relationships with our customers through honest service, competitive pricing, and a commitment to customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}