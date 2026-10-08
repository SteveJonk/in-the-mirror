import {MicrophoneIcon} from '@sanity/icons/Microphone'
import {defineField, defineType} from 'sanity'

/** One podcast fragment. Listed by an "Episodes" block, or featured on its own in a media + text block. */
export const episodeType = defineType({
  name: 'episode',
  title: 'Episode',
  type: 'document',
  icon: MicrophoneIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', type: 'text', rows: 3}),
    defineField({
      name: 'audio',
      type: 'file',
      options: {accept: 'audio/*'},
      validation: (rule) => rule.required().assetRequired(),
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'description'}},
})
