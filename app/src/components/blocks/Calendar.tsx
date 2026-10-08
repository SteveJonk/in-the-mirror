import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { wrapClass } from '@/components/ui/Wrap';
import type { BlockProps } from './types';

export function Calendar({ block, section }: BlockProps<'calendar'>) {
  const headingId = `calendar-${block._key}`;
  return (
    <Section section={section} aria-labelledby={headingId}>
      <RevealGroup className={wrapClass}>
        <div className='grid gap-10 md:grid-cols-12 md:gap-x-10'>
          <Reveal as='h2' id={headingId} className='font-display text-h2 text-balance md:col-span-6'>
            {block.title}
          </Reveal>
          {block.lead && (
            <Reveal as='p' className='max-w-[34rem] md:col-span-5 md:col-start-8 md:pt-3'>
              {block.lead}
            </Reveal>
          )}
        </div>
        {block.embedUrl ? (
          <Reveal delay={2} className='mt-14 md:mt-20'>
            <iframe src={block.embedUrl} title={block.title} className='min-h-[38rem] w-full border-0' />
          </Reveal>
        ) : (
          <Reveal
            delay={2}
            role='region'
            aria-label={block.placeholderTitle ?? undefined}
            className='mt-14 flex min-h-[30rem] flex-col items-center justify-center gap-6 border border-dashed border-fg/50 bg-surface-alt px-6 py-16 text-center md:mt-20 md:min-h-[38rem]'
          >
            <svg
              viewBox='0 0 120 100'
              className='h-24 w-28 stroke-fg'
              fill='none'
              strokeWidth='1.6'
              strokeLinecap='round'
              aria-hidden='true'
            >
              <rect x='10' y='14' width='100' height='78' rx='4' className='fill-surface' />
              <path d='M10 34h100M36 6v16M84 6v16' />
              <path d='M28 48h10M55 48h10M82 48h10M28 62h10M55 62h10M82 62h10M28 76h10M55 76h10' />
              <circle cx='87' cy='76' r='6' className='fill-accent' />
            </svg>
            {block.placeholderTitle && (
              <p className='font-display text-[1.7rem] leading-tight'>{block.placeholderTitle}</p>
            )}
            {block.placeholderText && <p className='max-w-[28rem] text-muted'>{block.placeholderText}</p>}
          </Reveal>
        )}
      </RevealGroup>
    </Section>
  );
}
