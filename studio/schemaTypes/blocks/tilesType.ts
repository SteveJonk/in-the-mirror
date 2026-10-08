import {ThLargeIcon} from '@sanity/icons/ThLarge'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {linkFields} from '../objects/linkFields'
import {imageField, sectionFields, sectionFieldset} from '../objects/sectionFields'

/** A row of illustrated links, e.g. one tile per page. */
export const tilesType = defineType({
  name: 'tiles',
  title: 'Tiles',
  type: 'object',
  icon: ThLargeIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'tile',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            ...linkFields,
            imageField('illustration', {required: true}),
          ],
          preview: {select: {title: 'label', media: 'illustration'}},
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    ...sectionFields,
  ],
  preview: {
    select: {items: 'items'},
    prepare: ({items}) => ({title: `${items?.length ?? 0} tiles`, subtitle: 'Tiles'}),
  },
})
