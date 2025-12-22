/**
 * Application route paths
 * Centralized path management for type safety
 */
export const pathKeys = {
  home: '/',
  properties: '/properties',
  property: (slug: string) => `/properties/${slug}`,
  contacts: '/contacts',
  offers: '/offers',
  about: '/about',
} as const;

export type PathKey = (typeof pathKeys)[keyof typeof pathKeys];
