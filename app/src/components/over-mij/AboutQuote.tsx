import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

export function AboutQuote() {
  return (
    <section aria-label='Uitgelicht' className='pb-28 md:pb-44'>
      <RevealGroup className={cn(wrapClass, 'grid md:grid-cols-12')}>
        <Reveal as='blockquote' className='md:col-span-9 md:col-start-3'>
          <p className='font-display text-quote text-balance'>
            Ik praat dus niet alleen vanuit theorie, maar ook vanuit het geleefde leven.
          </p>
        </Reveal>
      </RevealGroup>
    </section>
  );
}
