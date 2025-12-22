import Link from 'next/link';
import { Phone, MapPin, Instagram, Send } from 'lucide-react';
import { siteConfig, NAVIGATION_ITEMS } from '@shared/config';
import { Logo } from '@shared/ui/logo';
import { MobileNavigation } from '@widgets/mobile-navigation';
import { Button } from '@shared/ui/button';
import { ContactLink } from '@shared/ui/contact-link';
import { SocialLink } from '@shared/ui/social-link';

/**
 * Header Widget
 * Main site header with navigation, contact info, and social links
 * Follows FSD architecture - complex UI component in widgets layer
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg">
      {/* Level 1: Contact Info & Social */}
      <div className="hidden border-b border-border bg-bg-secondary md:block">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="flex h-10 items-center justify-between text-xs lg:h-12 lg:text-sm">
            {/* Contact Info */}
            <div className="flex items-center gap-4 lg:gap-6">
              <ContactLink
                value={siteConfig.contact.addresses.hotel[0].address}
                icon={<MapPin className="h-3.5 w-3.5 shrink-0 lg:h-4 lg:w-4" />}
                type="address"
                mapUrl={siteConfig.contact.addresses.hotel[0].mapUrl}
              />
              <div className="flex items-center gap-3 lg:gap-4">
                {siteConfig.contact.phones.map((phone) => (
                  <ContactLink
                    key={phone}
                    value={phone}
                    icon={<Phone className="h-3.5 w-3.5 shrink-0 lg:h-4 lg:w-4" />}
                    type="phone"
                  />
                ))}
              </div>
            </div>

            {/* CTA Button & Social Networks */}
            <div className="flex items-center gap-3 lg:gap-4">
              <Link href="#booking">
                <Button size="sm" className="h-6 px-2 text-xs leading-tight md:h-7 md:px-3">
                  Забронировать
                </Button>
              </Link>
              <SocialLink
                href={siteConfig.social.instagram}
                icon={<Instagram className="h-4 w-4" />}
                ariaLabel="Instagram"
              />
              {siteConfig.social.telegram && (
                <SocialLink
                  href={siteConfig.social.telegram}
                  icon={<Send className="h-4 w-4" />}
                  ariaLabel="Telegram"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Level 2: Logo & Navigation */}
      <nav className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="flex h-14 items-center justify-between md:h-16 lg:h-20">
          <Logo />
          {/* Desktop Navigation */}
          <div className="hidden gap-2 md:flex md:gap-3 lg:gap-4">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex h-14 items-center whitespace-nowrap text-xs transition-colors hover:text-primary md:h-16 md:text-sm lg:h-20 lg:text-base"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
          {/* Mobile Navigation */}
          <MobileNavigation />
        </div>
      </nav>
    </header>
  );
}
