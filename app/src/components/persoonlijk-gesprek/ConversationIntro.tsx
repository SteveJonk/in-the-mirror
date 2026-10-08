import { Curve } from '@/components/ui/Curve';
import { Illustration } from '@/components/ui/Illustration';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

export function ConversationIntro() {
  return (
    <section className='relative pb-28 md:pb-44'>
      <RevealGroup className={cn(wrapClass, 'grid items-center gap-16 md:grid-cols-12 md:gap-x-10')}>
        <Reveal as='figure' className='md:col-span-4 md:col-start-2'>
          <Illustration
            name='meditatie-tablet'
            alt='Illustratie: een persoon in meditatiehouding naast een tablet met een glimlachend gezicht'
            className='max-w-[18rem]'
          />
        </Reveal>
        <div className='md:col-span-6 md:col-start-7'>
          <Reveal as='p'>
            Je hoeft vooraf niets te weten van astrologie en je hoeft er niet eens in te geloven;
            zie het simpelweg als een nuchtere, inzichtelijke spiegel op basis van het werk van Carl
            Jung.
          </Reveal>
          <Reveal as='p' className='mt-6'>
            We gaan niet op zoek naar kant-en-klare antwoorden en ik breng geen magische
            oplossingen. We kijken samen naar jouw kwaliteiten en patronen en zien simpelweg hoe ver
            we komen. Zodat jij het overzicht terugkrijgt en met een frisse blik verder kunt.
          </Reveal>
        </div>
      </RevealGroup>
      <Curve into='surface-alt' />
    </section>
  );
}
