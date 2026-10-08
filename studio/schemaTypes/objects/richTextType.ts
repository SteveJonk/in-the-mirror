import {defineArrayMember, defineType} from 'sanity'

/**
 * Body text: paragraphs, sub-headings, bullet lists and bold. The styles map
 * onto the design's text sizes; there are no links or colours to keep the
 * copy consistent.
 */
export const richTextType = defineType({
  name: 'richText',
  title: 'Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Intro (large)', value: 'intro'},
        {title: 'Signature', value: 'signature'},
        {title: 'Heading', value: 'h3'},
        {title: 'Subheading', value: 'h4'},
      ],
      lists: [{title: 'Bullets', value: 'bullet'}],
      marks: {
        decorators: [{title: 'Bold', value: 'strong'}],
        annotations: [],
      },
    }),
  ],
})
