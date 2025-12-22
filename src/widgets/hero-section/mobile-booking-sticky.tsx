'use client';

import { useCallback } from 'react';
import { ChevronUp } from 'lucide-react';
import { BookingWidget } from '@features/booking-widget';
import { cn } from '@shared/lib/utils';
import { useMobileBookingSticky } from './use-mobile-booking-sticky';
import styles from './mobile-booking-sticky.module.css';

/**
 * Sticky bottom booking form for mobile devices
 * Collapsible, always accessible
 * Uses glassmorphism design with gradient effects
 */
export function MobileBookingSticky() {
  const { isCollapsed, toggleCollapse, handleKeyDown } = useMobileBookingSticky();

  const handleToggleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleCollapse();
    },
    [toggleCollapse]
  );

  const ariaLabel = isCollapsed ? 'Развернуть форму бронирования' : 'Свернуть форму бронирования';
  const toggleAriaLabel = isCollapsed ? 'Развернуть' : 'Свернуть';

  return (
    <div
      className={cn(
        styles.container,
        isCollapsed ? styles.containerCollapsed : styles.containerExpanded
      )}
    >
      {/* Header Bar - Always visible and clickable */}
      <div
        className={styles.headerBar}
        onClick={toggleCollapse}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
      >
        {/* Glassmorphism overlay with gradient */}
        <div className={styles.glassOverlay} />

        {/* Animated border glow */}
        <div className={styles.borderGlow} />

        {/* Shimmer effect */}
        <span className={styles.shimmer} />

        <div className={styles.contentWrapper}>
          <span className={styles.label}>Забронировать номер</span>
        </div>
        <button
          type="button"
          onClick={handleToggleClick}
          className={styles.toggleButton}
          aria-label={toggleAriaLabel}
        >
          <ChevronUp className={cn(styles.chevron, !isCollapsed && styles.chevronRotated)} />
        </button>
      </div>

      {/* Booking Form - Full height when expanded */}
      <div
        className={cn(
          styles.formContainer,
          isCollapsed ? styles.formContainerCollapsed : styles.formContainerExpanded
        )}
      >
        <div className={styles.formContent}>
          <BookingWidget />
        </div>
      </div>
    </div>
  );
}
