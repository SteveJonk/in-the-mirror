import { Curve } from '@/components/ui/Curve';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';

export function ConversationBooking() {
  return (
    <section id='agenda' aria-labelledby='agenda-h' className='relative py-28 md:py-44'>
      <RevealGroup className={wrapClass}>
        <div className='grid gap-10 md:grid-cols-12 md:gap-x-10'>
          <Reveal as='h2' id='agenda-h' className='font-display text-h2 text-balance md:col-span-6'>
            Plan direct jouw gesprek
          </Reveal>
          <Reveal as='p' className='max-w-[34rem] md:col-span-5 md:col-start-8 md:pt-3'>
            Kies hieronder in de agenda een dag en tijdstip dat jou uitkomt voor ons eerste gesprek.
            Nadat je je gegevens hebt ingevuld en de betaling is afgerond, ontvang je direct een
            bevestiging in je mailbox.
          </Reveal>
        </div>
        {/* Cal.com: replace this placeholder with the agenda iframe (events: "Eerste gesprek" and "Vervolggesprek"). */}
        <Reveal
          delay={2}
          role='region'
          aria-label='Plek voor de agenda'
          className='mt-14 flex min-h-[30rem] flex-col items-center justify-center gap-6 border border-dashed border-fg/50 bg-surface-alt px-6 py-16 text-center md:mt-20 md:min-h-[38rem]'
        >
          <svg
            viewBox='0 0 120 100'
            className='h-24 w-28 stroke-fg'
            fill='none'
            strokeWidth='1.6'
            strokeLinecap='round'
            aria-hidden='true'
          >
            <rect x='10' y='14' width='100' height='78' rx='4' className='fill-surface' />
            <path d='M10 34h100M36 6v16M84 6v16' />
            <path d='M28 48h10M55 48h10M82 48h10M28 62h10M55 62h10M82 62h10M28 76h10M55 76h10' />
            <circle cx='87' cy='76' r='6' className='fill-accent' />
          </svg>
          <p className='font-display text-[1.7rem] leading-tight'>Hier komt de agenda</p>
          <p className='max-w-[28rem] text-muted'>
            Voor nu een placeholder: hier komt straks de Cal.com-agenda, met de keuze tussen een
            eerste gesprek en een vervolggesprek.
          </p>
        </Reveal>
      </RevealGroup>
      <Curve into='surface-alt' />
    </section>
  );
}
