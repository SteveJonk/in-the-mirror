import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { Cta } from '@/components/ui/Cta';
import { FactList } from '@/components/ui/FactList';
import { MirrorArch } from '@/components/ui/MirrorArch';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { RevealLink } from '@/components/ui/RevealLink';
import { RichText } from '@/components/ui/RichText';
import { SanityImage } from '@/components/ui/SanityImage';
import { Section } from '@/components/ui/Section';
import { TextLink, textLinkClass } from '@/components/ui/TextLink';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import { toLabeledHref } from '@/lib/links';
import type { BlockOf, BlockProps } from './types';

/** Column placement on the 12-column grid: [media left?][media small?][indent?]. */
const TEXT_COLUMN = {
  right: 'md:col-span-6 md:col-start-7',
  left: 'md:col-span-6 md:row-start-1',
  leftIndented: 'md:col-span-6 md:col-start-2 md:row-start-1',
};
const MEDIA_COLUMN = {
  right: { small: 'md:col-span-4 md:col-start-9 md:row-start-1', medium: 'md:col-span-5 md:col-start-8 md:row-start-1' },
  left: { small: 'md:col-span-4', medium: 'md:col-span-5' },
  leftIndented: { small: 'md:col-span-4 md:col-start-2', medium: 'md:col-span-5 md:col-start-2' },
};

function Media({ block, delay }: { block: BlockOf<'mediaText'>; delay?: number }) {
  switch (block.media) {
    case 'image':
      return (
        <Reveal as='figure' variant='curtain' delay={delay}>
          <SanityImage image={block.image} sizes='(min-width: 768px) 40vw, 100vw' className='h-auto w-full' />
        </Reveal>
      );
    case 'illustration':
      return (
        <Reveal as='figure' delay={delay}>
          <SanityImage
            image={block.image}
            className={cn('mx-auto h-auto w-full', block.mediaSmall ? 'max-w-[18rem]' : 'max-w-[26rem]')}
          />
        </Reveal>
      );
    case 'illustrationCard':
      return (
        <Reveal as='figure' variant='curtain' delay={delay}>
          <div className='flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl bg-accent p-10'>
            <SanityImage image={block.image} className='mx-auto h-auto w-full max-w-[20rem]' />
          </div>
        </Reveal>
      );
    case 'mirror':
      return (
        <Reveal variant='rise' delay={delay}>
          <MirrorArch image={block.image} />
        </Reveal>
      );
    case 'priceCard':
      return (
        <Reveal delay={delay}>
          <dl className='border-y border-fg'>
            {block.priceCard?.map((row, i) => (
              <div key={row._key} className={cn('py-6', i > 0 && 'border-t border-line')}>
                <dt className='text-muted'>{row.label}</dt>
                <dd className={cn('mt-2', row.isPrice && 'font-display text-price')}>{row.value}</dd>
                {row.note && <dd className='mt-3 text-[1.05rem]'>{row.note}</dd>}
              </div>
            ))}
          </dl>
        </Reveal>
      );
    default:
      return null;
  }
}

export function MediaText({ block, section }: BlockProps<'mediaText'>) {
  const hasMedia =
    block.media === 'priceCard' ? Boolean(block.priceCard?.length) : block.media === 'mirror' || Boolean(block.image?.src);
  const cta = toLabeledHref(block.cta);
  const textLink = toLabeledHref(block.textLink);
  const side = block.mediaLeft ? (block.indent ? 'leftIndented' : 'left') : 'right';
  const textColumn = !hasMedia
    ? 'md:col-span-8 md:col-start-3'
    : block.mediaLeft
      ? TEXT_COLUMN.right
      : block.indent
        ? TEXT_COLUMN.leftIndented
        : TEXT_COLUMN.left;
  // Text under a title keeps a readable measure; text on its own uses the column.
  const narrow = hasMedia && block.title && 'max-w-[34rem]';

  return (
    <Section section={section}>
      <RevealGroup
        className={cn(
          wrapClass,
          'grid md:grid-cols-12',
          hasMedia && 'gap-16 md:gap-x-10',
          block.alignTop ? 'items-start' : 'items-center',
        )}
      >
        {hasMedia && block.mediaLeft && (
          <div className={MEDIA_COLUMN[side][block.mediaSmall ? 'small' : 'medium']}>
            <Media block={block} />
          </div>
        )}

        <div className={textColumn}>
          {block.title && (
            <Reveal as='h2' className='font-display text-h2 text-balance'>
              {block.title}
            </Reveal>
          )}
          <RichText value={block.body} className={cn(block.title && 'mt-9', narrow)} />
          {block.facts?.length ? (
            <Reveal className='mt-10'>
              <FactList facts={block.facts} />
            </Reveal>
          ) : null}
          {block.factsNote && (
            <Reveal as='p' className='mt-3 max-w-[34rem] text-[0.95rem] text-muted'>
              {block.factsNote}
            </Reveal>
          )}
          {block.episode?.audio && (
            <Reveal className='mt-10 max-w-[34rem]'>
              <AudioPlayer src={block.episode.audio} title={block.episode.title} />
            </Reveal>
          )}
          {cta ? (
            <Reveal className='mt-10 flex flex-wrap items-center gap-x-9 gap-y-3'>
              <Cta href={cta.href} variant={block.ctaStyle === 'outline' ? 'outline' : 'solid'}>
                {cta.label}
              </Cta>
              {textLink && (
                <TextLink href={textLink.href} className='py-2'>
                  {textLink.label}
                </TextLink>
              )}
            </Reveal>
          ) : (
            textLink && (
              <RevealLink
                href={textLink.href}
                className={cn(textLinkClass, block.episode ? 'mt-12' : 'mt-10')}
              >
                {textLink.label}
              </RevealLink>
            )
          )}
        </div>

        {hasMedia && !block.mediaLeft && (
          <div className={MEDIA_COLUMN.right[block.mediaSmall ? 'small' : 'medium']}>
            <Media block={block} delay={1} />
          </div>
        )}
      </RevealGroup>
    </Section>
  );
}
