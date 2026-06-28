/**
 * lib/emailService.ts
 *
 * Nodemailer email service for form submission notifications.
 *
 * Exports two functions:
 *   - sendAdminApplicationEmail   — sends the PDF to the admin inbox
 *   - sendCustomerConfirmationEmail — sends a confirmation to the applicant
 *
 * All credentials are read from environment variables; nothing is hard-coded.
 */

import nodemailer, { Transporter } from 'nodemailer';

// ─── Transporter factory ─────────────────────────────────────────────────────

/**
 * Creates a reusable Nodemailer transporter from environment variables.
 * Using a factory function (rather than a module-level singleton) avoids
 * issues with env vars not being available at module init time on Vercel.
 */
function createTransporter(): Transporter {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    // TLS via STARTTLS on port 587; set to true only for port 465 (SSL)
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ─── Types ────────────────────────────────────────────────────────────────────

type FormType = 'business' | 'credit';

// ─── Admin email ─────────────────────────────────────────────────────────────

/**
 * Sends a notification email to the admin with the generated PDF attached.
 *
 * @param formType  - 'business' | 'credit'
 * @param data      - Raw form data (typed as a plain object for flexibility)
 * @param pdfBuffer - Generated PDF binary
 */
export async function sendAdminApplicationEmail(
  formType: FormType,
  data: Record<string, unknown>,
  pdfBuffer: Buffer
): Promise<void> {
  const transporter = createTransporter();

  const formLabel = formType === 'business' ? 'Business' : 'Credit';

  // Build a simple HTML summary table from the form data fields
  const fieldRows = Object.entries(data)
    .filter(([, v]) => v !== '' && v !== null && v !== undefined)
    .map(([key, value]) => {
      // Convert camelCase key → "Camel Case" label
      const label = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (s) => s.toUpperCase());

      const displayValue = Array.isArray(value)
        ? (value as string[]).join(', ')
        : typeof value === 'boolean'
        ? value ? 'Yes' : 'No'
        : String(value);

      return `
        <tr>
          <td style="padding:6px 8px;color:#888;font-size:13px;white-space:nowrap;">${label}</td>
          <td style="padding:6px 8px;color:#212121;font-size:13px;">${displayValue}</td>
        </tr>`;
    })
    .join('');

  await transporter.sendMail({
    from: `"Nine Star Auto" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL ?? process.env.SMTP_USER,
    subject: `New ${formLabel} Application Received`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;">
        <div style="background:#C9A84C;padding:20px 32px;">
          <h2 style="margin:0;color:#111;font-size:20px;">New ${formLabel} Application</h2>
          <p style="margin:4px 0 0;color:#333;font-size:13px;">Nine Star Auto — Application Portal</p>
        </div>
        <div style="padding:24px 32px;background:#fafafa;">
          <p style="color:#555;font-size:14px;">
            A new ${formLabel.toLowerCase()} application has been submitted. 
            The full PDF is attached. Summary of fields:
          </p>
          <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #e0e0e0;border-radius:6px;">
            ${fieldRows}
          </table>
        </div>
        <div style="padding:16px 32px;background:#f0f0f0;text-align:center;">
          <p style="margin:0;color:#999;font-size:12px;">
            Nine Star Auto — Submitted ${new Date().toLocaleString('en-US')}
          </p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: `${formLabel.toLowerCase()}-application.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  });
}

// ─── Customer confirmation email ──────────────────────────────────────────────

/**
 * Sends a confirmation email to the applicant with the PDF attached.
 *
 * @param customerEmail - The email address from the submitted form
 * @param formType      - 'business' | 'credit'
 * @param pdfBuffer     - Generated PDF binary
 */
export async function sendCustomerConfirmationEmail(
  customerEmail: string,
  formType: FormType,
  pdfBuffer: Buffer
): Promise<void> {
  const transporter = createTransporter();

  const formLabel = formType === 'business' ? 'Business' : 'Credit';

  await transporter.sendMail({
    from: `"Nine Star Auto" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
    to: customerEmail,
    subject: `Your ${formLabel} Application — Confirmation`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#C9A84C;padding:20px 32px;">
          <h2 style="margin:0;color:#111;font-size:20px;">Application Received</h2>
          <p style="margin:4px 0 0;color:#333;font-size:13px;">Nine Star Auto</p>
        </div>
        <div style="padding:24px 32px;background:#fafafa;">
          <p style="color:#333;font-size:15px;line-height:1.6;">
            Thank you for submitting your <strong>${formLabel} Application</strong>.
          </p>
          <p style="color:#555;font-size:14px;line-height:1.6;">
            We have received your information and a member of our team will review your 
            application shortly. A copy of your completed application is attached to this 
            email for your records.
          </p>
          <p style="color:#555;font-size:14px;line-height:1.6;">
            If you have any questions, please don't hesitate to contact us.
          </p>
        </div>
        <div style="padding:16px 32px;background:#f0f0f0;text-align:center;">
          <p style="margin:0;color:#999;font-size:12px;">
            Nine Star Auto &nbsp;|&nbsp; This is an automated confirmation email.
          </p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: `${formLabel.toLowerCase()}-application.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  });
}

// ─── Quote request email ─────────────────────────────────────────────────────

/**
 * Sends a notification email to the admin with the quote request details.
 *
 * @param data - The quote request form data
 */
export async function sendQuoteRequestEmail(
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    vehicleOfInterest: string;
  }
): Promise<void> {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"Nine Star Auto" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL ?? process.env.SMTP_USER,
    subject: `New Lease Quote Request: ${data.vehicleOfInterest}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;">
        <div style="background:#C9A84C;padding:20px 32px;">
          <h2 style="margin:0;color:#111;font-size:20px;">New Quick Lease Quote</h2>
          <p style="margin:4px 0 0;color:#333;font-size:13px;">Nine Star Auto — Website Portal</p>
        </div>
        <div style="padding:24px 32px;background:#fafafa;">
          <p style="color:#555;font-size:14px;">
            A new quick lease quote request has been submitted. Details below:
          </p>
          <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #e0e0e0;border-radius:6px;">
            <tr>
              <td style="padding:6px 8px;color:#888;font-size:13px;white-space:nowrap;border-bottom:1px solid #eee;">First Name</td>
              <td style="padding:6px 8px;color:#212121;font-size:13px;border-bottom:1px solid #eee;">${data.firstName}</td>
            </tr>
            <tr>
              <td style="padding:6px 8px;color:#888;font-size:13px;white-space:nowrap;border-bottom:1px solid #eee;">Last Name</td>
              <td style="padding:6px 8px;color:#212121;font-size:13px;border-bottom:1px solid #eee;">${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding:6px 8px;color:#888;font-size:13px;white-space:nowrap;border-bottom:1px solid #eee;">Email</td>
              <td style="padding:6px 8px;color:#212121;font-size:13px;border-bottom:1px solid #eee;">
                <a href="mailto:${data.email}" style="color:#C9A84C;text-decoration:none;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:6px 8px;color:#888;font-size:13px;white-space:nowrap;border-bottom:1px solid #eee;">Phone</td>
              <td style="padding:6px 8px;color:#212121;font-size:13px;border-bottom:1px solid #eee;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding:6px 8px;color:#888;font-size:13px;white-space:nowrap;">Vehicle Of Interest</td>
              <td style="padding:6px 8px;color:#212121;font-size:13px;"><strong>${data.vehicleOfInterest}</strong></td>
            </tr>
          </table>
        </div>
        <div style="padding:16px 32px;background:#f0f0f0;text-align:center;">
          <p style="margin:0;color:#999;font-size:12px;">
            Nine Star Auto — Submitted ${new Date().toLocaleString('en-US')}
          </p>
        </div>
      </div>
    `,
  });
}
