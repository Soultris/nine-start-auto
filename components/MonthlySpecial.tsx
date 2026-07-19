"use client";

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';

export interface SanityMonthlySpecial {
  _id: string;
  title: string;
  image: any;
}

interface MonthlySpecialProps {
  initialSpecials?: SanityMonthlySpecial[];
}

const MonthlySpecial: React.FC<MonthlySpecialProps> = ({ initialSpecials }) => {
  const specials = initialSpecials || [];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const carouselRef = React.useRef<HTMLDivElement>(null);

  if (specials.length === 0) {
    return null; // Do not render section if there are no monthly specials
  }

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (specials.length <= 1) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        // Check if we are near the end of the scroll
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [specials.length]);

  return (
    <section
      id="monthly-special"
      aria-label="Monthly special"
      className="w-full bg-gray-50 py-10 sm:py-12 md:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 font-[montserrat] relative">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5 mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-black">
            MONTHLY SPECIALS
          </h2>
          
          {/* Custom Arrows (visible on larger screens if enough items) */}
          <div className="hidden sm:flex items-center gap-2">
            <button 
              onClick={scrollLeft}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-200 transition bg-white"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} className="text-black" />
            </button>
            <button 
              onClick={scrollRight}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-200 transition bg-white"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} className="text-black" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto gap-5 sm:gap-6 snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {specials.map((special) => {
            const imageUrl = special.image && typeof special.image === 'object' ? urlFor(special.image).url() : special.image;
            return (
              <div
                key={special._id}
                onClick={() => setSelectedImage(imageUrl)}
                className="flex-none w-[280px] sm:w-[320px] md:w-[400px] bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex items-center justify-center cursor-pointer snap-start"
              >
                <img
                  src={imageUrl}
                  alt={special.title || "Monthly Special"}
                  className="w-full h-auto object-cover"
                />
              </div>
            );
          })}
        </div>

      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 text-white bg-black/50 hover:bg-black/80 rounded-full transition"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>
          <img 
            src={selectedImage} 
            alt="Expanded view" 
            className="max-w-full max-h-[90vh] object-contain rounded"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </section>
  );
};

export default MonthlySpecial;
