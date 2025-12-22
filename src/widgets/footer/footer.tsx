'use client';

import Link from 'next/link';
import { Instagram, Send } from 'lucide-react';
import { NAVIGATION_ITEMS } from '@shared/config';
import { Logo } from '@shared/ui/logo';
import { SocialLink } from '@shared/ui/social-link';
import { formatPhoneForTel } from '@shared/lib/utils/format';
import { useFooter } from './use-footer';

/**
 * Footer Widget
 * Site footer with contact info, navigation, and social links
 * Follows FSD architecture - complex UI component in widgets layer
 */
export function Footer() {
  const { copyrightYear, siteName, description, contact, social } = useFooter();

  return (
    <footer className="mt-auto border-t border-border bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-12 xl:px-12 xl:py-16">
        <div className="grid gap-6 md:grid-cols-3 md:gap-8 lg:gap-12 xl:gap-16">
          {/* Brand Section */}
          <div>
            <div className="mb-3 md:mb-4 lg:mb-6">
              <Logo linkToHome={true} height="h-8" showText={false} />
            </div>
            <p className="mb-3 text-xs text-text-light md:mb-4 lg:mb-6 lg:text-sm">{description}</p>
            <div className="flex items-center gap-2 md:gap-3">
              <SocialLink
                href={social.instagram}
                icon={<Instagram className="h-3.5 w-3.5 md:h-4 md:w-4" />}
                ariaLabel="Instagram"
              />
              {social.telegram && (
                <SocialLink
                  href={social.telegram}
                  icon={<Send className="h-3.5 w-3.5 md:h-4 md:w-4" />}
                  ariaLabel="Telegram"
                />
              )}
            </div>
          </div>

          {/* Contacts Section */}
          <div>
            <h3 className="mb-3 text-xs font-semibold md:mb-4 md:text-sm lg:mb-6 lg:text-base">
              Контакты
            </h3>
            <div className="space-y-2 md:space-y-3">
              <div className="text-xs text-text-light lg:text-sm">
                <p className="mb-1 font-medium">Отель:</p>
                <a
                  href={contact.addresses.hotel[0].mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  {contact.addresses.hotel[0].address}
                </a>
              </div>
              <div className="text-xs text-text-light lg:text-sm">
                <p className="mb-1 font-medium">Апартаменты:</p>
                {contact.addresses.apartments.map((location) => (
                  <a
                    key={location.mapUrl}
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-colors hover:text-primary"
                  >
                    {location.address}
                  </a>
                ))}
              </div>
              <div className="text-xs text-text-light lg:text-sm">
                <p className="mb-1 font-medium">Телефоны:</p>
                {contact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${formatPhoneForTel(phone)}`}
                    className="block transition-colors hover:text-primary"
                  >
                    {phone}
                  </a>
                ))}
              </div>
              <a
                href={`mailto:${contact.email}`}
                className="block text-xs text-text-light transition-colors hover:text-primary lg:text-sm"
              >
                {contact.email}
              </a>
            </div>
          </div>

          {/* Navigation Section */}
          <div>
            <h3 className="mb-3 text-xs font-semibold md:mb-4 md:text-sm lg:mb-6 lg:text-base">
              Навигация
            </h3>
            <div className="flex flex-col gap-2 text-xs md:gap-3 lg:text-sm">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-text-light transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-border pt-6 text-center text-xs text-text-light md:mt-8 md:pt-8 lg:mt-12 lg:pt-12 lg:text-sm xl:mt-16">
          © {copyrightYear} {siteName}. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
