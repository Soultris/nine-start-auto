'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { urlFor } from "@/sanity/lib/image";

interface SanityGalleryImage {
  _id: string;
  title?: string;
  image: any;
  alt: string;
  order?: number;
}

interface GalleryProps {
  initialImages?: SanityGalleryImage[];
}

export default function Gallery({ initialImages }: GalleryProps) {
  const images = initialImages && initialImages.length > 0
    ? initialImages.map((img) => ({
        src: urlFor(img.image).url(),
        alt: img.alt || img.title || 'Gallery image',
      }))
    : [
        { src: '/Gallery/Main.png', alt: 'Customer receiving car keys' },
        { src: '/Gallery/img_1.png', alt: 'Car side view' },
        { src: '/Gallery/img_2.png', alt: 'Car rear view' },
        { src: '/Gallery/img_3.png', alt: 'Car rear angle view' },
        { src: '/Gallery/img_4.png', alt: 'Car detail view' },
        { src: '/Gallery/img_5.png', alt: 'Car detail view' },
      ];

  const [visibleItems, setVisibleItems] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(images.length);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleItems(3);
      } else if (window.innerWidth >= 480) {
        setVisibleItems(2);
      } else {
        setVisibleItems(1);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update currentIndex if the images length changes (e.g. during live preview loading)
  useEffect(() => {
    setCurrentIndex(images.length);
  }, [images.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    
    if (currentIndex >= images.length * 2) {
      const el = e.currentTarget;
      el.style.transition = 'none';
      setCurrentIndex(currentIndex - images.length);
      setTimeout(() => {
        if (el) el.style.transition = '';
      }, 30);
    } else if (currentIndex < images.length) {
      const el = e.currentTarget;
      el.style.transition = 'none';
      setCurrentIndex(currentIndex + images.length);
      setTimeout(() => {
        if (el) el.style.transition = '';
      }, 30);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const extendedImages = [...images, ...images, ...images];

  return (
    <section id="gallery" aria-label="Gallery" className="w-full bg-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 font-[montserrat]">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-black tracking-tight">
            GALLERY
          </h2>
          <Link
            href="/gallery"
            className="bg-brand-gold hover:bg-brand-gold-hover text-black py-2.5 sm:py-3 px-6 sm:px-8 rounded font-semibold text-sm transition-all active:scale-95 cursor-pointer"
          >
            View More
          </Link>
        </div>

        {/* Carousel Container */}
        <div
          className="relative group/carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Viewport */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                width: `${(extendedImages.length / visibleItems) * 100}%`,
                transform: `translate3d(-${(currentIndex / extendedImages.length) * 100}%, 0px, 0px)`,
                willChange: 'transform',
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedImages.map((img, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 px-2"
                  style={{
                    width: `${100 / extendedImages.length}%`,
                  }}
                >
                  <Link href="/gallery" className="block relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md group cursor-pointer">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-black/80 hover:bg-black text-white hover:text-brand-gold rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-lg border border-border-dark cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-black/80 hover:bg-black text-white hover:text-brand-gold rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-lg border border-border-dark cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicator Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {images.map((_, idx) => {
            const isActive = (currentIndex % images.length) === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(images.length + idx);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'w-6 bg-brand-gold' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}