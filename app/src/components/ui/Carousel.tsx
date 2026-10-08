'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useInterfaceTexts } from '@/components/layout/InterfaceTexts';
import { cn } from '@/lib/cn';

function Arrow({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className={cn('size-5', flip && 'rotate-180')}>
      <path d='M5 12h14M13 6l6 6-6 6' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}

const arrowClass =
  'inline-flex size-11 items-center justify-center rounded-full border border-fg transition duration-200 hover:border-brand hover:bg-brand active:scale-[0.95] disabled:pointer-events-none disabled:opacity-30';

/**
 * Below md: a row that slides sideways, swiped or stepped with the arrows,
 * running out to the edge of the screen so the next item peeks in.
 * From md up the track is whatever `className` makes of it (a grid, say)
 * and the arrows are gone.
 *
 * Sits inside the page gutter (`wrapClass`); it bleeds through it on its own.
 */
export function Carousel({ className, children }: { className?: string; children: ReactNode }) {
  const ui = useInterfaceTexts();
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 1,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  /** One item (and the gap after it) per press. */
  const step = (direction: 1 | -1) => {
    const el = track.current;
    const item = el?.firstElementChild;
    if (!el || !item) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (item.getBoundingClientRect().width + gap), behavior: 'smooth' });
  };

  return (
    <div>
      <div
        ref={track}
        onScroll={update}
        className={cn(
          '-mx-6 flex snap-x snap-mandatory scroll-px-6 overflow-x-auto overscroll-x-contain px-6 [scrollbar-width:none] md:mx-0 md:snap-none md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden',
          className,
        )}
      >
        {children}
      </div>
      <div className='mt-6 flex justify-end gap-3 md:hidden'>
        <button type='button' aria-label={ui.previous} disabled={edges.start} onClick={() => step(-1)} className={arrowClass}>
          <Arrow flip />
        </button>
        <button type='button' aria-label={ui.next} disabled={edges.end} onClick={() => step(1)} className={arrowClass}>
          <Arrow />
        </button>
      </div>
    </div>
  );
}
