import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { SanityImage } from '@/components/ui/SanityImage';
import { Section } from '@/components/ui/Section';
import { wrapClass } from '@/components/ui/Wrap';
import type { BlockProps } from './types';

export function Pricing({ block, section }: BlockProps<'pricing'>) {
  const headingId = block._key && `pricing-${block._key}`;
  return (
    <Section section={section} aria-labelledby={headingId}>
      <RevealGroup className={wrapClass}>
        <Reveal as='h2' id={headingId} className='font-display text-h2 text-balance'>
          {block.title}
        </Reveal>
        <div className='mt-16 grid gap-14 border-t border-fg pt-12 md:grid-cols-2 md:gap-x-16'>
          {block.plans?.map((plan) => (
            <Reveal key={plan._key}>
              <h3 className='font-display text-h3 text-balance'>{plan.title}</h3>
              {plan.subtitle && <p className='mt-2 text-muted'>{plan.subtitle}</p>}
              <p className='mt-8 font-display text-price'>{plan.price}</p>
              {plan.body && <p className='mt-3 text-[1.05rem]'>{plan.body}</p>}
            </Reveal>
          ))}
        </div>
        {block.options?.length ? (
          <div className='mt-16 grid gap-8 border-t border-line pt-12 md:grid-cols-12 md:gap-x-10'>
            {block.optionsLabel && (
              <Reveal as='p' className='md:col-span-3 md:pt-1'>
                {block.optionsLabel}
              </Reveal>
            )}
            {block.options.map((option) => (
              <Reveal key={option._key} className='flex items-center gap-5 md:col-span-4'>
                <SanityImage image={option.icon} alt='' className='size-11 shrink-0' />
                <p>{option.label}</p>
              </Reveal>
            ))}
          </div>
        ) : null}
      </RevealGroup>
    </Section>
  );
}
