import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'fontSize',
  title: 'Font Size',
  type: 'object',
  fields: [
    defineField({
      name: 'size',
      type: 'string',
      title: 'Size',
      options: {
        list: [
          {title: 'Default (Inherit)', value: 'default'},
          {title: 'Tiny (XXS)', value: 'xxs'},
          {title: 'Extra Small (XS)', value: 'xs'},
          {title: 'Small', value: 'sm'},
          {title: 'Normal', value: 'md'},
          {title: 'Large', value: 'lg'},
          {title: 'Extra Large', value: 'xl'},
        ]
      }
    })
  ]
})
