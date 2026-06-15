import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

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
      aria-label="Popular deals"
      className="w-full bg-white py-16"
    >
      <div className="max-w-7xl mx-auto px-6 font-[montserrat]">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-medium text-black">POPULAR DEALS</h2>
          <button className="bg-[#D4AC1D] hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded transition-colors">
            View More
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-gray-50 rounded-lg p-6 border border-[#EAEAEA] hover:shadow-lg transition-shadow"
            >
              {/* Car Title */}
              <h3 className="text-lg font-semibold text-black mb-1">{deal.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{deal.model}</p>

              {/* Car Image */}
              <div className="bg-[#F8F8F8] rounded-lg  h-36 mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-64 h-full object-cover"
                />
              </div>

              {/* Location and Price */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin size={16} />
                  <span>{deal.location}</span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-black">${deal.price} <span className="text-xs font-normal text-[#A8A8A8]">/ per month</span></p>

                </div>
              </div>

              {/* Details */}
              <div className="flex items-center justify-between text-xs text-[#E8E8E8] border-t pt-4">
                <div className="flex items-center gap-1 ">
                  <Calendar size={14} color="black" />
                  <span className='text-black'>{deal.months} Months</span>
                </div>
                <span className='text-black'>{deal.year}</span>
                <div className="flex items-center gap-1">
                  <Calendar  size={14} color="black" />
                  <span className='text-black'>{deal.months} Months</span>
                </div>
                <span className='text-black'>{deal.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDeals;
