import { MessageForm } from '@/components/form/MessageForm';
import { Curve } from '@/components/ui/Curve';
import { Illustration } from '@/components/ui/Illustration';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

export function ContactSection() {
  return (
    <section id='contact' className='relative pb-32 md:pt-8 md:pb-48'>
      <RevealGroup className={cn(wrapClass, 'grid gap-16 md:grid-cols-12 md:gap-x-10')}>
        <div className='md:col-span-5'>
          <Illustration
            name='bericht-verstuurd'
            alt='Illustratie: een envelop met een vinkje, een bericht is verstuurd'
            className='max-w-[16rem]'
          />
          <Reveal as='h2' className='font-display text-h2 text-balance'>
            Neem contact op
          </Reveal>
          <Reveal as='p' className='mt-9 max-w-[30rem]'>
            Een vraag, of eerst even kennismaken? Laat een bericht achter en ik neem contact met je
            op.
          </Reveal>
        </div>

        <MessageForm home className='md:col-span-6 md:col-start-7' />
      </RevealGroup>
      <Curve into='surface-alt' />
    </section>
  );
}
