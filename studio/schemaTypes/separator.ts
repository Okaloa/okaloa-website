import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'separator',
  title: 'Line Separator',
  type: 'object',
  fields: [
    defineField({
      name: 'style',
      title: 'Line Style',
      type: 'string',
      options: {
        list: [
          {title: 'Standard Thin Line', value: 'thin'},
          {title: 'Brand Accent Line (Red)', value: 'accent'},
          {title: 'Dashed Line', value: 'dashed'},
          {title: 'Subtle Fade', value: 'fade'},
        ]
      },
      initialValue: 'thin'
    })
  ],
  preview: {
    select: { style: 'style' },
    prepare({ style }) {
      return {
        title: `Line Separator (${style || 'thin'})`
      }
    }
  }
})
