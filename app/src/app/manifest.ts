import type { MetadataRoute } from 'next';
import { getSiteInformation } from '@/sanity/site-information';

/** The web app manifest, named after the site in Site information. */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const site = await getSiteInformation();
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    // The paper colour from the theme (`--color-surface` in globals.css).
    theme_color: '#f8f2e8',
    background_color: '#f8f2e8',
    display: 'standalone',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
