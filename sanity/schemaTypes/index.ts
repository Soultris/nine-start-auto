import { type SchemaTypeDefinition } from 'sanity'
import { galleryType } from './gallery'
import { testimonialType } from './testimonial'
import { hotDealsType } from './hotDeals'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [galleryType, testimonialType, hotDealsType],
}


