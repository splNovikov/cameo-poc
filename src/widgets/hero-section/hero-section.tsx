'use client';

import Image from 'next/image';
import { type Property } from '@entities/property';
import { useHeroSection } from './use-hero-section';
import { BookingWidget } from '@features/booking-widget';
import { MobileBookingSticky } from './mobile-booking-sticky';
import { useHeroAnimations } from './use-hero-animations';
import { useImageRotation } from './use-image-rotation';
import { useHeroImageLoading } from './use-hero-image-loading';
import { cn } from '@shared/lib/utils';
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
      <section className="px-4 pb-4 pt-2 sm:px-6 sm:pt-4 md:px-8 lg:pt-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl shadow-2xl">
          {/* Background images with overlay */}
          <div
            className={cn(
              styles.heroImageParallax,
              'absolute inset-0 transition-transform duration-700 ease-out'
            )}
          >
            {/* Loading placeholder */}
            <div
              className={cn(
                styles.heroImagePlaceholder,
                !isImageLoading && styles.heroImagePlaceholderHidden
              )}
            />

            {hasMultipleImages
              ? primary.images.map((image, index) => (
                  <Image
                    key={image}
                    src={image}
                    alt={`${primary.label} - фото ${index + 1}`}
                    fill
                    className={cn(
                      'object-cover transition-opacity duration-[1200ms]',
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    )}
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 100vw"
                    onLoad={() => handleImageLoad(image)}
                    onLoadingComplete={() => handleImageLoad(image)}
                  />
                ))
              : (
                  <Image
                    src={primary.primaryImage}
                    alt={primary.property?.name ?? primary.label}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 100vw"
                    onLoad={() => handleImageLoad(primary.primaryImage)}
                    onLoadingComplete={() => handleImageLoad(primary.primaryImage)}
                  />
                )}

            {/* Gradient overlay */}
            <div className={cn(styles.heroGradientOverlay, 'absolute inset-0')} />
          </div>

          {/* Content + centered booking card */}
          <div className="relative z-20 px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14 lg:px-14 lg:py-16">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center gap-5 sm:gap-6 md:gap-8">
              <div
                className={cn(
                  styles.heroLabel,
                  styles.heroLabelAccent,
                  isVisible && styles.heroContentEnter,
                  'text-[10px] font-medium uppercase tracking-[0.3em] text-white/80 sm:text-xs'
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

              {/* Central booking card */}
              <div className="mt-4 w-full max-w-xl sm:max-w-2xl">
                <BookingWidget className="bg-white/95 shadow-2xl backdrop-blur-sm border-white/80" />
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
