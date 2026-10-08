import {ThListIcon} from '@sanity/icons/ThList'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageField, sectionFields, sectionFieldset} from '../objects/sectionFields'

/**
 * A title with an intro beside it, then columns. Items with an icon are laid
 * out as a grid of up to four; items without one as two columns under a rule.
 */
export const columnsType = defineType({
  name: 'columns',
  title: 'Columns',
  type: 'object',
  icon: ThListIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'intro', type: 'text', rows: 3}),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'column',
          fields: [
            imageField('icon', {description: 'Optional. A line icon, ideally SVG.'}),
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', type: 'text', rows: 4}),
          ],
          preview: {select: {title: 'title', subtitle: 'body', media: 'icon'}},
        }),
      ],
    }),
    defineField({name: 'footnote', type: 'text', rows: 2}),
    ...sectionFields,
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title, subtitle: 'Columns'}),
  },
})
