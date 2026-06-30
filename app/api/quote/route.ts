import { Resend } from 'resend';

interface QuoteFormData {
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  make: string;
  model: string;
  creditScore: string;
}

export async function POST(request: Request) {
  try {
    const body: QuoteFormData = await request.json();

    const { firstName, lastName, contactNumber, email, make, model, creditScore } = body;

    // Validate required fields
    if (!firstName || !lastName || !contactNumber || !email || !make || !model || !creditScore) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.SMTP_FROM || 'onboarding@resend.dev';
    const formattedFrom = fromEmail.includes('<') ? fromEmail : `"Nine Star Auto" <${fromEmail}>`;
    const toEmail = process.env.ADMIN_EMAIL || 'onboarding@resend.dev';

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #c8a951, #e6c45e); padding: 24px 32px;">
          <h1 style="margin: 0; color: #000; font-size: 22px; font-weight: 700;">New Instant Quote Request</h1>
          <p style="margin: 4px 0 0; color: #333; font-size: 13px;">Submitted via NineStarAuto Website</p>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #999; font-size: 13px; width: 140px;">First Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #fff; font-size: 14px; font-weight: 500;">${firstName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #999; font-size: 13px;">Last Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #fff; font-size: 14px; font-weight: 500;">${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #999; font-size: 13px;">Contact Number</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #fff; font-size: 14px; font-weight: 500;">${contactNumber}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #999; font-size: 13px;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #fff; font-size: 14px; font-weight: 500;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #999; font-size: 13px;">Make</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #fff; font-size: 14px; font-weight: 500;">${make}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #999; font-size: 13px;">Model</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #fff; font-size: 14px; font-weight: 500;">${model}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #999; font-size: 13px;">Credit Score</td>
              <td style="padding: 12px 0; color: #fff; font-size: 14px; font-weight: 500;">${creditScore}</td>
            </tr>
          </table>
        </div>
        <div style="background: #111; padding: 16px 32px; text-align: center;">
          <p style="margin: 0; color: #666; font-size: 11px;">NineStarAuto — Registered Automobile Broker</p>
        </div>
      </div>
    `;

    const plainTextContent = `
New Instant Quote Request
=========================

First Name: ${firstName}
Last Name: ${lastName}
Contact Number: ${contactNumber}
Email: ${email}
Make: ${make}
Model: ${model}
Credit Score: ${creditScore}

---
Submitted via NineStarAuto Website
    `.trim();

    const { error } = await resend.emails.send({
      from: formattedFrom,
      to: toEmail,
      subject: `New Quote Request from ${firstName} ${lastName} — ${make} ${model}`,
      text: plainTextContent,
      html: htmlContent,
      replyTo: email,
    });

    if (error) {
      throw new Error(`Resend failed to send quote email: ${error.message}`);
    }

    return Response.json(
      { message: 'Quote submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to send quote email:', error);
    return Response.json(
      { error: 'Failed to send quote. Please try again later.' },
      { status: 500 }
    );
  }
}