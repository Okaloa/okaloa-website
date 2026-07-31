import React from 'react'
import {defineType, defineField} from 'sanity'

const TextAlignmentRender = (props: any) => {
  return React.createElement(
    'span',
    { style: { fontStyle: 'inherit' } },
    props.renderDefault(props)
  )
}

export default defineType({
  name: 'textAlignment',
  title: 'Text Alignment',
  type: 'object',
  components: {
    annotation: TextAlignmentRender
  },
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
