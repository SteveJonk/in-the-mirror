import { Cta } from '@/components/ui/Cta';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import { toLabeledHref } from '@/lib/links';
import type { BlockProps } from './types';

export function Callout({ block, section }: BlockProps<'callout'>) {
  const cta = toLabeledHref(block.cta);
  const large = block.size === 'large';
  const button = cta && <Cta href={cta.href}>{cta.label}</Cta>;

  if (!large) {
    return (
      <Section section={section} padding='py-20 md:py-28'>
        <RevealGroup className={cn(wrapClass, 'grid gap-8 md:grid-cols-12 md:gap-x-10')}>
          <Reveal as='h2' className='font-display text-h3 text-balance md:col-span-4'>
            {block.title}
          </Reveal>
          <Reveal className='max-w-[40rem] md:col-span-7 md:col-start-6'>
            {block.body && <p>{block.body}</p>}
            {button && <div className='mt-8'>{button}</div>}
          </Reveal>
        </RevealGroup>
      </Section>
    );
  }

  return (
    <Section section={section}>
      <RevealGroup className={cn(wrapClass, 'grid items-center gap-10 md:grid-cols-12 md:gap-x-10')}>
        <Reveal as='h2' className='font-display text-h2 text-balance md:col-span-6'>
          {block.title}
        </Reveal>
        <Reveal className='md:col-span-5 md:col-start-8'>
          {block.body && <p className='max-w-[30rem]'>{block.body}</p>}
          {button && <div className='mt-8'>{button}</div>}
        </Reveal>
      </RevealGroup>
    </Section>
  );
}
