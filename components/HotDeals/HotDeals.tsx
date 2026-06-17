'use client';

import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface Deal {
  id: number;
  title: string;
  model: string;
  location: string;
  price: number;
  months: number;
  year: number;
  image: string;
}

const deals: Deal[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: '2026 Nissan Rogue SV',
  model: '2026 SV',
  location: 'NY, United States',
  price: 256,
  months: 36,
  year: 2026,
  image: '/PopularDeals/car_1.png',
}));

const ITEMS_PER_PAGE = 9;
const TOTAL_PAGES = 3;

export default function HotDealsPage() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [body, setBody] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(2);

  const paginated = deals.slice(0, ITEMS_PER_PAGE);

  return (
    <div className="w-full font-[montserrat]">
      {/* Hero Banner */}
      <div className="relative w-full h-[400px] overflow-hidden">
        <img
          src="/Applications/ApplicationTop.png"
          alt="Hot Deals"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-38 left-35 z-10">
          <h1 className="text-5xl font-medium text-white tracking-widest">HOT DEALS</h1>
        </div>
      </div>

      {/* Content */}
      <section className="w-full bg-white py-10">
        <div className="max-w-7xl mx-auto px-6">

          {/* Search Filters */}
          <div className="border border-border-light rounded-xl p-5 mb-8 bg-card-light h-[185px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-black mb-1.5">Make</label>
                <div className="relative">
                  <img src="/PopularDeals/make.svg" alt="make" className="absolute left-3 top-1/2 -translate-y-1/2 w-5.5 h-5.5" />
                  <input
                    type="text"
                    placeholder="    Enter the car make"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className="w-full border border-border-light rounded-lg pl-8 pr-3 py-2 text-sm font-medium text-black focus:outline-none focus:border-brand-gold bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1.5">Model</label>
                <div className="relative">
                  <img src="/PopularDeals/model.svg" alt="model" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="    Enter the car model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full border border-border-light rounded-lg pl-8 pr-3 py-2 text-sm font-medium text-black focus:outline-none focus:border-brand-gold bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1.5">Body</label>
                <div className="relative">
                  <img src="/PopularDeals/body.svg" alt="body" className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" />
                  <input
                    type="text"
                    placeholder="    Enter the car body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full border border-border-light rounded-lg pl-8 pr-3 py-2 text-sm font-medium text-black focus:outline-none focus:border-brand-gold bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1.5">Price Range</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="$    Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full border border-border-light rounded-lg px-3 py-2 text-sm font-medium text-black focus:outline-none focus:border-brand-gold bg-white"
                    />
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="$    Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full border border-border-light rounded-lg px-3 py-2 text-sm font-medium text-black focus:outline-none focus:border-brand-gold bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full bg-brand-gold text-black font-medium text-sm py-2.5 rounded-lg hover:opacity-90 transition-opacity duration-300">
              Search Your Car
            </button>
          </div>

          {/* Results Count */}
          <p className="text-black font-semibold text-sm mb-6">556 RESULTS</p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginated.map((deal) => (
              <div
                key={deal.id}
                className="bg-gray-50 rounded-lg p-6 border border-border-light hover:shadow-lg transition-shadow duration-300"
              >
                {/* Car Title */}
                <h3 className="text-lg font-semibold text-black mb-1">{deal.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{deal.model}</p>

                {/* Car Image */}
                <div className="bg-card-light rounded-lg h-36 mb-4 flex items-center justify-center overflow-hidden">
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
                    <p className="text-lg font-bold text-black">
                      ${deal.price}{' '}
                      <span className="text-xs font-normal text-caption">/ per month</span>
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex items-center justify-between text-xs border-t pt-4">
                  <div className="flex items-center gap-1">
                    <img src="/PopularDeals/month.svg" alt="months" className="w-3.5 h-3.5" />
                    <span className="text-black">{deal.months} Months</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src="/PopularDeals/year.svg" alt="year" className="w-3.5 h-3.5" />
                    <span className="text-black">{deal.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src="/PopularDeals/month.svg" alt="months" className="w-3.5 h-3.5" />
                    <span className="text-black">{deal.months} Months</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src="/PopularDeals/year.svg" alt="year" className="w-3.5 h-3.5" />
                    <span className="text-black">{deal.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-2 mt-10 justify-start">
            {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors duration-300 ${
                  currentPage === page
                    ? 'bg-brand-gold text-black'
                    : 'text-black hover:bg-card-light'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}