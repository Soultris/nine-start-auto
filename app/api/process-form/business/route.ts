/**
 * app/api/process-form/business/route.ts
 *
 * API Route — Business Application Submission Pipeline
 *
 * POST /api/process-form/business
 *
 * Pipeline steps:
 *   1. Parse & validate request body
 *   2. Save document to Sanity (businessApplication type)
 *   3. Generate PDF with PDFKit
 *   4. Upload PDF buffer to Sanity as a file asset
 *   5. Patch the Sanity document to store the PDF reference
 *   6. Send admin notification email with PDF attached
 *   7. Send customer confirmation email with PDF attached
 *   8. Return { success: true, documentId }
 */

import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';
import { generateBusinessApplicationPDF, type BusinessApplicationData } from '@/lib/pdfGenerator';
import { sendAdminApplicationEmail, sendCustomerConfirmationEmail } from '@/lib/emailService';

export async function POST(req: NextRequest) {
  try {
    // ── Step 1: Parse request body ─────────────────────────────────────────
    const body = await req.json() as BusinessApplicationData;

    // Basic required-field validation
    if (!body.businessName || !body.emailAddress || !body.applicantFirstName) {
      return NextResponse.json(
        { error: 'Required fields are missing.' },
        { status: 400 }
      );
    }

    // ── Step 2: Create Sanity document ────────────────────────────────────
    // This creates a "businessApplication" document with all form fields.
    // The pdf field is intentionally left empty here; it is patched in Step 5.
    const sanityDoc = await writeClient.create({
      _type: 'businessApplication',
      submittedAt: new Date().toISOString(),

      // Business Information
      businessName:      body.businessName,
      typeOfBusiness:    body.typeOfBusiness,
      federalTaxId:      body.federalTaxId,
      yearEstablished:   body.yearEstablished,
      primaryPhone:      body.primaryPhone,
      emailAddress:      body.emailAddress,
      address:           body.address,
      city:              body.city,
      state:             body.state,
      zipCode:           body.zipCode,

      // Relationship / Applicant
      relationshipToCompany: body.relationshipToCompany,
      applicantFirstName:    body.applicantFirstName,
      applicantLastName:     body.applicantLastName,
      ssn:                   body.ssn,
      dateOfBirth:           body.dateOfBirth,
      personalPhone:         body.personalPhone,

      // Present Address
      presentAddress:     body.presentAddress,
      presentCity:        body.presentCity,
      presentState:       body.presentState,
      presentZipCode:     body.presentZipCode,
      timeAtAddressYear:  body.timeAtAddressYear,
      timeAtAddressMonth: body.timeAtAddressMonth,

      // Employment
      occupancyType:          body.occupancyType,
      mortgageHolderLandlord: body.mortgageHolderLandlord,
      workPhone:              body.workPhone,
      annualIncome:           body.annualIncome,

      // Signature
      companyName:   body.companyName,
      signature:     body.signature,
      by:            body.by,
      signatureDate: body.signatureDate,

      // Consent
      agreedToConsent: body.agreedToConsent,
    });

    const documentId = sanityDoc._id;
    console.log(`[business-application] Sanity doc created: ${documentId}`);

    // ── Step 3: Generate PDF ──────────────────────────────────────────────
    // generateBusinessApplicationPDF returns a Buffer via a Promise wrapper
    // around PDFKit's event-based stream.
    const pdfBuffer = await generateBusinessApplicationPDF(body);
    console.log(`[business-application] PDF generated (${pdfBuffer.length} bytes)`);

    // ── Step 4: Upload PDF to Sanity as a file asset ──────────────────────
    // Sanity stores the file in its CDN and returns an asset reference object.
    const pdfAsset = await writeClient.assets.upload(
      'file',
      pdfBuffer,
      {
        filename:    `business-application-${documentId}.pdf`,
        contentType: 'application/pdf',
      }
    );
    console.log(`[business-application] PDF uploaded to Sanity: ${pdfAsset._id}`);

    // ── Step 5: Patch document — attach the PDF reference ─────────────────
    // The Sanity `file` field stores a reference to the asset, not the binary.
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
    console.log(`[business-application] Document patched with PDF reference`);

    // ── Step 6 & 7: Send emails (run in parallel for speed) ───────────────
    await Promise.all([
      // Admin notification with all field data + PDF
      sendAdminApplicationEmail('business', body as unknown as Record<string, unknown>, pdfBuffer),

      // Customer confirmation to the email they submitted
      sendCustomerConfirmationEmail(body.emailAddress, 'business', pdfBuffer),
    ]);
    console.log(`[business-application] Emails sent`);

    // ── Step 8: Return success ────────────────────────────────────────────
    return NextResponse.json(
      { success: true, documentId },
      { status: 200 }
    );

  } catch (error) {
    console.error('[business-application] Pipeline error:', error);

    return NextResponse.json(
      {
        error: 'Failed to process the application. Please try again.',
        // Only expose detail in non-production environments
        ...(process.env.NODE_ENV !== 'production' && {
          detail: error instanceof Error ? error.message : String(error),
        }),
      },
      { status: 500 }
    );
  }
}
