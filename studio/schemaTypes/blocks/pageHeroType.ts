import {DocumentIcon} from '@sanity/icons/Document'
import {defineField, defineType} from 'sanity'
import {factsField, imageField, sectionFields, sectionFieldset} from '../objects/sectionFields'

/** The opener of an inner page: the page title, an intro and an image beside or below it. */
export const pageHeroType = defineType({
  name: 'pageHero',
  title: 'Page hero',
  type: 'object',
  icon: DocumentIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'intro', type: 'text', rows: 4}),
    defineField({
      name: 'italic',
      type: 'boolean',
      initialValue: false,
      description: 'Set the intro in italics, e.g. for a quote.',
    }),
    defineField({
      name: 'attribution',
      type: 'string',
      description: 'Upright text after the intro, e.g. "— Rumi".',
    }),
    factsField,
    defineField({name: 'primaryCta', title: 'Button', type: 'cta'}),
    defineField({name: 'secondaryLink', title: 'Text link', type: 'cta'}),
    defineField({
      name: 'media',
      type: 'string',
      initialValue: 'image',
      options: {
        list: [
          {title: 'Photo beside the text', value: 'image'},
          {title: 'Photo in the mirror arch', value: 'mirror'},
          {title: 'Illustration below the text', value: 'illustration'},
          {title: 'Sound wave below the text (animated)', value: 'wave'},
          {title: 'Nothing', value: 'none'},
        ],
        layout: 'radio',
      },
    }),
    imageField('image', {hidden: ({parent}) => parent?.media === 'none' || parent?.media === 'wave'}),
    defineField({
      name: 'alignBottom',
      title: 'Align text to the bottom of the photo',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.media !== 'image',
    }),
    ...sectionFields,
  ],
  preview: {
    select: {title: 'title', media: 'image'},
    prepare: ({title, media}) => ({title, subtitle: 'Page hero', media}),
  },
})
