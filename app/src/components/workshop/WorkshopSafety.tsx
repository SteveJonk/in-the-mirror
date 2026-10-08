import { Curve } from '@/components/ui/Curve';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';

export function WorkshopSafety() {
  return (
    <section aria-labelledby='veiligheid' className='relative bg-inverse py-28 text-inverse-fg md:py-44'>
      <RevealGroup className={wrapClass}>
        <div className='grid gap-10 md:grid-cols-12 md:gap-x-10'>
          <Reveal as='h2' id='veiligheid' className='font-display text-h2 text-balance md:col-span-6'>
            Veiligheid en jouw privacy staan voorop
          </Reveal>
          <Reveal as='p' className='max-w-[34rem] md:col-span-5 md:col-start-8 md:pt-3'>
            Een workshop rondom je patronen kan spannend zijn, maar bij In the Mirror creëren we een
            nuchtere, respectvolle en vooral rustige omgeving. Je behoudt altijd zelf de regie over
            wat je wel of niet deelt in de groep.
          </Reveal>
        </div>
        <div className='mt-16 grid gap-12 border-t border-inverse-fg/30 pt-12 md:grid-cols-2 md:gap-x-16'>
          <Reveal>
            <h3 className='font-display text-h3 text-balance'>Wat het wel is</h3>
            <p className='mt-5 max-w-[30rem]'>
              Een inzichtgevende, psychologische ontdekkingstocht. Een veilige plek om te reflecteren
              op de verborgen en verdrongen delen van je karakter en je patronen hierin te
              ontvouwen, zodat je met een nieuwe kijk op jezelf verder kunt.
            </p>
          </Reveal>
          <Reveal>
            <h3 className='font-display text-h3 text-balance'>Wat het niet is</h3>
            <p className='mt-5 max-w-[30rem]'>
              Dit is geen therapiesessie of crisisopvang. Mijn workshops en gesprekken zijn bedoeld
              voor mensen die stevig genoeg in hun schoenen staan om naar hun eigen patronen te
              kijken. Loop je op dit moment diepgaand psychisch vast of heb je behoefte aan
              therapeutische of psychiatrische behandeling? Dan verwijs ik je graag door naar de
              reguliere zorg; mijn aanbod is daar geen vervanging voor.
            </p>
          </Reveal>
        </div>
      </RevealGroup>
      <Curve into='surface' />
    </section>
  );
}
