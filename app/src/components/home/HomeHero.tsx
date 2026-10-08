import Image from '@/components/ui/Image';
import { Cta } from '@/components/ui/Cta';

export function HomeHero() {
  return (
    <section id='top' className='relative overflow-hidden pt-[4.5rem] lg:pt-24'>
      <div className='grid lg:min-h-[calc(100svh_-_6rem)] lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]'>
        <div className='flex flex-col justify-center px-6 pt-14 pb-16 md:px-12 md:pt-20 lg:py-20 lg:pr-16 lg:pl-[max(5rem,calc((100vw_-_1320px)/2_+_5rem))]'>
          <div className='max-w-[36rem] animate-arrive motion-reduce:animate-none'>
            <h1 className='font-display text-hero text-balance'>
              Soms heb je gewoon een goed gesprek nodig. Over jóú.
            </h1>
            <p className='mt-9 max-w-[32rem] text-[1.25rem] leading-[1.65] italic md:text-[1.3rem]'>
              Loop je vast in vaste patronen? Twijfel je over de koers van je leven, heb je het
              gevoel dat je jezelf een beetje bent kwijtgeraakt, of ben je gewoon nieuwsgierig en
              vind je het tijd om ook eens aandacht aan jezelf te geven? Schuif dan aan voor een
              open, menselijk gesprek waarin jij centraal staat. Zonder oordeel, met alle ruimte
              voor jouw verhaal. Wat je reden ook is, je bent welkom!
            </p>
            <div className='mt-11 flex flex-wrap items-center gap-x-9 gap-y-5'>
              <Cta href='/over-mij'>Lees hoe ik werk</Cta>
            </div>
          </div>
        </div>

        <figure className='relative aspect-[4/5] md:aspect-[3/4] lg:aspect-auto'>
          <Image
            src='/images/artwork.webp'
            fill
            priority
            sizes='(min-width: 1024px) 50vw, 100vw'
            alt='Mixed-media kunstwerk: een vrouw met krullend haar in een bloemenjurk voor een roze achtergrond, omlijst door een sierlijke blauwgroene rand.'
            className='animate-unveil object-cover object-[50%_30%] opacity-60 motion-reduce:animate-none'
          />
        </figure>
      </div>
    </section>
  );
}
