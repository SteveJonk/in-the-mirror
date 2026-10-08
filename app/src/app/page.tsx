import { AboutTeaser } from '@/components/home/AboutTeaser';
import { ContactSection } from '@/components/home/ContactSection';
import { ConversationTeaser } from '@/components/home/ConversationTeaser';
import { ExploreTiles } from '@/components/home/ExploreTiles';
import { HomeHero } from '@/components/home/HomeHero';
import { PodcastTeaser } from '@/components/home/PodcastTeaser';
import { WorkshopTeaser } from '@/components/home/WorkshopTeaser';
import { RumiQuote } from '@/components/shared/RumiQuote';

// Static for now: the copy lives in the components until the page is wired to Sanity.
export default function HomePage() {
  return (
    <main id='inhoud'>
      <HomeHero />
      <ExploreTiles />
      <AboutTeaser />
      <WorkshopTeaser />
      <PodcastTeaser />
      <ConversationTeaser />
      <RumiQuote className='py-32 md:py-44' />
      <ContactSection />
    </main>
  );
}
