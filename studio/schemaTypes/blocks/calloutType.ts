import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {defineField, defineType} from 'sanity'
import {sectionFields, sectionFieldset} from '../objects/sectionFields'

/** A title with a short text (and optionally a button) beside it. */
export const calloutType = defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  icon: InfoOutlineIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'body', type: 'text', rows: 4}),
    defineField({name: 'cta', title: 'Button', type: 'cta'}),
    defineField({
      name: 'size',
      type: 'string',
      initialValue: 'small',
      options: {
        list: [
          {title: 'Small — a note', value: 'small'},
          {title: 'Large — an invitation', value: 'large'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    ...sectionFields,
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title, subtitle: 'Callout'}),
  },
})
