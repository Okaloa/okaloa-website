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
      name: 'text1',
      title: 'Text Block 1',
      type: 'array',
      of: richTextBlock,
      description: 'First content block in this section.'
    }),
    defineField({
      name: 'image1',
      title: 'Image 1',
      type: 'image',
      options: {hotspot: true},
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
      ],
      description: 'First image in this section.'
    }),
    defineField({
      name: 'text2',
      title: 'Text Block 2',
      type: 'array',
      of: richTextBlock,
      description: 'Second content block in this section.'
    }),
    defineField({
      name: 'image2',
      title: 'Image 2',
      type: 'image',
      options: {hotspot: true},
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
      ],
      description: 'Second image in this section.'
    }),
    defineField({
      name: 'text3',
      title: 'Text Block 3',
      type: 'array',
      of: richTextBlock,
      description: 'Third content block in this section.'
    })
  ]
})
