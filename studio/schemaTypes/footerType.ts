import {BlockElementIcon} from '@sanity/icons/BlockElement'
import {defineField, defineType} from 'sanity'

/**
 * The footer's own texts. The site name and owner come from Site information,
 * the links from Navigation, and the photo credit from the page being shown.
 */
export const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: BlockElementIcon,
  fields: [
    defineField({name: 'text', type: 'text', rows: 2}),
    defineField({
      name: 'smallPrint',
      title: 'Small print',
      type: 'text',
      rows: 2,
      description: 'Shown quieter, under the text.',
    }),
    defineField({name: 'copyright', title: 'Copyright text', type: 'string'}),
  ],
  preview: {
    prepare: () => ({title: 'Footer'}),
  },
})
