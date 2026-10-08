import type { PAGE_QUERY_RESULT } from '@/sanity/sanity.types';

export type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>['content']>[number];
export type BlockOf<T extends Block['_type']> = Extract<Block, { _type: T }>;

export type Background = 'paper' | 'stone' | 'ink';

/** What a block learns from its neighbours — see `PageBuilder`. */
export type SectionContext = {
  background: Background;
  /** The background below: the next block's, or the footer's after the last one. */
  next: Background;
  /** The block above has the same background, so the top padding can go. */
  collapseTop: boolean;
  /** The first block opens the page: it carries the h1 and the entrance animation. */
  first: boolean;
  spacing: 'regular' | 'large';
  anchor?: string;
};

export type BlockProps<T extends Block['_type']> = {
  block: BlockOf<T>;
  section: SectionContext;
};
