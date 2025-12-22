import { Card, CardContent, CardHeader, CardTitle } from '@shared/ui/card';
import { Button } from '@shared/ui/button';

export default function OffersPage() {
  const offers = [
    {
      id: '1',
      title: 'Специальное предложение для выходных',
      description: 'Скидка 20% на бронирование на выходные дни',
      validUntil: '2024-12-31',
    },
    {
      id: '2',
      title: 'Длительное проживание',
      description: 'Скидка 15% при бронировании от 7 дней',
      validUntil: '2024-12-31',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Акции и спецпредложения</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <Card key={offer.id}>
            <CardHeader>
              <CardTitle>{offer.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-text-light">{offer.description}</p>
              <p className="mb-4 text-sm text-text-light">
                Действует до: {new Date(offer.validUntil).toLocaleDateString('ru-RU')}
              </p>
              <Button variant="outline" fullWidth>
                Узнать больше
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
