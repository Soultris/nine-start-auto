import { type SchemaTypeDefinition } from 'sanity'
import { galleryType } from './gallery'
import { testimonialType } from './testimonial'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [galleryType, testimonialType],
}

