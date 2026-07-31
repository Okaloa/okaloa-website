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
      name: 'blank',
      type: 'boolean',
      title: 'Open in new tab'
    })
  ]
})
