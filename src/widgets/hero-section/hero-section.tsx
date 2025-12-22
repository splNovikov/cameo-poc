'use client';

import Image from 'next/image';
import { BookingWidget } from '@features/booking-widget';
import { PropertySelector } from '@features/property-selector';
import { type Property } from '@entities/property';

interface HeroSectionProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
  properties?: Property[];
}

export function HeroSection({
  backgroundImage = '/images/hero/default.jpg',
  title = 'Cameo Hotel',
  subtitle = 'Комфортабельные номера в центре города',
  properties,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt="Cameo Hotel"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Title and Description */}
          <div className="flex flex-col justify-center text-white">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">{title}</h1>
            <p className="mb-8 text-xl md:text-2xl">{subtitle}</p>
            {properties && properties.length > 0 && (
              <div className="mt-4">
                <PropertySelector properties={properties} />
              </div>
            )}
          </div>

          {/* Right: Booking Widget */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <BookingWidget />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
