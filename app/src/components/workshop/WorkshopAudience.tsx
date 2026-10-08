import { Bullet } from '@/components/ui/Bullet';
import { Cta } from '@/components/ui/Cta';
import { Curve } from '@/components/ui/Curve';
import { Illustration } from '@/components/ui/Illustration';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';

const FOR_YOU = [
  'steeds vastloopt in dezelfde dynamiek binnen relaties of verbindingen.',
  'voelt dat je pijn of overlevingsmechanismen meedraagt die eigenlijk niet van jou zijn, maar van generaties voor jou.',
  'moeite hebt met het stellen van gezonde grenzen en de neiging hebt jezelf aan te passen om erbij te horen.',
  'ruimte zoekt voor je schaduwkanten: die delen van jezelf die je lang hebt weggestopt, maar die eigenlijk gehoord willen worden.',
];

const EXPECT = [
  {
    title: 'Kleinschalig en veilig',
    body: 'We werken in een besloten, intieme groep onder deskundige, holistische begeleiding.',
  },
  {
    title: 'Inzicht in jouw blauwdruk',
    body: 'We kijken heel gericht naar jouw persoonlijke spiegel om blinde vlekken helder te krijgen.',
  },
  {
    title: 'Ervaringsgericht en helend',
    body: 'Geen droge theorie, maar een organisch samenspel van gesprek, energetische reflectie (met unieke reflectiekaarten) en innerlijke rust.',
  },
];

export function WorkshopAudience() {
  return (
    <section className='relative py-28 md:py-44'>
      <RevealGroup className={wrapClass}>
        <div className='grid gap-16 md:grid-cols-12 md:gap-x-10'>
          <div className='md:col-span-6'>
            <Reveal as='h2' className='font-display text-h2 text-balance'>
              Voor wie is deze workshop?
            </Reveal>
            <Reveal as='p' className='mt-9 max-w-[34rem]'>
              Voor jou als je:
            </Reveal>
            <ul className='mt-4 max-w-[34rem] space-y-5'>
              {FOR_YOU.map((item) => (
                <Bullet key={item}>{item}</Bullet>
              ))}
            </ul>
          </div>
          <div className='md:col-span-5 md:col-start-8'>
            <Reveal as='h2' className='font-display text-h2 text-balance'>
              Wat kun je verwachten?
            </Reveal>
            <ul className='mt-9 max-w-[34rem] space-y-7'>
              {EXPECT.map((item) => (
                <Reveal as='li' key={item.title}>
                  <h3 className='text-[1.2rem] font-medium'>{item.title}</h3>
                  <p className='mt-1'>{item.body}</p>
                </Reveal>
              ))}
            </ul>
            <Reveal as='figure' className='mt-14'>
              <Illustration
                name='keuze'
                alt='Illustratie: een figuur dat een keuze overweegt tussen twee opties'
                className='max-w-[20rem]'
              />
            </Reveal>
          </div>
        </div>
        <Reveal className='mt-16'>
          <Cta href='#inschrijven'>Meld je interesse aan</Cta>
        </Reveal>
      </RevealGroup>
      <Curve into='surface-alt' />
    </section>
  );
}
