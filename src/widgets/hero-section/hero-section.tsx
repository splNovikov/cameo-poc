'use client';

import { type Property } from '@entities/property';
import { useHeroSection } from './use-hero-section';
import { PropertyHeroCard } from './property-hero-card';
import { DesktopBookingBar } from './desktop-booking-bar';
import { MobileBookingSticky } from './mobile-booking-sticky';

interface HeroSectionProps {
  properties?: Property[];
}

export function HeroSection({ properties = [] }: HeroSectionProps) {
  const { propertyTypes, hoveredType, setHoveredType } = useHeroSection({
    properties,
  });

  return (
    <>
      <section className="relative min-h-[700px] overflow-hidden pb-20 md:min-h-[700px] md:pb-24">
        {/* Split-screen hero with both property types */}
        <div className="absolute inset-0 flex flex-col md:flex-row">
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

        {/* Desktop Booking Bar - Bottom of hero section */}
        <DesktopBookingBar />
      </section>

      {/* Mobile Sticky Booking Form */}
      <MobileBookingSticky />
    </>
  );
}
