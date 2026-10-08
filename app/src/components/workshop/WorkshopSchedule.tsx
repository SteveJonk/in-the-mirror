import { Cta } from '@/components/ui/Cta';
import { Curve } from '@/components/ui/Curve';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

/** A slot without `body` is a break: shown quieter, with no heading. */
const SCHEDULE: { time: string; title: string; body?: string }[] = [
  { time: '09:30 – 10:00', title: 'Welkom & Landen', body: 'Koffie, thee, rustig je plek vinden' },
  {
    time: '10:00 – 11:15',
    title: 'De spiegel van Lilith',
    body: 'Kennismaking en introductie van het archetype',
  },
  { time: '11:15 – 11:30', title: 'Korte pauze' },
  {
    time: '11:30 – 12:45',
    title: 'Kijken in jouw eigen spiegel',
    body: 'Praktische en diepgaande 1-op-1 uitwisseling op basis van jouw unieke blauwdruk',
  },
  { time: '12:45 – 14:00', title: 'Warme, verzorgde lunch' },
  {
    time: '14:00 – 15:15',
    title: 'Achter de spiegel',
    body: 'Energetische verdieping en werk met intuïtieve reflectiekaarten',
  },
  { time: '15:15 – 15:30', title: 'Korte pauze' },
  {
    time: '15:30 – 16:30',
    title: 'De nieuwe blik in de spiegel',
    body: 'Gezamenlijke integratie en afronding in de cirkel',
  },
];

export function WorkshopSchedule() {
  return (
    <section id='dagprogramma' className='relative bg-surface-alt py-28 md:py-44'>
      <RevealGroup className={cn(wrapClass, 'grid gap-14 md:grid-cols-12 md:gap-x-10')}>
        <div className='md:col-span-4'>
          <Reveal as='h2' className='font-display text-h2 text-balance'>
            Dagprogramma
          </Reveal>
          <Reveal as='p' className='mt-9 max-w-[24rem]'>
            Een dag in vaste stappen, inclusief lunch en twee korte pauzes.
          </Reveal>
          <Reveal className='mt-10'>
            <Cta href='#inschrijven'>Meld je interesse aan</Cta>
          </Reveal>
        </div>
        <ol className='md:col-span-7 md:col-start-6'>
          {SCHEDULE.map((slot) => (
            <Reveal
              as='li'
              key={slot.time}
              className='grid gap-x-8 gap-y-1 border-t border-line py-6 last:border-b md:grid-cols-[11rem_1fr] md:py-7'
            >
              <p className={cn('font-display text-[1.65rem] leading-none', !slot.body && 'text-muted')}>
                {slot.time}
              </p>
              {slot.body ? (
                <div>
                  <h3 className='text-[1.2rem] font-medium'>{slot.title}</h3>
                  <p className='text-muted'>{slot.body}</p>
                </div>
              ) : (
                <p className='text-[1.15rem] text-muted'>{slot.title}</p>
              )}
            </Reveal>
          ))}
        </ol>
      </RevealGroup>
      <Curve into='inverse' />
    </section>
  );
}
