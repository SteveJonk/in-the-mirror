import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import type { BlockProps } from './types';

export function Quote({ block, section }: BlockProps<'quote'>) {
  return (
    <Section section={section}>
      <RevealGroup className={cn(wrapClass, 'grid md:grid-cols-12')}>
        <Reveal as='blockquote' className='md:col-span-9 md:col-start-3'>
          <p className='font-display text-quote text-balance'>{block.text}</p>
        </Reveal>
      </RevealGroup>
    </Section>
  );
}
