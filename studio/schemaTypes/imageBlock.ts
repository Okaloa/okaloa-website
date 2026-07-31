import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'imageBlock',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string'
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string'
    })
  ]
})
