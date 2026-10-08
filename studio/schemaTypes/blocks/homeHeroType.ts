import {HomeIcon} from '@sanity/icons/Home'
import {defineField, defineType} from 'sanity'
import {imageField, sectionFields, sectionFieldset} from '../objects/sectionFields'

/** The home page opener: text beside a full-height artwork. */
export const homeHeroType = defineType({
  name: 'homeHero',
  title: 'Home hero',
  type: 'object',
  icon: HomeIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'lead', type: 'text', rows: 5}),
    defineField({name: 'cta', title: 'Button', type: 'cta'}),
    imageField('image', {required: true}),
    ...sectionFields,
  ],
  preview: {
    select: {title: 'title', media: 'image'},
    prepare: ({title, media}) => ({title, subtitle: 'Home hero', media}),
  },
})
