import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, contactNumber, message } = await req.json();

    // Basic server-side validation
    if (!firstName || !lastName || !email || !contactNumber || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.SMTP_FROM || 'onboarding@resend.dev';
    const formattedFrom = fromEmail.includes('<') ? fromEmail : `"Nine Star Auto - Contact Form" <${fromEmail}>`;
    const toEmail = process.env.ADMIN_EMAIL || 'onboarding@resend.dev';

    const { error } = await resend.emails.send({
      from: formattedFrom,
      to: toEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 8px;">
          <h2 style="color: #c9a84c; margin-bottom: 4px;">New Contact Form Submission</h2>
          <p style="color: #666; font-size: 13px; margin-top: 0;">Received from the Nine Star Auto website</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" />
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #888; width: 140px;">Name</td>
              <td style="padding: 8px 0; color: #212121; font-weight: 600;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888;">Email</td>
              <td style="padding: 8px 0; color: #212121;"><a href="mailto:${email}" style="color: #c9a84c;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888;">Phone</td>
              <td style="padding: 8px 0; color: #212121;">${contactNumber}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" />
          <p style="color: #888; font-size: 13px; margin-bottom: 6px;">Message</p>
          <p style="color: #212121; font-size: 14px; line-height: 1.6; background: #fff; padding: 12px 16px; border-radius: 6px; border: 1px solid #e0e0e0;">${message}</p>
        </div>
      `,
    });

    if (error) {
      throw new Error(`Resend failed to send contact email: ${error.message}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form email error:', error);
    return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 });
  }
}
