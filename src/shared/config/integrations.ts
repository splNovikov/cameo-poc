/**
 * Integration configuration
 */

export const integrationsConfig = {
  travelline: {
    widgetId: process.env.NEXT_PUBLIC_TRAVELLINE_WIDGET_ID || '',
    apiKey: process.env.TRAVELLINE_API_KEY || '',
    apiUrl: 'https://api.travelline.ru',
  },
  yandex: {
    apiKey: process.env.NEXT_PUBLIC_YANDEX_API_KEY || '',
    mapApiKey: process.env.NEXT_PUBLIC_YANDEX_MAP_API_KEY || '',
    reviewsApiUrl: 'https://api.yandex.ru',
  },
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
  },
} as const;
