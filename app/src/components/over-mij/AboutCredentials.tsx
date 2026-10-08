import type { ReactNode } from 'react';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';

const iconProps = {
  viewBox: '0 0 48 48',
  className: 'size-11 shrink-0 stroke-fg',
  fill: 'none',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

const CREDENTIALS: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: 'Onderwijs',
    body: 'Afgeronde HBO-opleiding Vrijeschool Pabo (ervaring met holistisch onderwijs, mensontwikkeling en groepsdynamica).',
    icon: (
      <svg {...iconProps}>
        <path d='M8 12c6-3 11-3 16 0v26c-5-3-10-3-16 0z' />
        <path d='M24 12c5-3 10-3 16 0v26c-6-3-11-3-16 0z' />
      </svg>
    ),
  },
  {
    title: 'Groepsbegeleiding',
    body: 'Gecertificeerd facilitator in Attitudinal Healing.',
    icon: (
      <svg {...iconProps}>
        <circle cx='24.0' cy='9.0' r='3.6' />
        <circle cx='38.3' cy='19.4' r='3.6' />
        <circle cx='32.8' cy='36.1' r='3.6' />
        <circle cx='15.2' cy='36.1' r='3.6' />
        <circle cx='9.7' cy='19.4' r='3.6' />
        <circle cx='24' cy='24' r='2' className='fill-fg' />
      </svg>
    ),
  },
  {
    title: 'Coaching',
    body: 'Gediplomeerd Energetisch Coach.',
    icon: (
      <svg {...iconProps}>
        <circle cx='24' cy='24' r='6' />
        <path d='M35.0 24.0L42.0 24.0M31.8 31.8L36.7 36.7M24.0 35.0L24.0 42.0M16.2 31.8L11.3 36.7M13.0 24.0L6.0 24.0M16.2 16.2L11.3 11.3M24.0 13.0L24.0 6.0M31.8 16.2L36.7 11.3' />
      </svg>
    ),
  },
  {
    title: 'Psychologische Astrologie',
    body: 'Op hbo-niveau erkend diploma consultent astroloog (Jungiaanse basis).',
    icon: (
      <svg {...iconProps}>
        <circle cx='24' cy='24' r='18' />
        <circle cx='24' cy='24' r='7' />
        <path d='M31.0 24.0L42.0 24.0M30.1 27.5L39.6 33.0M27.5 30.1L33.0 39.6M24.0 31.0L24.0 42.0M20.5 30.1L15.0 39.6M17.9 27.5L8.4 33.0M17.0 24.0L6.0 24.0M17.9 20.5L8.4 15.0M20.5 17.9L15.0 8.4M24.0 17.0L24.0 6.0M27.5 17.9L33.0 8.4M30.1 20.5L39.6 15.0' />
      </svg>
    ),
  },
];

export function AboutCredentials() {
  return (
    <section className='bg-surface-alt py-28 md:py-44'>
      <RevealGroup className={wrapClass}>
        <div className='grid gap-10 md:grid-cols-12 md:gap-x-10'>
          <div className='md:col-span-6'>
            <Reveal as='h2' className='font-display text-h2 text-balance'>
              Mijn achtergrond &amp; Kwaliteitsgarantie
            </Reveal>
          </div>
          <Reveal as='p' className='max-w-[34rem] md:col-span-5 md:col-start-8 md:pt-3'>
            Om jou de beste begeleiding te bieden, combineer ik mijn levenservaring met een stevige
            basis aan erkende opleidingen en registraties:
          </Reveal>
        </div>
        <ul className='mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4'>
          {CREDENTIALS.map((item) => (
            <Reveal as='li' key={item.title} className='flex flex-col gap-5'>
              {item.icon}
              <div>
                <h3 className='font-display text-h3 text-balance'>{item.title}</h3>
                <p className='mt-3 text-[1.05rem] leading-[1.65]'>{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal as='p' className='mt-16 max-w-[40rem] border-t border-line pt-8'>
          Aangesloten bij de AVN (Astrologische Vakvereniging Nederland), wat staat voor getoetste
          kwaliteit en professionele ethiek.
        </Reveal>
      </RevealGroup>
    </section>
  );
}
