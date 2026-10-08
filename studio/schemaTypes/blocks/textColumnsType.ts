import {TextIcon} from '@sanity/icons/Text'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageField, sectionFields, sectionFieldset} from '../objects/sectionFields'

/** Two columns of text, each with its own title, and a button underneath. */
export const textColumnsType = defineType({
  name: 'textColumns',
  title: 'Text columns',
  type: 'object',
  icon: TextIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({
      name: 'columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'textColumn',
          fields: [
            defineField({name: 'title', type: 'string'}),
            defineField({name: 'body', type: 'richText'}),
            imageField('illustration', {description: 'Optional, under the text.'}),
          ],
          preview: {select: {title: 'title', media: 'illustration'}},
        }),
      ],
      validation: (rule) => rule.max(2),
    }),
    defineField({name: 'cta', title: 'Button', type: 'cta'}),
    ...sectionFields,
  ],
  preview: {
    select: {title: 'columns.0.title'},
    prepare: ({title}) => ({title: title || 'Text columns', subtitle: 'Text columns'}),
  },
})
