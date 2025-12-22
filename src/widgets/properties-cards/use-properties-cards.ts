import { useMemo } from 'react';
import { type Property } from '@entities/property';
import { PROPERTY_TYPE_LABELS, PROPERTY_TYPES } from '@shared/config/property';

interface GroupedProperty {
  type: string;
  label: string;
  property: Property;
}

interface UsePropertiesCardsProps {
  properties: Property[];
}

/**
 * Hook for Properties Cards business logic
 * Groups properties by type and prepares data for display
 */
export function usePropertiesCards({ properties }: UsePropertiesCardsProps) {
  const groupedProperties = useMemo(() => {
    const grouped: GroupedProperty[] = [];

    // Ensure we have one property per type
    PROPERTY_TYPES.forEach((type) => {
      const property = properties.find((p) => p.type === type);
      if (property) {
        grouped.push({
          type,
          label: PROPERTY_TYPE_LABELS[type],
          property,
        });
      }
    });

    return grouped;
  }, [properties]);

  return {
    groupedProperties,
  };
}
