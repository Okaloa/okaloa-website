import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    // Attention Grabber (Hero)
    defineField({
      name: 'heroHeadline',
      title: 'Attention Grabber Title',
      type: 'string',
      description: 'The main bold title text at the top of the homepage.'
    }),
    defineField({
      name: 'heroSection',
      title: 'Attention Grabber / Hero Section',
      type: 'sectionContent',
      description: 'Hero section content block.'
    }),

    // De-risking Section
    defineField({
      name: 'deriskingSection',
      title: 'De-risking Section',
      type: 'sectionContent',
      description: 'De-risking section content block.'
    }),

    // How We Engage Section
    defineField({
      name: 'engageSection',
      title: 'How We Engage Section',
      type: 'sectionContent',
      description: 'How We Engage section content block.'
    }),

    // Is This For You Section
    defineField({
      name: 'whenSection',
      title: 'Is This For You Section',
      type: 'sectionContent',
      description: 'Is This For You section content block.'
    }),

    // It's Working Section (Between Is This For You and About)
    defineField({
      name: 'workingSectionTitle',
      title: 'It\'s Working Section Title',
      type: 'string',
      description: 'Title for the section between "Is this for you?" and "About".',
      initialValue: "It's working"
    }),
    defineField({
      name: 'workingSection',
      title: 'It\'s Working Section Content',
      type: 'sectionContent',
      description: 'It\'s Working section content block.'
    }),

    // About Section
    defineField({
      name: 'aboutSection',
      title: 'About Section',
      type: 'sectionContent',
      description: 'About section content block.'
    }),

    // Upcoming Events Section Settings
    defineField({
      name: 'eventsSectionTitle',
      title: 'Upcoming Events Section Title',
      type: 'string',
      description: 'Main title for the Upcoming Events section.',
      initialValue: 'Upcoming Events'
    }),
    defineField({
      name: 'eventsSectionText',
      title: 'Upcoming Events Section Description / Subheader (Optional)',
      type: 'text',
      rows: 2,
      description: 'Optional text block underneath the Upcoming Events title.'
    }),
    defineField({
      name: 'eventsEmptyText',
      title: 'No Upcoming Events Message (Optional)',
      type: 'text',
      rows: 2,
      description: 'Message displayed when there are no upcoming events. Leave blank if you do not want to show any message.'
    }),
    defineField({
      name: 'events',
      title: 'Upcoming Events List',
      type: 'array',
      description: 'Add and manage upcoming events directly here.',
      of: [
        {
          type: 'object',
          name: 'eventItem',
          title: 'Event',
          fields: [
            defineField({
              name: 'title',
              title: 'Event Title',
              type: 'string',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'date',
              title: 'Event Date',
              type: 'date',
              options: {
                dateFormat: 'YYYY-MM-DD'
              },
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'description',
              title: 'Event Description',
              type: 'text',
              rows: 3
            }),
            defineField({
              name: 'link',
              title: 'Registration Link (URL)',
              type: 'url',
              description: 'Link where users can register.'
            })
          ],
          preview: {
            select: {
              title: 'title',
              date: 'date'
            },
            prepare({ title, date }) {
              return {
                title: title || 'Untitled Event',
                subtitle: date || 'No date set'
              }
            }
          }
        }
      ]
    }),

    // Footer Settings
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline / Text Under Logo',
      type: 'string',
      description: 'Text displayed directly underneath the Okaloa logo in the website footer.',
      initialValue: "It's not the strategy that's risky. It's what happens after."
    }),
  ]
})
