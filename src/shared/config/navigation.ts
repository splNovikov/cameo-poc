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
 * Shortened labels for better fit on screens
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { href: '/hotel', label: 'Отель' },
  { href: '/services', label: 'Услуги' },
  { href: '/rooms', label: 'Номера' },
  { href: '/gallery', label: 'Галерея' },
  { href: '/cafe', label: 'Кафе' },
  { href: '/offers', label: 'Акции' },
  { href: '/reviews', label: 'Отзывы' },
  { href: pathKeys.contacts, label: 'Контакты' },
  { href: '/excursions', label: 'Экскурсии' },
] as const;
