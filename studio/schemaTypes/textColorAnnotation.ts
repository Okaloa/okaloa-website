import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'textColor',
  title: 'Text Color',
  type: 'object',
  fields: [
    defineField({
      name: 'color',
      type: 'string',
      title: 'Color',
      initialValue: 'brand-red',
      options: {
        list: [
          {title: 'Okaloa Red (Brand Accent)', value: 'brand-red'},
          {title: 'Muted Gray', value: 'muted'},
          {title: 'Dark Charcoal', value: 'dark'},
          {title: 'White', value: 'white'},
          {title: 'Navy / Slate', value: 'navy'},
          {title: 'Green', value: 'green'},
          {title: 'Amber', value: 'amber'},
        ]
      }
    })
  ]
})
