import React from 'react';
import Link from 'next/link';

export default function Gallery() {
  const mobileImages = [
    { src: '/Gallery/Main.png', alt: 'Customer receiving car keys' },
    { src: '/Gallery/img_1.png', alt: 'Car side view' },
    { src: '/Gallery/img_2.png', alt: 'Car rear view' },
    { src: '/Gallery/img_3.png', alt: 'Car rear angle view' },
    { src: '/Gallery/img_4.png', alt: 'Car detail view' },
    { src: '/Gallery/img_5.png', alt: 'Car detail view' },
  ];

  return (
    <section id="gallery" aria-label="Gallery" className="w-full bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 font-[montserrat]">
        {/* Header */}
        <div className="flex items-center justify-between mb-7 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-black tracking-tight">
            GALLERY
          </h2>
          <Link
            href="/gallery"
            className="bg-brand-gold hover:bg-yellow-600 text-black py-2.5 sm:py-3 px-6 sm:px-8 rounded font-semibold text-sm transition-colors active:scale-95"
          >
            View More
          </Link>
        </div>

        {/* ---------- MOBILE: modern hero + scroll filmstrip (below md) ---------- */}
        <div className="md:hidden">
          {/* Hero image */}
          <div className="relative rounded-2xl overflow-hidden h-[260px] xs:h-[300px] sm:h-[360px] shadow-sm">
            <img
              src={mobileImages[0].src}
              alt={mobileImages[0].alt}
              className="w-full h-full object-cover"
            />
            {/* subtle bottom gradient for depth */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
            <span className="absolute bottom-3 left-4 text-white text-xs font-medium tracking-wide bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
              1 / {mobileImages.length}
            </span>
          </div>

          {/* Scrollable filmstrip of remaining images */}
          <div className="mt-4 flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {mobileImages.slice(1).map((img, idx) => (
              <div
                key={idx}
                className="relative shrink-0 w-[42%] xs:w-[38%] sm:w-[30%] h-[150px] sm:h-[170px] rounded-xl overflow-hidden snap-start active:scale-[0.98] transition-transform duration-200"
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </div>
            ))}

            {/* "View more" tile at the end of the strip */}
            <Link
              href="/gallery"
              className="relative shrink-0 w-[42%] xs:w-[38%] sm:w-[30%] h-[150px] sm:h-[170px] rounded-xl overflow-hidden snap-start bg-black/85 flex flex-col items-center justify-center gap-1 active:scale-[0.98] transition-transform duration-200"
            >
              <span className="text-brand-gold text-md font-medium">View All</span>
            </Link>
          </div>

          {/* Scroll progress dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {mobileImages.slice(1).map((_, idx) => (
              <span key={idx} className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            ))}
          </div>
        </div>

        {/* TABLET / DESKTOP */}
        <div className="hidden md:grid md:grid-cols-3 gap-5">
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