import { Calendar } from '@/components/blocks/Calendar';
import { Callout } from '@/components/blocks/Callout';
import { Columns } from '@/components/blocks/Columns';
import { ContactForm } from '@/components/blocks/ContactForm';
import { Episodes } from '@/components/blocks/Episodes';
import { FeatureImage } from '@/components/blocks/FeatureImage';
import { HomeHero } from '@/components/blocks/HomeHero';
import { MediaText } from '@/components/blocks/MediaText';
import { PageHero } from '@/components/blocks/PageHero';
import { Pricing } from '@/components/blocks/Pricing';
import { Quote } from '@/components/blocks/Quote';
import { Schedule } from '@/components/blocks/Schedule';
import { TextColumns } from '@/components/blocks/TextColumns';
import { Tiles } from '@/components/blocks/Tiles';
import type { Background, Block, SectionContext } from '@/components/blocks/types';

/** The footer sits on stone, so the last block curves into that. */
const FOOTER_BACKGROUND: Background = 'stone';

function renderBlock(block: Block, section: SectionContext, path?: string) {
  switch (block._type) {
    case 'homeHero':
      return <HomeHero key={block._key} block={block} section={section} />;
    case 'pageHero':
      return <PageHero key={block._key} block={block} section={section} />;
    case 'mediaText':
      return <MediaText key={block._key} block={block} section={section} />;
    case 'tiles':
      return <Tiles key={block._key} block={block} section={section} />;
    case 'columns':
      return <Columns key={block._key} block={block} section={section} />;
    case 'textColumns':
      return <TextColumns key={block._key} block={block} section={section} />;
    case 'quote':
      return <Quote key={block._key} block={block} section={section} />;
    case 'featureImage':
      return <FeatureImage key={block._key} block={block} section={section} />;
    case 'callout':
      return <Callout key={block._key} block={block} section={section} />;
    case 'pricing':
      return <Pricing key={block._key} block={block} section={section} />;
    case 'schedule':
      return <Schedule key={block._key} block={block} section={section} />;
    case 'episodes':
      return <Episodes key={block._key} block={block} section={section} />;
    case 'calendar':
      return <Calendar key={block._key} block={block} section={section} />;
    case 'contactForm':
      return <ContactForm key={block._key} block={block} section={section} path={path} />;
    default: {
      // Unknown types warn and render nothing, so a half-built block never breaks a page.
      const unknown: { _type: string } = block;
      console.warn(`Unknown page builder block type: ${unknown._type}`);
      return null;
    }
  }
}

/**
 * Renders a page's blocks in order.
 *
 * ADDING A BLOCK — after the studio schema (see `studio/schemaTypes/index.ts`):
 *   1. its branch in `PAGE_QUERY` (`src/sanity/queries.ts`), then `npm run typegen`
 *   2. a component in `src/components/blocks/` taking `BlockProps<'<name>'>`
 *   3. a `case` above
 *
 * Each block learns from its neighbours how to sit on the page: whether it
 * opens it, whether the block above shares its background (so the top padding
 * can go) and which background comes next (so it can curve into it).
 */
export function PageBuilder({
  content,
  path,
}: {
  content?: Block[] | null;
  /** The page's own path, for blocks that record where they were used. */
  path?: string;
}) {
  if (!content?.length) return null;
  const backgrounds = content.map((block) => block.background ?? 'paper');

  return (
    <>
      {content.map((block, i) =>
        renderBlock(
          block,
          {
            background: backgrounds[i],
            next: backgrounds[i + 1] ?? FOOTER_BACKGROUND,
            collapseTop: i > 0 && backgrounds[i - 1] === backgrounds[i],
            first: i === 0,
            spacing: block.spacing ?? 'regular',
            anchor: block.anchor ?? undefined,
          },
          path,
        ),
      )}
    </>
  );
}
