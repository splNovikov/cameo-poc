import { useEffect, useRef, useCallback } from 'react';
import { type Property } from '@entities/property';

interface UseYandexMapProps {
  properties: Property[];
  center?: { lat: number; lng: number };
  zoom?: number;
  mapRef: React.RefObject<HTMLDivElement>;
}

/**
 * Yandex Maps API types
 */
type YandexPlacemark = {
  // Placemark instance methods - type placeholder for Yandex Maps API
  _brand?: 'YandexPlacemark';
};

interface YandexMap {
  geoObjects: {
    add: (marker: YandexPlacemark) => void;
  };
  destroy: () => void;
}

interface YandexMapsAPI {
  Map: new (
    element: HTMLElement,
    options: { center: [number, number]; zoom: number; controls: string[] }
  ) => YandexMap;
  Placemark: new (
    coordinates: [number, number],
    properties: Record<string, string>,
    options: Record<string, string>
  ) => YandexPlacemark;
  ready: (callback: () => void) => void;
}

// Return type is not needed as refs are managed internally

/**
 * Constants for Yandex Maps integration
 */
const YANDEX_MAPS_SCRIPT_ID = 'yandex-maps-script';
const YANDEX_MAPS_API_URL = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
const DEFAULT_MAP_CENTER: [number, number] = [59.943755, 30.323773]; // Default: Санкт-Петербург, Миллионная ул, дом 17
const POLL_INTERVAL_MS = 100;
const POLL_TIMEOUT_MS = 10000;

/**
 * Calculate map center from properties or use provided center
 */
function calculateMapCenter(
  center?: { lat: number; lng: number },
  properties?: Property[]
): [number, number] {
  if (center) {
    return [center.lat, center.lng];
  }
  if (properties?.[0]?.coordinates) {
    return [properties[0].coordinates.lat, properties[0].coordinates.lng];
  }
  return DEFAULT_MAP_CENTER;
}

/**
 * Create marker for a property
 */
function createPropertyMarker(property: Property, ymaps: YandexMapsAPI): YandexPlacemark | null {
  if (!property.coordinates) {
    return null;
  }

  return new ymaps.Placemark(
    [property.coordinates.lat, property.coordinates.lng],
    {
      balloonContentHeader: `<strong class="yandex-map-balloon-header">${property.name}</strong>`,
      balloonContentBody: `
        <div class="yandex-map-balloon-body">
          <p class="yandex-map-balloon-address">${property.address}</p>
          ${property.shortDescription ? `<p class="yandex-map-balloon-description">${property.shortDescription}</p>` : ''}
        </div>
      `,
      hintContent: property.name,
    },
    {
      preset: 'islands#greenDotIconWithCaption',
      iconColor: '#245b21', // Primary color - using CSS variable would require runtime access
    }
  );
}

/**
 * Initialize Yandex Map with properties and markers
 */
function initializeMap(
  mapRef: React.RefObject<HTMLDivElement>,
  properties: Property[],
  center: [number, number],
  zoom: number,
  mapInstanceRef: React.MutableRefObject<YandexMap | null>
): void {
  if (!mapRef.current || !window.ymaps) {
    return;
  }

  // TypeScript type narrowing - we know ymaps is defined after the check above
  const ymaps = window.ymaps;

  try {
    // Destroy existing map instance if it exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.destroy();
      mapInstanceRef.current = null;
    }

    // Create map instance with minimal controls
    const map = new ymaps.Map(mapRef.current, {
      center,
      zoom,
      controls: ['zoomControl'],
    });

    // Add markers for each property
    properties.forEach((property) => {
      const marker = createPropertyMarker(property, ymaps);
      if (marker) {
        map.geoObjects.add(marker);
      }
    });

    mapInstanceRef.current = map;
  } catch (err) {
    console.error('Error initializing map:', err);
  }
}

/**
 * Load Yandex Maps script
 */
function loadYandexMapsScript(onLoad: () => void, onError: () => void): void {
  const script = document.createElement('script');
  script.id = YANDEX_MAPS_SCRIPT_ID;
  script.src = YANDEX_MAPS_API_URL;
  script.async = true;

  script.onload = onLoad;
  script.onerror = onError;

  document.head.appendChild(script);
}

/**
 * Check if Yandex Maps script is already loaded
 */
function isScriptLoaded(): boolean {
  return !!(
    document.getElementById(YANDEX_MAPS_SCRIPT_ID) ||
    document.querySelector('script[src*="api-maps.yandex.ru"]')
  );
}

/**
 * Hook for Yandex Maps initialization and management
 * Extracts business logic from component
 */
export function useYandexMap({ properties, center, zoom = 13, mapRef }: UseYandexMapProps): void {
  const mapInstanceRef = useRef<YandexMap | null>(null);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const initMap = useCallback(() => {
    if (!window.ymaps) {
      return;
    }
    const mapCenter = calculateMapCenter(center, properties);
    initializeMap(mapRef, properties, mapCenter, zoom, mapInstanceRef);
  }, [properties, center, zoom, mapRef]);

  useEffect(() => {
    // Check if script is already loaded
    const ymaps = window.ymaps;
    if (ymaps) {
      ymaps.ready(initMap);
      return;
    }

    // Check if script is already being loaded
    if (isScriptLoaded()) {
      // Wait for existing script to load
      const existingYmaps = window.ymaps;
      if (existingYmaps) {
        existingYmaps.ready(initMap);
      } else {
        // Poll for ymaps to become available
        checkIntervalRef.current = setInterval(() => {
          const polledYmaps = window.ymaps;
          if (polledYmaps) {
            if (checkIntervalRef.current) {
              clearInterval(checkIntervalRef.current);
              checkIntervalRef.current = null;
            }
            polledYmaps.ready(initMap);
          }
        }, POLL_INTERVAL_MS);

        // Cleanup interval after timeout
        setTimeout(() => {
          if (checkIntervalRef.current) {
            clearInterval(checkIntervalRef.current);
            checkIntervalRef.current = null;
          }
        }, POLL_TIMEOUT_MS);
      }
      return;
    }

    // Load Yandex Maps script
    loadYandexMapsScript(
      () => {
        const loadedYmaps = window.ymaps;
        if (loadedYmaps) {
          loadedYmaps.ready(initMap);
        }
      },
      () => {
        console.error('Failed to load Yandex Maps script');
      }
    );

    return () => {
      // Cleanup: destroy map instance
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
      // Cleanup: clear interval
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = null;
      }
    };
  }, [initMap]);
}
