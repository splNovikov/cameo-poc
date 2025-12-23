'use client';

import Link from 'next/link';
import { X, Menu } from 'lucide-react';
import { NAVIGATION_ITEMS } from '@shared/config';
import { cn } from '@shared/lib/utils';
import { useMobileNavigation } from './use-mobile-navigation';
import styles from './mobile-navigation.module.css';

interface MobileNavigationProps {
  className?: string;
}

/**
 * Mobile navigation component with hamburger menu
 * Enhanced with primary colors and smooth animations
 */
export function MobileNavigation({ className }: MobileNavigationProps) {
  const { isOpen, toggleMenu, closeMenu } = useMobileNavigation();

  return (
    <>
      {/* Hamburger Button */}
      <button
        type="button"
        onClick={toggleMenu}
        className={cn(styles.hamburgerButton, className)}
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={isOpen}
      >
        <Menu className={cn(styles.icon, styles.iconMenu, isOpen && 'opacity-0')} />
        <X className={cn(styles.icon, styles.iconClose, !isOpen && 'opacity-0')} />
      </button>

      {/* Mobile Menu Overlay */}
      <>
        {/* Backdrop with blur effect */}
        <div
          className={cn(styles.backdrop, isOpen ? styles.backdropOpen : styles.backdropClosed)}
          onClick={closeMenu}
          aria-hidden="true"
        />

        {/* Menu Panel */}
        <nav
          className={cn(styles.menuPanel, isOpen ? styles.menuPanelOpen : styles.menuPanelClosed)}
          aria-hidden={!isOpen}
          aria-label="Мобильное меню"
        >
          {/* Menu Header with close button */}
          <div className={styles.menuHeader}>
            <button
              type="button"
              onClick={closeMenu}
              className={styles.closeButton}
              aria-label="Закрыть меню"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu Items with hover effects */}
          <div className={styles.menuList}>
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={styles.menuItem}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </>
    </>
  );
}
