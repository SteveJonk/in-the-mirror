import Image from '@/components/ui/Image';
import { Cta } from '@/components/ui/Cta';
import { TextLink } from '@/components/ui/TextLink';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

export function ConversationHero() {
  return (
    <section id='top' className='pt-32 pb-24 md:pt-48 md:pb-40'>
      <div className={cn(wrapClass, 'grid items-center gap-16 md:grid-cols-12 md:gap-x-10')}>
        <div className='animate-arrive motion-reduce:animate-none md:col-span-7'>
          <h1 className='font-display text-h1 text-balance'>Liever een persoonlijk gesprek?</h1>
          <p className='mt-9 max-w-[34rem] text-intro md:text-intro-lg'>
            In plaats van deelname aan een workshop, kun je ook kiezen voor een een-op-een gesprek
            online of op een rustige locatie. Je kunt mij vooraf je vragen alvast voorleggen en
            aangeven waar je het specifiek over wilt hebben.
          </p>
          <div className='mt-10 flex flex-wrap items-center gap-x-9 gap-y-3'>
            <Cta href='#agenda'>Plan een gesprek</Cta>
            <TextLink href='#tarieven' className='py-2'>
              Bekijk de tarieven
            </TextLink>
          </div>
        </div>
        <figure className='animate-arrive [animation-delay:.75s] motion-reduce:animate-none md:col-span-4 md:col-start-9'>
          <div
            className='relative aspect-[4/5] w-full overflow-hidden bg-surface-alt'
            role='img'
            aria-label='Twee stoelen bij een raam met uitzicht op groen'
          >
            <Image
              src='https://images.unsplash.com/photo-1754379376065-0a8106dc60a1?auto=format&fit=crop&q=75&w=1400'
              fill
              priority
              sizes='(min-width: 768px) 30vw, 92vw'
              alt=''
              className='object-cover'
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
