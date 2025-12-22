/**
 * Property type configuration and constants
 */

import { type PropertyType } from '@entities/property';

/**
 * Property type labels mapping
 */
export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  hotel: 'Отель',
  apartments: 'Апартаменты',
} as const;

/**
 * Default fallback images for property types
 */
export const PROPERTY_TYPE_DEFAULT_IMAGES: Record<PropertyType, string> = {
  hotel: '/images/hero/hotel.jpg',
  apartments: '/images/hero/apartments.jpg',
} as const;

/**
 * All property types in order
 */
export const PROPERTY_TYPES: PropertyType[] = ['hotel', 'apartments'];
