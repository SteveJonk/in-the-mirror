import { RevealLink } from '@/components/ui/RevealLink';
import { Illustration, type IllustrationName } from '@/components/ui/Illustration';
import { RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';

const TILES: { href: string; label: string; illustration: IllustrationName; alt: string }[] = [
  {
    href: '/over-mij',
    label: 'Over mij',
    illustration: 'trap',
    alt: 'Illustratie: iemand loopt een trap op naar een deur, een beeld van persoonlijke groei',
  },
  {
    href: '/workshop',
    label: 'Workshop',
    illustration: 'groep',
    alt: 'Illustratie: een kleine groep mensen die samen staat',
  },
  {
    href: '/podcast',
    label: 'Podcast',
    illustration: 'podcast',
    alt: 'Illustratie: iemand neemt een podcast op achter een microfoon',
  },
  {
    href: '/persoonlijk-gesprek',
    label: 'Persoonlijk gesprek',
    illustration: 'gesprek',
    alt: 'Illustratie: twee mensen zitten tegenover elkaar in een rustig gesprek',
  },
  {
    href: '/contact',
    label: 'Contact',
    illustration: 'contact',
    alt: 'Illustratie: een locatiepin, envelop en telefoon als contactmogelijkheden',
  },
];

export function ExploreTiles() {
  return (
    <section aria-label='Verken de site' className='relative pb-24 md:pb-32'>
      <RevealGroup className={wrapClass}>
        <div className='grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-7'>
          {TILES.map((tile, i) => (
            <RevealLink key={tile.href} href={tile.href} delay={i} className='group block'>
              <div className='flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-surface-alt p-6 transition duration-200 group-hover:bg-accent'>
                <Illustration name={tile.illustration} alt={tile.alt} className='max-w-[10rem]' />
              </div>
              <p className='mt-4 text-center font-display text-[1.2rem] leading-tight underline-offset-[6px] group-hover:underline'>
                {tile.label}
              </p>
            </RevealLink>
          ))}
        </div>
      </RevealGroup>
    </section>
  );
}
