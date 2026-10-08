import {BillIcon} from '@sanity/icons/Bill'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageField, sectionFields, sectionFieldset} from '../objects/sectionFields'

/** Prices side by side, with the ways it can take place underneath. */
export const pricingType = defineType({
  name: 'pricing',
  title: 'Pricing',
  type: 'object',
  icon: BillIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'plans',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'plan',
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'subtitle', type: 'string'}),
            defineField({name: 'price', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'title', subtitle: 'price'}},
        }),
      ],
    }),
    defineField({name: 'optionsLabel', title: 'Label before the options', type: 'string'}),
    defineField({
      name: 'options',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'option',
          fields: [
            imageField('icon'),
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'label', media: 'icon'}},
        }),
      ],
    }),
    ...sectionFields,
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title, subtitle: 'Pricing'}),
  },
})
