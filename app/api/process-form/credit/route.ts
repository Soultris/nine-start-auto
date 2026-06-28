/**
 * app/api/process-form/credit/route.ts
 *
 * API Route — Credit Application Submission Pipeline
 *
 * POST /api/process-form/credit
 *
 * Pipeline steps:
 *   1. Parse & validate request body
 *   2. Save document to Sanity (creditApplication type)
 *   3. Generate PDF with PDFKit
 *   4. Upload PDF buffer to Sanity as a file asset
 *   5. Patch the Sanity document to store the PDF reference
 *   6. Send admin notification email with PDF attached
 *   7. Send customer confirmation email with PDF attached
 *   8. Return { success: true, documentId }
 */

import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';
import { generateCreditApplicationPDF, type CreditApplicationData } from '@/lib/pdfGenerator';
import { sendAdminApplicationEmail, sendCustomerConfirmationEmail } from '@/lib/emailService';

export async function POST(req: NextRequest) {
  try {
    // ── Step 1: Parse request body ─────────────────────────────────────────
    const body = await req.json() as CreditApplicationData;

    // Basic required-field validation
    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json(
        { error: 'Required fields are missing.' },
        { status: 400 }
      );
    }

    // ── Step 2: Create Sanity document ────────────────────────────────────
    // Creates a "creditApplication" document.
    // The pdf field is patched in Step 5 after upload.
    const sanityDoc = await writeClient.create({
      _type: 'creditApplication',
      submittedAt: new Date().toISOString(),

      // Applicant
      firstName:      body.firstName,
      middleInitial:  body.middleInitial,
      lastName:       body.lastName,
      streetAddress:  body.streetAddress,
      homePhone:      body.homePhone,
      city:           body.city,
      state:          body.state,
      zipCode:        body.zipCode,
      cellPhone:      body.cellPhone,
      occupancyType:  body.occupancyType,
      monthlyPayment: body.monthlyPayment,
      howLong:        body.howLong,
      socialSecurity: body.socialSecurity,
      dateOfBirth:    body.dateOfBirth,
      email:          body.email,

      // Applicant Employment
      employerName:       body.employerName,
      employerHowLongYrs: body.employerHowLongYrs,
      employerHowLongMos: body.employerHowLongMos,
      employerAddress:    body.employerAddress,
      positionTitle:      body.positionTitle,
      workPhone:          body.workPhone,
      grossAnnualSalary:  body.grossAnnualSalary,

      // Co-Applicant
      coFirstName:      body.coFirstName,
      coMiddleInitial:  body.coMiddleInitial,
      coLastName:       body.coLastName,
      coStreetAddress:  body.coStreetAddress,
      coHomePhone:      body.coHomePhone,
      coCity:           body.coCity,
      coState:          body.coState,
      coZipCode:        body.coZipCode,
      coCellPhone:      body.coCellPhone,
      coOccupancyType:  body.coOccupancyType,
      coMonthlyPayment: body.coMonthlyPayment,
      coHowLong:        body.coHowLong,
      coSocialSecurity: body.coSocialSecurity,
      coDateOfBirth:    body.coDateOfBirth,
      coEmail:          body.coEmail,

      // Co-Applicant Employment
      coEmployerName:       body.coEmployerName,
      coEmployerHowLongYrs: body.coEmployerHowLongYrs,
      coEmployerHowLongMos: body.coEmployerHowLongMos,
      coEmployerAddress:    body.coEmployerAddress,
      coPositionTitle:      body.coPositionTitle,
      coWorkPhone:          body.coWorkPhone,
      coGrossAnnualSalary:  body.coGrossAnnualSalary,

      // Signature
      signatureApplicant:   body.signatureApplicant,
      signatureCoApplicant: body.signatureCoApplicant,
      signatureDate:        body.signatureDate,

      // Consent
      agreed: body.agreed,
    });

    const documentId = sanityDoc._id;
    console.log(`[credit-application] Sanity doc created: ${documentId}`);

    // ── Step 3: Generate PDF ──────────────────────────────────────────────
    const pdfBuffer = await generateCreditApplicationPDF(body);
    console.log(`[credit-application] PDF generated (${pdfBuffer.length} bytes)`);

    // ── Step 4: Upload PDF to Sanity as a file asset ──────────────────────
    const pdfAsset = await writeClient.assets.upload(
      'file',
      pdfBuffer,
      {
        filename:    `credit-application-${documentId}.pdf`,
        contentType: 'application/pdf',
      }
    );
    console.log(`[credit-application] PDF uploaded to Sanity: ${pdfAsset._id}`);

    // ── Step 5: Patch document — attach the PDF reference ─────────────────
    await writeClient
      .patch(documentId)
      .set({
        pdf: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: pdfAsset._id,
          },
        },
      })
      .commit();
    console.log(`[credit-application] Document patched with PDF reference`);

    // ── Step 6 & 7: Send emails (parallel) ───────────────────────────────
    await Promise.all([
      sendAdminApplicationEmail('credit', body as unknown as Record<string, unknown>, pdfBuffer),
      sendCustomerConfirmationEmail(body.email, 'credit', pdfBuffer),
    ]);
    console.log(`[credit-application] Emails sent`);

    // ── Step 8: Return success ────────────────────────────────────────────
    return NextResponse.json(
      { success: true, documentId },
      { status: 200 }
    );

  } catch (error) {
    console.error('[credit-application] Pipeline error:', error);

    return NextResponse.json(
      {
        error: 'Failed to process the application. Please try again.',
        ...(process.env.NODE_ENV !== 'production' && {
          detail: error instanceof Error ? error.message : String(error),
        }),
      },
      { status: 500 }
    );
  }
}
