import { NextRequest, NextResponse } from 'next/server';
import { sendQuoteRequestEmail } from '@/lib/emailService';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { firstName, lastName, email, phone, vehicleOfInterest } = data;

    if (!firstName || !lastName || !email || !phone || !vehicleOfInterest) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email to admin using our new centralized function
    await sendQuoteRequestEmail({
      firstName,
      lastName,
      email,
      phone,
      vehicleOfInterest,
    });

    return NextResponse.json(
      { message: 'Quote request submitted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Quote submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process quote request' },
      { status: 500 }
    );
  }
}
