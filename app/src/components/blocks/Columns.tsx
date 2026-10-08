import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { SanityImage } from '@/components/ui/SanityImage';
import { Section } from '@/components/ui/Section';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import type { BlockProps } from './types';

export function Columns({ block, section }: BlockProps<'columns'>) {
  const items = block.items ?? [];
  const withIcons = items.some((item) => item.icon?.src);

  return (
    <Section section={section}>
      <RevealGroup className={wrapClass}>
        <div className='grid gap-10 md:grid-cols-12 md:gap-x-10'>
          <Reveal as='h2' className='font-display text-h2 text-balance md:col-span-6'>
            {block.title}
          </Reveal>
          {block.intro && (
            <Reveal as='p' className='max-w-[34rem] md:col-span-5 md:col-start-8 md:pt-3'>
              {block.intro}
            </Reveal>
          )}
        </div>

        {withIcons ? (
          <ul className='mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4'>
            {items.map((item) => (
              <Reveal as='li' key={item._key} className='flex flex-col gap-5'>
                <SanityImage image={item.icon} alt='' className='size-11 shrink-0' />
                <div>
                  <h3 className='font-display text-h3 text-balance'>{item.title}</h3>
                  {item.body && <p className='mt-3 text-[1.05rem] leading-[1.65]'>{item.body}</p>}
                </div>
              </Reveal>
            ))}
          </ul>
        ) : (
          <div
            className={cn(
              'mt-16 grid gap-12 border-t pt-12 md:grid-cols-2 md:gap-x-16',
              section.background === 'ink' ? 'border-inverse-fg/30' : 'border-line',
            )}
          >
            {items.map((item) => (
              <Reveal key={item._key}>
                <h3 className='font-display text-h3 text-balance'>{item.title}</h3>
                {item.body && <p className='mt-5 max-w-[30rem]'>{item.body}</p>}
              </Reveal>
            ))}
          </div>
        )}

        {block.footnote && (
          <Reveal as='p' className='mt-16 max-w-[40rem] border-t border-line pt-8'>
            {block.footnote}
          </Reveal>
        )}
      </RevealGroup>
    </Section>
  );
}
