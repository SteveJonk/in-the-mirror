'use client';

import { useEffect, useState } from 'react';
import { HEADER_HIDE_THRESHOLD, HEADER_SCROLL_DELTA } from '@/lib/chrome';

/**
 * Header state from the scroll position: `scrolled` once the page has moved
 * (solid background), `hidden` while scrolling down past the threshold — it
 * returns as soon as the visitor scrolls back up.
 */
export function useStickyTopbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = Math.max(0, window.scrollY);
      const diff = y - last;
      setScrolled(y > 8);
      if (y <= HEADER_HIDE_THRESHOLD) {
        setHidden(false);
        last = y;
      } else if (Math.abs(diff) > HEADER_SCROLL_DELTA) {
        setHidden(diff > 0);
        last = y;
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { scrolled, hidden };
}
