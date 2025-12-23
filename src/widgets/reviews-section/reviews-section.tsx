'use client';

import { useQuery } from '@tanstack/react-query';
import { Star, ExternalLink } from 'lucide-react';
import { type Review, type RatingStats } from '@entities/review';
import { yandexClient } from '@shared/lib/api';
import { formatRelativeTime } from '@shared/lib/utils/format';
import { useHorizontalScroll } from '@shared/lib/hooks';
import { ScrollDots } from '@shared/ui/scroll-dots';
import { ScrollHintButton } from '@shared/ui/scroll-hint-button';
import { useReviewsSection } from './use-reviews-section';
import { Card, CardContent } from '@shared/ui/card';
import styles from './reviews-section.module.css';

interface ReviewsSectionProps {
  orgId?: string;
  limit?: number;
}

/**
 * Reviews Section Widget
 * Enhanced reviews block with custom styling and multiple sources support
 * Mobile-first responsive design
 */
export function ReviewsSection({ orgId, limit = 12 }: ReviewsSectionProps) {
  const { defaultOrgId, reviewsConfig } = useReviewsSection({ orgId, limit });

  const { data: reviews, isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: ['reviews', defaultOrgId, limit],
    queryFn: async () => {
      if (!defaultOrgId) {
        return reviewsConfig.fallbackReviews;
      }
      try {
        const response = await yandexClient.getReviews({ orgId: defaultOrgId, limit });
        return response.reviews || reviewsConfig.fallbackReviews;
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
        return reviewsConfig.fallbackReviews;
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  });

  const { data: ratingStats, isLoading: ratingLoading } = useQuery<RatingStats>({
    queryKey: ['rating', defaultOrgId],
    queryFn: async () => {
      if (!defaultOrgId) {
        return reviewsConfig.fallbackRating;
      }
      try {
        const response = await yandexClient.getRating(defaultOrgId);
        return response;
      } catch (error) {
        console.error('Failed to fetch rating:', error);
        return reviewsConfig.fallbackRating;
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  });

  const isLoading = reviewsLoading || ratingLoading;

  const {
    scrollContainerRef,
    scrollWrapperRef,
    showRightGradient,
    currentScrollIndex,
    scrollRight,
    scrollToIndex,
  } = useHorizontalScroll({
    itemSelector: '[data-review-card]',
    gap: 16,
    itemCount: reviews?.length,
  });

  return (
    <section className={`${styles.section} sectionBand`} id="reviews">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className="sectionHeader">
            <div className="sectionLabel">Впечатления гостей</div>
          </div>
          {ratingStats && (
            <div className={styles.ratingSummary}>
              <div className={styles.ratingValue}>
                <Star className={styles.ratingStar} />
                <span className={styles.ratingNumber}>{ratingStats.average.toFixed(1)}</span>
              </div>
              <div className={styles.ratingDetails}>
                <span className={styles.ratingCount}>
                  {ratingStats.total} {ratingStats.total === 1 ? 'отзыв' : 'отзывов'}
                </span>
                {defaultOrgId && (
                  <a
                    href={`https://yandex.ru/maps/org/${defaultOrgId}/reviews`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.externalLink}
                  >
                    Все отзывы на Яндекс
                    <ExternalLink className={styles.externalIcon} />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className={styles.loading}>Загрузка отзывов...</div>
        ) : !reviews || reviews.length === 0 ? (
          <div className={styles.empty}>Отзывов пока нет</div>
        ) : (
          <div className={styles.scrollWrapper} ref={scrollWrapperRef}>
            <div className={styles.scrollContainer} ref={scrollContainerRef}>
              <div className={styles.reviewsGrid}>
                {reviews.map((review) => (
                  <Card key={review.id} className={styles.reviewCard} data-review-card>
                    <CardContent className={styles.reviewContent}>
                      <div className={styles.reviewHeader}>
                        <div className={styles.reviewAuthor}>
                          <div className={styles.authorAvatar}>
                            {review.author.charAt(0).toUpperCase()}
                          </div>
                          <div className={styles.authorInfo}>
                            <div className={styles.authorName}>{review.author}</div>
                            {review.source && (
                              <div className={styles.reviewSource}>
                                {review.source === 'yandex' && 'Яндекс'}
                                {review.source === 'google' && 'Google'}
                                {review.source === 'internal' && 'Сайт'}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.reviewRating}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`${styles.star} ${
                                i < review.rating ? styles.starFilled : styles.starEmpty
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className={styles.reviewText}>{review.text}</p>
                      <div className={styles.reviewFooter}>
                        <span className={styles.reviewDate}>{formatRelativeTime(review.date)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            {showRightGradient && <ScrollHintButton onClick={scrollRight} />}
            {reviews && reviews.length > 0 && (
              <ScrollDots
                count={reviews.length}
                currentIndex={currentScrollIndex}
                onDotClick={scrollToIndex}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
