import Image from '@/components/ui/Image';
import { RevealLink } from '@/components/ui/RevealLink';
import { Curve } from '@/components/ui/Curve';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { textLinkClass } from '@/components/ui/TextLink';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

export function AboutTeaser() {
  return (
    <section id='over-mij' className='relative py-32 md:py-48'>
      <RevealGroup className={cn(wrapClass, 'grid items-center gap-16 md:grid-cols-12 md:gap-x-10')}>
        <Reveal as='figure' variant='curtain' className='md:col-span-5'>
          <Image
            src='/images/andere-manier-van-kijken.jpg'
            width={1358}
            height={1600}
            sizes='(min-width: 768px) 40vw, 100vw'
            alt='Close-up van het gezicht van een vrouw in warm zonlicht, die je aankijkt. In beeld staat de tekst: Er is een andere manier van kijken.'
            className='aspect-[900/1060] w-full object-cover'
          />
        </Reveal>

        <div className='md:col-span-6 md:col-start-7'>
          <Reveal as='h2' className='font-display text-h2 text-balance'>
            Geen vastgelopen protocollen, maar wat jij nú nodig hebt
          </Reveal>
          <div className='mt-9 max-w-[34rem] space-y-6'>
            <Reveal as='p'>
              Ieder mens is anders, en elk levensvraagstuk vraagt om een eigen benadering. Daarom
              geloof ik niet in praten volgens een vast stappenplan.
            </Reveal>
            <Reveal as='p'>
              In mijn rugzak zit een brede mix van scholing en ervaring: onderwijs en
              groepsdynamica (Attitudinal Healing), energetische coaching en astrologie vanuit een
              psychologisch perspectief, gebaseerd op het werk van Carl Jung. En mijn eigen
              levenservaring, want ik praat niet alleen vanuit theorie, maar ook vanuit het
              geleefde leven.
            </Reveal>
          </div>
          <RevealLink href='/over-mij' className={cn(textLinkClass, 'mt-10')}>
            Lees meer over mijn werkwijze
          </RevealLink>
        </div>
      </RevealGroup>
      <Curve into='surface-alt' />
    </section>
  );
}
