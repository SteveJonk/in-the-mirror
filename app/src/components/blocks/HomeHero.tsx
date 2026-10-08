import { Cta } from '@/components/ui/Cta';
import { SanityImage } from '@/components/ui/SanityImage';
import { OPENER, Section } from '@/components/ui/Section';
import { toLabeledHref } from '@/lib/links';
import type { BlockProps } from './types';

export function HomeHero({ block, section }: BlockProps<'homeHero'>) {
  const cta = toLabeledHref(block.cta);
  return (
    <Section section={section} padding='pt-[4.5rem] lg:pt-24' className='overflow-hidden'>
      <div className='grid lg:min-h-[calc(100svh_-_6rem)] lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]'>
        <div className='flex flex-col justify-center px-6 pt-14 pb-16 md:px-12 md:pt-20 lg:py-20 lg:pr-16 lg:pl-[max(5rem,calc((100vw_-_1320px)/2_+_5rem))]'>
          <div className={`max-w-[36rem] ${OPENER}`}>
            <h1 className='font-display text-hero text-balance'>{block.title}</h1>
            {block.lead && (
              <p className='mt-9 max-w-[32rem] text-[1.25rem] leading-[1.65] italic md:text-[1.3rem]'>
                {block.lead}
              </p>
            )}
            {cta && (
              <div className='mt-11 flex flex-wrap items-center gap-x-9 gap-y-5'>
                <Cta href={cta.href}>{cta.label}</Cta>
              </div>
            )}
          </div>
        </div>

        <figure className='relative aspect-[4/5] md:aspect-[3/4] lg:aspect-auto'>
          <SanityImage
            image={block.image}
            fill
            priority
            sizes='(min-width: 1024px) 50vw, 100vw'
            className='animate-unveil object-cover object-[50%_30%] opacity-60 motion-reduce:animate-none'
          />
        </figure>
      </div>
    </Section>
  );
}
