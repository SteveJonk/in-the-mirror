'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import { NAV_LINKS, PHOTO_CREDITS } from '@/lib/nav';

export function SiteFooter() {
  const pathname = usePathname();
  const credit = PHOTO_CREDITS[pathname];

  return (
    <footer className='bg-surface-alt py-20 md:py-28'>
      <RevealGroup className={cn(wrapClass, 'grid gap-14 md:grid-cols-12 md:gap-x-10')}>
        <Reveal className='md:col-span-5'>
          <p className='font-display text-[2.2rem] leading-none'>In the Mirror</p>
          <p className='mt-4 text-muted'>Camilla Amba</p>
        </Reveal>

        <Reveal as='nav' aria-label='Voetmenu' className='md:col-span-3'>
          <ul className='space-y-2'>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className='underline-offset-[6px] hover:underline aria-[current=page]:underline aria-[current=page]:decoration-1 aria-[current=page]:underline-offset-[8px]'
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className='space-y-5 text-[1rem] md:col-span-4'>
          <p>Aangesloten bij de AVN (Astrologische Vakvereniging Nederland).</p>
          <p className='text-muted'>
            Mijn aanbod is geen therapie of crisisopvang en geen vervanging voor reguliere zorg.
          </p>
        </Reveal>
      </RevealGroup>

      <Reveal variant='fade' className={cn(wrapClass, 'mt-20 text-[0.9rem] text-muted')}>
        <p>© 2026 Camilla Amba.{credit ? ` ${credit}` : ''}</p>
      </Reveal>
    </footer>
  );
}
