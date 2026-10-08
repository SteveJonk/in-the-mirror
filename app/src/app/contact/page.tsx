import type { Metadata } from 'next';
import { ContactHero } from '@/components/contact/ContactHero';
import { RumiQuote } from '@/components/shared/RumiQuote';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Een vraag, of eerst even kennismaken? Laat een bericht achter.',
};

export default function ContactPage() {
  return (
    <main id='inhoud'>
      <ContactHero />
      <RumiQuote className='pb-28 md:pb-44' curve />
    </main>
  );
}
