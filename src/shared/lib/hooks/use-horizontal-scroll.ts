import { useState, useRef, useEffect, useCallback } from 'react';

export interface UseHorizontalScrollOptions {
  /**
   * Data attribute selector for items (e.g., '[data-review-card]')
   */
  itemSelector: string;
  /**
   * Gap between items in pixels
   */
  gap?: number;
  /**
   * Total number of items (for calculating scroll index)
   */
  itemCount?: number;
}

export interface UseHorizontalScrollReturn {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  scrollWrapperRef: React.RefObject<HTMLDivElement>;
  showRightGradient: boolean;
  currentScrollIndex: number;
  scrollRight: () => void;
  scrollToIndex: (index: number) => void;
}

/**
 * Hook for horizontal scroll functionality
 * Manages scroll state, gradients, and navigation
 * Mobile-first responsive design
 */
export function useHorizontalScroll({
  itemSelector,
  gap = 16,
  itemCount,
}: UseHorizontalScrollOptions): UseHorizontalScrollReturn {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [showRightGradient, setShowRightGradient] = useState(true);
  const [currentScrollIndex, setCurrentScrollIndex] = useState(0);

  const scrollRight = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const firstItem = container.querySelector(itemSelector) as HTMLElement;
    if (!firstItem) return;

    const itemWidth = firstItem.offsetWidth;
    const scrollAmount = itemWidth + gap;

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }, [itemSelector, gap]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const firstItem = container.querySelector(itemSelector) as HTMLElement;
      if (!firstItem) return;

      const itemWidth = firstItem.offsetWidth;
      container.scrollTo({
        left: index * (itemWidth + gap),
        behavior: 'smooth',
      });
    },
    [itemSelector, gap]
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const isAtStart = scrollLeft === 0;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;

      if (scrollWrapperRef.current) {
        scrollWrapperRef.current.classList.toggle('scrolledStart', isAtStart);
        scrollWrapperRef.current.classList.toggle('scrolledEnd', isAtEnd);
      }
      setShowRightGradient(!isAtEnd);

      // Calculate current scroll index
      const firstItem = container.querySelector(itemSelector) as HTMLElement;
      if (firstItem && itemCount !== undefined) {
        const itemWidth = firstItem.offsetWidth;
        const scrollIndex = Math.round(scrollLeft / (itemWidth + gap));
        setCurrentScrollIndex(Math.min(scrollIndex, itemCount - 1));
      }
    };

    checkScroll();
    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [itemSelector, gap, itemCount]);

  return {
    scrollContainerRef,
    scrollWrapperRef,
    showRightGradient,
    currentScrollIndex,
    scrollRight,
    scrollToIndex,
  };
}
