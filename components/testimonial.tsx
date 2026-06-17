'use client';

import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  rating: number;
  quote: string;
  author: string;
}

export default function Testimonial() {
  const testimonials: Testimonial[] = [
    {
      rating: 5.0,
      quote:
        "My wife and I purchase a 2017 BMW 5 Series; Adrian and his staff were very professional, kind and courteous. There were no haggling and we got a payment that we could afford. I recommend Nine Star to everyone!",
      author: '~Eustrada Taylor',
    },
    {
      rating: 5.0,
      quote:
        "The team made the entire process effortless. From sourcing the vehicle to finalizing the lease, everything was handled with professionalism and care. Highly recommend their services!",
      author: '~John Doe',
    },
    {
      rating: 5.0,
      quote:
        "Excellent service from start to finish. They negotiated a great price on our behalf and the delivery was right on time. Couldn't have asked for a better experience.",
      author: '~Jane Smith',
    },
    {
      rating: 5.0,
      quote:
        "My wife and I purchase a 2017 BMW 5 Series; Adrian and his staff were very professional, kind and courteous. There were no haggling and we got a payment that we could afford. I recommend Nine Star to everyone!",
      author: '~Eustrada Taylor',
    },
    {
      rating: 5.0,
      quote:
        "The team made the entire process effortless. From sourcing the vehicle to finalizing the lease, everything was handled with professionalism and care. Highly recommend their services!",
      author: '~John Doe',
    },
    {
      rating: 5.0,
      quote:
        "Excellent service from start to finish. They negotiated a great price on our behalf and the delivery was right on time. Couldn't have asked for a better experience.",
      author: '~Jane Smith',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section aria-label="Testimonials" className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 font-[montserrat]">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-medium text-black mb-4 tracking-tight">
            WHAT CUSTOMERS SAY ABOUT US
          </h2>
          <p className="text-muted text-md max-w-3xl leading-relaxed font-light">
            Professional auto brokerage services Professional auto brokerage services Professional
            auto brokerage services
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="bg-card-light border border-border-light rounded-2xl overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 p-8"
              >
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 fill-brand-gold text-brand-gold" />
                  <span className="text-brand-gold font-semibold text-lg">
                    {testimonial.rating.toFixed(1)}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-black text-md leading-relaxed font-medium mb-8">
                  {testimonial.quote}
                </p>

                {/* Author */}
                <p className="text-right text-black font-normal">
                  {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex items-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-2 h-2 bg-brand-gold'
                  : 'w-2 h-2 bg-border-light'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}