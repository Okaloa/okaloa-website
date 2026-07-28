import {defineType, defineField} from 'sanity'

const richTextBlock = [
  {
    type: 'block',
    styles: [
      {title: 'Normal', value: 'normal'},
      {title: 'Heading 2', value: 'h2'},
      {title: 'Heading 3', value: 'h3'},
      {title: 'Heading 4', value: 'h4'},
      {title: 'Centered Text', value: 'center'},
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
              options: {
                list: [
                  {title: 'Sans-Serif (Inter - Clean)', value: 'sans'},
                  {title: 'Serif (Source Serif - Editorial)', value: 'serif'},
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
