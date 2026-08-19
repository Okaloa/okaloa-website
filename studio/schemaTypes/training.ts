import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'training',
  title: 'Training Page',
  type: 'document',
  fields: [
    defineField({
      name: 'trainingTitle',
      title: 'Training — Page Title',
      type: 'string',
      description: 'Heading displayed at the top of the Training page. Defaults to "Training".'
    }),
    defineField({
      name: 'trainingSection',
      title: 'Training Page Content',
      type: 'sectionContent',
      description: 'Main content block for the Training page.'
    }),
  ]
})
