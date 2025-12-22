import { z } from 'zod';

/**
 * Booking search parameters schema
 */
export const BookingSearchSchema = z.object({
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  adults: z.number().min(1).max(10),
  children: z.number().min(0).max(10).optional(),
  rooms: z.number().min(1).max(10).optional(),
  propertyId: z.string().optional(),
});

/**
 * Room schema
 */
export const RoomSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  currency: z.string().default('RUB'),
  images: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  maxOccupancy: z.number(),
  available: z.boolean(),
});

/**
 * Booking result schema
 */
export const BookingResultSchema = z.object({
  rooms: z.array(RoomSchema),
  totalPrice: z.number(),
  currency: z.string().default('RUB'),
});

export type BookingSearch = z.infer<typeof BookingSearchSchema>;
export type Room = z.infer<typeof RoomSchema>;
export type BookingResult = z.infer<typeof BookingResultSchema>;
