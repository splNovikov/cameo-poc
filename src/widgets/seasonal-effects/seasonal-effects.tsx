'use client';

import { SnowEffect } from './snow-effect';
import { useSeasonalEffects } from './use-seasonal-effects';

/**
 * Seasonal Effects Widget
 * Displays seasonal visual effects based on current date
 * Mobile-first responsive design
 */
export function SeasonalEffects() {
  const { showSnow } = useSeasonalEffects();

  return <>{showSnow && <SnowEffect />}</>;
}
