import { Bullet } from '@/components/ui/Bullet';
import { Cta } from '@/components/ui/Cta';
import { Curve } from '@/components/ui/Curve';
import { Illustration } from '@/components/ui/Illustration';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

const EXPECT = [
  {
    title: 'Herkenning en bedding:',
    body: 'je volgt dit proces samen met andere deelnemers die precies hetzelfde bij zichzelf herkennen. Je bent niet alleen.',
  },
  {
    title: 'Inzicht in jouw maskers:',
    body: 'we ontrafelen de verwachtingen van buitenaf waar jij je (onbewust) aan hebt aangepast.',
  },
  {
    title: 'Concrete handvatten:',
    body: 'je leert hoe je jouw grenzen bewaakt en dichter bij je eigen soevereiniteit blijft in het dagelijks leven.',
  },
];

export function WorkshopIntro() {
  return (
    <section className='relative bg-surface-alt py-28 md:py-44'>
      <RevealGroup className={cn(wrapClass, 'grid items-center gap-16 md:grid-cols-12 md:gap-x-10')}>
        <div className='md:col-span-6 md:row-start-1'>
          <Reveal as='h2' className='font-display text-h2 text-balance'>
            Workshop In the Mirror, voor een nieuwe kijk op jezelf!
          </Reveal>
          <Reveal as='p' className='mt-9 max-w-[34rem]'>
            Voor Rumi is de spiegel een krachtig symbool voor het menselijk hart dat de ziel en de
            goddelijke werkelijkheid weerspiegelt.
          </Reveal>
          <Reveal as='p' className='mt-6 max-w-[34rem]'>
            Loop je vast in patronen binnen relaties, merk je dat je het lastig vindt om écht je
            eigen ruimte in te nemen, of wil je simpelweg krachtiger en autonomer in het leven
            staan? In deze kleinschalige workshop kijken we samen in de spiegel — niet met oordeel,
            maar met een milde, open blik.
          </Reveal>
          <Reveal as='p' className='mt-6 max-w-[34rem]'>
            We gebruiken hierin krachtige psychologische instrumenten en universele verhaallijnen.
            Een belangrijk onderdeel hiervan is het werken met het archetype Lilith.
          </Reveal>
          <Reveal as='p' className='mt-6 max-w-[34rem]'>
            Iedereen heeft een ‘Lilith’ in zich; zij belichaamt de energie van autonomie,
            soevereiniteit en gezonde grenzen. Lilith herinnert ons eraan wie we zijn als we alle
            maskers en verwachtingen van anderen afwerpen. Zij helpt je helder te krijgen waar jij
            jezelf onbewust nog inhoudt, hoe je de regie over je eigen leven terugneemt, en hoe je
            jouw meest authentieke, pure kracht weer de ruimte geeft.
          </Reveal>
          <Reveal as='h3' className='mt-10 font-display text-h3 text-balance'>
            Wat kun je verwachten?
          </Reveal>
          <ul className='mt-6 max-w-[34rem] space-y-5'>
            {EXPECT.map((item) => (
              <Bullet key={item.title}>
                <strong className='font-medium'>{item.title}</strong> {item.body}
              </Bullet>
            ))}
          </ul>
          <Reveal as='p' className='mt-6 max-w-[34rem]'>
            De workshop is uiteraard onvoorwaardelijk open voor iedereen, ongeacht gender of
            identiteit. Lilith kent geen genderverschillen; ze is een universele menselijke kracht.
            Juist de balans tussen de vrouwelijke, mannelijke en non-binaire dynamieken in de
            cirkel brengt een enorme rijkdom aan herkenning en nieuwe perspectieven.
          </Reveal>
          <Reveal className='mt-10'>
            <Cta href='#inschrijven'>Meld je interesse aan</Cta>
          </Reveal>
        </div>
        <Reveal as='figure' delay={1} className='md:col-span-5 md:col-start-8 md:row-start-1'>
          <Illustration
            name='drie-silhouetten'
            alt='Illustratie: drie silhouetten naast elkaar, een beeld van een kleine, verbonden groep'
            className='max-w-[24rem]'
          />
        </Reveal>
      </RevealGroup>
      <Curve into='surface' />
    </section>
  );
}
