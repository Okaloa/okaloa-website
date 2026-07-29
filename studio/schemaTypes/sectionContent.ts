import {defineType, defineField} from 'sanity'

export const richTextBlock = [
  {
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
        {
          name: 'link',
          type: 'object',
          title: 'Link / Email (mailto:)',
          fields: [
            {
              name: 'href',
              type: 'string',
              title: 'URL or Email (e.g. mailto:info@okaloa.com or https://...)'
            },
            {
              name: 'blank',
              type: 'boolean',
              title: 'Open in new tab'
            }
          ]
        },
        {
          name: 'fontSize',
          type: 'object',
          title: 'Font Size',
          fields: [
            {
              name: 'size',
              type: 'string',
              title: 'Size',
              initialValue: 'md',
              options: {
                list: [
                  {title: 'Tiny (XXS)', value: 'xxs'},
                  {title: 'Extra Small (XS)', value: 'xs'},
                  {title: 'Small', value: 'sm'},
                  {title: 'Normal', value: 'md'},
                  {title: 'Large', value: 'lg'},
                  {title: 'Extra Large', value: 'xl'},
                ]
              }
            }
          ]
        },
        {
          name: 'fontFamily',
          type: 'object',
          title: 'Font Type / Family',
          fields: [
            {
              name: 'family',
              type: 'string',
              title: 'Font Family',
              initialValue: 'sans',
              options: {
                list: [
                  {title: 'Museo Sans (Standard)', value: 'sans'},
                  {title: 'Serif (Fallback)', value: 'serif'},
                  {title: 'Monospace (Code / Tech)', value: 'mono'},
                ]
              }
            }
          ]
        },
        {
          name: 'textColor',
          type: 'object',
          title: 'Text Color',
          fields: [
            {
              name: 'color',
              type: 'string',
              title: 'Color',
              initialValue: 'default',
              options: {
                list: [
                  {title: 'Default Color', value: 'default'},
                  {title: 'Brand Red (Accent)', value: 'brand-red'},
                  {title: 'Muted Gray', value: 'muted'},
                  {title: 'White', value: 'white'},
                ]
              }
            }
          ]
        },
        {
          name: 'textAlignment',
          type: 'object',
          title: 'Text Alignment',
          fields: [
            {
              name: 'alignment',
              type: 'string',
              title: 'Alignment',
              initialValue: 'center',
              options: {
                list: [
                  {title: 'Left', value: 'left'},
                  {title: 'Center', value: 'center'},
                  {title: 'Right', value: 'right'},
                  {title: 'Justify', value: 'justify'},
                ]
              }
            }
          ]
        }
      ]
    }
  },
  { type: 'separator' },
  { type: 'quote' },
  {
    type: 'image',
    options: {hotspot: true},
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
  }
]

export default defineType({
  name: 'sectionContent',
  title: 'Section Content',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Main Section Content',
      type: 'array',
      of: richTextBlock,
      description: 'Single all-in-one block editor. Add text paragraphs, bullet lists, images, quotes, and line separators in any order.'
    })
  ]
})
