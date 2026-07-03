import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, CarFront, MapPin, Zap } from 'lucide-react';
import { sanityFetch } from '@/sanity/lib/live';
import { urlFor } from '@/sanity/lib/image';
import Footer from '@/components/footer';
import QuoteForm from './QuoteForm';
import type { SanityHotDeal } from '@/components/popularDeals';

// We fetch the deal based on the _id parameter
const DEAL_QUERY = `*[_type == "hotDeals" && _id == $id][0]`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data } = await sanityFetch({
    query: DEAL_QUERY,
    params: { id },
  });
  const deal = data as SanityHotDeal;

  if (!deal) {
    return {
      title: 'Deal Not Found',
    };
  }

  const dealTitle = `${deal.year} ${deal.make} ${deal.model}`;
  const dealDescription = `Lease a ${deal.year} ${deal.make} ${deal.model} in ${deal.location} for $${deal.price}/month for ${deal.months} months. Contact Nine Star Auto today!`;

  return {
    title: dealTitle,
    description: dealDescription,
  };
}

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
    <>
      <main className="min-h-screen bg-white font-[montserrat]">
      {/* Hero Banner */}
      <div className="relative w-full h-[220px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden">
        <img
          src="/Applications/ApplicationTop.png"
          alt="Credit Application"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 z-10 flex items-center justify-center text-center px-4 sm:items-end sm:justify-start sm:text-left sm:pb-12">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-widest leading-tight uppercase">
              GET A QUOTE
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="w-full py-10 sm:py-16 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Back button */}
          <div className="mb-8">
            <Link
              href="/#hot-deals"
              className="inline-flex items-center text-sm font-semibold text-brand-gold hover:text-brand-gold-hover transition-colors gap-2 group"
            >
              <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
              Back to Hot Deals
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Car Showroom & Specs */}
            <div className="lg:col-span-7 space-y-8">
              {/* Showroom Showcase with Radial Glow */}
              <div className="relative bg-gray-50 border border-border-light rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[400px]">
                {/* Radial Glow Effect */}
                <div className="absolute w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] rounded-full bg-brand-gold/5 blur-[80px] sm:blur-[120px] pointer-events-none z-0" />
                
                {/* Car Image */}
                <div className="relative z-10 w-full flex justify-center items-center transform hover:scale-[1.03] transition-transform duration-500">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={deal.title}
                      className="w-full max-w-[480px] sm:max-w-[550px] object-contain"
                    />
                  )}
                </div>
              </div>

              {/* Vehicle Title & Subtitle */}
              <div>
                <span className="inline-block px-3 py-1 rounded bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-semibold tracking-wider uppercase mb-3">
                  Featured Lease Deal
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight leading-tight mb-3">
                  {deal.title}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
                  Get the best {deal.make} {deal.model} leasing price near you in NY, NJ, CT, and nationwide.
                </p>
              </div>

              {/* Price & Highlight Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pricing Card */}
                <div className="bg-gray-50 border border-border-light rounded-xl p-5 flex flex-col justify-center">
                  <span className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-medium">Monthly Payment</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold text-brand-gold">${deal.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500">/ mo</span>
                  </div>
                </div>

                {/* Down Payment Card */}
                <div className="bg-gray-50 border border-border-light rounded-xl p-5 flex flex-col justify-center">
                  <span className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-medium">Down Payment</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">$0</span>
                    <span className="text-sm text-gray-500">Down Payment</span>
                  </div>
                </div>
              </div>

              {/* Vehicle Specs Grid */}
              <div className="bg-gray-50 border border-border-light rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-border-light">
                  Lease Specifications
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {/* Term */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Lease Term</p>
                      <p className="text-sm font-semibold text-gray-900">{deal.months} Months</p>
                    </div>
                  </div>

                  {/* Year */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Model Year</p>
                      <p className="text-sm font-semibold text-gray-900">{deal.year}</p>
                    </div>
                  </div>

                  {/* Body Type */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0">
                      <CarFront className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Body Type</p>
                      <p className="text-sm font-semibold text-gray-900">{deal.body || 'SUV'}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Availability</p>
                      <p className="text-sm font-semibold text-gray-900 truncate max-w-[150px] sm:max-w-none">{deal.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Quote Form */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <QuoteForm carTitle={deal.title} />
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
