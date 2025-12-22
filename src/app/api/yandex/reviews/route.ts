import { NextRequest, NextResponse } from 'next/server';
import { yandexClient } from '@shared/lib/api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orgId = searchParams.get('orgId');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    if (!orgId) {
      return NextResponse.json({ error: 'Missing required parameter: orgId' }, { status: 400 });
    }

    const result = await yandexClient.getReviews({
      orgId,
      limit: limit ? parseInt(limit, 10) : undefined,
      offset: offset ? parseInt(offset, 10) : undefined,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Yandex reviews error:', error);
    return NextResponse.json({ error: error.message || 'Failed to get reviews' }, { status: 500 });
  }
}
