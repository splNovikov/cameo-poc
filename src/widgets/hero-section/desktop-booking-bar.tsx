'use client';

import { Calendar, Users } from 'lucide-react';
import { Button } from '@shared/ui/button';
import { useBookingForm } from '@features/booking-widget/use-booking-form';
import { BookingFormField } from '@features/booking-widget/booking-form-field';
import { getDefaultBookingDates } from '@features/booking-widget/use-booking-form';
import { cn } from '@shared/lib/utils';
import styles from './hero.module.css';

/**
 * Horizontal compact booking bar for desktop
 * Positioned at the bottom of hero section
 */
export function DesktopBookingBar() {
  const { form, isLoading, onSubmit } = useBookingForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const { checkIn: minDate } = getDefaultBookingDates();

  return (
    <div className={cn(styles.heroBookingEnter, 'absolute bottom-0 left-0 right-0 z-50 hidden border-t border-border bg-white shadow-2xl md:block')}>
      <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap items-end gap-3 lg:flex-nowrap lg:gap-4">
          <BookingFormField
            id="desktop-checkIn"
            label="Заезд"
            icon={<Calendar className="h-3 w-3 text-text-primary" />}
            error={errors.checkIn}
            className="flex-1 min-w-[140px]"
          >
            <input
              id="desktop-checkIn"
              type="date"
              {...register('checkIn')}
              className={cn(
                'w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-text-primary',
                errors.checkIn && 'border-error'
              )}
              min={minDate}
            />
          </BookingFormField>

          <BookingFormField
            id="desktop-checkOut"
            label="Выезд"
            icon={<Calendar className="h-3 w-3 text-text-primary" />}
            error={errors.checkOut}
            className="flex-1 min-w-[140px]"
          >
            <input
              id="desktop-checkOut"
              type="date"
              {...register('checkOut')}
              className={cn(
                'w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-text-primary',
                errors.checkOut && 'border-error'
              )}
              min={minDate}
            />
          </BookingFormField>

          <BookingFormField
            id="desktop-adults"
            label="Взрослые"
            icon={<Users className="h-3 w-3 text-text-primary" />}
            error={errors.adults}
            className="w-24"
          >
            <input
              id="desktop-adults"
              type="number"
              min="1"
              max="10"
              {...register('adults', { valueAsNumber: true })}
              className={cn(
                'w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-text-primary',
                errors.adults && 'border-error'
              )}
            />
          </BookingFormField>

          <BookingFormField
            id="desktop-children"
            label="Дети"
            error={errors.children}
            className="w-20"
          >
            <input
              id="desktop-children"
              type="number"
              min="0"
              max="10"
              {...register('children', { valueAsNumber: true })}
              className={cn(
                'w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-text-primary',
                errors.children && 'border-error'
              )}
            />
          </BookingFormField>

          <BookingFormField
            id="desktop-rooms"
            label="Номера"
            error={errors.rooms}
            className="w-20"
          >
            <input
              id="desktop-rooms"
              type="number"
              min="1"
              max="10"
              {...register('rooms', { valueAsNumber: true })}
              className={cn(
                'w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-text-primary',
                errors.rooms && 'border-error'
              )}
            />
          </BookingFormField>

          {/* Submit Button */}
          <div className="w-full lg:w-auto">
            <Button type="submit" disabled={isLoading} className="w-full lg:w-auto lg:min-w-[160px]">
              {isLoading ? 'Поиск...' : 'Найти номера'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

