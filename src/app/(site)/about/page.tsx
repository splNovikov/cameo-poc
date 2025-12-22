import { Card, CardContent, CardHeader, CardTitle } from '@shared/ui/card';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">О нас</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>О Cameo Hotel</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-text-light">
              Cameo Hotel — это современный отель, расположенный в самом сердце города. Мы
              предлагаем комфортабельные номера и отличный сервис для наших гостей.
            </p>
            <p className="text-text-light">
              Наша команда стремится создать незабываемый опыт для каждого гостя, обеспечивая
              высокий уровень комфорта и гостеприимства.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Наши преимущества</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-6 text-text-light">
              <li>Удобное расположение в центре города</li>
              <li>Современные номера с всеми удобствами</li>
              <li>Профессиональный и дружелюбный персонал</li>
              <li>Высокий уровень сервиса</li>
              <li>Доступные цены</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
