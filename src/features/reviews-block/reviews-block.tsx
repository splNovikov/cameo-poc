'use client';

import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { type Review, type RatingStats } from '@entities/review';
import { Card, CardContent } from '@shared/ui/card';
import { yandexClient } from '@shared/lib/api';
import { formatRelativeTime } from '@shared/lib/utils/format';

interface ReviewsBlockProps {
  orgId: string;
  limit?: number;
}

export function ReviewsBlock({ orgId, limit = 5 }: ReviewsBlockProps) {
  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ['reviews', orgId, limit],
    queryFn: async () => {
      const response = await yandexClient.getReviews({ orgId, limit });
      return response.reviews || [];
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const { data: ratingStats } = useQuery<RatingStats>({
    queryKey: ['rating', orgId],
    queryFn: async () => {
      const response = await yandexClient.getRating(orgId);
      return response;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  if (isLoading) {
    return <div className="text-center">Загрузка отзывов...</div>;
  }

  if (!reviews || reviews.length === 0) {
    return <div className="text-center text-text-light">Отзывов пока нет</div>;
  }

  return (
    <div className="space-y-4">
      {ratingStats && (
        <div className="flex items-center gap-4 rounded-lg border border-border bg-bg-secondary p-4">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 fill-accent text-accent" />
            <span className="text-2xl font-bold">{ratingStats.average.toFixed(1)}</span>
          </div>
          <div className="text-sm text-text-light">
            {ratingStats.total} {ratingStats.total === 1 ? 'отзыв' : 'отзывов'}
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="font-semibold">{review.author}</div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? 'fill-accent text-accent' : 'text-border'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mb-2 text-sm text-text-light">{review.text}</p>
              <div className="text-xs text-text-light">{formatRelativeTime(review.date)}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
