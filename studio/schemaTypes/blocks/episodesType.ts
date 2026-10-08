import {PlayIcon} from '@sanity/icons/Play'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {sectionFields, sectionFieldset} from '../objects/sectionFields'

/** A list of episodes, each with its own player. */
export const episodesType = defineType({
  name: 'episodes',
  title: 'Episodes',
  type: 'object',
  icon: PlayIcon,
  fieldsets: [sectionFieldset],
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({
      name: 'episodes',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'episode'}]})],
      validation: (rule) => rule.unique(),
    }),
    defineField({name: 'footnote', type: 'string'}),
    ...sectionFields,
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: title || 'Episodes', subtitle: 'Episodes'}),
  },
})
