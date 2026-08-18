import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'pdfDownload',
  title: 'PDF Download',
  type: 'object',
  fields: [
    defineField({
      name: 'file',
      title: 'PDF File',
      type: 'file',
      description: 'Upload the PDF file you want users to be able to download.',
      options: {
        accept: '.pdf,application/pdf'
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'filename',
      title: 'Download Filename (optional)',
      type: 'string',
      description: 'The filename the browser will suggest when downloading (e.g. "okaloa-brochure.pdf"). Leave blank to use the original filename.'
    }),
  ]
})
