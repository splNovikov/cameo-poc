import { createAxiosInstance } from './axios-instance';
import { integrationsConfig } from '@shared/config';

const yandexApi = createAxiosInstance(integrationsConfig.yandex.reviewsApiUrl);

/**
 * Yandex Reviews API client
 */
export const yandexClient = {
  /**
   * Get reviews for a location
   */
  async getReviews(params: { orgId: string; limit?: number; offset?: number }) {
    // Note: This is a placeholder implementation
    // Actual Yandex API endpoints may differ
    const response = await yandexApi.get('/reviews', {
      params: {
        ...params,
        apiKey: integrationsConfig.yandex.apiKey,
      },
    });
    return response.data;
  },

  /**
   * Get rating and statistics
   */
  async getRating(orgId: string) {
    const response = await yandexApi.get(`/rating/${orgId}`, {
      params: {
        apiKey: integrationsConfig.yandex.apiKey,
      },
    });
    return response.data;
  },
};
