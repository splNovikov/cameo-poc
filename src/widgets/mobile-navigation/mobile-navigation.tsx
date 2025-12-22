'use client';

import Link from 'next/link';
import { X, Menu } from 'lucide-react';
import { NAVIGATION_ITEMS } from '@shared/config';
import { cn } from '@shared/lib/utils';
import { useMobileNavigation } from './use-mobile-navigation';

interface MobileNavigationProps {
  className?: string;
}

/**
 * Mobile navigation component with hamburger menu
 */
export function MobileNavigation({ className }: MobileNavigationProps) {
  const { isOpen, toggleMenu, closeMenu } = useMobileNavigation();

  return (
    <>
      {/* Hamburger Button */}
      <button
        type="button"
        onClick={toggleMenu}
        className={cn(
          'text-text-primary flex items-center justify-center p-2 transition-colors hover:text-primary md:hidden',
          className
        )}
        aria-label="Открыть меню"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <nav
            className={cn(
              'fixed right-0 top-0 z-50 h-full w-64 bg-bg shadow-xl transition-transform duration-300 ease-in-out md:hidden',
              isOpen ? 'translate-x-0' : 'translate-x-full'
            )}
          >
            <div className="flex h-14 items-center justify-between border-b border-border px-4">
              <span className="text-lg font-semibold">Меню</span>
              <button
                type="button"
                onClick={closeMenu}
                className="text-text-primary p-2 transition-colors hover:text-primary"
                aria-label="Закрыть меню"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col p-4">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="text-text-primary rounded-md px-4 py-3 text-base font-medium transition-colors hover:bg-bg-secondary hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}
    </>
  );
}
