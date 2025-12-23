'use client';

import Image from 'next/image';
import { type Property } from '@entities/property';
import { BookingWidget } from '@features/booking-widget';
import { cn } from '@shared/lib/utils';
import { useHeroSection } from './use-hero-section';
import { MobileBookingSticky } from './mobile-booking-sticky';
import { useHeroAnimations } from './use-hero-animations';
import { useImageRotation } from './use-image-rotation';
import { useHeroImageLoading } from './use-hero-image-loading';
import styles from './hero.module.css';

interface HeroSectionProps {
  properties?: Property[];
}

export function HeroSection({ properties = [] }: HeroSectionProps) {
  const { primary } = useHeroSection({ properties });
  const { isVisible } = useHeroAnimations();

  const { currentImageIndex, hasMultipleImages } = useImageRotation({
    images: primary.images,
    isActive: true,
    interval: 6000,
  });

  const { isImageLoading, handleImageLoad } = useHeroImageLoading({
    images: primary.images,
    hasMultipleImages,
    primaryImage: primary.primaryImage,
  });

  return (
    <>
      <section className="relative overflow-hidden pb-6 pt-2 sm:pt-4 md:pt-6">
        {/* Full-bleed cinematic background */}
        <div
          className={cn(
            styles.heroImageParallax,
            'pointer-events-none absolute inset-0 transition-transform duration-700 ease-out'
          )}
        >
          {/* Loading placeholder */}
          <div
            className={cn(
              styles.heroImagePlaceholder,
              !isImageLoading && styles.heroImagePlaceholderHidden
            )}
          />

          {hasMultipleImages ? (
            primary.images.map((image, index) => (
              <Image
                key={image}
                src={image}
                alt={`${primary.label} - фото ${index + 1}`}
                fill
                className={cn(
                  'object-cover transition-opacity duration-[1400ms]',
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                )}
                priority={index === 0}
                sizes="100vw"
                onLoad={() => handleImageLoad(image)}
                onLoadingComplete={() => handleImageLoad(image)}
              />
            ))
          ) : (
            <Image
              src={primary.primaryImage}
              alt={primary.property?.name ?? primary.label}
              fill
              className="object-cover"
              priority
              sizes="100vw"
              onLoad={() => handleImageLoad(primary.primaryImage)}
              onLoadingComplete={() => handleImageLoad(primary.primaryImage)}
            />
          )}

          {/* Cinematic gradient overlay */}
          <div className={cn(styles.heroGradientOverlay, 'absolute inset-0')} />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 mx-auto flex min-h-[420px] max-w-6xl items-center px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="flex w-full flex-col items-center gap-6 text-center sm:gap-7 md:gap-8 lg:flex-row lg:items-stretch lg:gap-10 lg:text-left">
            {/* Text + glass booking block */}
            <div className="flex w-full flex-col items-center gap-4 sm:gap-5 md:gap-6 lg:w-3/5 lg:items-start">
              <div
                className={cn(
                  styles.heroLabel,
                  styles.heroLabelAccent,
                  isVisible && styles.heroContentEnter,
                  'text-[10px] font-medium uppercase tracking-[0.35em] text-white/80 sm:text-xs'
                )}
              >
                Камея — {primary.label.toLowerCase()} в самом сердце города
              </div>

              <h1
                className={cn(
                  styles.heroTitle,
                  styles.heroTitleElegant,
                  isVisible && styles.heroContentEnterDelay1,
                  styles.heroTextShadowDeep,
                  'text-balance text-2xl text-white sm:text-3xl md:text-4xl lg:text-5xl'
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
                    'max-w-xl text-sm text-white/85 sm:text-base md:text-lg'
                  )}
                >
                  {primary.property.shortDescription}
                </p>
              )}

              <div className="mt-3 w-full max-w-xl sm:max-w-2xl">
                <BookingWidget className="bg-white/92 border border-white/80 shadow-2xl backdrop-blur-md" />
              </div>
            </div>

            {/* Spacer / balance area on large screens */}
            <div className="hidden flex-1 lg:block" />
          </div>
        </div>
      </section>

      {/* Mobile Sticky Booking Form */}
      <MobileBookingSticky />
    </>
  );
}
