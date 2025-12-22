import { type Property } from '@entities/property';
import { siteConfig } from '@shared/config';

/**
 * Hook for Contacts Section business logic
 * Prepares contact information and properties for map
 */
export function useContactsSection() {
  // Prepare properties for map display
  const properties: Property[] = [
    ...siteConfig.contact.addresses.hotel.map((addr, index) => ({
      id: `hotel-${index}`,
      slug: 'cameo-hotel',
      name: 'Отель Камея',
      type: 'hotel' as const,
      description: '',
      shortDescription: '',
      address: addr.address,
      images: [],
      coordinates: addr.coordinates,
    })),
    ...siteConfig.contact.addresses.apartments.map((addr, index) => ({
      id: `apartments-${index}`,
      slug: 'cameo-apartments',
      name: 'Апартаменты Камея',
      type: 'apartments' as const,
      description: '',
      shortDescription: '',
      address: addr.address,
      images: [],
      coordinates: addr.coordinates,
    })),
  ];

  const contactInfo = {
    phones: siteConfig.contact.phones,
    email: siteConfig.contact.email,
    addresses: siteConfig.contact.addresses,
  };

  return {
    properties,
    contactInfo,
  };
}
