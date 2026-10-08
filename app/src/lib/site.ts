import type { SITE_INFORMATION_QUERY_RESULT } from '@/sanity/sanity.types';

/**
 * Site-wide details, and the defaults they fall back to.
 *
 * Everything here lives in the CMS as the `siteInformation` singleton, so the
 * defaults are deliberately neutral: an empty field — or an unreachable CMS —
 * renders nothing rather than stale copy. Only the two codes that structured
 * data cannot do without have a real value.
 *
 * Read the resolved values with `getSiteInformation()` from
 * `src/sanity/site-information.ts`.
 */
export const SITE_DEFAULTS = {
  name: '',
  owner: '',
  description: '',
  /** BCP 47 language tag. Sets `<html lang>` and `inLanguage` in the graph. */
  language: 'nl',
  phone: '',
  email: '',
  address: [] as string[],
  /** ISO 3166-1 alpha-2 code for the address above. Structured data only. */
  addressCountry: 'NL',
  badges: [] as string[],
} as const;

type InterfaceTextsDocument = NonNullable<
  NonNullable<SITE_INFORMATION_QUERY_RESULT>['interfaceTexts']
>;

/** Every small interface text (menu buttons, player labels, form messages), blank when unset. */
export type InterfaceTexts = {
  [K in Exclude<keyof InterfaceTextsDocument, '_type'>]-?: string;
};

/** One entry per text; the type makes sure none is missing when the schema grows. */
const BLANK_INTERFACE_TEXTS: InterfaceTexts = {
  skipToContent: '',
  mainMenu: '',
  footerMenu: '',
  menu: '',
  openMenu: '',
  closeMenu: '',
  previous: '',
  next: '',
  audioPlayer: '',
  play: '',
  pause: '',
  duration: '',
  progress: '',
  of: '',
  back: '',
  forward: '',
  required: '',
  invalidEmail: '',
  checkFields: '',
  sending: '',
  sendFailed: '',
  recaptcha: '',
  stepCounter: '',
  notFoundTitle: '',
  notFoundText: '',
  notFoundButton: '',
};

/**
 * The site's public origin, without a trailing slash.
 *
 * The one detail that stays out of the CMS: it comes from the environment
 * because it differs per deploy, and `metadataBase`, `robots.txt` and the
 * structured data all need it before — or without — a CMS round trip. The
 * localhost default keeps `npm run dev` working; set NEXT_PUBLIC_SITE_URL in
 * production.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(
  /\/+$/,
  '',
);

/** Site details with every field filled in — defaults where the CMS is empty. */
export type SiteInformation = {
  name: string;
  owner: string;
  description: string;
  language: string;
  phone: string;
  email: string;
  address: string[];
  addressCountry: string;
  badges: string[];
  /** Profile URLs elsewhere. Empty unless an editor adds some. */
  socialLinks: string[];
  logoUrl: string | null;
  interfaceTexts: InterfaceTexts;
};

/** What the CMS hands over: every field optional, any of them blank. */
export type SiteInformationDocument = {
  name?: string | null;
  owner?: string | null;
  description?: string | null;
  language?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: Array<string | null> | null;
  addressCountry?: string | null;
  badges?: Array<string | null> | null;
  socialLinks?: Array<string | null> | null;
  logoUrl?: string | null;
  interfaceTexts?: Partial<Record<keyof InterfaceTexts, string | null>> | null;
} | null;

function text(value: string | null | undefined, fallback: string): string {
  return value?.trim() || fallback;
}

function list(
  value: Array<string | null> | null | undefined,
  fallback: readonly string[] = [],
): string[] {
  const items = (value ?? []).map((item) => item?.trim()).filter(Boolean) as string[];
  return items.length ? items : [...fallback];
}

/**
 * Lay the CMS document over the defaults.
 *
 * A field an editor left empty falls back rather than rendering as a blank —
 * which is also what happens when the CMS is unreachable and `doc` is null.
 * `socialLinks` is the exception: nothing to fall back to, so empty is empty.
 */
export function resolveSiteInformation(doc: SiteInformationDocument): SiteInformation {
  return {
    name: text(doc?.name, SITE_DEFAULTS.name),
    owner: text(doc?.owner, SITE_DEFAULTS.owner),
    description: text(doc?.description, SITE_DEFAULTS.description),
    language: text(doc?.language, SITE_DEFAULTS.language),
    phone: text(doc?.phone, SITE_DEFAULTS.phone),
    email: text(doc?.email, SITE_DEFAULTS.email),
    address: list(doc?.address, SITE_DEFAULTS.address),
    addressCountry: text(doc?.addressCountry, SITE_DEFAULTS.addressCountry),
    badges: list(doc?.badges, SITE_DEFAULTS.badges),
    socialLinks: list(doc?.socialLinks),
    logoUrl: doc?.logoUrl?.trim() || null,
    interfaceTexts: Object.fromEntries(
      Object.keys(BLANK_INTERFACE_TEXTS).map((key) => [
        key,
        doc?.interfaceTexts?.[key as keyof InterfaceTexts]?.trim() ?? '',
      ]),
    ) as InterfaceTexts,
  };
}

/** `+31 (0)20 123 4567` -> `tel:+31201234567`. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export function mailtoHref(email: string): string {
  return `mailto:${email.trim()}`;
}

export type NavLink = { href: string; label: string };

export type FooterLinkGroup = {
  title: string;
  links: NavLink[];
};
