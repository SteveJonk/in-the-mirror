'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { MOBILE_NAV_BREAKPOINT } from '@/lib/chrome';

/**
 * The full-screen mobile menu: a dialog that grows as a circle out of the
 * button that opened it. Handles focus (into the dialog, trapped while open,
 * back to the button on close), Escape, body scroll and closing when the
 * viewport widens to the desktop nav.
 */
export function useMobileNav() {
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<CSSProperties>({});
  const menuRef = useRef<HTMLDivElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(true);
  const wasOpen = useRef(false);

  const show = useCallback(() => {
    const button = openRef.current;
    if (button) {
      const r = button.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const radius = Math.ceil(
        Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy)),
      );
      setOrigin({ '--ox': `${cx}px`, '--oy': `${cy}px`, '--r': `${radius}px` } as CSSProperties);
    }
    setOpen(true);
  }, []);

  /** `refocus: false` when closing because the visitor followed a link. */
  const close = useCallback((refocus = true) => {
    restoreFocus.current = refocus;
    setOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) closeRef.current?.focus();
    else if (wasOpen.current && restoreFocus.current) openRef.current?.focus({ preventScroll: true });
    wasOpen.current = open;
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return close();
      if (e.key !== 'Tab' || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>('a[href], button');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const wide = window.matchMedia(`(min-width: ${MOBILE_NAV_BREAKPOINT}px)`);
    const onWide = (m: MediaQueryListEvent) => m.matches && close(false);
    document.addEventListener('keydown', onKeyDown);
    wide.addEventListener('change', onWide);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      wide.removeEventListener('change', onWide);
    };
  }, [open, close]);

  return { open, show, close, origin, menuRef, openRef, closeRef };
}
