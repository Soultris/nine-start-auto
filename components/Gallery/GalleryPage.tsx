import React from 'react';
import { urlFor } from "@/sanity/lib/image";

export interface SanityGalleryImage {
  _id: string;
  title?: string;
  image: any;
  alt: string;
  order?: number;
}

interface GalleryPageProps {
  initialImages?: SanityGalleryImage[];
}

export default function GalleryPage({ initialImages }: GalleryPageProps) {
  const images = initialImages && initialImages.length > 0
    ? initialImages.map((img) => ({
        src: urlFor(img.image).url(),
        alt: img.alt || img.title || 'Gallery image',
      }))
    : [
        { src: '/Gallery/Main.png', alt: 'Gallery image 1' },
        { src: '/Gallery/img_2.png', alt: 'Gallery image 2' },
        { src: '/Gallery/img_3.png', alt: 'Gallery image 3' },
        { src: '/Gallery/img_4.png', alt: 'Gallery image 4' },
        { src: '/Gallery/img_5.png', alt: 'Gallery image 5' },
        { src: '/Gallery/img_1.png', alt: 'Gallery image 6' },
        { src: '/Gallery/img_1.png', alt: 'Gallery image 7' },
        { src: '/Gallery/img_2.png', alt: 'Gallery image 8' },
        { src: '/Gallery/img_3.png', alt: 'Gallery image 9' },
        { src: '/Gallery/img_4.png', alt: 'Gallery image 10' },
        { src: '/Gallery/img_5.png', alt: 'Gallery image 11' },
        { src: '/Gallery/Main.png', alt: 'Gallery image 12' },
      ];

  // Split images into chunks of 3 for desktop row layout pattern
  const chunks: Array<Array<{ src: string; alt: string }>> = [];
  for (let i = 0; i < images.length; i += 3) {
    chunks.push(images.slice(i, i + 3));
  }

  return (
    <div className="w-full font-[montserrat]">
      {/* Hero Banner */}
      <div className="relative w-full h-[220px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden">
        <img
          src="/Applications/ApplicationTop.png"
          alt="Gallery"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 z-10 flex items-center justify-center text-center px-4 sm:items-end sm:justify-start sm:text-left sm:pb-12">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-widest leading-tight">
              GALLERY
            </h1>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <section className="w-full bg-white py-10 sm:py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* ---------- MOBILE / TABLET: modern masonry, below lg ---------- */}
          <div className="lg:hidden columns-2 sm:columns-3 gap-3 sm:gap-4 [column-fill:_balance]">
            {images.map((img, idx) => {
              // vary aspect ratios for a natural masonry rhythm
              const ratios = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/4]'];
              const ratio = ratios[idx % ratios.length];
              return (
                <div
                  key={idx}
                  className={`mb-3 sm:mb-4 break-inside-avoid rounded-xl overflow-hidden ${ratio} active:scale-[0.98] transition-transform duration-200`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>

          {/* ---------- DESKTOP / LAPTOP: original grid, dynamically generated ---------- */}
          <div className="hidden lg:block space-y-4">
            {chunks.map((chunk, chunkIdx) => {
              const rowType = chunkIdx % 4;

              if (rowType === 0) {
                // Row Type A: Large left + 2 stacked right
                if (chunk.length === 1) {
                  return (
                    <div key={chunkIdx} className="grid grid-cols-3 gap-4">
                      <div className="col-span-3 rounded-xl overflow-hidden h-[457px]">
                        <img src={chunk[0].src} alt={chunk[0].alt} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  );
                }
                if (chunk.length === 2) {
                  return (
                    <div key={chunkIdx} className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 rounded-xl overflow-hidden h-[457px]">
                        <img src={chunk[0].src} alt={chunk[0].alt} className="w-full h-full object-cover" />
                      </div>
                      <div className="col-span-1 rounded-xl overflow-hidden h-[457px]">
                        <img src={chunk[1].src} alt={chunk[1].alt} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={chunkIdx} className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 rounded-xl overflow-hidden h-[457px]">
                      <img src={chunk[0].src} alt={chunk[0].alt} className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-1 flex flex-col gap-4">
                      <div className="rounded-xl overflow-hidden h-[220px]">
                        <img src={chunk[1].src} alt={chunk[1].alt} className="w-full h-full object-cover" />
                      </div>
                      <div className="rounded-xl overflow-hidden h-[220px]">
                        <img src={chunk[2].src} alt={chunk[2].alt} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                );
              }

              if (rowType === 1 || rowType === 3) {
                // Row Type B / D: 3 equal images
                return (
                  <div key={chunkIdx} className="grid grid-cols-3 gap-4">
                    {chunk.map((img, imgIdx) => (
                      <div key={imgIdx} className="rounded-xl overflow-hidden h-[220px]">
                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                );
              }

              // rowType === 2: Row Type C: 2 stacked left + Large right
              if (chunk.length === 1) {
                return (
                  <div key={chunkIdx} className="grid grid-cols-3 gap-4">
                    <div className="col-span-3 rounded-xl overflow-hidden h-[457px]">
                      <img src={chunk[0].src} alt={chunk[0].alt} className="w-full h-full object-cover" />
                    </div>
                  </div>
                );
              }
              if (chunk.length === 2) {
                return (
                  <div key={chunkIdx} className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 rounded-xl overflow-hidden h-[457px]">
                      <img src={chunk[0].src} alt={chunk[0].alt} className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-2 rounded-xl overflow-hidden h-[457px]">
                      <img src={chunk[1].src} alt={chunk[1].alt} className="w-full h-full object-cover" />
                    </div>
                  </div>
                );
              }
              return (
                <div key={chunkIdx} className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 flex flex-col gap-4">
                    <div className="rounded-xl overflow-hidden h-[220px]">
                      <img src={chunk[0].src} alt={chunk[0].alt} className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-xl overflow-hidden h-[220px]">
                      <img src={chunk[1].src} alt={chunk[1].alt} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="col-span-2 rounded-xl overflow-hidden h-[457px]">
                    <img src={chunk[2].src} alt={chunk[2].alt} className="w-full h-full object-cover" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}