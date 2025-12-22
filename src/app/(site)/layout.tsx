import Link from 'next/link';
import { Phone, MapPin, Instagram, Send } from 'lucide-react';
import { pathKeys } from '@shared/router';
import { siteConfig, NAVIGATION_ITEMS } from '@shared/config';
import { Logo } from '@shared/ui/logo';
import { MobileNavigation } from '@widgets/mobile-navigation';

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
                <a
                  href={siteConfig.contact.addresses.hotel[0].mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-text-light transition-colors hover:text-primary"
                >
                  <MapPin className="h-3.5 w-3.5 lg:h-4 lg:w-4 shrink-0" />
                  <span className="text-xs lg:text-sm">
                    {siteConfig.contact.addresses.hotel[0].address}
                  </span>
                </a>
                <div className="flex items-center gap-3 lg:gap-4">
                  {siteConfig.contact.phones.map((phone, index) => (
                    <a
                      key={index}
                      href={`tel:${phone.replace(/\s/g, '').replace(/[()]/g, '')}`}
                      className="flex items-center gap-1.5 text-text-light transition-colors hover:text-primary"
                    >
                      <Phone className="h-3.5 w-3.5 lg:h-4 lg:w-4 shrink-0" />
                      <span className="text-xs lg:text-sm">{phone}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Networks */}
              <div className="flex items-center gap-3 lg:gap-4">
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
              <p className="text-xs text-text-light md:text-sm lg:text-base">
                {siteConfig.description}
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold md:mb-4 md:text-base lg:mb-6 lg:text-lg">
                Контакты
              </h3>
              <div className="space-y-2 md:space-y-3">
                <div className="text-xs text-text-light md:text-sm lg:text-base">
                  <p className="font-medium mb-1">Отель:</p>
                  <a
                    href={siteConfig.contact.addresses.hotel[0].mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                  >
                    {siteConfig.contact.addresses.hotel[0].address}
                  </a>
                </div>
                <div className="text-xs text-text-light md:text-sm lg:text-base">
                  <p className="font-medium mb-1">Апартаменты:</p>
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
                <div className="text-xs text-text-light md:text-sm lg:text-base">
                  <p className="font-medium mb-1">Телефоны:</p>
                  {siteConfig.contact.phones.map((phone, index) => (
                    <a
                      key={index}
                      href={`tel:${phone.replace(/\s/g, '').replace(/[()]/g, '')}`}
                      className="block transition-colors hover:text-primary"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
                <p className="text-xs text-text-light md:text-sm lg:text-base">
                  {siteConfig.contact.email}
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold md:mb-4 md:text-base lg:mb-6 lg:text-lg">
                Навигация
              </h3>
              <div className="flex flex-col gap-2 text-xs md:gap-3 md:text-sm lg:text-base">
                <Link
                  href={pathKeys.properties}
                  className="text-text-light transition-colors hover:text-primary"
                >
                  Объекты
                </Link>
                <Link
                  href={pathKeys.offers}
                  className="text-text-light transition-colors hover:text-primary"
                >
                  Акции
                </Link>
                <Link
                  href={pathKeys.about}
                  className="text-text-light transition-colors hover:text-primary"
                >
                  О нас
                </Link>
                <Link
                  href={pathKeys.contacts}
                  className="text-text-light transition-colors hover:text-primary"
                >
                  Контакты
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-6 border-t border-border pt-6 text-center text-xs text-text-light md:mt-8 md:pt-8 md:text-sm lg:mt-12 lg:pt-12 lg:text-base xl:mt-16">
            © {new Date().getFullYear()} {siteConfig.name}. Все права защищены.
          </div>
        </div>
      </footer>
    </>
  );
}
