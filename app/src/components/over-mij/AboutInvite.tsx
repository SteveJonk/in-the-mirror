import Image from '@/components/ui/Image';
import { Cta } from '@/components/ui/Cta';
import { Curve } from '@/components/ui/Curve';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { TextLink } from '@/components/ui/TextLink';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

export function AboutInvite() {
  return (
    <section className='relative pb-32 md:pb-48'>
      <RevealGroup className={cn(wrapClass, 'grid items-center gap-16 md:grid-cols-12 md:gap-x-10')}>
        <div className='md:col-span-6 md:col-start-2 md:row-start-1'>
          <Reveal as='p' className='text-intro md:text-intro-lg'>
            Ben je klaar voor een nieuwe kijk op jezelf? Plan dan een gesprek, dan zien we samen hoe
            ver we komen. Voel je vrij!
          </Reveal>
          <Reveal as='p' className='mt-7 font-display text-[1.5rem]'>
            Camilla Amba
          </Reveal>
          <Reveal className='mt-10 flex flex-wrap items-center gap-x-9 gap-y-3'>
            <Cta href='/persoonlijk-gesprek'>Plan een gesprek</Cta>
            <TextLink href='/workshop' className='py-2'>
              Bekijk de workshop
            </TextLink>
          </Reveal>
        </div>
        <Reveal
          as='figure'
          variant='curtain'
          delay={1}
          className='md:col-span-5 md:col-start-8 md:row-start-1'
        >
          <Image
            src='/images/artwork.webp'
            width={1600}
            height={2080}
            sizes='(min-width: 768px) 40vw, 100vw'
            alt='Mixed-media kunstwerk: een vrouw met krullend haar in een bloemenjurk voor een roze achtergrond, omlijst door een sierlijke blauwgroene rand.'
            className='h-auto w-full'
          />
        </Reveal>
      </RevealGroup>
      <Curve into='surface-alt' />
    </section>
  );
}
