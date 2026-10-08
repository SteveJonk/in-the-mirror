import { Carousel } from '@/components/ui/Carousel';
import { RevealGroup } from '@/components/ui/Reveal';
import { RevealLink } from '@/components/ui/RevealLink';
import { SanityImage } from '@/components/ui/SanityImage';
import { Section } from '@/components/ui/Section';
import { wrapClass } from '@/components/ui/Wrap';
import { resolveHref } from '@/lib/links';
import type { BlockProps } from './types';

/**
 * Cards with an illustration and their label. On phones a carousel showing
 * two and a half of them (the gap twice over equals the gutter it bleeds
 * through, so 40% of the track is exactly a 2.5th of the visible row).
 */
export function Tiles({ block, section }: BlockProps<'tiles'>) {
  return (
    <Section section={section} padding='pt-10 pb-24 md:pt-16 md:pb-32'>
      <RevealGroup className={wrapClass}>
        <Carousel className='gap-3 md:grid md:grid-cols-3 md:gap-5 lg:grid-cols-5 lg:gap-7'>
          {block.items?.map((tile, i) => (
            <RevealLink
              key={tile._key}
              href={resolveHref(tile) ?? '#'}
              delay={i}
              className='group flex aspect-[4/5] shrink-0 basis-[40%] snap-start flex-col overflow-hidden rounded-2xl bg-surface-alt p-4 transition-colors duration-200 hover:bg-accent md:p-6'
            >
              <div className='flex min-h-0 flex-1 items-center justify-center'>
                <SanityImage image={tile.illustration} className='mx-auto h-auto max-h-full w-full max-w-[10rem] object-contain' />
              </div>
              <p className='mt-3 text-center font-display text-[1.05rem] leading-tight text-balance underline-offset-[6px] group-hover:underline md:mt-4 md:text-[1.2rem]'>
                {tile.label}
              </p>
            </RevealLink>
          ))}
        </Carousel>
      </RevealGroup>
    </Section>
  );
}
