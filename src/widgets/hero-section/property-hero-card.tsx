'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type PropertyTypeData } from './use-hero-section';
import { useImageRotation } from './use-image-rotation';

interface PropertyHeroCardProps {
  propertyType: PropertyTypeData;
  index: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
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
}: PropertyHeroCardProps) {
  const isLeft = index === 0;
  const { currentImageIndex, setCurrentImageIndex, hasMultipleImages } = useImageRotation({
    images: propertyType.images,
    isActive: isHovered,
    interval: 3000,
  });

  return (
    <Link
      href={propertyType.property ? `/properties/${propertyType.property.slug}` : '#'}
      className="group relative z-10 flex h-[400px] flex-1 cursor-pointer overflow-hidden transition-all duration-700 ease-out md:h-auto"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Background Image */}
      <div
        className={`absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
      >
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
          />
        )}
        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 group-hover:opacity-90 ${
            isHovered
              ? 'bg-gradient-to-br from-black/60 via-black/50 to-black/40'
              : 'bg-gradient-to-br from-black/70 via-black/60 to-black/50'
          }`}
        />
      </div>

      {/* Content Overlay */}
      <div
        className={`relative z-30 flex h-full flex-col px-4 py-6 transition-all duration-700 md:px-8 md:py-8 ${
          isLeft
            ? 'items-start justify-start text-left md:justify-start md:pb-32'
            : 'items-end justify-start text-right md:justify-start md:pb-32'
        } ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-90'}`}
      >
        <div className="max-w-md md:max-w-lg">
          <div
            className={`hero-label mb-2 text-xs font-medium uppercase tracking-wider transition-colors duration-300 md:text-sm ${
              isHovered ? 'text-white' : 'text-white/80'
            }`}
          >
            {propertyType.label}
          </div>
          {propertyType.property && (
            <>
              <h2
                className={`hero-title mb-2 text-white transition-all duration-500 md:mb-3 text-2xl md:text-3xl lg:text-4xl xl:text-5xl ${
                  isHovered ? 'scale-105' : ''
                }`}
              >
                {propertyType.property.name}
              </h2>
              {propertyType.property.shortDescription && (
                <p
                  className={`hero-description mb-3 line-clamp-3 transition-opacity duration-500 md:mb-4 md:line-clamp-4 text-white text-sm md:text-base lg:text-lg ${
                    isHovered ? 'opacity-90' : 'opacity-70'
                  }`}
                >
                  {propertyType.property.shortDescription}
                </p>
              )}
              <div
                className={`inline-flex items-center gap-2 rounded-full border-2 px-3 py-1 text-xs font-medium transition-all duration-300 group-hover:scale-105 group-hover:bg-white/20 group-hover:shadow-lg md:px-6 md:py-2 md:text-sm ${
                  isHovered
                    ? 'border-white bg-white/10 text-white shadow-lg'
                    : 'border-white/50 bg-white/5 text-white/80'
                }`}
              >
                Подробнее
                <span className="transition-transform duration-300 group-hover:translate-x-1">
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
        className={`hero-indicator-line absolute bottom-0 left-0 right-0 h-1 bg-white transition-opacity duration-700 ${
          isLeft ? '' : 'hero-indicator-line--right'
        } ${isHovered ? 'hero-indicator-line--active opacity-100' : 'opacity-0'}`}
      />
    </Link>
  );
});
