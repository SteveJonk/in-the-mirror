'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useInterfaceTexts } from '@/components/layout/InterfaceTexts';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import type { NavLink } from '@/lib/site';

type SiteFooterProps = {
  siteName: string;
  owner: string;
  links: NavLink[];
  text?: string | null;
  smallPrint?: string | null;
  copyright?: string | null;
  /** Photo credit per path; the one for the page being shown is appended to the copyright. */
  photoCredits: Record<string, string>;
};

export function SiteFooter({ siteName, owner, links, text, smallPrint, copyright, photoCredits }: SiteFooterProps) {
  const ui = useInterfaceTexts();
  const pathname = usePathname();
  const bottomLine = [copyright, photoCredits[pathname]].filter(Boolean).join(' ');

  return (
    <footer className='bg-surface-alt py-20 md:py-28'>
      <RevealGroup className={cn(wrapClass, 'grid gap-14 md:grid-cols-12 md:gap-x-10')}>
        <Reveal className='md:col-span-5'>
          <p className='font-display text-[2.2rem] leading-none'>{siteName}</p>
          {owner && <p className='mt-4 text-muted'>{owner}</p>}
        </Reveal>

        <Reveal as='nav' aria-label={ui.footerMenu} className='md:col-span-3'>
          <ul className='space-y-2'>
            {links.map((link) => (
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

        {(text || smallPrint) && (
          <Reveal className='space-y-5 text-[1rem] md:col-span-4'>
            {text && <p>{text}</p>}
            {smallPrint && <p className='text-muted'>{smallPrint}</p>}
          </Reveal>
        )}
      </RevealGroup>

      {bottomLine && (
        <Reveal variant='fade' className={cn(wrapClass, 'mt-20 text-[0.9rem] text-muted')}>
          <p>{bottomLine}</p>
        </Reveal>
      )}
    </footer>
  );
}
