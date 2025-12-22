'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type Property, type PropertyType } from '@entities/property';
import { Button } from '@shared/ui/button';
import { Card, CardContent } from '@shared/ui/card';

interface PropertySelectorProps {
  properties: Property[];
  selectedType?: PropertyType;
  onSelect?: (property: Property) => void;
}

export function PropertySelector({ properties, selectedType, onSelect }: PropertySelectorProps) {
  const [activeType, setActiveType] = useState<PropertyType | 'all'>(selectedType || 'all');

  const filteredProperties =
    activeType === 'all' ? properties : properties.filter((p) => p.type === activeType);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={activeType === 'all' ? 'default' : 'outline'}
          onClick={() => setActiveType('all')}
        >
          Все объекты
        </Button>
        <Button
          variant={activeType === 'hotel' ? 'default' : 'outline'}
          onClick={() => setActiveType('hotel')}
        >
          Отель
        </Button>
        <Button
          variant={activeType === 'apartments' ? 'default' : 'outline'}
          onClick={() => setActiveType('apartments')}
        >
          Апартаменты
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            {property.images && property.images[0] && (
              <div className="relative aspect-video w-full">
                <Image
                  src={property.images[0]}
                  alt={property.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <CardContent className="p-4">
              <h3 className="mb-2 text-xl font-semibold">{property.name}</h3>
              <p className="mb-2 text-sm text-text-light">{property.shortDescription}</p>
              <p className="mb-4 text-xs text-text-light">{property.address}</p>
              {onSelect && (
                <Button variant="outline" fullWidth onClick={() => onSelect(property)}>
                  Подробнее
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
