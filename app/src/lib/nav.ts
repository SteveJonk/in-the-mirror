import type { NavLink } from '@/lib/site';

/** Main menu, shared by the header, the mobile menu and the footer. */
export const NAV_LINKS: NavLink[] = [
  { href: '/over-mij', label: 'Over mij' },
  { href: '/workshop', label: 'Workshop' },
  { href: '/podcast', label: 'Podcast' },
  { href: '/persoonlijk-gesprek', label: 'Persoonlijk gesprek' },
  { href: '/contact', label: 'Contact' },
];

/** Photo credit per page, for the stock photos on it. */
export const PHOTO_CREDITS: Record<string, string> = {
  '/': 'Foto van Alirad Zare via Unsplash.',
  '/workshop': 'Foto van Alirad Zare via Unsplash.',
  '/over-mij': 'Foto van Franziska via Unsplash.',
  '/persoonlijk-gesprek': 'Foto van fan yang via Unsplash.',
};
