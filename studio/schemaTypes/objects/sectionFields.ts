import {defineField} from 'sanity'

/**
 * Fields every block shares, tucked into a collapsed "Section" fieldset.
 *
 * The front end derives the rest from the order of the blocks: a curve is
 * drawn into the next block when its background differs, and the top padding
 * collapses when the block above has the same background.
 */
export const sectionFieldset = {
  name: 'section',
  title: 'Section',
  options: {collapsible: true, collapsed: true},
}

export const sectionFields = [
  defineField({
    name: 'background',
    type: 'string',
    fieldset: 'section',
    initialValue: 'paper',
    options: {
      list: [
        {title: 'Paper (light)', value: 'paper'},
        {title: 'Stone (sand)', value: 'stone'},
        {title: 'Ink (dark)', value: 'ink'},
      ],
      layout: 'radio',
      direction: 'horizontal',
    },
  }),
  defineField({
    name: 'spacing',
    type: 'string',
    fieldset: 'section',
    initialValue: 'regular',
    description: 'Large adds more room above and below, as on the home page.',
    options: {
      list: [
        {title: 'Regular', value: 'regular'},
        {title: 'Large', value: 'large'},
      ],
      layout: 'radio',
      direction: 'horizontal',
    },
  }),
  defineField({
    name: 'anchor',
    type: 'string',
    fieldset: 'section',
    description: 'Lets a link jump here: anchor "inschrijven" is reached with #inschrijven.',
    validation: (rule) =>
      rule.regex(/^[a-z0-9-]+$/, {name: 'anchor'}).error('Lowercase letters, digits and - only.'),
  }),
]

/** An image with the alt text it needs. Illustrations (SVG) are images too. */
export function imageField(
  name: string,
  options: {title?: string; description?: string; required?: boolean; hidden?: (ctx: {parent?: Record<string, unknown>}) => boolean} = {},
) {
  return defineField({
    name,
    title: options.title,
    type: 'image',
    description: options.description,
    hidden: options.hidden,
    fields: [
      defineField({
        name: 'alt',
        title: 'Alternative text',
        type: 'string',
        description: 'What the image shows, for people who cannot see it. Leave empty for decoration.',
      }),
    ],
    validation: (rule) => (options.required ? rule.required().assetRequired() : rule.assetRequired()),
  })
}

/** Label/value rows, e.g. "Programma — Eén dag, 09:30 tot 16:30". */
export const factsField = defineField({
  name: 'facts',
  type: 'array',
  of: [
    {
      type: 'object',
      name: 'fact',
      fields: [
        defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'value', type: 'string', validation: (rule) => rule.required()}),
      ],
      preview: {select: {title: 'label', subtitle: 'value'}},
    },
  ],
})
