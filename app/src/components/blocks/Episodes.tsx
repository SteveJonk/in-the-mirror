import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { wrapClass } from '@/components/ui/Wrap';
import type { BlockProps } from './types';

export function Episodes({ block, section }: BlockProps<'episodes'>) {
  const headingId = block.title ? `episodes-${block._key}` : undefined;
  return (
    <Section section={section} aria-labelledby={headingId}>
      <RevealGroup className={wrapClass}>
        {block.title && (
          <div className='grid gap-10 md:grid-cols-12 md:gap-x-10'>
            <Reveal as='h2' id={headingId} className='font-display text-h2 text-balance md:col-span-6'>
              {block.title}
            </Reveal>
          </div>
        )}
        <ul className='mt-14 md:mt-20'>
          {block.episodes?.map((episode) => (
            <Reveal
              as='li'
              key={episode._id}
              className='grid gap-10 border-t border-fg py-12 last:border-b md:grid-cols-12 md:gap-x-10 md:py-14'
            >
              <div className='md:col-span-5'>
                <h3 className='font-display text-h3 text-balance'>{episode.title}</h3>
                {episode.description && (
                  <p className='mt-4 max-w-[26rem] text-muted'>{episode.description}</p>
                )}
              </div>
              {episode.audio && (
                <div className='max-w-[34rem] md:col-span-6 md:col-start-7'>
                  <AudioPlayer src={episode.audio} name={episode.title} />
                </div>
              )}
            </Reveal>
          ))}
        </ul>
        {block.footnote && (
          <Reveal as='p' className='mt-10 max-w-[34rem] text-muted'>
            {block.footnote}
          </Reveal>
        )}
      </RevealGroup>
    </Section>
  );
}
