'use client';

import React, { useState, useEffect } from 'react';
import MainPopup from './mainPopup';
import InstantQuote from './instantQuote';

export default function PopupManager() {
  const [showMainPopup, setShowMainPopup] = useState(false);
  const [showInstantQuote, setShowInstantQuote] = useState(false);

  // Auto-open main popup on first visit after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setShowMainPopup(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // "Contact Us" button → close popup, scroll to #contact section
  const handleContactUs = () => {
    setShowMainPopup(false);
    // Give the body scroll lock a moment to release, then scroll
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // "Discard" button → close main popup, open instant quote popup
  const handleDiscard = () => {
    setShowMainPopup(false);
    // Small delay for a smooth transition between popups
    setTimeout(() => setShowInstantQuote(true), 300);
  };

  // Close instant quote popup
  const handleCloseInstantQuote = () => {
    setShowInstantQuote(false);
  };

  return (
    <>
      <MainPopup
        isOpen={showMainPopup}
        onContactUs={handleContactUs}
        onDiscard={handleDiscard}
      />
      <InstantQuote
        isOpen={showInstantQuote}
        onClose={handleCloseInstantQuote}
      />
    </>
  );
}