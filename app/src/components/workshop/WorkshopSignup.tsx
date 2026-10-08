import { Checkbox, ChoiceGroup, TextField } from '@/components/form/Inputs';
import { Form, Submit } from '@/components/form/Form';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { wrapClass } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

export function WorkshopSignup() {
  return (
    <section id='inschrijven' className='bg-surface-alt py-28 md:py-44'>
      <RevealGroup className={cn(wrapClass, 'grid gap-14 md:grid-cols-12 md:gap-x-10')}>
        <div className='md:col-span-4'>
          <Reveal as='h2' className='font-display text-h2 text-balance'>
            Interesseformulier
          </Reveal>
          <Reveal as='p' className='mt-9 max-w-[24rem]'>
            Laat je interesse achter via dit formulier.
          </Reveal>
          <Reveal as='p' className='mt-4 max-w-[24rem] text-[0.98rem] text-muted'>
            Velden met een <span aria-hidden='true'>*</span>
            <span className='sr-only'>sterretje</span> zijn verplicht.
          </Reveal>
        </div>

        <Form
          className='md:col-span-7 md:col-start-6'
          success='Bedankt voor je interesse. (Prototype: er is nog niets verstuurd.)'
        >
          <div className='space-y-9'>
            <Reveal delay={0}>
              <TextField
                name='voornaam'
                label='Voornaam'
                required='Vul je voornaam in.'
                star
                autoComplete='given-name'
              />
            </Reveal>
            <Reveal delay={1}>
              <TextField
                name='email'
                type='email'
                label='E-mailadres'
                required='Vul je e-mailadres in.'
                invalid='Vul een geldig e-mailadres in, bijvoorbeeld naam@voorbeeld.nl.'
                star
                autoComplete='email'
              />
            </Reveal>
            <Reveal delay={2}>
              <ChoiceGroup
                name='aanmelding'
                legend='Ik meld mij aan voor'
                required='Kies waarvoor je je aanmeldt.'
                options={[
                  {
                    value: 'workshop',
                    label: (
                      <>
                        Alleen de dagworkshop <span className='text-muted'>€ 275</span>
                      </>
                    ),
                  },
                  {
                    value: 'combipakket',
                    label: (
                      <>
                        Het complete Combipakket <span className='text-muted'>€ 415</span>
                      </>
                    ),
                  },
                ]}
              />
            </Reveal>
            <Reveal delay={3}>
              <ChoiceGroup
                name='regio'
                legend='Mijn voorkeursregio'
                required='Kies je voorkeursregio.'
                options={[
                  { value: 'noord-holland', label: 'Noord-Holland' },
                  { value: 'utrecht', label: 'Utrecht' },
                ]}
              />
            </Reveal>
            <div className='grid gap-9 sm:grid-cols-2 sm:gap-x-10'>
              <Reveal delay={4}>
                <TextField
                  name='geboortedatum'
                  type='date'
                  label='Geboortedatum'
                  required='Vul je geboortedatum in.'
                  star
                  autoComplete='bday'
                />
              </Reveal>
              <Reveal delay={5}>
                <TextField
                  name='geboortetijd'
                  type='time'
                  label='Exacte geboortetijd'
                  required='Vul je geboortetijd in, bijvoorbeeld 14:35.'
                  star
                  hint='Bijvoorbeeld 14:35 uur. Weet je dit niet precies? Je kunt je geboortetijd ook opvragen bij het geboorteregister van de gemeente waar je geboren bent.'
                />
              </Reveal>
            </div>
            <Reveal delay={6}>
              <TextField
                name='geboorteplaats'
                label='Geboorteplaats'
                required='Vul je geboorteplaats in.'
                star
              />
            </Reveal>
            <Reveal delay={7}>
              <TextField name='hoop' label='Wat hoop je te ervaren of te ontdekken?' rows={5} />
            </Reveal>
            <Reveal delay={8}>
              <Checkbox
                name='akkoord'
                required='Vink aan dat je dit begrijpt om je aan te melden.'
              >
                Ik begrijp dat deze workshop voor persoonlijke ontwikkeling is en geen vervanging is
                voor therapeutische zorg.
              </Checkbox>
            </Reveal>
          </div>
          <Reveal delay={9} className='mt-12'>
            <Submit>Verstuur mijn interesse</Submit>
          </Reveal>
        </Form>
      </RevealGroup>
    </section>
  );
}
