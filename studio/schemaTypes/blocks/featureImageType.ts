import {ImageIcon} from '@sanity/icons/Image'
import {defineType} from 'sanity'
import {imageField, sectionFields, sectionFieldset} from '../objects/sectionFields'

/** One image on its own, centred — e.g. a quote set in a photo. */
export const featureImageType = defineType({
  name: 'featureImage',
  title: 'Feature image',
  type: 'object',
  icon: ImageIcon,
  fieldsets: [sectionFieldset],
  fields: [imageField('image', {required: true}), ...sectionFields],
  preview: {
    select: {title: 'image.alt', media: 'image'},
    prepare: ({title, media}) => ({title: title || 'Image', subtitle: 'Feature image', media}),
  },
})
