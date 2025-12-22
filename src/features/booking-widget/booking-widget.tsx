'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Users } from 'lucide-react';
import { BookingSearchSchema, type BookingSearch } from '@entities/booking';
import { Button } from '@shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/ui/card';
import { integrationsConfig } from '@shared/config';

export function BookingWidget() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingSearch>({
    resolver: zodResolver(BookingSearchSchema),
    defaultValues: {
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      adults: 2,
      children: 0,
      rooms: 1,
    },
  });

  const onSubmit = async (data: BookingSearch) => {
    setIsLoading(true);
    try {
      // Redirect to Travelline booking page or handle booking
      const widgetId = integrationsConfig.travelline.widgetId;
      if (widgetId) {
        // In a real implementation, this would integrate with Travelline widget
        window.open(
          `https://travelline.ru/widget/${widgetId}?checkIn=${data.checkIn}&checkOut=${data.checkOut}&adults=${data.adults}`,
          '_blank'
        );
      }
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Забронировать номер</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="checkIn" className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Calendar className="h-4 w-4" />
                Заезд
              </label>
              <input
                id="checkIn"
                type="date"
                {...register('checkIn')}
                className="w-full rounded-md border border-border bg-bg px-3 py-2"
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.checkIn && (
                <p className="mt-1 text-sm text-error">{errors.checkIn.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="checkOut"
                className="mb-2 flex items-center gap-2 text-sm font-medium"
              >
                <Calendar className="h-4 w-4" />
                Выезд
              </label>
              <input
                id="checkOut"
                type="date"
                {...register('checkOut')}
                className="w-full rounded-md border border-border bg-bg px-3 py-2"
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.checkOut && (
                <p className="mt-1 text-sm text-error">{errors.checkOut.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="adults" className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Users className="h-4 w-4" />
                Взрослые
              </label>
              <input
                id="adults"
                type="number"
                min="1"
                max="10"
                {...register('adults', { valueAsNumber: true })}
                className="w-full rounded-md border border-border bg-bg px-3 py-2"
              />
              {errors.adults && <p className="mt-1 text-sm text-error">{errors.adults.message}</p>}
            </div>

            <div>
              <label htmlFor="children" className="mb-2 text-sm font-medium">
                Дети
              </label>
              <input
                id="children"
                type="number"
                min="0"
                max="10"
                {...register('children', { valueAsNumber: true })}
                className="w-full rounded-md border border-border bg-bg px-3 py-2"
              />
              {errors.children && (
                <p className="mt-1 text-sm text-error">{errors.children.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="rooms" className="mb-2 text-sm font-medium">
                Номера
              </label>
              <input
                id="rooms"
                type="number"
                min="1"
                max="10"
                {...register('rooms', { valueAsNumber: true })}
                className="w-full rounded-md border border-border bg-bg px-3 py-2"
              />
              {errors.rooms && <p className="mt-1 text-sm text-error">{errors.rooms.message}</p>}
            </div>
          </div>

          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? 'Поиск...' : 'Найти номера'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
