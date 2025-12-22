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
          'fixed bottom-0 left-0 right-0 z-[9999] flex flex-col bg-white shadow-2xl transition-all duration-300 md:hidden',
          isCollapsed ? 'h-16' : 'h-screen'
        )}
      >
      {/* Header Bar - Always visible and clickable */}
      <div
        className="flex shrink-0 cursor-pointer items-center justify-between border-t-2 border-primary bg-primary px-4 py-4 shadow-lg"
        onClick={toggleCollapse}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleCollapse();
          }
        }}
        aria-label={isCollapsed ? 'Развернуть форму бронирования' : 'Свернуть форму бронирования'}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white">Забронировать номер</span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleCollapse();
          }}
          className="text-white p-1 transition-colors hover:text-white/80 active:scale-95"
          aria-label={isCollapsed ? 'Развернуть' : 'Свернуть'}
        >
          <ChevronUp className={cn('h-6 w-6 transition-transform duration-300', !isCollapsed && 'rotate-180')} />
        </button>
      </div>

      {/* Booking Form - Full height when expanded */}
      <div
        className={cn(
          'flex-1 overflow-hidden transition-all duration-300',
          isCollapsed ? 'max-h-0 opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        )}
      >
        <div className="h-full overflow-y-auto bg-white px-4 py-4">
          <BookingWidget />
        </div>
      </div>
    </div>
  );
}
