'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { CSSProperties } from 'react';
import { LogoMark } from '@/components/ui/LogoMark';
import { useMobileNav } from '@/hooks/useMobileNav';
import { useStickyTopbar } from '@/hooks/useStickyTopbar';
import { cn } from '@/lib/cn';
import { NAV_LINKS } from '@/lib/nav';

const current = (pathname: string, href: string) => (pathname === href ? 'page' : undefined);

function Wordmark({ className }: { className?: string }) {
  return (
    <>
      <LogoMark className={className} />
      <span>In the Mirror</span>
    </>
  );
}

/** Fixed header: slides away on scroll down, returns on scroll up. Below `lg` a full-screen menu. */
export function SiteHeader() {
  const pathname = usePathname();
  const { scrolled, hidden } = useStickyTopbar();
  const { open, show, close, origin, menuRef, openRef, closeRef } = useMobileNav();

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-30',
          '[transition:translate_.45s_var(--ease-soft),background-color_.3s_ease,box-shadow_.3s_ease]',
          hidden &&
            '-translate-y-full [transition-duration:.3s] [transition-timing-function:var(--ease-exit)]',
          // Keyboard focus must never sit in a header that has slid away.
          'has-[:focus-visible]:translate-y-0 motion-reduce:transition-none',
          scrolled && 'bg-surface/94 shadow-[0_1px_0_var(--color-line)] backdrop-blur-[10px]',
        )}
      >
        <div className='mx-auto flex h-[4.5rem] max-w-site items-center justify-between px-6 md:px-12 lg:h-24 lg:px-20'>
          <Link
            href='/'
            className='inline-flex items-center gap-3 font-display text-[1.6rem] leading-none tracking-[-0.005em] lg:gap-3.5 lg:text-[1.75rem]'
          >
            <Wordmark className='size-9 lg:size-10' />
          </Link>

          <nav aria-label='Hoofdmenu' className='hidden lg:block'>
            <ul className='flex gap-7 xl:gap-11'>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={current(pathname, link.href)}
                    className='inline-block py-2 font-display text-[1.3rem] leading-none decoration-1 underline-offset-[8px] hover:underline aria-[current=page]:underline'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={openRef}
            type='button'
            onClick={show}
            className='-mr-2.5 flex size-11 items-center justify-center lg:hidden'
            aria-label='Menu openen'
            aria-expanded={open}
            aria-controls='menu'
          >
            <svg
              viewBox='0 0 24 24'
              className='size-7'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              aria-hidden='true'
            >
              <path d='M3 7h18M3 12h18M3 17h18' />
            </svg>
          </button>
        </div>
      </header>

      {/* The menu grows as a circle out of the button that opened it; closing is faster. */}
      <div
        ref={menuRef}
        id='menu'
        role='dialog'
        aria-modal='true'
        aria-label='Menu'
        style={origin}
        className={cn(
          'fixed inset-0 z-40 overflow-y-auto bg-surface motion-reduce:transition-none',
          open
            ? 'visible [clip-path:circle(var(--r,150vmax)_at_var(--ox,100%)_var(--oy,0px))] [transition:clip-path_.8s_var(--ease-soft),visibility_0s]'
            : 'invisible [clip-path:circle(0px_at_var(--ox,100%)_var(--oy,0px))] [transition:clip-path_.38s_var(--ease-exit),visibility_0s_linear_.38s]',
        )}
      >
        <div className='mx-auto flex h-[4.5rem] max-w-site items-center justify-between px-6 md:px-12'>
          <span className='inline-flex items-center gap-3 font-display text-[1.6rem] leading-none'>
            <Wordmark className='size-9' />
          </span>
          <button
            ref={closeRef}
            type='button'
            onClick={() => close()}
            className='-mr-2.5 flex size-11 items-center justify-center'
            aria-label='Menu sluiten'
          >
            <svg
              viewBox='0 0 24 24'
              className={cn('size-7', open && 'animate-cross-in motion-reduce:animate-none')}
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              aria-hidden='true'
            >
              <path d='M5 5l14 14M19 5L5 19' />
            </svg>
          </button>
        </div>
        <ul className='mx-auto mt-12 max-w-site space-y-2 px-6 font-display text-[2.4rem] leading-tight md:px-12'>
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.href}
              style={{ '--i': i } as CSSProperties}
              className={cn(
                'motion-reduce:transition-none',
                open
                  ? '[transition:opacity_.6s_var(--ease-soft)_calc(.22s_+_var(--i)_*_70ms),translate_.8s_var(--ease-soft)_calc(.22s_+_var(--i)_*_70ms)]'
                  : 'translate-y-[22px] opacity-0 [transition:opacity_.2s_ease,translate_.2s_ease]',
              )}
            >
              <Link
                href={link.href}
                onClick={() => close(false)}
                aria-current={current(pathname, link.href)}
                className='block py-2 decoration-1 underline-offset-[8px] aria-[current=page]:underline'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
