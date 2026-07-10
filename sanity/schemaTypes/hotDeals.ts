import { defineField, defineType } from 'sanity'

export const hotDealsType = defineType({
  name: 'hotDeals',
  title: 'Hot Deals',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Make and Model',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'trim',
      title: 'Trim',
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
      name: 'dropPrice',
      title: 'Drop Price',
      type: 'number',
      description: 'The original price before the discount. Shown with a strikethrough next to the current price.',
      validation: (Rule) => Rule.min(0),
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
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'trim',
      media: 'image',
    },
  },
})
