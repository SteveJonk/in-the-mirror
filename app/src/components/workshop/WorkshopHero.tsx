import { Cta } from '@/components/ui/Cta';
import { Curve } from '@/components/ui/Curve';
import { FactList } from '@/components/ui/FactList';
import { MirrorArch } from '@/components/ui/MirrorArch';
import { TextLink } from '@/components/ui/TextLink';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

export function WorkshopHero() {
  return (
    <section id='top' className='relative pt-32 pb-24 md:pt-48 md:pb-40'>
      <div className={cn(wrapClass, 'grid items-center gap-16 md:grid-cols-12 md:gap-x-10')}>
        <div className='animate-arrive motion-reduce:animate-none md:col-span-7'>
          <h1 className='font-display text-h1 text-balance'>In the Mirror</h1>
          <p className='mt-8 max-w-[34rem] text-intro italic md:text-intro-lg'>
            “There are two kinds of mirrors: One looks at the face, the other looks at the soul. The
            one who looks at the soul, sees their own true essence.”{' '}
            <span className='not-italic'>— Rumi</span>
          </p>
          <FactList
            className='mt-10'
            facts={[
              { label: 'Programma', value: 'Eén dag, 09:30 tot 16:30' },
              { label: 'Investering', value: '€ 275' },
              { label: 'Regio', value: 'Noord-Holland en Utrecht' },
            ]}
          />
          <div className='mt-10 flex flex-wrap items-center gap-x-9 gap-y-3'>
            <Cta href='#inschrijven'>Meld je interesse aan</Cta>
            <TextLink href='#dagprogramma' className='py-2'>
              Bekijk het dagprogramma
            </TextLink>
          </div>
        </div>
        <div className='animate-arrive [animation-delay:.75s] motion-reduce:animate-none md:col-span-4 md:col-start-9'>
          <MirrorArch priority />
        </div>
      </div>
      <Curve into='surface-alt' />
    </section>
  );
}
