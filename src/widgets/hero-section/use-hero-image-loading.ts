import { useState, useEffect, useCallback } from 'react';

interface UseHeroImageLoadingProps {
  images: string[];
  hasMultipleImages: boolean;
  primaryImage: string;
}

interface UseHeroImageLoadingReturn {
  imagesLoaded: Set<string>;
  isImageLoading: boolean;
  handleImageLoad: (imageSrc: string) => void;
}

/**
 * Custom hook for managing hero image loading state
 * Tracks when all images are loaded to hide loading placeholder
 */
export function useHeroImageLoading({
  images,
  hasMultipleImages,
  primaryImage,
}: UseHeroImageLoadingProps): UseHeroImageLoadingReturn {
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoad = useCallback((imageSrc: string) => {
    setImagesLoaded((prev) => new Set(prev).add(imageSrc));
  }, []);

  // Check if all images are loaded
  useEffect(() => {
    const imagesToLoad = hasMultipleImages ? images : [primaryImage];
    const allLoaded = imagesToLoad.every((img) => imagesLoaded.has(img));
    if (allLoaded && imagesToLoad.length > 0) {
      setIsImageLoading(false);
    }
  }, [imagesLoaded, hasMultipleImages, images, primaryImage]);

  return {
    imagesLoaded,
    isImageLoading,
    handleImageLoad,
  };
}

