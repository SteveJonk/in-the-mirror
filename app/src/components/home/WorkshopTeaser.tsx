import { Cta } from '@/components/ui/Cta';
import { Curve } from '@/components/ui/Curve';
import { FactList } from '@/components/ui/FactList';
import { MirrorArch } from '@/components/ui/MirrorArch';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

export function WorkshopTeaser() {
  return (
    <section id='workshop' className='relative bg-surface-alt py-32 md:py-48'>
      <RevealGroup className={cn(wrapClass, 'grid items-center gap-20 md:grid-cols-12 md:gap-x-10')}>
        <div className='md:col-span-6 md:row-start-1'>
          <Reveal as='h2' className='font-display text-h2 text-balance'>
            In the Mirror: ruimte voor je ongetemde zelf
          </Reveal>
          <div className='mt-9 max-w-[34rem] space-y-6'>
            <Reveal as='p'>
              In de psychologische astrologie staat Lilith, de Zwarte Maan, symbool voor dat deel
              van ons dat zich niet laat aanpassen. Onze diepste oerkracht en autonomie, maar vaak
              ook de plek waar we afwijzing en overgedragen familiepatronen met ons meedragen.
            </Reveal>
            <Reveal as='p'>
              In een kleine, besloten groep gebruiken we dit eeuwenoude instrument niet om de
              toekomst te voorspellen, maar als psychologische spiegel. De workshop is open voor
              vrouwen én mannen.
            </Reveal>
          </div>

          <Reveal className='mt-10'>
            <FactList
              facts={[
                { label: 'Programma', value: 'Eén dag, 09:30 tot 16:30' },
                { label: 'Investering', value: '€ 275, of € 415 met een persoonlijk gesprek' },
                { label: 'Regio', value: 'Noord-Holland en Utrecht' },
              ]}
            />
          </Reveal>

          <Reveal className='mt-10'>
            <Cta href='/workshop' variant='outline'>
              Bekijk de workshop
            </Cta>
          </Reveal>
        </div>

        <Reveal variant='rise' delay={1} className='md:col-span-5 md:col-start-8 md:row-start-1'>
          <MirrorArch />
        </Reveal>
      </RevealGroup>
      <Curve into='surface' />
    </section>
  );
}
