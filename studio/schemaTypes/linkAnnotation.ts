import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'link',
  title: 'Link / Email (mailto:)',
  type: 'object',
  fields: [
    defineField({
      name: 'href',
      type: 'string',
      title: 'URL or Email (e.g. mailto:info@okaloa.com or https://...)'
    }),
    defineField({
      name: 'subject',
      type: 'string',
      title: 'Email subject (optional, only for mailto: links)',
      description: 'Pre-fills the subject line when the visitor clicks a mailto: link.'
    }),
    defineField({
      name: 'blank',
      type: 'boolean',
      title: 'Open in new tab'
    })
  ]
})
