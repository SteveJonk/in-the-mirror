import {SplitHorizontalIcon} from '@sanity/icons/SplitHorizontal'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {factsField, imageField, sectionFields, sectionFieldset} from '../objects/sectionFields'

const usesImage = (parent?: Record<string, unknown>) =>
  ['image', 'illustration', 'illustrationCard', 'mirror'].includes(String(parent?.media))

/**
 * The workhorse: a text column beside a photo, an illustration, the mirror
 * arch or a price card. Without media the text sits centred on its own.
 */
export const mediaTextType = defineType({
  name: 'mediaText',
  title: 'Media + text',
  type: 'object',
  icon: SplitHorizontalIcon,
  fieldsets: [
    {name: 'layout', title: 'Layout', options: {collapsible: true, collapsed: true}},
    sectionFieldset,
  ],
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'body', type: 'richText'}),
    factsField,
    defineField({name: 'factsNote', title: 'Note under the facts', type: 'string'}),
    defineField({
      name: 'episode',
      type: 'reference',
      to: [{type: 'episode'}],
      description: 'Shows an audio player for this episode.',
    }),
    defineField({name: 'cta', title: 'Button', type: 'cta'}),
    defineField({
      name: 'ctaStyle',
      title: 'Button style',
      type: 'string',
      initialValue: 'solid',
      options: {
        list: [
          {title: 'Lilac', value: 'solid'},
          {title: 'Outline', value: 'outline'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      hidden: ({parent}) => !parent?.cta,
    }),
    defineField({name: 'textLink', title: 'Text link', type: 'cta'}),
    defineField({
      name: 'media',
      type: 'string',
      initialValue: 'image',
      options: {
        list: [
          {title: 'Photo', value: 'image'},
          {title: 'Illustration', value: 'illustration'},
          {title: 'Illustration on a lilac card', value: 'illustrationCard'},
          {title: 'Photo in the mirror arch', value: 'mirror'},
          {title: 'Price card', value: 'priceCard'},
          {title: 'Nothing (text only)', value: 'none'},
        ],
        layout: 'radio',
      },
    }),
    imageField('image', {hidden: ({parent}) => !usesImage(parent)}),
    defineField({
      name: 'priceCard',
      type: 'array',
      hidden: ({parent}) => parent?.media !== 'priceCard',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'priceRow',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'value', type: 'text', rows: 2, validation: (rule) => rule.required()}),
            defineField({
              name: 'isPrice',
              title: 'Show the value large, as a price',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({name: 'note', type: 'string'}),
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        }),
      ],
    }),
    defineField({
      name: 'mediaLeft',
      title: 'Media on the left',
      type: 'boolean',
      initialValue: false,
      fieldset: 'layout',
    }),
    defineField({
      name: 'mediaSmall',
      title: 'Smaller media',
      type: 'boolean',
      initialValue: false,
      fieldset: 'layout',
    }),
    defineField({
      name: 'indent',
      title: 'Indent from the page edge',
      type: 'boolean',
      initialValue: false,
      fieldset: 'layout',
    }),
    defineField({
      name: 'alignTop',
      title: 'Align text and media at the top',
      type: 'boolean',
      initialValue: false,
      fieldset: 'layout',
    }),
    ...sectionFields,
  ],
  preview: {
    select: {title: 'title', media: 'image', body: 'body'},
    prepare: ({title, media, body}) => ({
      title: title || body?.[0]?.children?.[0]?.text || 'Media + text',
      subtitle: 'Media + text',
      media,
    }),
  },
})
