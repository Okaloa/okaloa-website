import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'workshop',
  title: 'Workshop Page',
  type: 'document',
  fields: [
    defineField({
      name: 'workshopTitle',
      title: 'Workshop — Page Title',
      type: 'string',
      description: 'Heading displayed at the top of the Workshop page. Defaults to "Workshop".'
    }),
    defineField({
      name: 'workshopSection',
      title: 'Workshop Page Content',
      type: 'sectionContent',
      description: 'Main content block for the Workshop page.'
    }),
  ]
})
