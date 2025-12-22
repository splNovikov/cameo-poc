'use client';

import { Phone, Mail, MapPin, Instagram, Send } from 'lucide-react';
import { YandexMapComponent } from '@widgets/yandex-map-component';
import { siteConfig } from '@shared/config';
import { formatPhoneForTel } from '@shared/lib/utils/format';
import { useContactsSection } from './use-contacts-section';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/ui/card';
import styles from './contacts-section.module.css';

interface ContactsSectionProps {
  className?: string;
}

/**
 * Contacts Section Widget
 * Displays contact information and map
 * Mobile-first responsive design
 */
export function ContactsSection({ className }: ContactsSectionProps) {
  const { properties, contactInfo } = useContactsSection();

  return (
    <section className={styles.section} id="contacts">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Контакты</h2>
          <p className={styles.subtitle}>Свяжитесь с нами любым удобным способом</p>
        </div>

        <div className={styles.content}>
          <div className={styles.infoGrid}>
            <Card className={styles.contactCard}>
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className={styles.contactContent}>
                <div className={styles.contactItem}>
                  <Phone className={styles.contactIcon} />
                  <div className={styles.contactDetails}>
                    <h3 className={styles.contactLabel}>Телефоны</h3>
                    {contactInfo.phones.map((phone, index) => (
                      <a
                        key={index}
                        href={`tel:${formatPhoneForTel(phone)}`}
                        className={styles.contactLink}
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <Mail className={styles.contactIcon} />
                  <div className={styles.contactDetails}>
                    <h3 className={styles.contactLabel}>Email</h3>
                    <a href={`mailto:${contactInfo.email}`} className={styles.contactLink}>
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <MapPin className={styles.contactIcon} />
                  <div className={styles.contactDetails}>
                    <h3 className={styles.contactLabel}>Адреса</h3>
                    <div className={styles.addresses}>
                      <div className={styles.addressGroup}>
                        <span className={styles.addressType}>Отель:</span>
                        {contactInfo.addresses.hotel.map((address, index) => (
                          <a
                            key={index}
                            href={address.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.addressLink}
                          >
                            {address.address}
                          </a>
                        ))}
                      </div>
                      <div className={styles.addressGroup}>
                        <span className={styles.addressType}>Апартаменты:</span>
                        {contactInfo.addresses.apartments.map((address, index) => (
                          <a
                            key={index}
                            href={address.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.addressLink}
                          >
                            {address.address}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.socialLinks}>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label="Instagram"
                  >
                    <Instagram className={styles.socialIcon} />
                    <span>Instagram</span>
                  </a>
                  {siteConfig.social.telegram && (
                    <a
                      href={siteConfig.social.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label="Telegram"
                    >
                      <Send className={styles.socialIcon} />
                      <span>Telegram</span>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className={styles.mapWrapper}>
            <YandexMapComponent
              properties={properties}
              center={contactInfo.addresses.hotel[0]?.coordinates}
              zoom={13}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
