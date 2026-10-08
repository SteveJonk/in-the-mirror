import type { ComponentPropsWithoutRef } from 'react';
import type { Background, SectionContext } from '@/components/blocks/types';
import { Curve } from '@/components/ui/Curve';
import { cn } from '@/lib/cn';

const BACKGROUND: Record<Background, string> = {
  paper: 'bg-surface',
  stone: 'bg-surface-alt',
  ink: 'bg-inverse text-inverse-fg',
};

const CURVE = { paper: 'surface', stone: 'surface-alt', ink: 'inverse' } as const;

/** The padding of a page's first block: room for the fixed header. */
export const OPENER_PADDING = 'pt-32 pb-24 md:pt-48 md:pb-40';

/** The entrance animation of a page's first block. */
export const OPENER = 'animate-arrive motion-reduce:animate-none';

function padding({ spacing, collapseTop }: SectionContext) {
  if (spacing === 'large') return collapseTop ? 'pb-32 md:pb-48' : 'py-32 md:py-48';
  return collapseTop ? 'pb-28 md:pb-44' : 'py-28 md:py-44';
}

/**
 * A block's outer shell: its background, its vertical rhythm and — when the
 * next block has another background — the curve that leads into it.
 */
export function Section({
  section,
  padding: override,
  className,
  children,
  ...rest
}: { section: SectionContext; padding?: string } & ComponentPropsWithoutRef<'section'>) {
  return (
    <section
      id={section.anchor}
      className={cn('relative', BACKGROUND[section.background], override ?? padding(section), className)}
      {...rest}
    >
      {children}
      {section.next !== section.background && <Curve into={CURVE[section.next]} />}
    </section>
  );
}
