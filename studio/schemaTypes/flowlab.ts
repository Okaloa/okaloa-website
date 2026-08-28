import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'flowlab',
  title: 'Okaloa Flowlab Page',
  type: 'document',
  fields: [
    // About Okaloa Flowlab Section
    defineField({
      name: 'aboutFlowlabTitle',
      title: 'About Okaloa Flowlab — Section Title',
      type: 'string',
      description: 'Heading for the About Okaloa Flowlab section. Defaults to "About Okaloa Flowlab".'
    }),
    defineField({
      name: 'aboutFlowlabSection',
      title: 'About Okaloa Flowlab — Section Content',
      type: 'sectionContent',
      description: 'Content block for the About Okaloa Flowlab section.'
    }),

    // Pricing Physical Material Section
    defineField({
      name: 'pricingPhysicalTitle',
      title: 'Pricing Physical Material — Section Title',
      type: 'string',
      description: 'Heading for the Pricing Physical material section. Defaults to "Pricing Physical material".'
    }),
    defineField({
      name: 'pricingPhysicalSection',
      title: 'Pricing Physical Material — Section Content',
      type: 'sectionContent',
      description: 'Content block for the Pricing Physical material section.'
    }),

    // Pricing Online Version Section
    defineField({
      name: 'pricingOnlineTitle',
      title: 'Pricing Online Version — Section Title',
      type: 'string',
      description: 'Heading for the Pricing Online version section. Defaults to "Pricing Online version".'
    }),
    defineField({
      name: 'pricingOnlineSection',
      title: 'Pricing Online Version — Section Content',
      type: 'sectionContent',
      description: 'Content block for the Pricing Online version section.'
    }),
  ]
})
