import Link from 'next/link';
import { pathKeys } from '@shared/router';
import { siteConfig } from '@shared/config';
import { Logo } from '@shared/ui/logo';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg">
        <nav className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="flex h-14 items-center justify-between md:h-16 lg:h-20">
            <Logo />
            <div className="flex gap-3 md:gap-4 lg:gap-6 xl:gap-8">
              <Link
                href={pathKeys.properties}
                className="text-sm transition-colors hover:text-primary md:text-base"
              >
                Объекты
              </Link>
              <Link
                href={pathKeys.offers}
                className="text-sm transition-colors hover:text-primary md:text-base"
              >
                Акции
              </Link>
              <Link
                href={pathKeys.about}
                className="text-sm transition-colors hover:text-primary md:text-base"
              >
                О нас
              </Link>
              <Link
                href={pathKeys.contacts}
                className="text-sm transition-colors hover:text-primary md:text-base"
              >
                Контакты
              </Link>
            </div>
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
                <p className="text-xs text-text-light md:text-sm lg:text-base">
                  {siteConfig.contact.address}
                </p>
                <p className="text-xs text-text-light md:text-sm lg:text-base">
                  {siteConfig.contact.phone}
                </p>
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
