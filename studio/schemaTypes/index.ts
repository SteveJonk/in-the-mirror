import {calendarType} from './blocks/calendarType'
import {calloutType} from './blocks/calloutType'
import {columnsType} from './blocks/columnsType'
import {contactFormType} from './blocks/contactFormType'
import {episodesType} from './blocks/episodesType'
import {featureImageType} from './blocks/featureImageType'
import {homeHeroType} from './blocks/homeHeroType'
import {mediaTextType} from './blocks/mediaTextType'
import {pageHeroType} from './blocks/pageHeroType'
import {pricingType} from './blocks/pricingType'
import {quoteType} from './blocks/quoteType'
import {scheduleType} from './blocks/scheduleType'
import {textColumnsType} from './blocks/textColumnsType'
import {tilesType} from './blocks/tilesType'
import {episodeType} from './episodeType'
import {footerType} from './footerType'
import {formGeneralSettingsType} from './formGeneralSettingsType'
import {formType} from './formType'
import {navigationType} from './navigationType'
import {ctaType} from './objects/ctaType'
import {formFieldType} from './objects/formFieldType'
import {linkType} from './objects/linkType'
import {richTextType} from './objects/richTextType'
import {seoType} from './objects/seoType'
import {pageBuilderType} from './pageBuilderType'
import {pageType} from './pageType'
import {siteInformationType} from './siteInformationType'

/**
 * Every schema type the studio knows about.
 *
 * ADDING A BLOCK: create `blocks/<name>Type.ts`, import it here, add it to the
 * Blocks list below, and add it to `pageBuilderType.ts` so editors can insert
 * it. Then add its projection to `PAGE_QUERY` in the app's `queries.ts`, a
 * case to `PageBuilder.tsx`, and run `npm run typegen`.
 */
export const schemaTypes = [
  // Documents
  pageType,
  episodeType,
  navigationType,
  footerType,
  siteInformationType,
  formType,
  formGeneralSettingsType,
  // Shared objects
  seoType,
  linkType,
  ctaType,
  richTextType,
  formFieldType,
  pageBuilderType,
  // Blocks
  homeHeroType,
  pageHeroType,
  mediaTextType,
  tilesType,
  columnsType,
  textColumnsType,
  quoteType,
  featureImageType,
  calloutType,
  pricingType,
  scheduleType,
  episodesType,
  calendarType,
  contactFormType,
]
