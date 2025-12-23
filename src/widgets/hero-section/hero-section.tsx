'use client';

import Image from 'next/image';
import { type Property } from '@entities/property';
import { BookingWidget } from '@features/booking-widget';
import { cn } from '@shared/lib/utils';
import { useHeroSection } from './use-hero-section';
import { MobileBookingSticky } from './mobile-booking-sticky';
import { useHeroAnimations } from './use-hero-animations';
import styles from './hero.module.css';

interface HeroSectionProps {
  properties?: Property[];
}

export function HeroSection({ properties = [] }: HeroSectionProps) {
  const { primary } = useHeroSection({ properties });
  const { isVisible } = useHeroAnimations();

  return (
    <>
      <section className="px-4 pb-4 pt-2 sm:px-6 sm:pt-4 md:px-8 lg:pt-6">
        <div className="to-bg-secondary/90 relative mx-auto max-w-6xl rounded-3xl border border-white/60 bg-gradient-to-br from-white/95 via-white/90 shadow-2xl">
          <div className="relative z-10 flex flex-col items-center gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-stretch lg:gap-10 lg:px-14 lg:py-14">
            {/* Text + central booking form */}
            <div className="flex w-full flex-col items-center gap-5 text-center sm:gap-6 md:gap-7 lg:w-7/12 lg:items-start lg:text-left">
              <div
                className={cn(
                  styles.heroLabel,
                  styles.heroLabelAccent,
                  isVisible && styles.heroContentEnter,
                  'text-[10px] font-medium uppercase tracking-[0.3em] text-secondary sm:text-xs'
                )}
              >
                Камея — {primary.label.toLowerCase()} для комфортного отдыха
              </div>

              <h1
                className={cn(
                  styles.heroTitle,
                  styles.heroTitleElegant,
                  isVisible && styles.heroContentEnterDelay1,
                  'text-balance text-2xl text-primary sm:text-3xl md:text-4xl lg:text-5xl'
                )}
              >
                {primary.property?.name ?? 'Отель и апартаменты Камея'}
              </h1>

              {primary.property?.shortDescription && (
                <p
                  className={cn(
                    styles.heroDescription,
                    styles.heroDescriptionRefined,
                    isVisible && styles.heroContentEnterDelay2,
                    'max-w-xl text-sm text-secondary sm:text-base md:text-lg'
                  )}
                >
                  {primary.property.shortDescription}
                </p>
              )}

              <div className="mt-2 w-full max-w-xl sm:max-w-2xl">
                <BookingWidget className="border-border/50 border bg-white shadow-xl" />
              </div>
            </div>

            {/* Supporting image on the side (secondary emphasis) */}
            <div className="w-full max-w-xs lg:w-5/12 lg:max-w-none">
              <div className="relative h-52 overflow-hidden rounded-2xl shadow-lg sm:h-64 md:h-72">
                <Image
                  src={primary.primaryImage}
                  alt={primary.property?.name ?? primary.label}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Booking Form */}
      <MobileBookingSticky />
    </>
  );
}
