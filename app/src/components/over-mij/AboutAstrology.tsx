import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

export function AboutAstrology() {
  return (
    <section className='pb-28 md:pb-44'>
      <RevealGroup className={cn(wrapClass, 'grid md:grid-cols-12')}>
        <div className='md:col-span-8 md:col-start-3'>
          <Reveal as='h3' className='font-display text-h3 text-balance'>
            Geloof je niet in astrologie? Wacht nog even voor je de pagina sluit!
          </Reveal>
          <Reveal as='p' className='mt-7'>
            Ik snap heel goed dat niet iedereen gelooft in astrologie als een krachtig,
            inzichtgevend instrument dat werkt als een spiegel voor zelfreflectie en het verkennen
            van de eigen identiteit. Toch kun je de horoscoop zien als een symbolische kaart die ons
            helpt om patronen in ons leven bespreekbaar en inzichtelijk te maken. Een creatieve lens
            waarmee we met een frisse blik naar onze persoonlijke ontwikkeling kunnen kijken.
          </Reveal>
          <Reveal as='p' className='mt-6'>
            Ook functioneert de horoscoop als een laagdrempelige ijsbreker om betekenisvolle
            gesprekken over onze binnenwereld te voeren. De rijke symboliek helpt om complexe
            menselijke emoties en gedragingen woorden te geven. Ik krijg in mijn praktijk vrijwel
            altijd terug dat het gesprek, mede door gebruik van de horoscoop, mijn gesprekspartner
            een narratief kader heeft geboden. Dat werkt helend, want als we vastlopen, zijn we vaak
            de draad van ons eigen leven kwijt.
          </Reveal>
          <Reveal as='p' className='mt-6'>
            Wat ik eigenlijk wil zeggen, is dat het voor de psychologische waarde helemaal niet
            uitmaakt of de planeten daadwerkelijk invloed op ons hebben. Waar het om gaat, is dat
            astrologie ons een kant-en-klaar palet aan archetypen en verhaallijnen biedt. Het feit
            dat wij door deze symbolen kunnen reflecteren op ons leven, zorgt voor betekenisgeving.
            Het helpt ons om met afstand naar onze eigen uitdagingen te kijken, en transformeert een
            reeks willekeurige gebeurtenissen in een waardevol en betekenisvol levensverhaal.
          </Reveal>
          <Reveal as='h3' className='mt-10 font-display text-h3 text-balance'>
            Doel
          </Reveal>
          <Reveal as='p' className='mt-7'>
            Of je nu wel of niet in astrologie gelooft, mijn doel is voor iedereen gelijk: volledig
            oordeelloos naar jezelf leren kijken. Ontdekken dat er nooit iets mis met je was, maar
            dat jouw grootste innerlijke worstelingen juist de toegangspoort zijn naar jouw diepste,
            authentieke kracht.
          </Reveal>
          <Reveal as='p' className='mt-6'>
            Ik begeleid dit proces op twee manieren: in persoonlijke, 1-op-1 gesprekken, of in de
            workshop ‘In the Mirror – een nieuwe kijk op jezelf!’, die ik hiervoor heb ontwikkeld –
            samen met andere deelnemers die precies hetzelfde bij zichzelf herkennen.
          </Reveal>
        </div>
      </RevealGroup>
    </section>
  );
}
