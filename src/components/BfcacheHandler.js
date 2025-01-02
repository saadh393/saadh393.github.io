'use client';

import { useEffect } from 'react';

export default function BfcacheHandler() {
  useEffect(() => {
    // Handle page show/hide for bfcache
    const handlePageShow = (event) => {
      if (event.persisted && typeof window.gtag === 'function') {
        // Page was restored from bfcache
        window.gtag('event', 'page_view', {
          page_location: window.location.href,
          page_title: document.title,
          bfcache: true
        });
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  return null;
}
