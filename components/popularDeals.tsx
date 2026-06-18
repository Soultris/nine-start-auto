import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';

interface DealCard {
  id: number;
  title: string;
  model: string;
  image: string;
  location: string;
  price: number;
  months: number;
  year: number;
}

const PopularDeals: React.FC = () => {
  const deals: DealCard[] = [
    {
      id: 1,
      title: '2026 Nissan Rogue SV',
      model: '2026 SV',
      image: '/PopularDeals/car_1.png',
      location: 'NY, United States',
      price: 256,
      months: 36,
      year: 2026,
    },
    {
      id: 2,
      title: '2026 Nissan Rogue SV',
      model: '2026 SV',
      image: '/PopularDeals/car_1.png',
      location: 'NY, United States',
      price: 256,
      months: 36,
      year: 2026,
    },
    {
      id: 3,
      title: '2026 Nissan Rogue SV',
      model: '2026 SV',
      image: '/PopularDeals/car_1.png',
      location: 'NY, United States',
      price: 256,
      months: 36,
      year: 2026,
    },
    {
      id: 4,
      title: '2026 Nissan Rogue SV',
      model: '2026 SV',
      image: '/PopularDeals/car_1.png',
      location: 'NY, United States',
      price: 256,
      months: 36,
      year: 2026,
    },
    {
      id: 5,
      title: '2026 Nissan Rogue SV',
      model: '2026 SV',
      image: '/PopularDeals/car_1.png',
      location: 'NY, United States',
      price: 256,
      months: 36,
      year: 2026,
    },
    {
      id: 6,
      title: '2026 Nissan Rogue SV',
      model: '2026 SV',
      image: '/PopularDeals/car_1.png',
      location: 'NY, United States',
      price: 256,
      months: 36,
      year: 2026,
    },
  ];

  return (
    <section
      id="hot-deals"
      aria-label="Popular deals"
      className="w-full bg-white py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-[montserrat]">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl font-medium text-black">
            POPULAR DEALS
          </h2>

          <Link
            href="/hotDeals"
            className="bg-brand-gold text-black text-sm font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity duration-300"
          >
            View More
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-gray-50 rounded-lg p-5 md:p-6 border border-border-light hover:shadow-lg transition-shadow"
            >
              {/* Title */}
              <h3 className="text-lg font-semibold text-black mb-1">
                {deal.title}
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                {deal.model}
              </p>

              {/* Image */}
              <div className="bg-card-light rounded-lg h-40 sm:h-44 md:h-48 mb-5 flex items-center justify-center overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full max-w-[260px] h-full object-contain"
                />
              </div>

              {/* Location & Price */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin size={16} />
                  <span>{deal.location}</span>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-black">
                    ${deal.price}
                    <span className="text-xs font-normal text-caption">
                      {" "}
                      / per month
                    </span>
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} color="black" />
                    <span className="text-black">
                      {deal.months} Months
                    </span>
                  </div>

                  <span className="text-black">
                    {deal.year}
                  </span>

                  <div className="flex items-center gap-1">
                    <Calendar size={14} color="black" />
                    <span className="text-black">
                      {deal.months} Months
                    </span>
                  </div>

                  <span className="text-black">
                    {deal.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularDeals;