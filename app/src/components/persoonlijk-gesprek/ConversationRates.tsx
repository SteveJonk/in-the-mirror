import { Curve } from '@/components/ui/Curve';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';

const RATES = [
  {
    title: 'Eerste gesprek',
    subtitle: 'Intake & diepte-inzicht',
    price: '€ 240',
    body: 'Duurt 1,5 uur. Vrijgesteld van btw via de KOR, inclusief de voorbereiding van jouw persoonlijke spiegel.',
  },
  {
    title: 'Vervolggesprekken',
    subtitle: 'Verder kijken, op jouw tempo',
    price: '€ 115',
    body: 'Duurt 1 uur. Vrijgesteld van btw via de KOR.',
  },
];

const iconProps = {
  viewBox: '0 0 48 48',
  className: 'size-11 shrink-0 stroke-fg',
  fill: 'none',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

export function ConversationRates() {
  return (
    <section
      id='tarieven'
      aria-labelledby='tarieven-h'
      className='relative bg-surface-alt py-28 md:py-44'
    >
      <RevealGroup className={wrapClass}>
        <Reveal as='h2' id='tarieven-h' className='font-display text-h2 text-balance'>
          Een gesprek, in twee vormen
        </Reveal>
        <div className='mt-16 grid gap-14 border-t border-fg pt-12 md:grid-cols-2 md:gap-x-16'>
          {RATES.map((rate) => (
            <Reveal key={rate.title}>
              <h3 className='font-display text-h3 text-balance'>{rate.title}</h3>
              <p className='mt-2 text-muted'>{rate.subtitle}</p>
              <p className='mt-8 font-display text-price'>{rate.price}</p>
              <p className='mt-3 text-[1.05rem]'>{rate.body}</p>
            </Reveal>
          ))}
        </div>
        <div className='mt-16 grid gap-8 border-t border-line pt-12 md:grid-cols-12 md:gap-x-10'>
          <Reveal as='p' className='md:col-span-3 md:pt-1'>
            Veilig en anoniem, op twee manieren:
          </Reveal>
          <Reveal className='flex items-center gap-5 md:col-span-4'>
            <svg {...iconProps}>
              <rect x='6' y='9' width='36' height='24' rx='3' />
              <path d='M16 40h16M24 33v7' />
            </svg>
            <p>Online via Zoom</p>
          </Reveal>
          <Reveal className='flex items-center gap-5 md:col-span-4'>
            <svg {...iconProps}>
              <path d='M12 42V20a12 12 0 0 1 24 0v22z' />
              <path d='M8 42h32' />
              <circle cx='30' cy='30' r='1.4' className='fill-fg' />
            </svg>
            <p>Of op een rustige fysieke locatie</p>
          </Reveal>
        </div>
      </RevealGroup>
      <Curve into='surface' />
    </section>
  );
}
