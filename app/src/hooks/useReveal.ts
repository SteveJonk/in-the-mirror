'use client';

import { useEffect, useRef, useState } from 'react';

/*
 * Scroll reveal, shared by every <Reveal> on the page.
 *
 * Desktop (md+): a <RevealGroup> reveals all its items at once, cascading
 * 85ms apart in document order, when the group scrolls into view.
 * Mobile, or outside a group: items reveal one by one as they arrive.
 * An item with a fixed `delay` slot keeps that slot instead of counting along.
 *
 * Off for visitors who prefer reduced motion — the hidden styles (the
 * `reveal:` variant in globals.css) don't apply to them either.
 */

const STEP = 85;
const CAP = 7;

type Item = { show: (delayMs: number) => void; slot?: number; shown: boolean };

const items = new Map<Element, Item>();
let groupIO: IntersectionObserver | undefined;
let itemIO: IntersectionObserver | undefined;
let wide: MediaQueryList;

const enabled = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/** In view, or already scrolled past. */
const seen = (e: IntersectionObserverEntry) => e.isIntersecting || e.boundingClientRect.top < 0;

function show(el: Element, index: number) {
  const item = items.get(el);
  if (!item || item.shown) return;
  item.shown = true;
  item.show(Math.min(index, CAP) * STEP);
}

function showGroup(group: Element) {
  let n = 0;
  group.querySelectorAll('[data-reveal]').forEach((el) => show(el, items.get(el)?.slot ?? n++));
}

function setup() {
  if (itemIO) return;
  wide = window.matchMedia('(min-width: 768px)');

  const groups = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!seen(e) || !wide.matches) continue;
        showGroup(e.target);
        groups.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -18% 0px' },
  );

  const singles = new IntersectionObserver(
    (entries) => {
      let n = 0;
      entries
        .filter(seen)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        .forEach((e) => {
          const el = e.target;
          if (items.get(el)?.shown) return singles.unobserve(el);
          if (el.closest('[data-reveal-group]') && wide.matches) return; // its group handles it
          show(el, e.boundingClientRect.top < 0 ? 0 : n++);
          singles.unobserve(el);
        });
    },
    { rootMargin: '0px 0px -8% 0px' },
  );

  // Safety nets: never leave content hidden.
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 4) return;
        let n = 0;
        items.forEach((item, el) => !item.shown && show(el, n++));
      });
    },
    { passive: true },
  );
  wide.addEventListener('change', () => items.forEach((_, el) => show(el, 0)));

  groupIO = groups;
  itemIO = singles;
}

/** `delay` is null while hidden, then the cascade delay in ms. */
export function useReveal<T extends Element>(slot?: number) {
  const ref = useRef<T>(null);
  const [delay, setDelay] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled()) return;
    setup();
    items.set(el, { show: setDelay, slot, shown: false });
    itemIO!.observe(el);
    return () => {
      items.delete(el);
      itemIO!.unobserve(el);
    };
  }, [slot]);

  return { ref, delay };
}

export function useRevealGroup<T extends Element>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled()) return;
    setup();
    groupIO!.observe(el);
    return () => groupIO!.unobserve(el);
  }, []);

  return ref;
}
