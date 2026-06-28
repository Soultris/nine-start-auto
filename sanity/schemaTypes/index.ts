import { type SchemaTypeDefinition } from 'sanity'
import { galleryType } from './gallery'
import { testimonialType } from './testimonial'
import { hotDealsType } from './hotDeals'
import { businessApplicationType } from './businessApplication'
import { creditApplicationType } from './creditApplication'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [galleryType, testimonialType, hotDealsType, businessApplicationType, creditApplicationType],
}


