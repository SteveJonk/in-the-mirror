import type { ReactNode } from 'react';
import { Form, Submit } from '@/components/form/Form';
import { TextField } from '@/components/form/Inputs';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Name, e-mail, phone and message. On the home page each row is revealed on
 * scroll; on the contact page the form arrives with the page instead and
 * marks its required fields.
 */
export function MessageForm({ home = false, className }: { home?: boolean; className?: string }) {
  const row = (slot: number, node: ReactNode, className?: string) =>
    home ? (
      <Reveal delay={slot} className={className}>
        {node}
      </Reveal>
    ) : (
      <div className={className}>{node}</div>
    );

  return (
    <Form className={className}>
      <div className='space-y-9'>
        {row(
          1,
          <TextField name='naam' label='Naam' required='Vul je naam in.' star={!home} autoComplete='name' />,
        )}
        {row(
          2,
          <TextField
            name='email'
            type='email'
            label='E-mailadres'
            required='Vul je e-mailadres in.'
            invalid='Vul een geldig e-mailadres in, bijvoorbeeld naam@voorbeeld.nl.'
            star={!home}
            autoComplete='email'
          />,
        )}
        {row(
          3,
          <TextField
            name='telefoon'
            type='tel'
            label='Telefoonnummer (optioneel)'
            autoComplete='tel'
            inputMode='tel'
          />,
        )}
        {row(
          4,
          <TextField name='bericht' label='Bericht' required='Schrijf een bericht.' star={!home} rows={home ? 5 : 6} />,
        )}
      </div>
      {row(5, <Submit>Verstuur bericht</Submit>, 'mt-12')}
    </Form>
  );
}
