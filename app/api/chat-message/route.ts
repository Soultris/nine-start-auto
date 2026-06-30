import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    // Basic server-side validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.SMTP_FROM || 'onboarding@resend.dev';
    const formattedFrom = fromEmail.includes('<')
      ? fromEmail
      : `"Nine Star Auto - Chat Message" <${fromEmail}>`;
    const toEmail = process.env.ADMIN_EMAIL || 'onboarding@resend.dev';

    const { error } = await resend.emails.send({
      from: formattedFrom,
      to: toEmail,
      replyTo: email,
      subject: `New Chat Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 8px;">
          <div style="background: linear-gradient(135deg, #c9a84c 0%, #e8d48b 100%); padding: 20px 24px; border-radius: 8px 8px 0 0; margin: -24px -24px 20px -24px;">
            <h2 style="color: #1a1a1a; margin: 0; font-size: 20px;">💬 New Chat Widget Message</h2>
            <p style="color: #333; font-size: 12px; margin: 4px 0 0 0;">Received from the Nine Star Auto website chat</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; color: #888; width: 120px; vertical-align: top;">Name</td>
              <td style="padding: 10px 0; color: #212121; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; vertical-align: top;">Email</td>
              <td style="padding: 10px 0; color: #212121;"><a href="mailto:${email}" style="color: #c9a84c; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; vertical-align: top;">Phone</td>
              <td style="padding: 10px 0; color: #212121;">${phone}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" />
          <p style="color: #888; font-size: 13px; margin-bottom: 6px;">Message</p>
          <p style="color: #212121; font-size: 14px; line-height: 1.6; background: #fff; padding: 12px 16px; border-radius: 6px; border: 1px solid #e0e0e0;">${message}</p>
        </div>
      `,
    });

    if (error) {
      throw new Error(`Resend failed to send chat message: ${error.message}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Chat widget email error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
