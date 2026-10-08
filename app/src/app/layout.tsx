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
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { TrackingScriptsBody, TrackingScriptsHead } from '@/components/TrackingScripts';
import { siteJsonLd } from '@/lib/json-ld';
import { SITE_URL } from '@/lib/site';
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

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${site.name} | Camilla Amba`,
      template: `%s | ${site.name} | Camilla Amba`,
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
  const site = await getSiteInformation();

  return (
    <html
      lang={site.language}
      data-scroll-behavior='smooth'
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <head>
        <TrackingScriptsHead />
      </head>
      <body className='min-h-full'>
        {/* Vendor-specified position: first element inside <body>. */}
        <TrackingScriptsBody />
        {/* The organisation and the site belong on every page. */}
        <JsonLd data={siteJsonLd(site)} />
        <a
          href='#inhoud'
          className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-surface focus:px-4 focus:py-2'
        >
          Ga naar de inhoud
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
