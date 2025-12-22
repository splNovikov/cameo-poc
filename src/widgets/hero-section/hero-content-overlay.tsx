import { BookingWidget } from '@features/booking-widget';

/**
 * Content overlay component for hero section
 * Shows centered booking widget
 */
export function HeroContentOverlay() {
  return (
    <div className="pointer-events-none relative z-50 flex min-h-[600px] items-center justify-center px-4">
      <div className="pointer-events-auto w-full max-w-md drop-shadow-2xl">
        <BookingWidget />
      </div>
    </div>
  );
}
