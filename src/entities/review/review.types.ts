import { z } from 'zod';

/**
 * Review schema
 */
export const ReviewSchema = z.object({
  id: z.string(),
  author: z.string(),
  rating: z.number().min(1).max(5),
  text: z.string(),
  date: z.string(),
  source: z.enum(['yandex', 'google', 'internal']).optional(),
  propertyId: z.string().optional(),
});

/**
 * Rating statistics schema
 */
export const RatingStatsSchema = z.object({
  average: z.number().min(0).max(5),
  total: z.number(),
  distribution: z.object({
    5: z.number(),
    4: z.number(),
    3: z.number(),
    2: z.number(),
    1: z.number(),
  }),
});

export type Review = z.infer<typeof ReviewSchema>;
export type RatingStats = z.infer<typeof RatingStatsSchema>;
