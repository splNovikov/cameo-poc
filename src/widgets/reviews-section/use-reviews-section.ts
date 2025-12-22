import { type Review, type RatingStats } from '@entities/review';

interface UseReviewsSectionProps {
  orgId?: string;
  limit?: number;
}

interface ReviewsConfig {
  fallbackReviews: Review[];
  fallbackRating: RatingStats;
}

/**
 * Hook for Reviews Section business logic
 * Manages reviews configuration and fallback data
 */
export function useReviewsSection({ orgId, limit }: UseReviewsSectionProps) {
  // Default organization ID from environment or config
  const defaultOrgId = orgId || process.env.NEXT_PUBLIC_YANDEX_ORG_ID;

  // Fallback reviews for when API is unavailable
  const reviewsConfig: ReviewsConfig = {
    fallbackReviews: [
      {
        id: '1',
        author: 'Анна М.',
        rating: 5,
        text: 'Отличный отель! Очень чисто, уютно, персонал вежливый. Расположение удобное, рядом с метро. Обязательно вернемся!',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'internal',
      },
      {
        id: '2',
        author: 'Дмитрий К.',
        rating: 5,
        text: 'Прекрасные апартаменты, все необходимое есть. Удобная кухня, стиральная машина. Рекомендую для длительного проживания.',
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'internal',
      },
    ],
    fallbackRating: {
      average: 4.8,
      total: 2,
      distribution: {
        5: 2,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      },
    },
  };

  return {
    defaultOrgId,
    reviewsConfig,
  };
}
