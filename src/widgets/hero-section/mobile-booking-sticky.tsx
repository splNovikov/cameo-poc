'use client';

import { useState, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';
import { BookingWidget } from '@features/booking-widget';
import { cn } from '@shared/lib/utils';

/**
 * Sticky bottom booking form for mobile devices
 * Collapsible, always accessible
 */
export function MobileBookingSticky() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-bg shadow-2xl transition-all duration-300 md:hidden',
        isCollapsed ? 'translate-y-[calc(100%-60px)]' : 'h-screen translate-y-0'
      )}
    >
      {/* Header Bar - Always visible */}
      <div
        className="flex shrink-0 items-center justify-between border-t border-border bg-bg-secondary px-4 py-3"
        onClick={toggleCollapse}
      >
        <div className="flex items-center gap-2">
          <span className="text-text-primary text-sm font-semibold">Забронировать номер</span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleCollapse();
          }}
          className="text-text-secondary p-1 transition-colors hover:text-primary"
          aria-label={isCollapsed ? 'Развернуть' : 'Свернуть'}
        >
          <ChevronUp className={cn('h-5 w-5 transition-transform', !isCollapsed && 'rotate-180')} />
        </button>
      </div>

      {/* Booking Form - Full height when expanded */}
      <div
        className={cn(
          'flex-1 overflow-hidden transition-all duration-300',
          isCollapsed ? 'max-h-0 opacity-0' : 'opacity-100'
        )}
      >
        <div className="h-full overflow-y-auto px-4 py-4">
          <BookingWidget />
        </div>
      </div>
    </div>
  );
}
