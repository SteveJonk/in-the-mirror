import { Reveal } from '@/components/ui/Reveal';
import { SanityImage } from '@/components/ui/SanityImage';
import { Section } from '@/components/ui/Section';
import type { BlockProps } from './types';

export function FeatureImage({ block, section }: BlockProps<'featureImage'>) {
  return (
    <Section section={section}>
      <Reveal as='figure' variant='fade' className='mx-auto max-w-[880px] px-6 md:px-12'>
        <SanityImage image={block.image} sizes='(min-width: 880px) 784px, 100vw' className='h-auto w-full' />
      </Reveal>
    </Section>
  );
}
