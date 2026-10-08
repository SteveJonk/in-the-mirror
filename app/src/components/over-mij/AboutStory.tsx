import Image from '@/components/ui/Image';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

export function AboutStory() {
  return (
    <section className='pb-28 md:pb-44'>
      <RevealGroup className={cn(wrapClass, 'grid items-start gap-16 md:grid-cols-12 md:gap-x-10')}>
        <div className='md:col-span-6 md:col-start-2'>
          <Reveal as='p'>
            In onze snelle, prestatiegerichte wereld leren we al vroeg om ons aan te passen. We
            stoppen bepaalde kanten van onszelf die we als ‘te veel’, ‘te intens’ of ‘onhandig’
            ervaren weg in een niet-geleefd deel van onze psyche. Maar die onderdrukte delen
            verdwijnen niet. Ze uiten zich vaak in frustratie, twijfel en het knagende gevoel dat je
            niet jouw volledige leven leidt.
          </Reveal>
          <Reveal as='p' className='mt-6'>
            Waar ik nu sta, is het resultaat van een intensief innerlijk proces. Ik heb zelf diep
            in de spiegel gekeken door middel van therapie, schaduwwerk en familieopstellingen.
          </Reveal>
        </div>
        <Reveal as='figure' variant='curtain' delay={1} className='md:col-span-4 md:col-start-9'>
          <div
            className='relative aspect-[3/4] w-full overflow-hidden bg-surface-alt'
            role='img'
            aria-label='Zonlicht valt door het bladerdak van een bos'
          >
            <Image
              src='https://images.unsplash.com/photo-1759511027330-3ba37a231934?auto=format&fit=crop&q=75&w=1200'
              fill
              sizes='(min-width: 768px) 30vw, 92vw'
              alt=''
              className='object-cover'
            />
          </div>
        </Reveal>
      </RevealGroup>
    </section>
  );
}
