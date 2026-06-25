import { defineField, defineType } from 'sanity'

export const hotDealsType = defineType({
  name: 'hotDeals',
  title: 'Hot Deals',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'make',
      title: 'Make',
      type: 'string',
      description: 'e.g. Nissan, BMW, Toyota',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'model',
      title: 'Model',
      type: 'string',
      description: 'e.g. Rogue SV, X5',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body Type',
      type: 'string',
      description: 'e.g. SUV, Sedan, Coupe',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Car Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (per month)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'months',
      title: 'Months',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(1900),
    }),
    defineField({
      name: 'isPopular',
      title: 'Is Popular?',
      type: 'boolean',
      description: 'If toggled, this deal will show up on the homepage under "Popular Deals".',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'model',
      media: 'image',
    },
  },
})
