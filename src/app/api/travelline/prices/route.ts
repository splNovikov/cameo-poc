import { NextRequest, NextResponse } from 'next/server';
import { travellineClient } from '@shared/lib/api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const roomId = searchParams.get('roomId');

    if (!checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'Missing required parameters: checkIn, checkOut' },
        { status: 400 }
      );
    }

    const result = await travellineClient.getPrices({
      checkIn,
      checkOut,
      roomId: roomId || undefined,
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('Travelline prices error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to get prices';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
