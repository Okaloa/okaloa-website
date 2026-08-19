import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

const SINGLETON_TYPES = new Set(['homepage', 'about', 'flowlab', 'workshop', 'training'])
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

      // Single document for the Okaloa Flowlab Page
      S.listItem()
        .title('Okaloa Flowlab Page')
        .id('flowlab-singleton')
        .child(
          S.document()
            .schemaType('flowlab')
            .documentId('flowlab')
            .title('Okaloa Flowlab Page')
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

      // Single document for the Workshop Page
      S.listItem()
        .title('Workshop Page')
        .id('workshop-singleton')
        .child(
          S.document()
            .schemaType('workshop')
            .documentId('workshop')
            .title('Workshop Page')
        ),

      // Single document for the Training Page
      S.listItem()
        .title('Training Page')
        .id('training-singleton')
        .child(
          S.document()
            .schemaType('training')
            .documentId('training')
            .title('Training Page')
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

