import React from 'react';
import Link from 'next/link';

interface DealCard {
  id: number;
  image: string;
}

const PopularDeals: React.FC = () => {
  const deals: DealCard[] = [
    { id: 1, image: '/PopularDeals/car_2.jpeg' },
    { id: 2, image: '/PopularDeals/car_2.jpeg' },
    { id: 3, image: '/PopularDeals/car_2.jpeg' },
    { id: 4, image: '/PopularDeals/car_2.jpeg' },
    { id: 5, image: '/PopularDeals/car_2.jpeg' },
    { id: 6, image: '/PopularDeals/car_2.jpeg' },
  ];

  return (
    <section
      id="hot-deals"
      aria-label="Popular deals"
      className="w-full bg-white py-10 sm:py-12 md:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 font-[montserrat]">

        {/* Header */}
        <div className="flex flex-row items-center justify-between gap-3 sm:gap-5 mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-black">
            POPULAR DEALS
          </h2>

          <Link
            href="/hotDeals"
            className="bg-brand-gold hover:bg-brand-gold-hover text-black py-2.5 sm:py-3 px-6 sm:px-8 rounded font-semibold text-sm transition-all active:scale-95 cursor-pointer flex-shrink-0"
          >
            View More
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-gray-50 rounded-lg border border-border-light hover:shadow-lg transition-shadow overflow-hidden h-[387px] sm:h-92 md:h-96"
            >
              {/* Image */}
              <img
                src={deal.image}
                alt="Deal car"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularDeals;