'use client';

import { useEffect, useRef } from 'react';
import { type Property } from '@entities/property';
import { integrationsConfig } from '@shared/config';

interface YandexMapComponentProps {
  properties: Property[];
  center?: { lat: number; lng: number };
  zoom?: number;
}

export function YandexMapComponent({ properties, center, zoom = 13 }: YandexMapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || !integrationsConfig.yandex.mapApiKey) {
      return;
    }

    // Load Yandex Maps API
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${integrationsConfig.yandex.mapApiKey}&lang=ru_RU`;
    script.async = true;

    script.onload = () => {
      if (window.ymaps && mapRef.current) {
        window.ymaps.ready(() => {
          const defaultCenter = center || properties[0]?.coordinates || [55.7558, 37.6173];

          mapInstanceRef.current = new window.ymaps.Map(mapRef.current, {
            center: defaultCenter,
            zoom: zoom,
          });

          // Add markers for each property
          properties.forEach((property) => {
            if (property.coordinates) {
              const marker = new window.ymaps.Placemark(
                [property.coordinates.lat, property.coordinates.lng],
                {
                  balloonContent: `
                    <div>
                      <h3>${property.name}</h3>
                      <p>${property.address}</p>
                      ${property.shortDescription ? `<p>${property.shortDescription}</p>` : ''}
                    </div>
                  `,
                },
                {
                  preset: 'islands#blueIcon',
                }
              );

              mapInstanceRef.current.geoObjects.add(marker);
            }
          });
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
      }
    };
  }, [properties, center, zoom]);

  return (
    <div className="w-full">
      <div ref={mapRef} className="h-[500px] w-full rounded-lg" />
      {!integrationsConfig.yandex.mapApiKey && (
        <div className="mt-4 rounded-lg border border-border bg-bg-secondary p-4 text-center text-text-light">
          Yandex Maps API key не настроен
        </div>
      )}
    </div>
  );
}

// Extend Window interface for Yandex Maps
declare global {
  interface Window {
    ymaps: any;
  }
}
