import type { Metadata } from 'next';
/*
 * FONTS — change these two imports to change the site's typefaces.
 *
 * Each one exposes a CSS variable that `globals.css` picks up:
 *   --font-display-src -> --font-display (headings)
 *   --font-sans-src    -> --font-sans    (everything else)
 *
 * Keep the `variable` names as they are and only swap the font, or the theme
 * loses its handle on them. Any next/font/google family works here.
 */
import { Instrument_Serif, Newsreader } from 'next/font/google';
import { JsonLd } from '@/components/JsonLd';
import { InterfaceTextsProvider } from '@/components/layout/InterfaceTexts';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { TrackingScriptsBody, TrackingScriptsHead } from '@/components/TrackingScripts';
import { siteJsonLd } from '@/lib/json-ld';
import { pathForSlug, toLabeledHref } from '@/lib/links';
import { SITE_URL, type NavLink } from '@/lib/site';
import { safeFetch } from '@/sanity/client';
import { sanityCache } from '@/sanity/fetch';
import { FOOTER_QUERY, NAVIGATION_QUERY, PHOTO_CREDITS_QUERY } from '@/sanity/queries';
import type {
  FOOTER_QUERY_RESULT,
  NAVIGATION_QUERY_RESULT,
  PHOTO_CREDITS_QUERY_RESULT,
} from '@/sanity/sanity.types';
import { getSiteInformation } from '@/sanity/site-information';
import './globals.css';

const display = Instrument_Serif({
  variable: '--font-display-src',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
});

const sans = Newsreader({
  variable: '--font-sans-src',
  subsets: ['latin'],
  axes: ['opsz'],
  style: ['normal', 'italic'],
});

/**
 * Site-wide metadata defaults, from the `siteInformation` singleton.
 *
 * Per-page `seo` fields from the CMS layer on top of this (see
 * `src/sanity/metadata.ts`); anything a page leaves unset falls back here.
 * `metadataBase` is what turns a relative og:image path into an absolute URL,
 * so set NEXT_PUBLIC_SITE_URL in production or social previews will break —
 * the sitemap and robots routes read the same value.
 */
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteInformation();
  // "In the Mirror | Camilla Amba" — the site name, then whoever is behind it.
  const brand = [site.name, site.owner].filter(Boolean).join(' | ');

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: brand,
      template: `%s | ${brand}`,
    },
    description: site.description,
    openGraph: {
      type: 'website',
      siteName: site.name,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Chrome only — a CMS outage leaves the header and footer bare rather than
  // failing every page. Page content is fetched with `client.fetch` and throws.
  const [site, navigation, footer, credits] = await Promise.all([
    getSiteInformation(),
    safeFetch<NAVIGATION_QUERY_RESULT>(NAVIGATION_QUERY, {}, sanityCache),
    safeFetch<FOOTER_QUERY_RESULT>(FOOTER_QUERY, {}, sanityCache),
    safeFetch<PHOTO_CREDITS_QUERY_RESULT>(PHOTO_CREDITS_QUERY, {}, sanityCache),
  ]);

  const links = (navigation?.links ?? [])
    .map(toLabeledHref)
    .filter((link): link is NavLink => Boolean(link));
  const photoCredits = Object.fromEntries(
    (credits ?? []).map((page) => [pathForSlug(page.slug), page.photoCredit ?? '']),
  );
  const ui = site.interfaceTexts;

  return (
    <html
      lang={site.language}
      data-scroll-behavior='smooth'
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <head>
        <TrackingScriptsHead />
        <meta name='apple-mobile-web-app-title' content='In the mirror' />
      </head>
      <body className='min-h-full'>
        {/* Vendor-specified position: first element inside <body>. */}
        <TrackingScriptsBody />
        {/* The organisation and the site belong on every page. */}
        <JsonLd data={siteJsonLd(site)} />
        <InterfaceTextsProvider value={ui}>
          <a
            href='#inhoud'
            className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-surface focus:px-4 focus:py-2'
          >
            {ui.skipToContent}
          </a>
          <SiteHeader siteName={site.name} links={links} />
          {children}
          <SiteFooter
            siteName={site.name}
            owner={site.owner}
            links={links}
            text={footer?.text}
            smallPrint={footer?.smallPrint}
            copyright={footer?.copyright}
            photoCredits={photoCredits}
          />
        </InterfaceTextsProvider>
      </body>
    </html>
  );
}
