import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used to sort the testimonials (ascending)',
    }),
  ],
  preview: {
    select: {
      author: 'author',
      quote: 'quote',
      rating: 'rating',
    },
    prepare(selection) {
      const { author, quote, rating } = selection
      return {
        title: author || 'Anonymous',
        subtitle: `${rating || 5}★ - ${quote || ''}`,
      }
    },
  },
})
