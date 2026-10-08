import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

export function ConversationNotice() {
  return (
    <section aria-label='Goed om te weten' className='bg-surface-alt py-20 md:py-28'>
      <RevealGroup className={cn(wrapClass, 'grid gap-8 md:grid-cols-12 md:gap-x-10')}>
        <Reveal as='h2' className='font-display text-h3 text-balance md:col-span-4'>
          Goed om te weten
        </Reveal>
        <Reveal as='p' className='max-w-[40rem] md:col-span-7 md:col-start-6'>
          Dit is geen therapiesessie of crisisopvang. Mijn gesprekken zijn bedoeld voor mensen die
          stevig genoeg in hun schoenen staan om naar hun eigen patronen te kijken. Loop je op dit
          moment diepgaand psychisch vast of heb je behoefte aan therapeutische of psychiatrische
          behandeling? Dan verwijs ik je graag door naar de reguliere zorg; mijn aanbod is daar
          geen vervanging voor.
        </Reveal>
      </RevealGroup>
    </section>
  );
}
