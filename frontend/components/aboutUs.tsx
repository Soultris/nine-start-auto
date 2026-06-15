import React from 'react';

export default function AboutUs() {
  return (
    <section aria-label="About us" className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 font-[montserrat]">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-medium text-black mb-4 tracking-wider">ABOUT US</h2>
          <p className="text-[#AEAEAE] text-md max-w-3xl leading-relaxed font-light">
            Professional auto brokerage services Professional auto brokerage services Professional auto brokerage services
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
          <div className="lg:col-span-7 flex flex-col gap-6 text-[#000000] text-lg leading-relaxed font-medium">
            <p>
              We are an organization of automotive professionals dedicated to delivering exceptional
              customer service with every vehicle we provide. Our team works closely with each client
              to find the right vehicle at the best possible price.
            </p>
            <p>
              Since 2006, we have proudly helped thousands of customers across New York lease or
              finance reliable and attractive vehicles. With nearly two decades of experience in the
              automotive industry, we understand how to make the car leasing and financing process
              simple, transparent, and affordable.
            </p>
            <p>
              We offer competitive pricing on all new vehicles, flexible financing options, and
              specialized programs for first-time buyers. Our goal is to ensure every customer
              receives the best value and drives away with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
