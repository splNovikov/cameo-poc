import { z } from 'zod';

/**
 * Advantage icon type schema
 */
export const AdvantageIconSchema = z.enum([
  'location',
  'service',
  'parking',
  'breakfast',
  'wifi',
  'security',
  'cleaning',
  'concierge',
]);

/**
 * Advantage schema
 */
export const AdvantageSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: AdvantageIconSchema,
});

export type Advantage = z.infer<typeof AdvantageSchema>;
export type AdvantageIcon = z.infer<typeof AdvantageIconSchema>;
