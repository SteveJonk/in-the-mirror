import type { Metadata } from 'next';
import { AboutAstrology } from '@/components/over-mij/AboutAstrology';
import { AboutCredentials } from '@/components/over-mij/AboutCredentials';
import { AboutHero } from '@/components/over-mij/AboutHero';
import { AboutInvite } from '@/components/over-mij/AboutInvite';
import { AboutMethod } from '@/components/over-mij/AboutMethod';
import { AboutQuote } from '@/components/over-mij/AboutQuote';
import { AboutStory } from '@/components/over-mij/AboutStory';

export const metadata: Metadata = {
  title: 'Over mij en mijn werkwijze',
  description:
    'Geen vastgelopen protocollen, maar wat jij nú nodig hebt: gesprekken vanuit onderwijs, groepsdynamica, energetische coaching en psychologische astrologie.',
};

export default function AboutPage() {
  return (
    <main id='inhoud'>
      <AboutHero />
      <AboutStory />
      <AboutQuote />
      <AboutMethod />
      <AboutAstrology />
      <AboutInvite />
      <AboutCredentials />
    </main>
  );
}
