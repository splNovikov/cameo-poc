import { NextRequest, NextResponse } from 'next/server';
import { yandexClient } from '@shared/lib/api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orgId = searchParams.get('orgId');

    if (!orgId) {
      return NextResponse.json({ error: 'Missing required parameter: orgId' }, { status: 400 });
    }

    const result = await yandexClient.getRating(orgId);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Yandex rating error:', error);
    return NextResponse.json({ error: error.message || 'Failed to get rating' }, { status: 500 });
  }
}
