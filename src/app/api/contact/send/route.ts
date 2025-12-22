import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@shared/lib/utils/validation';
import { siteConfig } from '@shared/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    // In production, you would:
    // 1. Send email using a service like SendGrid, Resend, or Nodemailer
    // 2. Store in database
    // 3. Send notification to admin

    // For now, just log and return success
    console.log('Contact form submission:', validatedData);

    // Example: Send email (implement with your email service)
    // await sendEmail({
    //   to: siteConfig.contact.email,
    //   subject: `Новое сообщение от ${validatedData.name}`,
    //   body: `
    //     Имя: ${validatedData.name}
    //     Email: ${validatedData.email}
    //     Телефон: ${validatedData.phone || 'Не указан'}
    //     Сообщение: ${validatedData.message}
    //   `,
    // });

    return NextResponse.json({ message: 'Сообщение успешно отправлено' }, { status: 200 });
  } catch (error: any) {
    console.error('Contact form error:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: error.message || 'Failed to send message' }, { status: 500 });
  }
}
