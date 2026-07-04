'use client';

import { useEffect } from 'react';

export default function ScrollToImage() {
  useEffect(() => {
    // Small delay to ensure the page has fully rendered
    const timer = setTimeout(() => {
      const el = document.getElementById('vehicle-image');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
