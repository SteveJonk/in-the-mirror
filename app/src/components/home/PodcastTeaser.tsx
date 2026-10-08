import { RevealLink } from '@/components/ui/RevealLink';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { Curve } from '@/components/ui/Curve';
import { Illustration } from '@/components/ui/Illustration';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { textLinkClass } from '@/components/ui/TextLink';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

export function PodcastTeaser() {
  return (
    <section id='podcast' className='relative py-32 md:py-48'>
      <RevealGroup className={cn(wrapClass, 'grid items-center gap-16 md:grid-cols-12 md:gap-x-10')}>
        <Reveal as='figure' className='md:col-span-5'>
          <Illustration
            name='luisteren'
            alt='Illustratie: iemand luistert met een koptelefoon naar een gesprek'
            className='max-w-[26rem]'
          />
        </Reveal>

        <div className='md:col-span-6 md:col-start-7'>
          <Reveal as='h2' className='font-display text-h2 text-balance'>
            Een gesprek om naar te luisteren
          </Reveal>
          <Reveal as='p' className='mt-9 max-w-[34rem]'>
            Op je eigen moment, in je eigen tempo. Zet het fragment aan en neem er de tijd voor.
          </Reveal>

          <Reveal className='mt-10 max-w-[34rem]'>
            <AudioPlayer src='/podcast-fragment.m4a' title='Eerste audiofragment' />
          </Reveal>

          <RevealLink href='/podcast' className={cn(textLinkClass, 'mt-12')}>
            Naar de podcastpagina
          </RevealLink>
        </div>
      </RevealGroup>
      <Curve into='surface-alt' />
    </section>
  );
}
