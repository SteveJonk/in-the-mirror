import { Cta } from '@/components/ui/Cta';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { RichText } from '@/components/ui/RichText';
import { SanityImage } from '@/components/ui/SanityImage';
import { Section } from '@/components/ui/Section';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import { toLabeledHref } from '@/lib/links';
import type { BlockProps } from './types';

export function TextColumns({ block, section }: BlockProps<'textColumns'>) {
  const cta = toLabeledHref(block.cta);
  return (
    <Section section={section}>
      <RevealGroup className={wrapClass}>
        <div className='grid gap-16 md:grid-cols-12 md:gap-x-10'>
          {block.columns?.map((column, i) => (
            <div key={column._key} className={i === 0 ? 'md:col-span-6' : 'md:col-span-5 md:col-start-8'}>
              {column.title && (
                <Reveal as='h2' className='font-display text-h2 text-balance'>
                  {column.title}
                </Reveal>
              )}
              <RichText value={column.body} className={cn(column.title && 'mt-9', 'max-w-[34rem]')} />
              {column.illustration?.src && (
                <Reveal as='figure' className='mt-14'>
                  <SanityImage image={column.illustration} className='mx-auto h-auto w-full max-w-[20rem]' />
                </Reveal>
              )}
            </div>
          ))}
        </div>
        {cta && (
          <Reveal className='mt-16'>
            <Cta href={cta.href}>{cta.label}</Cta>
          </Reveal>
        )}
      </RevealGroup>
    </Section>
  );
}
