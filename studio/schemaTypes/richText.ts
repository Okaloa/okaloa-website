import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  name: 'richText',
  title: 'Rich Text Block',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Heading 4', value: 'h4'},
        {title: 'Align Center', value: 'center'},
        {title: 'Align Right', value: 'right'},
        {title: 'Align Left', value: 'left'},
        {title: 'Align Justify', value: 'justify'},
        {title: 'Lead Text (Larger)', value: 'lead'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet Points', value: 'bullet'},
        {title: 'Numbered List', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Underline', value: 'underline'},
          {title: 'Strikethrough', value: 'strike-through'},
          {title: 'Code', value: 'code'},
        ],
        annotations: [
          {name: 'link', type: 'link'},
          {name: 'pdfDownload', type: 'pdfDownload'},
          {name: 'textColor', type: 'textColor'},
          {name: 'fontSize', type: 'fontSize'},
          {name: 'fontFamily', type: 'fontFamily'},
          {name: 'textAlignment', type: 'textAlignment'},
          {name: 'lineSpacing', type: 'lineSpacing'},
        ]
      }
    }),
    defineArrayMember({ type: 'separator' }),
    defineArrayMember({ type: 'quote' }),
    defineArrayMember({ type: 'imageBlock' }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string'
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string'
        }
      ]
    })
  ]
})
