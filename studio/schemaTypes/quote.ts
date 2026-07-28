import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'quote',
  title: 'Quote Block',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Quote Text',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'author',
      title: 'Author / Speaker',
      type: 'string'
    }),
    defineField({
      name: 'role',
      title: 'Role / Subtitle',
      type: 'string'
    }),
    defineField({
      name: 'borderStyle',
      title: 'Quote Style',
      type: 'string',
      options: {
        list: [
          {title: 'Left Red Accent Bar', value: 'accent-left'},
          {title: 'Top & Bottom Accent Lines', value: 'lines-top-bottom'},
          {title: 'Centered Box', value: 'centered-box'}
        ]
      },
      initialValue: 'accent-left'
    })
  ],
  preview: {
    select: { text: 'text', author: 'author' },
    prepare({ text, author }) {
      return {
        title: text ? `"${text.slice(0, 45)}..."` : 'Quote Block',
        subtitle: author ? `— ${author}` : ''
      }
    }
  }
})
