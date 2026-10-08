import { Cta } from '@/components/ui/Cta';
import { FactList } from '@/components/ui/FactList';
import { MirrorArch } from '@/components/ui/MirrorArch';
import { Reveal } from '@/components/ui/Reveal';
import { SanityImage } from '@/components/ui/SanityImage';
import { SoundWave } from '@/components/ui/SoundWave';
import { OPENER, OPENER_PADDING, Section } from '@/components/ui/Section';
import { TextLink } from '@/components/ui/TextLink';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import { toLabeledHref } from '@/lib/links';
import type { BlockProps } from './types';

export function PageHero({ block, section }: BlockProps<'pageHero'>) {
  const primary = toLabeledHref(block.primaryCta);
  const secondary = toLabeledHref(block.secondaryLink);
  const media =
    block.media === 'wave' || block.media === 'mirror'
      ? block.media
      : block.image?.src
        ? (block.media ?? 'image')
        : 'none';
  const below = media === 'illustration' || media === 'wave';
  const beside = media === 'image' || media === 'mirror';

  const text = (
    <>
      <h1 className='font-display text-h1 text-balance'>{block.title}</h1>
      {block.intro && (
        <p
          className={cn(
            'mt-9 text-intro md:text-intro-lg',
            beside ? 'max-w-[34rem]' : 'max-w-[36rem]',
            block.italic && 'italic',
          )}
        >
          {block.intro}
          {block.attribution && (
            <>
              {' '}
              <span className='not-italic'>{block.attribution}</span>
            </>
          )}
        </p>
      )}
      {block.facts?.length ? <FactList className='mt-10' facts={block.facts} /> : null}
      {(primary || secondary) && (
        <div className='mt-10 flex flex-wrap items-center gap-x-9 gap-y-3'>
          {primary && <Cta href={primary.href}>{primary.label}</Cta>}
          {secondary && (
            <TextLink href={secondary.href} className='py-2'>
              {secondary.label}
            </TextLink>
          )}
        </div>
      )}
    </>
  );

  if (!beside) {
    return (
      <Section
        section={section}
        padding={below ? 'pt-32 pb-16 md:pt-48 md:pb-24' : OPENER_PADDING}
      >
        <div className={wrapClass}>
          <div className={`max-w-[52rem] ${OPENER}`}>{text}</div>
          {below && (
            <Reveal as='figure' variant='fade' className='mt-16 md:mt-24'>
              {media === 'wave' ? (
                <SoundWave />
              ) : (
                <SanityImage image={block.image} sizes='100vw' className='h-auto w-full' />
              )}
            </Reveal>
          )}
        </div>
      </Section>
    );
  }

  return (
    <Section section={section} padding={OPENER_PADDING}>
      <div
        className={cn(
          wrapClass,
          'grid md:grid-cols-12 md:gap-x-10',
          block.alignBottom && media === 'image' ? 'items-end gap-14' : 'items-center gap-16',
        )}
      >
        <div className={`${OPENER} md:col-span-7`}>{text}</div>
        <div className={`${OPENER} [animation-delay:.75s] md:col-span-4 md:col-start-9`}>
          {media === 'mirror' ? (
            <MirrorArch image={block.image} priority />
          ) : (
            <SanityImage
              image={block.image}
              priority
              sizes='(min-width: 768px) 30vw, 100vw'
              className='h-auto w-full'
            />
          )}
        </div>
      </div>
    </Section>
  );
}
