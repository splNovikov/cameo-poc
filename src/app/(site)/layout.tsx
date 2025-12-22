import Link from 'next/link';
import { Phone, MapPin, Instagram, Send } from 'lucide-react';
import { siteConfig, NAVIGATION_ITEMS } from '@shared/config';
import { Logo } from '@shared/ui/logo';
import { MobileNavigation } from '@widgets/mobile-navigation';
import { Button } from '@shared/ui/button';
import { ContactLink } from '@shared/ui/contact-link';
import { formatPhoneForTel } from '@shared/lib/utils/format';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
                  {siteConfig.contact.phones.map((phone, index) => (
                    <ContactLink
                      key={index}
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
                  <Button
                    size="sm"
                    className="h-6 px-2 text-[10px] leading-tight md:h-7 md:px-3 md:text-xs"
                  >
                    Забронировать
                  </Button>
                </Link>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-light transition-colors hover:text-primary"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                {siteConfig.social.telegram && (
                  <a
                    href={siteConfig.social.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-light transition-colors hover:text-primary"
                    aria-label="Telegram"
                  >
                    <Send className="h-4 w-4" />
                  </a>
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
      <main>{children}</main>
      <footer className="mt-auto border-t border-border bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-12 xl:px-12 xl:py-16">
          <div className="grid gap-6 md:grid-cols-3 md:gap-8 lg:gap-12 xl:gap-16">
            <div>
              <div className="mb-3 md:mb-4 lg:mb-6">
                <Logo linkToHome={true} height="h-8" showText={false} />
              </div>
              <p className="mb-3 text-[10px] text-text-light md:mb-4 md:text-xs lg:mb-6 lg:text-sm">
                {siteConfig.description}
              </p>
              <div className="flex items-center gap-2 md:gap-3">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-light transition-colors hover:text-primary"
                  aria-label="Instagram"
                >
                  <Instagram className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </a>
                {siteConfig.social.telegram && (
                  <a
                    href={siteConfig.social.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-light transition-colors hover:text-primary"
                    aria-label="Telegram"
                  >
                    <Send className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </a>
                )}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-xs font-semibold md:mb-4 md:text-sm lg:mb-6 lg:text-base">
                Контакты
              </h3>
              <div className="space-y-2 md:space-y-3">
                <div className="text-[10px] text-text-light md:text-xs lg:text-sm">
                  <p className="mb-1 font-medium">Отель:</p>
                  <a
                    href={siteConfig.contact.addresses.hotel[0].mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                  >
                    {siteConfig.contact.addresses.hotel[0].address}
                  </a>
                </div>
                <div className="text-[10px] text-text-light md:text-xs lg:text-sm">
                  <p className="mb-1 font-medium">Апартаменты:</p>
                  {siteConfig.contact.addresses.apartments.map((location, index) => (
                    <a
                      key={index}
                      href={location.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block transition-colors hover:text-primary"
                    >
                      {location.address}
                    </a>
                  ))}
                </div>
                <div className="text-[10px] text-text-light md:text-xs lg:text-sm">
                  <p className="mb-1 font-medium">Телефоны:</p>
                  {siteConfig.contact.phones.map((phone, index) => (
                    <a
                      key={index}
                      href={`tel:${formatPhoneForTel(phone)}`}
                      className="block transition-colors hover:text-primary"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
                <p className="text-[10px] text-text-light md:text-xs lg:text-sm">
                  {siteConfig.contact.email}
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-xs font-semibold md:mb-4 md:text-sm lg:mb-6 lg:text-base">
                Навигация
              </h3>
              <div className="flex flex-col gap-2 text-[10px] md:gap-3 md:text-xs lg:text-sm">
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
          <div className="mt-6 border-t border-border pt-6 text-center text-[10px] text-text-light md:mt-8 md:pt-8 md:text-xs lg:mt-12 lg:pt-12 lg:text-sm xl:mt-16">
            © {new Date().getFullYear()} {siteConfig.name}. Все права защищены.
          </div>
        </div>
      </footer>
    </>
  );
}
