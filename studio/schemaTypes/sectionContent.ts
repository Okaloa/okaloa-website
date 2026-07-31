import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'sectionContent',
  title: 'Section Content',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Main Section Content',
      type: 'richText',
      description: 'Single all-in-one block editor. Add text paragraphs, bullet lists, images, quotes, and line separators in any order.'
    })
  ]
})
