import { NextRequest, NextResponse } from 'next/server';
import { travellineClient } from '@shared/lib/api';
import { BookingSearchSchema } from '@entities/booking';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const adults = searchParams.get('adults');
    const children = searchParams.get('children');
    const rooms = searchParams.get('rooms');
    const propertyId = searchParams.get('propertyId');

    if (!checkIn || !checkOut || !adults) {
      return NextResponse.json(
        { error: 'Missing required parameters: checkIn, checkOut, adults' },
        { status: 400 }
      );
    }

    const params = {
      checkIn,
      checkOut,
      adults: parseInt(adults, 10),
      children: children ? parseInt(children, 10) : undefined,
      rooms: rooms ? parseInt(rooms, 10) : undefined,
      propertyId: propertyId || undefined,
    };

    // Validate with Zod
    const validatedParams = BookingSearchSchema.parse(params);

    const result = await travellineClient.searchRooms(validatedParams);

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('Travelline search error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to search rooms';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
