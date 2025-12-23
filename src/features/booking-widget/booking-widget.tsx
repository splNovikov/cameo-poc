'use client';

import { Calendar, Users } from 'lucide-react';
import { Button } from '@shared/ui/button';
import { Card, CardContent } from '@shared/ui/card';
import { cn } from '@shared/lib/utils';
import { useBookingForm, getDefaultBookingDates } from './use-booking-form';
import { BookingFormField } from './booking-form-field';

interface BookingWidgetProps {
  /**
   * Optional className to customize outer card styling (e.g. glass effect in hero)
   */
  className?: string;
}

export function BookingWidget({ className }: BookingWidgetProps) {
  const { form, isLoading, onSubmit } = useBookingForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const { checkIn: minDate } = getDefaultBookingDates();

  return (
    <Card className={cn('w-full', className)}>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <BookingFormField
              id="checkIn"
              label="Заезд"
              icon={<Calendar className="h-4 w-4" />}
              error={errors.checkIn}
            >
              <input
                id="checkIn"
                type="date"
                {...register('checkIn')}
                className="w-full rounded-md border border-border bg-bg px-3 py-2"
                min={minDate}
              />
            </BookingFormField>

            <BookingFormField
              id="checkOut"
              label="Выезд"
              icon={<Calendar className="h-4 w-4" />}
              error={errors.checkOut}
            >
              <input
                id="checkOut"
                type="date"
                {...register('checkOut')}
                className="w-full rounded-md border border-border bg-bg px-3 py-2"
                min={minDate}
              />
            </BookingFormField>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <BookingFormField
              id="adults"
              label="Взрослые"
              icon={<Users className="h-4 w-4" />}
              error={errors.adults}
            >
              <input
                id="adults"
                type="number"
                min="1"
                max="10"
                {...register('adults', { valueAsNumber: true })}
                className="w-full rounded-md border border-border bg-bg px-3 py-2"
              />
            </BookingFormField>

            <BookingFormField id="children" label="Дети" error={errors.children}>
              <input
                id="children"
                type="number"
                min="0"
                max="10"
                {...register('children', { valueAsNumber: true })}
                className="w-full rounded-md border border-border bg-bg px-3 py-2"
              />
            </BookingFormField>

            <BookingFormField id="rooms" label="Номера" error={errors.rooms}>
              <input
                id="rooms"
                type="number"
                min="1"
                max="10"
                {...register('rooms', { valueAsNumber: true })}
                className="w-full rounded-md border border-border bg-bg px-3 py-2"
              />
            </BookingFormField>
          </div>

          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? 'Поиск...' : 'Найти номера'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
