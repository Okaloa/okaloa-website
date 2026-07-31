import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'textAlignment',
  title: 'Text Alignment',
  type: 'object',
  fields: [
    defineField({
      name: 'alignment',
      type: 'string',
      title: 'Alignment',
      options: {
        list: [
          {title: 'Default (Inherit)', value: 'default'},
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
          {title: 'Justify', value: 'justify'},
        ]
      }
    })
  ]
})
