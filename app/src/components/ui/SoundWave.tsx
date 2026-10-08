'use client';

import type { CSSProperties } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/cn';

/** Half the height of each bar, left to right, around the centre line. */
const BARS = [
  8, 16.2, 18.1, 23, 30.9, 24.8, 35.8, 41.1, 27.5, 47.8, 47.5, 38.2, 58.3, 50.2, 49.7, 66.3, 49.3,
  61.1, 71.2, 45.4, 71.2, 72.5, 48.3, 79, 70.3, 59.2, 83.7, 64.8, 69.1, 84.9, 56.8, 76.9, 82.4, 47.3,
  81.7, 76.5, 55.3, 83, 67.9, 62.3, 80.7, 57.4, 66.5, 75, 46.2, 67.4, 66.3, 41.5, 64.8, 55.7, 43.9,
  58.6, 44, 43.1, 49.4, 32.5, 38.5, 37.9, 22.1, 29.9, 24.8, 16.4, 16.1, 8,
];

/**
 * A waveform drawn in code, so its bars can grow one after another, left to
 * right, once it scrolls into view. Decorative: it says nothing a screen
 * reader needs.
 */
export function SoundWave({ className }: { className?: string }) {
  const { ref, delay } = useReveal<SVGSVGElement>();
  const shown = delay !== null;

  return (
    <svg
      ref={ref}
      viewBox='0 0 1200 220'
      className={cn('h-auto w-full stroke-fg', className)}
      strokeWidth='3'
      strokeLinecap='round'
      aria-hidden='true'
    >
      {BARS.map((half, i) => {
        const x = 20 + i * 18.3;
        return (
          <line
            key={i}
            x1={x}
            x2={x}
            y1={110 - half}
            y2={110 + half}
            style={{ transitionDelay: `${(delay ?? 0) + 350 + i * 28}ms` } as CSSProperties}
            className={cn(
              'origin-center [transform-box:fill-box] reveal:[transition:scale_.8s_cubic-bezier(.2,.7,.2,1)]',
              !shown && 'reveal:scale-y-0',
            )}
          />
        );
      })}
    </svg>
  );
}
