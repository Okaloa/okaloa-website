import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

const SINGLETON_TYPES = new Set(['homepage', 'about'])
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
        ),

      // Single document for the About Page
      S.listItem()
        .title('About Page')
        .id('about-singleton')
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
            .title('About Page')
        ),
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
      if (SINGLETON_TYPES.has(context.schemaType)) {
        return prev.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
      }
      return prev
    },
  },
})

