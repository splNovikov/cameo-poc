import { useState, useEffect } from 'react';

interface UseImageRotationProps {
  images: string[];
  isActive: boolean;
  interval?: number;
}

interface UseImageRotationReturn {
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  hasMultipleImages: boolean;
}

/**
 * Custom hook for image rotation/carousel functionality
 * Rotates through images when active
 */
export function useImageRotation({
  images,
  isActive,
  interval = 3000,
}: UseImageRotationProps): UseImageRotationReturn {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!isActive || !hasMultipleImages) {
      setCurrentImageIndex(0);
      return;
    }

    const intervalId = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [isActive, hasMultipleImages, images.length, interval]);

  return {
    currentImageIndex,
    setCurrentImageIndex,
    hasMultipleImages,
  };
}
