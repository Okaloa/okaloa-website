import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore'])

const myStructure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      // Single document for Homepage Sections
      S.listItem()
        .title('Homepage Sections')
        .id('homepage-singleton')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
            .title('Homepage Sections')
        )
    ])

export default defineConfig({
  name: 'default',
  title: 'Okaloa CMS',

  projectId: 'b7wqv3yo',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: myStructure,
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // For singleton types, filter out actions that are not allowed (like delete/duplicate)
    actions: (prev, context) => {
      if (context.schemaType === 'homepage') {
        return prev.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
      }
      return prev
    },
  },
})
