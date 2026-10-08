import { MessageForm } from '@/components/form/MessageForm';
import { Illustration } from '@/components/ui/Illustration';
import { TextLink } from '@/components/ui/TextLink';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

export function ContactHero() {
  return (
    <section id='top' className='pt-32 pb-28 md:pt-48 md:pb-44'>
      <div className={cn(wrapClass, 'grid gap-16 md:grid-cols-12 md:gap-x-10')}>
        <div className='animate-arrive motion-reduce:animate-none md:col-span-5'>
          <div className='mb-12'>
            <Illustration
              name='contact'
              alt='Illustratie: een locatiepin, envelop en telefoon, symbolen om contact op te nemen'
              className='max-w-[20rem]'
            />
          </div>
          <h1 className='font-display text-h1 text-balance'>Neem contact op</h1>
          <p className='mt-9 max-w-[30rem] text-intro md:text-intro-lg'>
            Een vraag, of eerst even kennismaken? Laat een bericht achter en ik neem contact met je
            op.
          </p>
          <ul className='mt-12 max-w-[30rem] space-y-1'>
            <li>
              <TextLink href='/persoonlijk-gesprek' className='py-2'>
                Direct een gesprek plannen
              </TextLink>
            </li>
            <li>
              <TextLink href='/workshop#inschrijven' className='py-2'>
                Interesse in de workshop In the Mirror
              </TextLink>
            </li>
          </ul>
        </div>
        <MessageForm className='animate-arrive [animation-delay:.75s] motion-reduce:animate-none md:col-span-6 md:col-start-7 md:pt-6' />
      </div>
    </section>
  );
}
