import {CogIcon} from '@sanity/icons/Cog'
import {defineArrayMember, defineField, defineType} from 'sanity'

const uiText = (name: string, title: string, fieldset: string) =>
  defineField({name, title, type: 'string', fieldset})

/**
 * Who the site belongs to: the details that appear in the header, the footer
 * and the structured data.
 *
 * A singleton — one document with a fixed `_id`, edited from the studio's top
 * menu. `npm run seed:site` fills it from the defaults in the app's
 * `src/lib/site.ts`, which are also what the front end falls back to when a
 * field here is empty.
 */
export const siteInformationType = defineType({
  name: 'siteInformation',
  title: 'Site information',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'identity', title: 'Identity', default: true},
    {name: 'contact', title: 'Contact'},
    {name: 'elsewhere', title: 'Elsewhere'},
    {name: 'interface', title: 'Interface texts'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Site name',
      type: 'string',
      group: 'identity',
      description: 'Used in the logo, the page title template and the structured data.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'owner',
      type: 'string',
      group: 'identity',
      description: 'The person behind the site. Shown in the footer and after the site name in page titles.',
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      group: 'identity',
      description: 'The footer strapline, and the meta description a page does not set itself.',
    }),
    defineField({
      name: 'logo',
      type: 'image',
      group: 'identity',
      description:
        'Only used in the structured data — search engines show it beside the site name. The visible logo is a component.',
      validation: (rule) => rule.assetRequired(),
    }),
    defineField({
      name: 'language',
      type: 'string',
      group: 'identity',
      initialValue: 'nl',
      description: 'BCP 47 language tag, e.g. en, en-GB, nl. Sets the page language.',
    }),
    defineField({name: 'phone', type: 'string', group: 'contact'}),
    defineField({name: 'email', type: 'string', group: 'contact'}),
    defineField({
      name: 'address',
      type: 'array',
      group: 'contact',
      of: [defineArrayMember({type: 'string'})],
      description:
        'One line per row, as it should be printed. The last line is read as postcode + city.',
    }),
    defineField({
      name: 'addressCountry',
      title: 'Country code',
      type: 'string',
      group: 'contact',
      initialValue: 'NL',
      description: 'ISO 3166-1 alpha-2, e.g. NL, DE, GB. Structured data only.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      group: 'elsewhere',
      description: 'Profiles elsewhere. Tells search engines these accounts are the same company.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {title: 'platform', subtitle: 'url'},
          },
        }),
      ],
    }),
    defineField({
      name: 'badges',
      title: 'Footer badges',
      type: 'array',
      group: 'elsewhere',
      of: [defineArrayMember({type: 'string'})],
      description: 'Memberships, certifications, awards. Leave empty to hide the row.',
    }),
    defineField({
      name: 'interfaceTexts',
      title: 'Interface texts',
      type: 'object',
      group: 'interface',
      description:
        'The small texts around the content: menu and player buttons, form messages, the page-not-found page. Many are read aloud by screen readers only.',
      fieldsets: [
        {name: 'navigation', title: 'Navigation', options: {collapsible: true}},
        {name: 'audio', title: 'Audio player', options: {collapsible: true}},
        {name: 'forms', title: 'Forms', options: {collapsible: true}},
        {name: 'notFound', title: 'Page not found', options: {collapsible: true}},
      ],
      fields: [
        uiText('skipToContent', 'Skip to content link', 'navigation'),
        uiText('mainMenu', 'Name of the main menu', 'navigation'),
        uiText('footerMenu', 'Name of the footer menu', 'navigation'),
        uiText('menu', 'Name of the mobile menu', 'navigation'),
        uiText('openMenu', 'Open menu button', 'navigation'),
        uiText('closeMenu', 'Close menu button', 'navigation'),
        uiText('audioPlayer', 'Name of the player', 'audio'),
        uiText('play', 'Play button', 'audio'),
        uiText('pause', 'Pause button', 'audio'),
        uiText('duration', 'Duration label', 'audio'),
        uiText('progress', 'Progress slider', 'audio'),
        uiText('of', 'Word between position and length ("3:12 of 21:19")', 'audio'),
        uiText('back', 'Skip back button', 'audio'),
        uiText('forward', 'Skip forward button', 'audio'),
        uiText('required', 'Required field left empty (fields without their own message)', 'forms'),
        uiText('invalidEmail', 'E-mail address not valid', 'forms'),
        uiText('checkFields', 'Summary when fields need attention', 'forms'),
        uiText('sending', 'Submit button while sending', 'forms'),
        uiText('sendFailed', 'Sending failed', 'forms'),
        uiText('recaptcha', 'reCAPTCHA not ticked', 'forms'),
        uiText('stepCounter', 'Step counter — {current} and {total} are filled in', 'forms'),
        uiText('notFoundTitle', 'Title', 'notFound'),
        defineField({name: 'notFoundText', title: 'Text', type: 'text', rows: 3, fieldset: 'notFound'}),
        uiText('notFoundButton', 'Button to the home page', 'notFound'),
      ],
    }),
  ],
  preview: {
    select: {title: 'name'},
    prepare({title}) {
      return {title: 'Site information', subtitle: title}
    },
  },
})
