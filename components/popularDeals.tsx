import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

export interface SanityHotDeal {
  _id: string;
  title: string;
  model: string;
  make: string;
  body: string;
  image: any;
  location: string;
  price: number;
  months: number;
  year: number;
  isPopular?: boolean;
}

interface PopularDealsProps {
  initialDeals?: SanityHotDeal[];
}

const PopularDeals: React.FC<PopularDealsProps> = ({ initialDeals }) => {
  const fallbackDeals: SanityHotDeal[] = [
    {
      _id: '1',
      title: '2026 Nissan Rogue SV',
      model: '2026 SV',
      make: 'Nissan',
      body: 'SUV',
      image: '/PopularDeals/car_1.png',
      location: 'NY, United States',
      price: 256,
      months: 36,
      year: 2026,
    },
    {
      _id: '2',
      title: '2026 Nissan Rogue SV',
      model: '2026 SV',
      make: 'Nissan',
      body: 'SUV',
      image: '/PopularDeals/car_1.png',
      location: 'NY, United States',
      price: 256,
      months: 36,
      year: 2026,
    },
    {
      _id: '3',
      title: '2026 Nissan Rogue SV',
      model: '2026 SV',
      make: 'Nissan',
      body: 'SUV',
      image: '/PopularDeals/car_1.png',
      location: 'NY, United States',
      price: 256,
      months: 36,
      year: 2026,
    },
    {
      _id: '4',
      title: '2026 Nissan Rogue SV',
      model: '2026 SV',
      make: 'Nissan',
      body: 'SUV',
      image: '/PopularDeals/car_1.png',
      location: 'NY, United States',
      price: 256,
      months: 36,
      year: 2026,
    },
    {
      _id: '5',
      title: '2026 Nissan Rogue SV',
      model: '2026 SV',
      make: 'Nissan',
      body: 'SUV',
      image: '/PopularDeals/car_1.png',
      location: 'NY, United States',
      price: 256,
      months: 36,
      year: 2026,
    },
    {
      _id: '6',
      title: '2026 Nissan Rogue SV',
      model: '2026 SV',
      make: 'Nissan',
      body: 'SUV',
      image: '/PopularDeals/car_1.png',
      location: 'NY, United States',
      price: 256,
      months: 36,
      year: 2026,
    },
  ];

  const deals = initialDeals && initialDeals.length > 0 ? initialDeals : fallbackDeals;

  return (
    <section
      id="hot-deals"
      aria-label="Popular deals"
      className="w-full bg-white py-10 sm:py-12 md:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 font-[montserrat]">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5 mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-black">
            POPULAR DEALS
          </h2>

          <Link
            href="/hotDeals"
            className="bg-brand-gold hover:bg-brand-gold-hover text-black py-2.5 sm:py-3 px-6 sm:px-8 rounded font-semibold text-sm transition-all active:scale-95 self-start sm:self-auto cursor-pointer"
          >
            View More
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6">
          {deals.map((deal) => {
            const imageUrl = deal.image && typeof deal.image === 'object' ? urlFor(deal.image).url() : deal.image;
            return (
              <Link
                href={`/quote/${deal._id}`}
                key={deal._id}
                className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6 border border-border-light hover:shadow-lg transition-shadow flex flex-col block"
              >
                {/* Title */}
                <h3 className="text-base sm:text-lg font-semibold text-black mb-1">
                  {deal.title}
                </h3>

                <p className="text-sm text-gray-500 mb-4">
                  {deal.model}
                </p>

                {/* Image */}
                <div className="bg-card-light rounded-lg h-36 sm:h-40 md:h-44 lg:h-48 mb-5 flex items-center justify-center overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={deal.title}
                    className="w-full max-w-[260px] h-full object-contain"
                  />
                </div>

                {/* Location & Price */}
                <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4 mb-5">
                  <div className="flex items-center gap-2 text-gray-600 text-sm min-w-0">
                    <MapPin size={16} className="flex-shrink-0" />
                    <span className="truncate">{deal.location}</span>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-lg sm:text-xl font-bold text-black whitespace-nowrap">
                      ${deal.price}
                      <span className="text-xs font-normal text-caption">
                        {" "}
                        / per month
                      </span>
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t pt-4 mt-auto">
                  <div className="flex items-center justify-between flex-wrap gap-3 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} color="black" className="flex-shrink-0" />
                      <span className="text-black whitespace-nowrap">
                        {deal.months} Months
                      </span>
                    </div>

                    <span className="text-black">
                      {deal.year}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PopularDeals;