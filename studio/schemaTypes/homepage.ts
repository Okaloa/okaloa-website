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
      description: 'Hero section 5-part layout (Text 1, Image 1, Text 2, Image 2, Text 3).'
    }),

    // De-risking Section
    defineField({
      name: 'deriskingSection',
      title: 'De-risking Section',
      type: 'sectionContent',
      description: 'De-risking section 5-part layout (Text 1, Image 1, Text 2, Image 2, Text 3).'
    }),

    // How We Engage Section
    defineField({
      name: 'engageSection',
      title: 'How We Engage Section',
      type: 'sectionContent',
      description: 'How We Engage section 5-part layout (Text 1, Image 1, Text 2, Image 2, Text 3).'
    }),

    // Is This For You Section
    defineField({
      name: 'whenSection',
      title: 'Is This For You Section',
      type: 'sectionContent',
      description: 'Is This For You section 5-part layout (Text 1, Image 1, Text 2, Image 2, Text 3).'
    }),

    // Extra Section (Between Is This For You and About)
    defineField({
      name: 'extraSectionTitle',
      title: 'Extra Section Title',
      type: 'string',
      description: 'Title for the section between "Is this for you?" and "About". (e.g. It\'s working)',
      initialValue: "It's working"
    }),
    defineField({
      name: 'extraSection',
      title: 'Extra Section Content',
      type: 'sectionContent',
      description: 'Extra section layout (Text 1, Image 1, Text 2, Image 2, Text 3).'
    }),

    // About Section
    defineField({
      name: 'aboutSection',
      title: 'About Section',
      type: 'sectionContent',
      description: 'About section 5-part layout (Text 1, Image 1, Text 2, Image 2, Text 3).'
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
