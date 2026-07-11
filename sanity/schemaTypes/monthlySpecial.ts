import { defineField, defineType } from 'sanity'

export const monthlySpecialType = defineType({
  name: 'monthlySpecial',
  title: 'Monthly Special',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Admin Only)',
      type: 'string',
      description: 'Used to identify the special offer in the CMS',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Special Offer Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
