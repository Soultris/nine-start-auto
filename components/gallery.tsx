import React from 'react';
import Link from 'next/link';

export default function Gallery() {
  return (
    <section id="gallery" aria-label="Gallery" className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 font-[montserrat]">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-medium text-black tracking-tight">GALLERY</h2>
          <Link href="/gallery" className="bg-brand-gold text-black text-sm font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity duration-300">
            View More
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Large image - left, spans 2 rows */}
          <div className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden min-h-[300px] md:min-h-[520px]">
            <img
              src="/Gallery/Main.png"
              alt="Customer receiving car keys"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top right image */}
          <div className="rounded-2xl overflow-hidden min-h-[180px] md:min-h-[250px]">
            <img
              src="/Gallery/img_1.png"
              alt="Car side view"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Middle right image */}
          <div className="rounded-2xl overflow-hidden min-h-[180px] md:min-h-[250px]">
            <img
              src="/Gallery/img_2.png"
              alt="Car rear view"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom row - 3 images */}
          <div className="rounded-2xl overflow-hidden min-h-[180px] md:min-h-[240px]">
            <img
              src="/Gallery/img_3.png"
              alt="Car rear angle view"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="rounded-2xl overflow-hidden min-h-[180px] md:min-h-[240px]">
            <img
              src="/Gallery/img_4.png"
              alt="Car detail view"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="rounded-2xl overflow-hidden min-h-[180px] md:min-h-[240px]">
            <img
              src="/Gallery/img_5.png"
              alt="Car detail view"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}