import {CalendarIcon} from '@sanity/icons/Calendar'
import {defineField, defineType} from 'sanity'
import {sectionFields, sectionFieldset} from '../objects/sectionFields'

/** The booking calendar. Until an embed URL is filled in, a placeholder shows instead. */
export const calendarType = defineType({
  name: 'calendar',
  title: 'Booking calendar',
  type: 'object',
  icon: CalendarIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'lead', type: 'text', rows: 3}),
    defineField({
      name: 'embedUrl',
      title: 'Calendar URL',
      type: 'url',
      description: 'The Cal.com booking page to embed. Empty = the placeholder below.',
    }),
    defineField({name: 'placeholderTitle', type: 'string'}),
    defineField({name: 'placeholderText', type: 'text', rows: 2}),
    ...sectionFields,
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title, subtitle: 'Booking calendar'}),
  },
})
