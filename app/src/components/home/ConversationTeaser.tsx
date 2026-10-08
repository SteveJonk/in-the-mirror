import { Cta } from '@/components/ui/Cta';
import { Curve } from '@/components/ui/Curve';
import { FactList } from '@/components/ui/FactList';
import { Illustration } from '@/components/ui/Illustration';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

export function ConversationTeaser() {
  return (
    <section id='gesprek' className='relative bg-surface-alt py-32 md:py-48'>
      <RevealGroup className={cn(wrapClass, 'grid items-center gap-16 md:grid-cols-12 md:gap-x-10')}>
        <div className='md:col-span-6 md:row-start-1'>
          <Reveal as='h2' className='font-display text-h2 text-balance'>
            Liever een persoonlijk gesprek?
          </Reveal>
          <div className='mt-9 max-w-[34rem] space-y-6'>
            <Reveal as='p'>
              Een gesprek van één op één, online of op een rustige locatie. Je kunt me vooraf je
              vragen voorleggen en aangeven waar je het specifiek over wilt hebben.
            </Reveal>
            <Reveal as='p'>
              Je hoeft niets van astrologie te weten en er niet eens in te geloven. Zie het als een
              nuchtere, inzichtelijke spiegel op basis van het werk van Carl Jung, zodat jij het
              overzicht terugkrijgt en met een frisse blik verder kunt.
            </Reveal>
          </div>

          <Reveal className='mt-10'>
            <FactList
              facts={[
                { label: 'Eerste gesprek, 1,5 uur', value: '€ 240' },
                { label: 'Vervolggesprek, 1 uur', value: '€ 115' },
              ]}
            />
          </Reveal>
          <Reveal as='p' className='mt-3 max-w-[34rem] text-[0.95rem] text-muted'>
            Vrijgesteld van btw via de KOR. Online via Zoom of op een rustige fysieke locatie.
          </Reveal>

          <Reveal className='mt-10'>
            <Cta href='/persoonlijk-gesprek'>Plan een gesprek</Cta>
          </Reveal>
        </div>

        <Reveal
          as='figure'
          variant='curtain'
          delay={1}
          className='md:col-span-5 md:col-start-8 md:row-start-1'
        >
          <div className='flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl bg-accent p-10'>
            <Illustration
              name='samen-in-gesprek'
              alt='Illustratie: twee mensen zitten ontspannen met elkaar in gesprek'
              className='max-w-[20rem]'
            />
          </div>
        </Reveal>
      </RevealGroup>
      <Curve into='surface' />
    </section>
  );
}
