'use client';

import { useRef } from 'react';
import { type Property } from '@entities/property';
import { useYandexMap } from './use-yandex-map';
import { cn } from '@shared/lib/utils';
import styles from './yandex-map-component.module.css';
import './yandex-map-global.css';

interface YandexMapComponentProps {
  properties: Property[];
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
}

/**
 * Yandex Maps Component
 * Displays interactive map with property markers
 * Mobile-first responsive design
 */
export function YandexMapComponent({
  properties,
  center,
  zoom = 13,
  className,
}: YandexMapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useYandexMap({
    properties,
    center,
    zoom,
    mapRef,
  });

  return (
    <div className={cn(styles.container, className)}>
      <div
        ref={mapRef}
        className={cn(
          styles.mapElement,
          'yandex-map-container',
          !className && styles.mapElementDefault
        )}
      />
    </div>
  );
}

// Extend Window interface for Yandex Maps
declare global {
  interface Window {
    ymaps: any;
  }
}
