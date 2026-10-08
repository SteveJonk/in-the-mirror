import {defineArrayMember, defineType} from 'sanity'

/**
 * The block list editors can insert on a page.
 *
 * Order here is the order of the "Add item" menu: openers first, then the
 * body blocks an editor reaches for most.
 */
export const pageBuilderType = defineType({
  name: 'pageBuilder',
  type: 'array',
  of: [
    // Openers
    defineArrayMember({type: 'homeHero'}),
    defineArrayMember({type: 'pageHero'}),
    // Body
    defineArrayMember({type: 'mediaText'}),
    defineArrayMember({type: 'tiles'}),
    defineArrayMember({type: 'columns'}),
    defineArrayMember({type: 'textColumns'}),
    defineArrayMember({type: 'quote'}),
    defineArrayMember({type: 'featureImage'}),
    defineArrayMember({type: 'callout'}),
    defineArrayMember({type: 'pricing'}),
    defineArrayMember({type: 'schedule'}),
    defineArrayMember({type: 'episodes'}),
    defineArrayMember({type: 'calendar'}),
    defineArrayMember({type: 'contactForm'}),
  ],
})
