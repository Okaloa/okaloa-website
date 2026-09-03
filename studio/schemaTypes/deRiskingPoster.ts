import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'deRiskingPoster',
  title: 'De-risking Poster Page',
  type: 'document',
  fields: [
    defineField({
      name: 'posterTitle',
      title: 'De-risking Poster — Page Title',
      type: 'string',
      description: 'Heading displayed at the top of the page. Defaults to "De-risking - Moving fast without breaking things".'
    }),
    defineField({
      name: 'posterSection',
      title: 'De-risking Poster Page Content',
      type: 'sectionContent',
      description: 'Main content block for the page. Images added here render at the full width of the page.'
    }),
  ]
})
