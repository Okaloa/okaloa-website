import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'fontFamily',
  title: 'Font Type / Family',
  type: 'object',
  fields: [
    defineField({
      name: 'family',
      type: 'string',
      title: 'Font Family',
      options: {
        list: [
          {title: 'Default (Standard)', value: 'default'},
          {title: 'Museo Sans (Standard)', value: 'sans'},
          {title: 'Serif (Fallback)', value: 'serif'},
          {title: 'Monospace (Code / Tech)', value: 'mono'},
        ]
      }
    })
  ]
})
