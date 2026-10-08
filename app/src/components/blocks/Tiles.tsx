import { RevealGroup } from '@/components/ui/Reveal';
import { RevealLink } from '@/components/ui/RevealLink';
import { SanityImage } from '@/components/ui/SanityImage';
import { Section } from '@/components/ui/Section';
import { wrapClass } from '@/components/ui/Wrap';
import { resolveHref } from '@/lib/links';
import type { BlockProps } from './types';

export function Tiles({ block, section }: BlockProps<'tiles'>) {
  return (
    <Section section={section} padding='pb-24 md:pb-32'>
      <RevealGroup className={wrapClass}>
        <div className='grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-7'>
          {block.items?.map((tile, i) => (
            <RevealLink key={tile._key} href={resolveHref(tile) ?? '#'} delay={i} className='group block'>
              <div className='flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-surface-alt p-6 transition duration-200 group-hover:bg-accent'>
                <SanityImage image={tile.illustration} className='mx-auto h-auto w-full max-w-[10rem]' />
              </div>
              <p className='mt-4 text-center font-display text-[1.2rem] leading-tight underline-offset-[6px] group-hover:underline'>
                {tile.label}
              </p>
            </RevealLink>
          ))}
        </div>
      </RevealGroup>
    </Section>
  );
}
