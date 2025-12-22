import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookingSearchSchema, type BookingSearch } from '@entities/booking';
import { integrationsConfig } from '@shared/config';

/**
 * Get default booking dates (today and tomorrow)
 */
export function getDefaultBookingDates() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return {
    checkIn: today.toISOString().split('T')[0],
    checkOut: tomorrow.toISOString().split('T')[0],
  };
}

/**
 * Custom hook for booking form logic
 * Handles form state, validation, and submission
 */
export function useBookingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { checkIn, checkOut } = getDefaultBookingDates();

  const form = useForm<BookingSearch>({
    resolver: zodResolver(BookingSearchSchema),
    defaultValues: {
      checkIn,
      checkOut,
      adults: 2,
      children: 0,
      rooms: 1,
    },
  });

  const onSubmit = async (data: BookingSearch) => {
    setIsLoading(true);
    try {
      const widgetId = integrationsConfig.travelline.widgetId;
      if (widgetId) {
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

  return {
    form,
    isLoading,
    onSubmit,
  };
}

