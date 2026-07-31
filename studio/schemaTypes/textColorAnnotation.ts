import React from 'react'
import {defineType, defineField} from 'sanity'

const colorMap: Record<string, string> = {
  'brand-red': '#e3593d',
  'muted': '#4a5568',
  'dark': '#1a202c',
  'white': '#ffffff',
  'navy': '#2b6cb0',
  'green': '#2f855a',
  'amber': '#d97706',
}

const TextColorRender = (props: any) => {
  const colorKey = props.value?.color
  const color = colorKey && colorKey !== 'default' ? colorMap[colorKey] : undefined
  return React.createElement(
    'span',
    { style: { color: color || 'inherit', fontStyle: 'inherit' } },
    props.renderDefault(props)
  )
}

export default defineType({
  name: 'textColor',
  title: 'Text Color',
  type: 'object',
  components: {
    annotation: TextColorRender
  },
  fields: [
    defineField({
      name: 'color',
      type: 'string',
      title: 'Color',
      options: {
        list: [
          {title: 'Default / None (Inherit)', value: 'default'},
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
