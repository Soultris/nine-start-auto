'use client';

import React, { useEffect } from 'react';

interface MainPopupProps {
  isOpen: boolean;
  onContactUs: () => void;
  onDiscard: () => void;
}

export default function MainPopup({ isOpen, onContactUs, onDiscard }: MainPopupProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-lg bg-card-dark rounded-2xl p-8 shadow-2xl font-[montserrat]">

        {/* Title */}
        <h2 className="text-xl font-semibold text-white mb-3 tracking-tight leading-snug">
          REGISTERED AUTO MOBILE BROKER
        </h2>

        {/* Subtitle */}
        <p className="text-muted text-xs leading-relaxed mb-6">
          NineStarAuto is not a registered new motor vehicle dealer but is a registered automobile
          broker business as defined in Section 415 of the Vehicle and Traffic Law.
        </p>

        {/* Registration */}
        <p className="text-white text-sm mb-3">
          <span className="font-bold">NineStarAuto</span>
          <span className="text-muted">&apos;s Registration Number is </span>
          <span className="font-bold">123123123</span>
        </p>

        {/* Info lines */}
        <p className="text-muted text-xs leading-relaxed mb-4">
          A broker fee may be charged. Details shall be provided upon request by the consumer.
        </p>

        <p className="text-muted text-xs leading-relaxed mb-8">
          All new vehicles are equipped with bumper to bumper warranty. No warranty repair services
          will be provided by{' '}
          <span className="text-white font-bold">NineStarAuto</span>
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={onContactUs}
            className="bg-brand-gold text-black text-sm font-medium px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity duration-300"
          >
            Contact Us
          </button>
          <button
            onClick={onDiscard}
            className="border border-brand-gold text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-brand-gold hover:text-black transition-all duration-300"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}