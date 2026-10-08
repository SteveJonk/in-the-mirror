import {CommentIcon} from '@sanity/icons/Comment'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageField, sectionFields, sectionFieldset} from '../objects/sectionFields'

/**
 * A form from Forms, with its introduction beside it. As the first block on a
 * page it becomes the page's opener (its title the page title).
 *
 * The form itself is a reference, so the same form can appear on several
 * pages and its fields are edited in one place.
 */
export const contactFormType = defineType({
  name: 'contactForm',
  title: 'Form',
  type: 'object',
  icon: CommentIcon,
  fieldsets: [
    {name: 'layout', title: 'Layout', options: {collapsible: true, collapsed: true}},
    sectionFieldset,
  ],
  fields: [
    imageField('illustration', {description: 'Optional, above the title.'}),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'lead', type: 'text', rows: 3}),
    defineField({
      name: 'note',
      type: 'string',
      description: 'Small print under the introduction, e.g. which fields are required.',
    }),
    defineField({
      name: 'links',
      type: 'array',
      description: 'Text links under the introduction.',
      of: [defineArrayMember({type: 'cta'})],
    }),
    defineField({
      name: 'form',
      type: 'reference',
      to: [{type: 'form'}],
      description: 'The form to show. Its fields are managed under Forms.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'showRequiredMarks',
      title: 'Mark required fields with *',
      type: 'boolean',
      initialValue: true,
      fieldset: 'layout',
    }),
    defineField({
      name: 'wideForm',
      title: 'Wide form',
      type: 'boolean',
      initialValue: false,
      description: 'More room for the form, less for the introduction. For long forms.',
      fieldset: 'layout',
    }),
    ...sectionFields,
  ],
  preview: {
    select: {title: 'title', subtitle: 'form.title'},
    prepare: ({title, subtitle}) => ({title: title || 'Form', subtitle: subtitle || 'Form'}),
  },
})
