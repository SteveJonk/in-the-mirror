'use client';

import type { ComponentPropsWithoutRef, CSSProperties, ElementType } from 'react';
import { useReveal, useRevealGroup } from '@/hooks/useReveal';
import { cn } from '@/lib/cn';

const MOVE =
  'reveal:[transition:opacity_.9s_cubic-bezier(.2,.6,.2,1)_var(--d,0ms),translate_1s_cubic-bezier(.2,.7,.2,1)_var(--d,0ms)]';

const variants = {
  /** Rises 28px while fading in. */
  up: { motion: MOVE, hidden: 'reveal:translate-y-7 reveal:opacity-0' },
  /** A longer rise, for a large figure. */
  rise: { motion: MOVE, hidden: 'reveal:translate-y-16 reveal:opacity-0' },
  fade: {
    motion: 'reveal:[transition:opacity_.9s_cubic-bezier(.2,.6,.2,1)_var(--d,0ms)]',
    hidden: 'reveal:opacity-0',
  },
  /** Photos are drawn open from top to bottom, like a curtain. */
  curtain: {
    motion: 'reveal:[transition:clip-path_1.3s_cubic-bezier(.65,0,.2,1)_var(--d,0ms)]',
    hidden: 'reveal:[clip-path:inset(0_0_100%_0)]',
  },
} as const;

type RevealProps<T extends ElementType> = {
  as?: T;
  variant?: keyof typeof variants;
  /** A fixed slot in the group's cascade (×85ms) instead of document order. */
  delay?: number;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

/** Anything that fades in on scroll. Renders a `div` unless `as` says otherwise. */
export function Reveal<T extends ElementType = 'div'>({
  as,
  variant = 'up',
  delay,
  className,
  style,
  ...rest
}: RevealProps<T>) {
  const Tag: ElementType = as ?? 'div';
  const { ref, delay: shownAfter } = useReveal<HTMLElement>(delay);
  const v = variants[variant];

  return (
    <Tag
      ref={ref}
      data-reveal
      className={cn(v.motion, shownAfter === null && v.hidden, className as string)}
      style={{ ...(style as CSSProperties), '--d': `${shownAfter ?? 0}ms` } as CSSProperties}
      {...rest}
    />
  );
}

type RevealGroupProps<T extends ElementType> = { as?: T } & Omit<ComponentPropsWithoutRef<T>, 'as'>;

/** Reveals its <Reveal> children together, as a cascade, on wider screens. */
export function RevealGroup<T extends ElementType = 'div'>({ as, ...rest }: RevealGroupProps<T>) {
  const Tag: ElementType = as ?? 'div';
  const ref = useRevealGroup<HTMLElement>();
  return <Tag ref={ref} data-reveal-group {...rest} />;
}
