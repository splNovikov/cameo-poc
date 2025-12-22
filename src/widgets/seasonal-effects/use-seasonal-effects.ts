'use client';

import { useState, useEffect } from 'react';

/**
 * Months enum for clarity
 */
enum Month {
  January = 0,
  February = 1,
  March = 2,
  April = 3,
  May = 4,
  June = 5,
  July = 6,
  August = 7,
  September = 8,
  October = 9,
  November = 10,
  December = 11,
}

/**
 * Winter months when snow should be shown
 */
const WINTER_MONTHS = [Month.November, Month.December, Month.January, Month.February];

/**
 * Hook for seasonal effects business logic
 * Determines which seasonal effects should be active based on current date
 */
export function useSeasonalEffects() {
  const [showSnow, setShowSnow] = useState(false);

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth();

    // Show snow during winter months (November to February)
    const isWinter = WINTER_MONTHS.includes(month);
    setShowSnow(isWinter);
  }, []);

  return {
    showSnow,
  };
}
