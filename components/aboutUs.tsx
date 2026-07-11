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
                className={`flex flex-col gap-6 text-[#000000] text-base leading-relaxed font-medium overflow-hidden transition-[max-height] duration-500 ease-in-out ${expanded ? 'max-h-[2000px]' : 'max-h-[210px]'
                  }`}
              >
                <p>
                  Nine Star Auto is a New York–based team of automotive professionals committed to exceptional customer service on every deal. We offer competitive pricing on new vehicles, flexible financing options, and a dedicated first-time buyer program, working closely with each client to find the best value for their budget. With over 15 years of experience, we've helped thousands of drivers lease or finance reliable, quality vehicles they're proud to drive.
                </p>
                <p>
                  With over Fifteen years of experience, we have helped thousands of people across New York lease or finance a reliable and attractive vehicle.
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
                We are an organization of automotive professionals dedicated to delivering exceptional customer service with every vehicle. Offering great prices on all new cars, flexible financing options and a first-time buyer program, we work closely with every client to provide them with the best value in any vehicle at an affordable price.
              </p>
              <p>
                With over Fifteen years of experience, we have helped thousands of people across New York lease or finance a reliable and attractive vehicle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}