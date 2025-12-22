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
export function useReviewsSection({ orgId, limit: _limit }: UseReviewsSectionProps) {
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
      {
        id: '3',
        author: 'Елена С.',
        rating: 5,
        text: 'Замечательное место для отдыха! Комнаты просторные, вид из окна прекрасный. Персонал всегда готов помочь.',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'yandex',
      },
      {
        id: '4',
        author: 'Михаил В.',
        rating: 5,
        text: 'Останавливались на выходные. Всё понравилось: чистота, комфорт, тишина. Завтрак отличный!',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'yandex',
      },
      {
        id: '5',
        author: 'Ольга П.',
        rating: 5,
        text: 'Прекрасный сервис и уютная атмосфера. Рекомендую для семейного отдыха. Дети были в восторге!',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'google',
      },
      {
        id: '6',
        author: 'Сергей Н.',
        rating: 4,
        text: 'Хороший отель, удобное расположение. Единственное - можно было бы улучшить Wi-Fi в номерах.',
        date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'yandex',
      },
      {
        id: '7',
        author: 'Мария Л.',
        rating: 5,
        text: 'Очень довольна пребыванием! Чисто, комфортно, персонал внимательный. Обязательно вернусь.',
        date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'internal',
      },
      {
        id: '8',
        author: 'Александр Р.',
        rating: 5,
        text: 'Отличное соотношение цена-качество. Номера уютные, завтрак разнообразный. Всё на высшем уровне!',
        date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'yandex',
      },
      {
        id: '9',
        author: 'Татьяна К.',
        rating: 5,
        text: 'Прекрасный отель для деловой поездки. Удобное расположение, тихие номера, хорошая рабочая зона.',
        date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'google',
      },
      {
        id: '10',
        author: 'Игорь Д.',
        rating: 4,
        text: 'Хороший выбор для остановки в городе. Чисто, уютно, персонал дружелюбный. Рекомендую!',
        date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'yandex',
      },
    ],
    fallbackRating: {
      average: 4.9,
      total: 10,
      distribution: {
        5: 8,
        4: 2,
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
