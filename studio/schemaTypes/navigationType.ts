import {MenuIcon} from '@sanity/icons/Menu'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {linkFields} from './objects/linkFields'

/** The main menu. The header, the mobile menu and the footer all show these links. */
export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navLink',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            ...linkFields,
          ],
          preview: {
            select: {title: 'label', href: 'href', internalTitle: 'internalLink.title'},
            prepare: ({title, href, internalTitle}) => ({
              title: title || 'Link',
              subtitle: internalTitle || href,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Navigation'}),
  },
})
