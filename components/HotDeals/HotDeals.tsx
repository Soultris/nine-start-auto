'use client';

import React, { useState } from 'react';

interface Deal {
  id: number;
  image: string;
}

const deals: Deal[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  image: '/PopularDeals/car_2.jpeg',
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
  const [filtersOpen, setFiltersOpen] = useState(false);

  const paginated = deals.slice(0, ITEMS_PER_PAGE);

  return (
    <div className="w-full font-[montserrat]">
      {/* Hero Banner */}
      <div className="relative w-full h-[220px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden">
        <img
          src="/Applications/ApplicationTop.png"
          alt="Hot Deals"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 z-10 flex items-center justify-center text-center px-4 sm:items-end sm:justify-start sm:text-left sm:pb-12">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-widest leading-tight">
              HOT DEALS
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="w-full bg-white py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* ---------- MOBILE: modern collapsible filter sheet trigger (below sm) ---------- */}
          <div className="sm:hidden mb-6">
            <button
              type="button"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="w-full flex items-center justify-between border border-border-light rounded-xl px-4 py-3.5 bg-card-light"
            >
              <span className="text-sm font-semibold text-black">Filter Your Search</span>
              <span className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{filtersOpen ? 'Hide' : 'Show'}</span>
                <svg
                  className={`w-4 h-4 text-black transition-transform duration-300 ${filtersOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            {filtersOpen && (
              <div className="border border-t-0 border-border-light rounded-b-xl px-4 pt-4 pb-5 -mt-1 bg-white space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1.5">Make</label>
                  <div className="relative">
                    <img src="/PopularDeals/make.svg" alt="make" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Enter the car make"
                      value={make}
                      onChange={(e) => setMake(e.target.value)}
                      className="w-full border border-border-light rounded-lg pl-10 pr-3 py-2.5 text-sm font-medium text-black focus:outline-none focus:border-brand-gold bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1.5">Model</label>
                  <div className="relative">
                    <img src="/PopularDeals/model.svg" alt="model" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Enter the car model"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full border border-border-light rounded-lg pl-10 pr-3 py-2.5 text-sm font-medium text-black focus:outline-none focus:border-brand-gold bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1.5">Body</label>
                  <div className="relative">
                    <img src="/PopularDeals/body.svg" alt="body" className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" />
                    <input
                      type="text"
                      placeholder="Enter the car body"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      className="w-full border border-border-light rounded-lg pl-10 pr-3 py-2.5 text-sm font-medium text-black focus:outline-none focus:border-brand-gold bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1.5">Price Range</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="$ Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm font-medium text-black focus:outline-none focus:border-brand-gold bg-white"
                    />
                    <input
                      type="text"
                      placeholder="$ Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm font-medium text-black focus:outline-none focus:border-brand-gold bg-white"
                    />
                  </div>
                </div>
                <button className="w-full bg-brand-gold hover:bg-brand-gold-hover text-black py-2.5 sm:py-3 px-6 sm:px-8 rounded font-semibold text-sm transition-all active:scale-95 cursor-pointer">
                  Search Your Car
                </button>
              </div>
            )}
          </div>

          {/* ---------- TABLET / DESKTOP: original filter box, unchanged ---------- */}
          <div className="hidden sm:block border border-border-light rounded-xl p-5 mb-8 bg-card-light h-[185px]">
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
            <button className="w-full bg-brand-gold hover:bg-brand-gold-hover text-black py-2.5 sm:py-3 px-6 sm:px-8 rounded font-semibold text-sm transition-all active:scale-95 cursor-pointer">
              Search Your Car
            </button>
          </div>

          {/* Results Count */}
          <p className="text-black font-semibold text-sm mb-4 sm:mb-6">556 RESULTS</p>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6">
            {paginated.map((deal) => (
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

          {/* Pagination */}
          <div className="flex items-center gap-2 mt-8 sm:mt-10 justify-center sm:justify-start">
            {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 sm:w-8 sm:h-8 rounded-full text-sm font-medium transition-colors duration-300 ${
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