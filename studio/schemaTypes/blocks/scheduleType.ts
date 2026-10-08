import {ClockIcon} from '@sanity/icons/Clock'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {sectionFields, sectionFieldset} from '../objects/sectionFields'

/** A day programme: time slots beside a title. A slot without a description reads as a break. */
export const scheduleType = defineType({
  name: 'schedule',
  title: 'Schedule',
  type: 'object',
  icon: ClockIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'lead', type: 'text', rows: 2}),
    defineField({name: 'cta', title: 'Button', type: 'cta'}),
    defineField({
      name: 'slots',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'slot',
          fields: [
            defineField({
              name: 'time',
              type: 'string',
              description: 'e.g. 09:30 – 10:00',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'description',
              type: 'string',
              description: 'Leave empty for a break: it is shown quieter.',
            }),
          ],
          preview: {select: {title: 'time', subtitle: 'title'}},
        }),
      ],
    }),
    ...sectionFields,
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title, subtitle: 'Schedule'}),
  },
})
