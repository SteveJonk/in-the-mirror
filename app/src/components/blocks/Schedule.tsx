import { Cta } from '@/components/ui/Cta';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import { toLabeledHref } from '@/lib/links';
import type { BlockProps } from './types';

export function Schedule({ block, section }: BlockProps<'schedule'>) {
  const cta = toLabeledHref(block.cta);
  return (
    <Section section={section}>
      <RevealGroup className={cn(wrapClass, 'grid gap-14 md:grid-cols-12 md:gap-x-10')}>
        <div className='md:col-span-4'>
          <Reveal as='h2' className='font-display text-h2 text-balance'>
            {block.title}
          </Reveal>
          {block.lead && (
            <Reveal as='p' className='mt-9 max-w-[24rem]'>
              {block.lead}
            </Reveal>
          )}
          {cta && (
            <Reveal className='mt-10'>
              <Cta href={cta.href}>{cta.label}</Cta>
            </Reveal>
          )}
        </div>
        <ol className='md:col-span-7 md:col-start-6'>
          {block.slots?.map((slot) => (
            <Reveal
              as='li'
              key={slot._key}
              className='grid gap-x-8 gap-y-1 border-t border-line py-6 last:border-b md:grid-cols-[11rem_1fr] md:py-7'
            >
              <p className={cn('font-display text-[1.65rem] leading-none', !slot.description && 'text-muted')}>
                {slot.time}
              </p>
              {slot.description ? (
                <div>
                  <h3 className='text-[1.2rem] font-medium'>{slot.title}</h3>
                  <p className='text-muted'>{slot.description}</p>
                </div>
              ) : (
                <p className='text-[1.15rem] text-muted'>{slot.title}</p>
              )}
            </Reveal>
          ))}
        </ol>
      </RevealGroup>
    </Section>
  );
}
