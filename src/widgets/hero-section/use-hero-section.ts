import { useState, useMemo } from 'react';
import { type Property, type PropertyType } from '@entities/property';
import {
  PROPERTY_TYPE_LABELS,
  PROPERTY_TYPE_DEFAULT_IMAGES,
  PROPERTY_TYPES,
} from '@shared/config/property';

export interface PropertyTypeData {
  type: PropertyType;
  property: Property | null;
  image: string;
  images: string[];
  label: string;
}

interface UseHeroSectionProps {
  properties: Property[];
}

interface UseHeroSectionReturn {
  propertyTypes: PropertyTypeData[];
  hoveredType: PropertyType | null;
  setHoveredType: (type: PropertyType | null) => void;
}

/**
 * Custom hook for hero section business logic
 * Extracts property types and manages hover state
 */
export function useHeroSection({ properties }: UseHeroSectionProps): UseHeroSectionReturn {
  const [hoveredType, setHoveredType] = useState<PropertyType | null>(null);

  // Extract property types and their images
  const propertyTypes = useMemo<PropertyTypeData[]>(() => {
    return PROPERTY_TYPES.map((type) => {
      const property = properties.find((p) => p.type === type) || null;
      const images = property?.images?.length
        ? property.images
        : [PROPERTY_TYPE_DEFAULT_IMAGES[type]];
      const image = images[0];
      const label = PROPERTY_TYPE_LABELS[type];

      return {
        type,
        property,
        image,
        images,
        label,
      };
    });
  }, [properties]);

  return {
    propertyTypes,
    hoveredType,
    setHoveredType,
  };
}
