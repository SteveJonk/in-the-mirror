import { defineQuery } from 'next-sanity';

/**
 * Resolve internal page references on link/cta objects.
 *
 * A link in the studio is either an external URL or a reference to a `page`
 * document; this projection pulls the referenced slug up so `resolveHref` in
 * `src/lib/links.ts` can turn either shape into an href.
 */
const linkExpansion = /* groq */ `{
  ...,
  internalLink->{
    "slug": slug.current
  }
}`;

/**
 * Everything the renderer needs to draw a form.
 *
 * `fields[]` and `steps[]` are spread wholesale — a form field is a flat object
 * with no references in it, so there is nothing to resolve. Only the redirect
 * link needs expanding.
 */
const formProjection = /* groq */ `{
  _id,
  title,
  showTitle,
  mode,
  fields[],
  steps[]{
    title,
    fields[]
  },
  submitButtonText,
  nextButtonText,
  backButtonText,
  successTitle,
  successBody,
  redirectAfterSubmit,
  redirectLink${linkExpansion}
}`;

/**
 * An image with what next/image needs: the file, its size and its alt text.
 * Illustrations are SVG uploads and come through the same way.
 */
const imageProjection = /* groq */ `{
  alt,
  "src": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;

const episodeProjection = /* groq */ `{
  _id,
  title,
  description,
  "audio": audio.asset->url
}`;

/**
 * One page and its blocks.
 *
 * Every block carries the shared section fields; each type then projects its
 * own fields, resolving links, images and referenced documents. When you add
 * a block, add its branch here and run `npm run typegen`.
 */
export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    seo,
    content[]{
      _type,
      _key,
      background,
      spacing,
      anchor,
      _type == "homeHero" => {
        title,
        lead,
        cta${linkExpansion},
        image${imageProjection}
      },
      _type == "pageHero" => {
        title,
        intro,
        italic,
        attribution,
        facts,
        primaryCta${linkExpansion},
        secondaryLink${linkExpansion},
        media,
        image${imageProjection},
        alignBottom
      },
      _type == "mediaText" => {
        title,
        body,
        facts,
        factsNote,
        episode->${episodeProjection},
        cta${linkExpansion},
        ctaStyle,
        textLink${linkExpansion},
        media,
        image${imageProjection},
        priceCard,
        mediaLeft,
        mediaSmall,
        indent,
        alignTop
      },
      _type == "tiles" => {
        items[]{
          _key,
          label,
          linkType,
          href,
          internalLink->{ "slug": slug.current },
          illustration${imageProjection}
        }
      },
      _type == "columns" => {
        title,
        intro,
        items[]{ _key, title, body, icon${imageProjection} },
        footnote
      },
      _type == "textColumns" => {
        columns[]{ _key, title, body, illustration${imageProjection} },
        cta${linkExpansion}
      },
      _type == "quote" => { text },
      _type == "featureImage" => { image${imageProjection} },
      _type == "callout" => { title, body, cta${linkExpansion}, size },
      _type == "pricing" => {
        title,
        plans,
        optionsLabel,
        options[]{ _key, label, icon${imageProjection} }
      },
      _type == "schedule" => { title, lead, cta${linkExpansion}, slots },
      _type == "episodes" => { title, episodes[]->${episodeProjection}, footnote },
      _type == "calendar" => { title, lead, embedUrl, placeholderTitle, placeholderText },
      // The form lives in its own document so several pages can share it, and
      // the public half of the reCAPTCHA settings rides along — the secret
      // stays server-side, in the submit route.
      _type == "contactForm" => {
        illustration${imageProjection},
        title,
        lead,
        note,
        links[]${linkExpansion},
        showRequiredMarks,
        wideForm,
        form->${formProjection},
        "recaptcha": *[_type == "formGeneralSettings"][0]{
          recaptchaEnabled,
          recaptchaSiteKey
        }
      }
    }
  }
`);

/** Slugs of every page, for generateStaticParams and the sitemap. */
export const PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt
  }
`);

export const NAVIGATION_QUERY = defineQuery(`
  *[_id == "navigation"][0]{
    links[]${linkExpansion}
  }
`);

/** Every page that credits a photo, for the footer of that page. */
export const PHOTO_CREDITS_QUERY = defineQuery(`
  *[_type == "page" && defined(photoCredit) && defined(slug.current)]{
    "slug": slug.current,
    photoCredit
  }
`);

/**
 * The site's own details — name, contact, language, social profiles.
 *
 * Every field is optional in the studio; `resolveSiteInformation` in
 * `src/lib/site.ts` lays what comes back over the defaults, so an empty field
 * falls back rather than rendering blank.
 */
export const SITE_INFORMATION_QUERY = defineQuery(`
  *[_id == "siteInformation"][0]{
    name,
    owner,
    description,
    language,
    phone,
    email,
    address,
    addressCountry,
    badges,
    // Only the URLs: they become sameAs in the structured data.
    "socialLinks": socialLinks[].url,
    "logoUrl": logo.asset->url,
    interfaceTexts
  }
`);

export const FOOTER_QUERY = defineQuery(`
  *[_id == "footer"][0]{
    text,
    smallPrint,
    copyright
  }
`);

/**
 * What the submit route needs: the mail settings, plus a flat list of every
 * field the form declares — both modes collapse to the same shape here.
 *
 * This list is the server's allow-list. A key the browser posts that is not in
 * it never reaches the mail, so it has to stay in step with what the renderer
 * draws; `npm run check:form` asserts exactly that.
 */
export const FORM_QUERY = defineQuery(`
  *[_id == $formId && _type == "form"][0]{
    _id,
    title,
    mailRecipients,
    mailSubject,
    mailMessage,
    sendCopyToSubmitter,
    copySubject,
    copyMessage,
    "fields": select(
      mode == "steps" => steps[].fields[]{label, name, type, isRequired},
      fields[]{label, name, type, isRequired}
    )
  }
`);

/** Shared mail and spam settings. Server-side only — it carries secrets. */
export const FORM_SETTINGS_QUERY = defineQuery(`
  *[_type == "formGeneralSettings"][0]{
    adminEmail,
    fromEmail,
    fromName,
    mailLogo,
    primaryColor,
    textColor,
    mailjetApiKey,
    mailjetApiSecret,
    confirmationSubject,
    confirmationMessage,
    recaptchaEnabled,
    recaptchaSecretKey
  }
`);
