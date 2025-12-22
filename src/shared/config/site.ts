/**
 * Site configuration constants
 */

export const siteConfig = {
  name: 'Отель Камея',
  description: 'Отель Камея - комфортабельные номера в центре города',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  contact: {
    email: process.env.CONTACT_EMAIL || 'contact@cameohotel.ru',
    phones: ['+7 (812) 328 15 15', '+7 (909) 591-97-25'],
    addresses: {
      apartments: [
        {
          address: 'Санкт-Петербург, Каменноостровский пр. 40А',
          mapUrl: 'https://yandex.ru/maps/-/CLDLmIkl',
          coordinates: { lat: 59.965808, lng: 30.30917 },
        },
        {
          address: 'Санкт-Петербург, Миллионная ул, дом 17',
          mapUrl: 'https://yandex.ru/maps/-/CLDLmJj6',
          coordinates: { lat: 59.943755, lng: 30.323773 },
        },
      ],
      hotel: [
        {
          address: 'Санкт-Петербург, Набережная реки Фонтанки, д. 90, кор. 6',
          mapUrl: 'https://yandex.ru/maps/-/CLDLm6J5',
          coordinates: { lat: 59.924632, lng: 30.330483 },
        },
      ],
    },
  },
  social: {
    instagram: 'https://instagram.com/cameohotel',
    telegram: 'https://t.me/cameohotel',
  },
} as const;
