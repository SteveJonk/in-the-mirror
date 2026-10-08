import { Illustration } from '@/components/ui/Illustration';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

export function AboutMethod() {
  return (
    <section className='pb-28 md:pb-44'>
      <RevealGroup className={cn(wrapClass, 'grid items-center gap-16 md:grid-cols-12 md:gap-x-10')}>
        <Reveal as='figure' className='md:col-span-5'>
          <Illustration
            name='mediteren'
            alt='Illustratie: een vrouw mediteert in kleermakerszit, een beeld van innerlijke rust en zelfreflectie'
            className='max-w-[26rem]'
          />
        </Reveal>
        <div className='md:col-span-6 md:col-start-7'>
          <Reveal as='p'>
            Vanuit die doorleefde basis werk ik met verschillende instrumenten en invalshoeken. Mijn
            ervaring als bevoegd vrijeschoolleerkracht en vakdocent HVO (Humanistisch
            Vormingsonderwijs) heeft mij een scherp oog gegeven voor menselijke dynamieken.
            Daarnaast ben ik geschoold als Energetisch coach en opgeleid om attitudinele-groepen te
            leiden. Ook mijn 5-jarige opleiding astrologie vanuit een psychologisch perspectief,
            gebaseerd op het werk van Carl Jung, heeft mij diepe inzichten gegeven die ik tot op de
            dag van vandaag met me meedraag.
          </Reveal>
          <Reveal as='p' className='mt-6'>
            Al deze methodieken vormen nu de brede basis van waaruit ik werk. In mijn gesprekken
            stem ik volledig af op jou en combineer ik deze verschillende invalshoeken – waaronder
            astrologie – om jou te begeleiden op een manier die écht bij jou past. Omdat ik het pad
            zelf heb bewandeld én de juiste tools in handen heb, loop ik nu met alle liefde en
            zonder oordeel een stukje met jou mee.
          </Reveal>
        </div>
      </RevealGroup>
    </section>
  );
}
