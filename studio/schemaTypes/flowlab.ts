import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'flowlab',
  title: 'Okaloa Flowlab Page',
  type: 'document',
  fields: [
    defineField({
      name: 'flowlabTitle',
      title: 'Flowlab — Page Title',
      type: 'string',
      description: 'Heading displayed at the top of the Okaloa Flowlab page. Defaults to "Okaloa Flowlab".'
    }),
    defineField({
      name: 'flowlabSection',
      title: 'Flowlab Page Content',
      type: 'sectionContent',
      description: 'Main content block for the Okaloa Flowlab page.'
    }),
  ]
})
