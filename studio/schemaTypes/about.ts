import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'aboutTitle',
      title: 'About — Page Title',
      type: 'string',
      description: 'Heading displayed at the top of the About page. Defaults to "About".'
    }),
    defineField({
      name: 'aboutSection',
      title: 'About Page Content',
      type: 'sectionContent',
      description: 'Main content block for the About page.'
    }),
  ]
})
