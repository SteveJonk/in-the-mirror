import Image from '@/components/ui/Image';
import { Curve } from '@/components/ui/Curve';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

/** Rumi, as an image: a yellow heart-shaped leaf between dark trunks. */
export function RumiQuote({ className, curve = false }: { className?: string; curve?: boolean }) {
  return (
    <section aria-label='Citaat' className={cn('relative', className)}>
      <Reveal as='figure' variant='fade' className='mx-auto max-w-[880px] px-6 md:px-12'>
        <Image
          src='/images/rumi-quote.jpg'
          width={881}
          height={540}
          sizes='(min-width: 880px) 784px, 100vw'
          alt='Een geel, hartvormig blad tussen donkere boomstammen. In beeld staat de tekst: Er is een plek, voorbij goed en kwaad, daar wil ik je ontmoeten. Rumi.'
          className='h-auto w-full'
        />
      </Reveal>
      {curve && <Curve into='surface-alt' />}
    </section>
  );
}
