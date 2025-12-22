/**
 * Navigation configuration
 * Centralized navigation items for consistency across components
 */

import { pathKeys } from '@shared/router';

export interface NavigationItem {
  href: string;
  label: string;
}

/**
 * Main navigation items
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { href: pathKeys.properties, label: 'Объекты' },
  { href: pathKeys.offers, label: 'Акции' },
  { href: pathKeys.about, label: 'О нас' },
  { href: pathKeys.contacts, label: 'Контакты' },
] as const;
