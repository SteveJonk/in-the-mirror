import {BlockquoteIcon} from '@sanity/icons/Blockquote'
import {defineField, defineType} from 'sanity'
import {sectionFields, sectionFieldset} from '../objects/sectionFields'

/** A large pull quote. */
export const quoteType = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  icon: BlockquoteIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({name: 'text', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    ...sectionFields,
  ],
  preview: {
    select: {title: 'text'},
    prepare: ({title}) => ({title, subtitle: 'Quote'}),
  },
})
