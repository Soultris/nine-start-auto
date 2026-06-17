import React from 'react';

export default function GalleryPage() {
  const bottomRow = [
    '/Gallery/car7.jpg',
    '/Gallery/car8.jpg',
    '/Gallery/car9.jpg',
  ];

  return (
    <div className="w-full font-[montserrat]">
      {/* Hero Banner */}
      <div className="relative w-full h-[400px] overflow-hidden">
        <img
          src="/Applications/ApplicationTop.png"
          alt="Gallery"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-38 left-35 z-10">
          <h1 className="text-5xl font-medium text-white tracking-widest">GALLERY</h1>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="w-full bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-4">

          {/* Row 1: Large left + 2 stacked right */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 rounded-xl overflow-hidden h-[457px]">
              <img src="/Gallery/Main.png" alt="Gallery image 1" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-1 flex flex-col gap-4">
              <div className="rounded-xl overflow-hidden h-[220px]">
                <img src="/Gallery/img_2.png" alt="Gallery image 2" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden h-[220px]">
                <img src="/Gallery/img_3.png" alt="Gallery image 3" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Row 2: 3 equal images */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl overflow-hidden h-[220px]">
              <img src="/Gallery/img_4.png" alt="Gallery image 4" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-[220px]">
              <img src="/Gallery/img_5.png" alt="Gallery image 5" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-[220px]">
              <img src="/Gallery/img_1.png" alt="Gallery image 6" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Row 3: 2 stacked left + large right */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 flex flex-col gap-4">
              <div className="rounded-xl overflow-hidden h-[220px]">
                <img src="/Gallery/img_1.png" alt="Gallery image 7" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden h-[220px]">
                <img src="/Gallery/img_2.png" alt="Gallery image 8" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="col-span-2 rounded-xl overflow-hidden h-[457px]">
              <img src="/Gallery/img_3.png" alt="Gallery image 9" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Row 4: 3 equal images */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl overflow-hidden h-[220px]">
              <img src="/Gallery/img_4.png" alt="Gallery image 10" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-[220px]">
              <img src="/Gallery/img_5.png" alt="Gallery image 11" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-[220px]">
              <img src="/Gallery/Main.png" alt="Gallery image 12" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}