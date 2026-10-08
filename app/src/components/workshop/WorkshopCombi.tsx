import { Curve } from '@/components/ui/Curve';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

export function WorkshopCombi() {
  return (
    <section className='relative py-28 md:py-44'>
      <RevealGroup className={cn(wrapClass, 'grid gap-14 md:grid-cols-12 md:gap-x-10')}>
        <div className='md:col-span-6'>
          <Reveal as='h2' className='font-display text-h2 text-balance'>
            De complete ervaring: het Combipakket
          </Reveal>
          <Reveal as='p' className='mt-9 max-w-[34rem]'>
            Wil je na de intensieve workshop ‘In the Mirror’ in alle rust en privacy alsnog dieper
            op jouw ontwikkeling en levensvragen ingaan? Kies dan voor het complete Combipakket. Je
            combineert de rijke groepsbijeenkomst met een uitgebreid en persoonlijk inzichtgevend
            gesprek.
          </Reveal>
          <Reveal as='p' className='mt-6 max-w-[34rem]'>
            <strong className='font-medium'>Jouw flexibiliteit:</strong> jij bepaalt de volgorde.
            Je kunt het 1-op-1 gesprek naar wens voorafgaand aan de workshop plannen voor een
            stevige basis, óf juist na afloop om de inzichten uit de dag in alle rust verder uit te
            diepen.
          </Reveal>
          <Reveal as='p' className='mt-6 max-w-[34rem]'>
            <strong className='font-medium'>Hoe te boeken:</strong> geef simpelweg in het
            interesseformulier onderaan de pagina aan dat je gebruik wilt maken van het
            Combipakket.
          </Reveal>
        </div>
        <Reveal delay={1} className='md:col-span-5 md:col-start-8'>
          <dl className='border-y border-fg'>
            <div className='py-6'>
              <dt className='text-muted'>Inhoud</dt>
              <dd className='mt-2'>
                Deelname aan de volledige dagworkshop In the Mirror (t.w.v. € 275,-) en een
                persoonlijk inzichtgesprek van 1,5 uur (t.w.v. € 240,-).
              </dd>
            </div>
            <div className='border-t border-line py-6'>
              <dt className='text-muted'>Jouw investering</dt>
              <dd className='mt-2 font-display text-price'>€ 415</dd>
              <dd className='mt-3 text-[1.05rem]'>
                Vrijgesteld van btw via de KOR. Je bespaart exact € 100,-.
              </dd>
            </div>
          </dl>
        </Reveal>
      </RevealGroup>
      <Curve into='surface-alt' />
    </section>
  );
}
