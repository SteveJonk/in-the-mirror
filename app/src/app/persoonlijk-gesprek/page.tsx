import type { Metadata } from 'next';
import { ConversationBooking } from '@/components/persoonlijk-gesprek/ConversationBooking';
import { ConversationHero } from '@/components/persoonlijk-gesprek/ConversationHero';
import { ConversationIntro } from '@/components/persoonlijk-gesprek/ConversationIntro';
import { ConversationNotice } from '@/components/persoonlijk-gesprek/ConversationNotice';
import { ConversationRates } from '@/components/persoonlijk-gesprek/ConversationRates';

export const metadata: Metadata = {
  title: 'Persoonlijk gesprek',
  description:
    'Een persoonlijk gesprek van één op één, online of op een rustige locatie, met psychologische astrologie als nuchtere spiegel.',
};

export default function ConversationPage() {
  return (
    <main id='inhoud'>
      <ConversationHero />
      <ConversationIntro />
      <ConversationRates />
      <ConversationBooking />
      <ConversationNotice />
    </main>
  );
}
