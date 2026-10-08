import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';

/** A list item with a small ink dot, revealed on scroll. */
export function Bullet({ children }: { children: ReactNode }) {
  return (
    <Reveal as='li' className='flex gap-4'>
      <span className='mt-[0.7rem] size-2 shrink-0 rounded-full bg-fg' aria-hidden='true' />
      <span>{children}</span>
    </Reveal>
  );
}
