import Image from '@/components/ui/Image';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

export function AboutHero() {
  return (
    <section id='top' className='pt-32 pb-24 md:pt-48 md:pb-36'>
      <div className={cn(wrapClass, 'grid items-end gap-14 md:grid-cols-12 md:gap-x-10')}>
        <div className='animate-arrive motion-reduce:animate-none md:col-span-7'>
          <h1 className='font-display text-h1 text-balance'>
            Geen vastgelopen protocollen, maar wat jij nú nodig hebt
          </h1>
          <p className='mt-10 max-w-[34rem] text-intro md:text-intro-lg'>
            Ieder mens is anders, en elk levensvraagstuk vraagt om een eigen benadering. Daarom
            geloof ik niet in praten volgens een vast stappenplan.
          </p>
        </div>
        <figure className='animate-arrive [animation-delay:.75s] motion-reduce:animate-none md:col-span-4 md:col-start-9'>
          <Image
            src='/images/andere-manier-van-kijken.jpg'
            width={1358}
            height={1600}
            priority
            sizes='(min-width: 768px) 30vw, 100vw'
            alt='Close-up van het gezicht van een vrouw in warm zonlicht, die je aankijkt. In beeld staat de tekst: Er is een andere manier van kijken.'
            className='aspect-[900/1060] w-full object-cover'
          />
        </figure>
      </div>
    </section>
  );
}
