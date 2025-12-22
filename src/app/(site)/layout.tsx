import Link from 'next/link';
import { pathKeys } from '@shared/router';
import { siteConfig } from '@shared/config';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg">
        <nav className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href={pathKeys.home} className="text-xl font-bold">
              {siteConfig.name}
            </Link>
            <div className="flex gap-6">
              <Link href={pathKeys.properties} className="hover:text-primary">
                Объекты
              </Link>
              <Link href={pathKeys.offers} className="hover:text-primary">
                Акции
              </Link>
              <Link href={pathKeys.about} className="hover:text-primary">
                О нас
              </Link>
              <Link href={pathKeys.contacts} className="hover:text-primary">
                Контакты
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="mt-auto border-t border-border bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 font-semibold">{siteConfig.name}</h3>
              <p className="text-sm text-text-light">{siteConfig.description}</p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Контакты</h3>
              <p className="text-sm text-text-light">{siteConfig.contact.address}</p>
              <p className="text-sm text-text-light">{siteConfig.contact.phone}</p>
              <p className="text-sm text-text-light">{siteConfig.contact.email}</p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Навигация</h3>
              <div className="flex flex-col gap-2 text-sm">
                <Link href={pathKeys.properties} className="text-text-light hover:text-primary">
                  Объекты
                </Link>
                <Link href={pathKeys.offers} className="text-text-light hover:text-primary">
                  Акции
                </Link>
                <Link href={pathKeys.about} className="text-text-light hover:text-primary">
                  О нас
                </Link>
                <Link href={pathKeys.contacts} className="text-text-light hover:text-primary">
                  Контакты
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-text-light">
            © {new Date().getFullYear()} {siteConfig.name}. Все права защищены.
          </div>
        </div>
      </footer>
    </>
  );
}
