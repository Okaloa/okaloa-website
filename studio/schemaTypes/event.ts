import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Upcoming Events',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Event Description',
      type: 'richText',
      description: 'Rich text description with links, formatting, and formatting options.'
    }),
    defineField({
      name: 'link',
      title: 'Registration Link (URL)',
      type: 'url',
      description: 'Link where users can register (e.g. Stripe, TicketTailor, LinkedIn Event).'
    })
  ]
})
