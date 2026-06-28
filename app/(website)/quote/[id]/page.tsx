import React from 'react';
import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/lib/live';
import { urlFor } from '@/sanity/lib/image';
import QuoteForm from './QuoteForm';
import type { SanityHotDeal } from '@/components/popularDeals';

// We fetch the deal based on the _id parameter
const DEAL_QUERY = `*[_type == "hotDeals" && _id == $id][0]`;

export default async function QuotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await sanityFetch({
    query: DEAL_QUERY,
    params: { id },
  });
  const deal = data as SanityHotDeal;

  if (!deal) {
    // If the deal is not found in Sanity, we show a 404
    notFound();
  }

  const imageUrl = deal.image && typeof deal.image === 'object' ? urlFor(deal.image).url() : deal.image;

  return (
    <main className="min-h-screen pt-24 pb-16 bg-white font-[montserrat]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-stretch">

          {/* Left Column: Car Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              {deal.title}
            </h1>
            <p className="text-sm font-semibold text-gray-600 mb-8">
              Best {deal.make} {deal.model} Leasing Price Near You NY NJ CT + All USA
            </p>

            {/* Price Block */}
            <div className="inline-block self-start mb-6 rounded-md overflow-hidden bg-card-dark">
              <div className="px-6 py-3 text-brand-gold text-xl md:text-2xl font-bold flex items-center gap-3">
                <span>${deal.price.toFixed(2)}</span>
                <span className="text-sm font-normal text-caption">/ per month</span>
              </div>
            </div>

            {/* Desktop Add to Quote Button */}
            <div className="hidden lg:block mb-10">
              <button
                className="text-black font-semibold py-3 px-12 rounded bg-brand-gold hover:bg-brand-gold-hover transition-colors opacity-80 cursor-default"
              >
                Add To Quote
              </button>
            </div>

            {/* Car Image */}
            <div className="mt-auto mb-10 w-full flex justify-center items-center">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={deal.title}
                  className="w-full max-w-[500px] object-contain drop-shadow-2xl scale-110"
                />
              )}
            </div>
          </div>

          {/* Right Column: Quote Form */}
          <div className="h-full min-h-[600px]">
            <QuoteForm carTitle={deal.title} />
          </div>

        </div>
      </div>
    </main>
  );
}
