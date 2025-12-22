'use client';

import { type Property } from '@entities/property';
import { useHeroSection } from './use-hero-section';
import { PropertyHeroCard } from './property-hero-card';
import { HeroContentOverlay } from './hero-content-overlay';

interface HeroSectionProps {
  properties?: Property[];
}

export function HeroSection({ properties = [] }: HeroSectionProps) {
  const { propertyTypes, hoveredType, setHoveredType } = useHeroSection({
    properties,
  });

  return (
    <section className="relative min-h-[600px] overflow-hidden">
      {/* Split-screen hero with both property types */}
      <div className="absolute inset-0 flex">
        {propertyTypes.map((propertyType, index) => (
          <PropertyHeroCard
            key={propertyType.type}
            propertyType={propertyType}
            index={index}
            isHovered={hoveredType === propertyType.type}
            onMouseEnter={() => setHoveredType(propertyType.type)}
            onMouseLeave={() => setHoveredType(null)}
          />
        ))}
      </div>

      {/* Content Overlay - Booking Widget */}
      <HeroContentOverlay />
    </section>
  );
}
