import { useMemo } from 'react';
import { type Property } from '@entities/property';
import {
  PROPERTY_TYPE_LABELS,
  PROPERTY_TYPE_DEFAULT_IMAGES,
  PROPERTY_TYPES,
} from '@shared/config/property';

interface UseHeroSectionProps {
  properties: Property[];
}

interface HeroPrimaryData {
  label: string;
  property: Property | null;
  images: string[];
  primaryImage: string;
}

interface UseHeroSectionReturn {
  primary: HeroPrimaryData;
}

/**
 * Custom hook for hero section business logic
 * Picks a single primary property (hero) and its images
 */
export function useHeroSection({ properties }: UseHeroSectionProps): UseHeroSectionReturn {
  const primary = useMemo<HeroPrimaryData>(() => {
    // Prefer hotel if available, otherwise first property type in config order
    const preferredType = PROPERTY_TYPES.find((type) =>
      properties.some((p) => p.type === type)
    );

    const property =
      (preferredType && properties.find((p) => p.type === preferredType)) || properties[0] || null;

    const typeKey = property?.type ?? PROPERTY_TYPES[0];
    const images =
      property?.images?.length && property.images.length > 0
        ? property.images
        : [PROPERTY_TYPE_DEFAULT_IMAGES[typeKey]];

    return {
      label: PROPERTY_TYPE_LABELS[typeKey],
      property,
      images,
      primaryImage: images[0],
    };
  }, [properties]);

  return {
    primary,
  };
}
