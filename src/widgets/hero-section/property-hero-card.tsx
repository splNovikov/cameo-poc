'use client';

import { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type PropertyTypeData } from './use-hero-section';
import { useImageRotation } from './use-image-rotation';
import { cn } from '@shared/lib/utils';
import styles from './hero.module.css';

interface PropertyHeroCardProps {
  propertyType: PropertyTypeData;
  index: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isVisible?: boolean;
}

/**
 * Individual property type card component for split-screen hero
 * Supports image rotation when multiple images are available
 */
export const PropertyHeroCard = memo(function PropertyHeroCard({
  propertyType,
  index,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  isVisible: _isVisible = true,
}: PropertyHeroCardProps) {
  const isLeft = index === 0;
  const { currentImageIndex, setCurrentImageIndex, hasMultipleImages } = useImageRotation({
    images: propertyType.images,
    isActive: isHovered,
    interval: 3000,
  });
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Check if all images are loaded
  useEffect(() => {
    const imagesToLoad = hasMultipleImages ? propertyType.images : [propertyType.image];
    const allLoaded = imagesToLoad.every((img) => imagesLoaded.has(img));
    if (allLoaded && imagesToLoad.length > 0) {
      setIsImageLoading(false);
    }
  }, [imagesLoaded, hasMultipleImages, propertyType.images, propertyType.image]);

  const handleImageLoad = (imageSrc: string) => {
    setImagesLoaded((prev) => new Set(prev).add(imageSrc));
  };

  return (
    <Link
      href={propertyType.property ? `/properties/${propertyType.property.slug}` : '#'}
      className="group relative z-10 flex h-[400px] flex-1 cursor-pointer overflow-hidden transition-all duration-700 ease-out md:h-auto"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Background Image */}
      <div
        className={cn(
          styles.heroImageParallax,
          'absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110',
          isHovered ? 'scale-110' : 'scale-100'
        )}
      >
        {/* Loading Placeholder */}
        <div
          className={cn(
            styles.heroImagePlaceholder,
            !isImageLoading && styles.heroImagePlaceholderHidden
          )}
        />

        {hasMultipleImages ? (
          // Multiple images with fade transition
          propertyType.images.map((image, imgIndex) => (
            <Image
              key={image}
              src={image}
              alt={`${propertyType.label} - фото ${imgIndex + 1}`}
              fill
              className={`object-cover transition-opacity duration-1000 ${
                imgIndex === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              priority={index === 0 && imgIndex === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              onLoad={() => handleImageLoad(image)}
              onLoadingComplete={() => handleImageLoad(image)}
            />
          ))
        ) : (
          // Single image
          <Image
            src={propertyType.image}
            alt={propertyType.label}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
            onLoad={() => handleImageLoad(propertyType.image)}
            onLoadingComplete={() => handleImageLoad(propertyType.image)}
          />
        )}
        {/* Gradient Overlay */}
        <div
          className={cn(
            styles.heroGradientOverlay,
            'absolute inset-0 transition-opacity duration-700 group-hover:opacity-90',
            isHovered ? 'opacity-90' : 'opacity-100'
          )}
        />
        {/* Shimmer Effect */}
        {isHovered && (
          <div className={cn(styles.heroShimmer, 'pointer-events-none absolute inset-0 z-20')} />
        )}
      </div>

      {/* Content Overlay */}
      <div
        className={`relative z-30 flex h-full flex-col px-6 py-8 transition-all duration-700 md:px-12 md:py-12 lg:px-16 lg:py-16 ${
          isLeft
            ? 'items-start justify-center text-left md:justify-center md:pb-32'
            : 'items-end justify-center text-right md:justify-center md:pb-32'
        } ${isHovered ? 'translate-y-0' : 'translate-y-4'} opacity-90`}
      >
        <div
          className={cn(
            'max-w-md md:max-w-lg lg:max-w-xl',
            isLeft ? 'md:ml-8 lg:ml-12' : 'md:mr-8 lg:mr-12'
          )}
        >
          <div
            className={cn(
              styles.heroLabel,
              styles.heroLabelAccent,
              styles.heroContentEnter,
              'mb-4 text-xs font-medium uppercase tracking-widest transition-colors duration-300 md:mb-5 md:text-sm',
              !isLeft && styles.heroLabelAccentRight,
              isHovered ? 'text-white' : 'text-white/80'
            )}
          >
            {propertyType.label}
          </div>
          {propertyType.property && (
            <>
              <h2
                className={cn(
                  styles.heroTitle,
                  styles.heroTitleElegant,
                  styles.heroContentEnterDelay1,
                  styles.heroTextShadowDeep,
                  'mb-4 text-xl text-white transition-all duration-500 md:mb-5 md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl',
                  isHovered && 'scale-105'
                )}
              >
                {propertyType.property.name}
              </h2>
              {propertyType.property.shortDescription && (
                <p
                  className={cn(
                    styles.heroDescription,
                    styles.heroDescriptionRefined,
                    styles.heroContentEnterDelay1,
                    'mb-6 line-clamp-3 text-sm text-white transition-opacity duration-500 md:mb-8 md:line-clamp-4 md:text-sm lg:text-base xl:text-base',
                    isHovered ? 'text-white opacity-95' : 'text-white/90 opacity-80'
                  )}
                >
                  {propertyType.property.shortDescription}
                </p>
              )}
              <div
                className={cn(
                  styles.heroButton,
                  styles.heroContentEnterDelay2,
                  'inline-flex items-center gap-3 rounded-full border-2 px-5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 group-hover:scale-105 group-hover:bg-white/20 group-hover:shadow-xl md:px-8 md:py-3 md:text-sm',
                  isHovered
                    ? 'border-white bg-white/15 text-white shadow-2xl backdrop-blur-sm'
                    : 'border-white bg-white/10 text-white backdrop-blur-sm',
                  isHovered && styles.heroButtonPulse
                )}
              >
                Подробнее
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 md:text-xl">
                  →
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Image indicators (dots) - show when multiple images */}
      {hasMultipleImages && (
        <div
          className={`absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {propertyType.images.map((_, imgIndex) => (
            <button
              key={imgIndex}
              type="button"
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                imgIndex === currentImageIndex ? 'w-6 bg-white' : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentImageIndex(imgIndex);
              }}
              aria-label={`Показать фото ${imgIndex + 1}`}
            />
          ))}
        </div>
      )}

      {/* Hover indicator line */}
      <div
        className={cn(
          styles.heroIndicatorLine,
          'absolute bottom-0 left-0 right-0 h-1 bg-white transition-opacity duration-700',
          !isLeft && styles.heroIndicatorLineRight,
          isHovered && styles.heroIndicatorLineActive,
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
      />
    </Link>
  );
});
