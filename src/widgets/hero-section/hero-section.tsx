'use client';

import { type Property } from '@entities/property';
import { useHeroSection } from './use-hero-section';
import { PropertyHeroCard } from './property-hero-card';
import { DesktopBookingBar } from './desktop-booking-bar';
import { MobileBookingSticky } from './mobile-booking-sticky';
import { useHeroAnimations } from './use-hero-animations';

interface HeroSectionProps {
  properties?: Property[];
}

export function HeroSection({ properties = [] }: HeroSectionProps) {
  const { propertyTypes, hoveredType, setHoveredType } = useHeroSection({
    properties,
  });
  const { isVisible } = useHeroAnimations();

  return (
    <>
      <section className="relative min-h-[450px] overflow-hidden sm:min-h-[500px] md:min-h-[550px]">
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
              isVisible={isVisible}
            />
          ))}
        </div>
      </section>

      {/* Desktop Booking Bar - Positioned at bottom of hero, then sticky */}
      <DesktopBookingBar />

      {/* Mobile Sticky Booking Form */}
      <MobileBookingSticky />
    </>
  );
}
