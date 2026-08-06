import React from 'react'
import {defineType, defineField} from 'sanity'

const LineSpacingRender = (props: any) => {
  return React.createElement(
    'span',
    { style: { fontStyle: 'inherit' } },
    props.renderDefault(props)
  )
}

export default defineType({
  name: 'lineSpacing',
  title: 'Line Spacing',
  type: 'object',
  components: {
    annotation: LineSpacingRender
  },
  fields: [
    defineField({
      name: 'spacing',
      type: 'string',
      title: 'Spacing',
      options: {
        list: [
          {title: 'Default (Inherit)', value: 'default'},
          {title: 'Tight (1.2)', value: 'tight'},
          {title: 'Snug (1.4)', value: 'snug'},
          {title: 'Normal (1.65)', value: 'normal'},
          {title: 'Relaxed (1.9)', value: 'relaxed'},
          {title: 'Loose (2.2)', value: 'loose'},
          {title: 'Extra Loose (2.6)', value: 'extra-loose'},
        ]
      }
    })
  ]
})
