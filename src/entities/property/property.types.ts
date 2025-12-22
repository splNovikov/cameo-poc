import { z } from 'zod';

/**
 * Property type schema
 */
export const PropertyTypeSchema = z.enum(['hotel', 'apartments']);

/**
 * Property schema
 */
export const PropertySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  type: PropertyTypeSchema,
  description: z.string(),
  shortDescription: z.string().optional(),
  address: z.string(),
  images: z.array(z.string()),
  amenities: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().optional(),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
});

export type Property = z.infer<typeof PropertySchema>;
export type PropertyType = z.infer<typeof PropertyTypeSchema>;
