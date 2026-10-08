import type { Metadata } from 'next';
import { WorkshopAudience } from '@/components/workshop/WorkshopAudience';
import { WorkshopCombi } from '@/components/workshop/WorkshopCombi';
import { WorkshopHero } from '@/components/workshop/WorkshopHero';
import { WorkshopIntro } from '@/components/workshop/WorkshopIntro';
import { WorkshopSafety } from '@/components/workshop/WorkshopSafety';
import { WorkshopSchedule } from '@/components/workshop/WorkshopSchedule';
import { WorkshopSignup } from '@/components/workshop/WorkshopSignup';

export const metadata: Metadata = {
  title: 'Workshop In the Mirror',
  description:
    'Workshop In the Mirror: een dag in een kleine, besloten groep met psychologische astrologie als spiegel. Laat je interesse achter.',
};

export default function WorkshopPage() {
  return (
    <main id='inhoud'>
      <WorkshopHero />
      <WorkshopIntro />
      <WorkshopAudience />
      <WorkshopSchedule />
      <WorkshopSafety />
      <WorkshopCombi />
      <WorkshopSignup />
    </main>
  );
}
