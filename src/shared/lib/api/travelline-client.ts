import { createAxiosInstance } from './axios-instance';
import { integrationsConfig } from '@shared/config';

const travellineApi = createAxiosInstance(integrationsConfig.travelline.apiUrl);

/**
 * Travelline API client
 */
export const travellineClient = {
  /**
   * Search for available rooms
   */
  async searchRooms(params: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children?: number;
    rooms?: number;
  }) {
    const response = await travellineApi.get('/search', {
      params: {
        ...params,
        apiKey: integrationsConfig.travelline.apiKey,
      },
    });
    return response.data;
  },

  /**
   * Check room availability
   */
  async checkAvailability(params: { checkIn: string; checkOut: string; roomId?: string }) {
    const response = await travellineApi.get('/availability', {
      params: {
        ...params,
        apiKey: integrationsConfig.travelline.apiKey,
      },
    });
    return response.data;
  },

  /**
   * Get room prices
   */
  async getPrices(params: { checkIn: string; checkOut: string; roomId?: string }) {
    const response = await travellineApi.get('/prices', {
      params: {
        ...params,
        apiKey: integrationsConfig.travelline.apiKey,
      },
    });
    return response.data;
  },
};
