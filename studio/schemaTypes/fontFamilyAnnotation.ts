import React from 'react'
import {defineType, defineField} from 'sanity'

const FontFamilyRender = (props: any) => {
  return React.createElement(
    'span',
    { style: { fontStyle: 'inherit' } },
    props.renderDefault(props)
  )
}

export default defineType({
  name: 'fontFamily',
  title: 'Font Type / Family',
  type: 'object',
  components: {
    annotation: FontFamilyRender
  },
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
