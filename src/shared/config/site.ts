/**
 * Site configuration constants
 */

export const siteConfig = {
  name: 'Cameo Hotel',
  description: 'Отель Cameo - комфортабельные номера в центре города',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  contact: {
    email: process.env.CONTACT_EMAIL || 'contact@cameohotel.ru',
    phone: '+7 (495) 123-45-67',
    address: 'Москва, ул. Примерная, д. 1',
  },
  social: {
    // Add social media links
  },
} as const;
