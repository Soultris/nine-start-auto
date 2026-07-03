/**
 * lib/pdfGenerator.ts
 *
 * Server-side PDF generation utilities using PDFKit.
 * Templates match the official Nine Star Auto application forms.
 */

import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';

// ─── Constants ─────────────────────────────────────────────────────────────────

const BLACK = '#000000';
const GREY = '#555555';
const PAGE_W = 595.28;  // A4 width in points
const MARGIN = 50;
const CONTENT_W = PAGE_W - MARGIN * 2;

// Logo path (server-side, from the project public folder)
const LOGO_PATH = path.join(process.cwd(), 'public', 'application_logo.png');

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface BusinessApplicationData {
  businessName: string;
  typeOfBusiness: string;
  federalTaxId: string;
  yearEstablished: string;
  primaryPhone: string;
  emailAddress: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  relationshipToCompany: string;
  applicantFirstName: string;
  applicantLastName: string;
  ssn: string;
  dateOfBirth: string;
  personalPhone: string;
  presentAddress: string;
  presentCity: string;
  presentState: string;
  presentZipCode: string;
  timeAtAddressYear: string;
  timeAtAddressMonth: string;
  occupancyType: string;
  mortgageHolderLandlord: string;
  workPhone: string;
  annualIncome: string;
  agreedToConsent: boolean;
  companyName: string;
  signature: string;
  signatureDataUrl?: string;
  by: string;
  signatureDate: string;
}

export interface CreditApplicationData {
  firstName: string;
  middleInitial: string;
  lastName: string;
  streetAddress: string;
  homePhone: string;
  city: string;
  state: string;
  zipCode: string;
  cellPhone: string;
  occupancyType: string[];
  monthlyPayment: string;
  howLong: string;
  socialSecurity: string;
  dateOfBirth: string;
  email: string;
  employerName: string;
  employerHowLongYrs: string;
  employerHowLongMos: string;
  employerAddress: string;
  positionTitle: string;
  workPhone: string;
  grossAnnualSalary: string;
  coFirstName: string;
  coMiddleInitial: string;
  coLastName: string;
  coStreetAddress: string;
  coHomePhone: string;
  coCity: string;
  coState: string;
  coZipCode: string;
  coCellPhone: string;
  coOccupancyType: string[];
  coMonthlyPayment: string;
  coHowLong: string;
  coSocialSecurity: string;
  coDateOfBirth: string;
  coEmail: string;
  coEmployerName: string;
  coEmployerHowLongYrs: string;
  coEmployerHowLongMos: string;
  coEmployerAddress: string;
  coPositionTitle: string;
  coWorkPhone: string;
  coGrossAnnualSalary: string;
  signatureApplicant: string;
  signatureApplicantDataUrl?: string;
  signatureCoApplicant: string;
  signatureCoApplicantDataUrl?: string;
  signatureDate: string;
  agreed: boolean;
}

// ─── Shared utilities ──────────────────────────────────────────────────────────

function pdfToBuffer(doc: PDFKit.PDFDocument): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
    doc.end();
  });
}

/** Draws a horizontal underline below the current y position. */
function underline(doc: PDFKit.PDFDocument, x: number, y: number, width: number) {
  doc.moveTo(x, y).lineTo(x + width, y).lineWidth(0.5).strokeColor('#999999').stroke();
}

/** Returns a value string, or a blank string if empty. */
function val(v: string | undefined | null): string {
  return v?.trim() || '';
}

/**
 * Attempts to embed a base64 data URL as an image in the PDF.
 * Returns true if successful, false otherwise.
 */
function tryEmbedSignatureImage(
  doc: PDFKit.PDFDocument,
  dataUrl: string | undefined,
  x: number,
  y: number,
  maxWidth: number,
  maxHeight: number
): boolean {
  if (!dataUrl || !dataUrl.startsWith('data:image/')) return false;
  try {
    const base64 = dataUrl.split(',')[1];
    if (!base64) return false;
    const imgBuffer = Buffer.from(base64, 'base64');
    doc.image(imgBuffer, x, y - maxHeight + 4, {
      fit: [maxWidth, maxHeight],
      valign: 'bottom',
    });
    return true;
  } catch {
    return false;
  }
}

// ─── Business Application PDF ──────────────────────────────────────────────────

export async function generateBusinessApplicationPDF(
  data: BusinessApplicationData
): Promise<Buffer> {
  const doc = new PDFDocument({ margin: MARGIN, size: 'A4', autoFirstPage: true });

  const x = MARGIN;
  let y = MARGIN;

  // ── Logo ────────────────────────────────────────────────────────────────────
  if (fs.existsSync(LOGO_PATH)) {
    doc.image(LOGO_PATH, PAGE_W / 2 - 55, y, { width: 110 });
    y += 75;
  } else {
    doc.font('Helvetica-Bold').fontSize(16).fillColor(BLACK)
      .text('NINE STAR AUTO', x, y, { align: 'center', width: CONTENT_W });
    y += 28;
  }

  // ── Contact info under logo ──────────────────────────────────────────────────
  doc.font('Helvetica').fontSize(9).fillColor(BLACK)
    .text('1214 Forest Ave, Staten Island, NY 10310', x, y, { align: 'center', width: CONTENT_W });
  y += 13;
  doc.font('Helvetica').fontSize(9).fillColor(BLACK)
    .text('Email: sales@ninestarautony.com   Tel: (718) 619-6277   Fax: (718) 504-7899', x, y, { align: 'center', width: CONTENT_W });
  y += 22;

  // ── Title ────────────────────────────────────────────────────────────────────
  doc.font('Helvetica-Bold').fontSize(15).fillColor(BLACK)
    .text('BUSINESS APPLICATION', x, y, { align: 'center', width: CONTENT_W });
  y += 26;

  // ── Helper: full-width labeled row ──────────────────────────────────────────
  const ROW_H = 20;
  const LABEL_W = 130;

  function labelRow(label: string, value: string, yPos: number): number {
    doc.font('Helvetica').fontSize(9.5).fillColor(BLACK)
      .text(label, x, yPos + 4, { width: LABEL_W, lineBreak: false });
    const fieldX = x + LABEL_W;
    const fieldW = CONTENT_W - LABEL_W;
    doc.font('Helvetica').fontSize(9.5).fillColor(BLACK)
      .text(value, fieldX + 2, yPos + 4, { width: fieldW - 4, lineBreak: false });
    underline(doc, fieldX, yPos + ROW_H - 2, fieldW);
    return yPos + ROW_H;
  }

  function triLabelRow(
    l1: string, v1: string, w1: number,
    l2: string, v2: string, w2: number,
    l3: string, v3: string,
    yPos: number
  ): number {
    const w3 = CONTENT_W - w1 - w2;
    doc.font('Helvetica').fontSize(9.5).fillColor(BLACK)
      .text(l1, x, yPos + 4, { width: w1, lineBreak: false });
    doc.font('Helvetica').fontSize(9.5)
      .text(v1, x + 65, yPos + 4, { width: w1 - 65, lineBreak: false });
    underline(doc, x + 65, yPos + ROW_H - 2, w1 - 65);

    const x2 = x + w1;
    doc.font('Helvetica').fontSize(9.5).fillColor(BLACK)
      .text(l2, x2, yPos + 4, { width: w2, lineBreak: false });
    doc.font('Helvetica').fontSize(9.5)
      .text(v2, x2 + 50, yPos + 4, { width: w2 - 50, lineBreak: false });
    underline(doc, x2 + 50, yPos + ROW_H - 2, w2 - 50);

    const x3 = x + w1 + w2;
    doc.font('Helvetica').fontSize(9.5).fillColor(BLACK)
      .text(l3, x3, yPos + 4, { width: w3, lineBreak: false });
    doc.font('Helvetica').fontSize(9.5)
      .text(v3, x3 + 58, yPos + 4, { width: w3 - 58, lineBreak: false });
    underline(doc, x3 + 58, yPos + ROW_H - 2, w3 - 58);

    return yPos + ROW_H;
  }

  // ── Fields ──────────────────────────────────────────────────────────────────
  y = labelRow('Business Name:', val(data.businessName), y);
  y = labelRow('Type of Business:', val(data.typeOfBusiness), y);
  y = labelRow('Federal Tax ID:', val(data.federalTaxId), y);
  y = labelRow('Year Established:', val(data.yearEstablished), y);
  y = labelRow('Primary Phone Number:', val(data.primaryPhone), y);
  y = labelRow('Email Address:', val(data.emailAddress), y);
  y = labelRow('Address:', val(data.address), y);

  // City / State / Zip
  y = triLabelRow(
    'City:', val(data.city), 180,
    'State:', val(data.state), 130,
    'Zip Code:', val(data.zipCode),
    y
  );

  y = labelRow('Your Relationship to the Company:', val(data.relationshipToCompany), y);
  y = labelRow('First Name:', val(data.applicantFirstName), y);
  y = labelRow('Last Name:', val(data.applicantLastName), y);
  y = labelRow('SSN:', val(data.ssn), y);
  y = labelRow('Date of Birth:', val(data.dateOfBirth), y);
  y = labelRow('Primary Phone Number:', val(data.personalPhone), y);
  y = labelRow('Present Address:', val(data.presentAddress), y);

  // Present City / State / Zip
  y = triLabelRow(
    'City:', val(data.presentCity), 180,
    'State:', val(data.presentState), 130,
    'Zip Code:', val(data.presentZipCode),
    y
  );

  // Time at Address
  {
    const l1 = 'Time at Address';
    const lw1 = 110;
    const l2 = 'Year:';
    const lw2 = 100;
    const l3 = 'Month:';
    doc.font('Helvetica').fontSize(9.5).fillColor(BLACK)
      .text(l1, x, y + 4, { width: lw1, lineBreak: false });
    doc.text(l2, x + lw1, y + 4, { width: 35, lineBreak: false });
    doc.font('Helvetica').fontSize(9.5)
      .text(val(data.timeAtAddressYear), x + lw1 + 35, y + 4, { width: 55, lineBreak: false });
    underline(doc, x + lw1 + 35, y + ROW_H - 2, 55);
    doc.font('Helvetica').fontSize(9.5).fillColor(BLACK)
      .text(l3, x + lw1 + 90 + 10, y + 4, { width: 45, lineBreak: false });
    doc.font('Helvetica').fontSize(9.5)
      .text(val(data.timeAtAddressMonth), x + lw1 + 90 + 55, y + 4, { width: CONTENT_W - lw1 - 90 - 55, lineBreak: false });
    underline(doc, x + lw1 + 90 + 55, y + ROW_H - 2, CONTENT_W - lw1 - 90 - 55);
    y += ROW_H;
  }

  y = labelRow('Occupancy Type:', val(data.occupancyType), y);
  y = labelRow('Mortgage Holder / Landlord:', val(data.mortgageHolderLandlord), y);
  y = labelRow('Work Phone Number:', val(data.workPhone), y);
  y = labelRow('Annual Income:', val(data.annualIncome), y);

  // ── Consent line ────────────────────────────────────────────────────────────
  y += 6;
  doc.font('Helvetica').fontSize(7.5).fillColor(GREY)
    .text(
      '*I certify that the following information is valid and up-to-date; I permit my application to be processed and evaluated.',
      x, y, { width: CONTENT_W }
    );
  y += 16;

  y = labelRow('Company Name:', val(data.companyName), y);

  // ── Signature row ────────────────────────────────────────────────────────────
  y += 16;
  const SIG_H = 40;
  const sigW = 140;
  const byW = 100;
  const dateW = CONTENT_W - sigW - byW - 20;

  // Signature of applicant
  const sigDrawn = tryEmbedSignatureImage(doc, data.signatureDataUrl, x, y + SIG_H, sigW, SIG_H);
  if (!sigDrawn && val(data.signature) && val(data.signature) !== '[signature attached]') {
    doc.font('Helvetica').fontSize(9).fillColor(BLACK)
      .text(val(data.signature), x, y + SIG_H - 14, { width: sigW, lineBreak: false });
  }
  underline(doc, x, y + SIG_H, sigW);
  doc.font('Helvetica').fontSize(7.5).fillColor(BLACK)
    .text('Signature:', x, y + SIG_H + 3, { width: sigW, lineBreak: false });

  // By
  const byX = x + sigW + 10;
  doc.font('Helvetica').fontSize(9).fillColor(BLACK)
    .text(val(data.by), byX, y + SIG_H - 14, { width: byW, lineBreak: false });
  underline(doc, byX, y + SIG_H, byW);
  doc.font('Helvetica').fontSize(7.5).fillColor(BLACK)
    .text('By:', byX, y + SIG_H + 3, { width: byW, lineBreak: false });

  // Date
  const dateX = byX + byW + 10;
  doc.font('Helvetica').fontSize(9).fillColor(BLACK)
    .text(val(data.signatureDate), dateX, y + SIG_H - 14, { width: dateW, lineBreak: false });
  underline(doc, dateX, y + SIG_H, dateW);
  doc.font('Helvetica').fontSize(7.5).fillColor(BLACK)
    .text('Date:', dateX, y + SIG_H + 3, { width: dateW, lineBreak: false });

  return pdfToBuffer(doc);
}

// ─── Credit Application PDF ────────────────────────────────────────────────────

export async function generateCreditApplicationPDF(
  data: CreditApplicationData
): Promise<Buffer> {
  const doc = new PDFDocument({ margin: MARGIN, size: 'A4', autoFirstPage: true });

  const x = MARGIN;
  let y = MARGIN;

  // ── Logo ─────────────────────────────────────────────────────────────────────
  if (fs.existsSync(LOGO_PATH)) {
    doc.image(LOGO_PATH, x, y, { width: 100 });
    y += 12;
  } else {
    doc.font('Helvetica-Bold').fontSize(14).fillColor(BLACK)
      .text('NINE STAR AUTO', x, y);
    y += 20;
  }

  // ── Title ─────────────────────────────────────────────────────────────────────
  doc.font('Helvetica-Bold').fontSize(14).fillColor(BLACK)
    .text('CREDIT APPLICATION', x, y, { align: 'center', width: CONTENT_W, underline: true });
  y += 28;

  // ── Section header (bold black box) ──────────────────────────────────────────
  function sectionHeader(title: string, yPos: number): number {
    doc.rect(x, yPos, CONTENT_W, 18).fillAndStroke(BLACK, BLACK);
    doc.font('Helvetica-Bold').fontSize(10).fillColor('#FFFFFF')
      .text(title, x, yPos + 4, { align: 'center', width: CONTENT_W, lineBreak: false });
    doc.fillColor(BLACK).strokeColor(BLACK);
    return yPos + 24;
  }

  // ── Row helpers ────────────────────────────────────────────────────────────────

  const ROW_H = 19;

  /** Full-width label + value with underline. */
  function row(label: string, value: string, yPos: number): number {
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK)
      .text(label, x, yPos + 3, { lineBreak: false, width: 120 });
    const vx = x + 120;
    const vw = CONTENT_W - 120;
    doc.font('Helvetica').fontSize(9).fillColor(BLACK)
      .text(value, vx, yPos + 3, { lineBreak: false, width: vw });
    underline(doc, vx, yPos + ROW_H - 3, vw);
    return yPos + ROW_H;
  }

  /** Two columns: left (labelL + valL) and right (labelR + valR). */
  function row2(
    labelL: string, valL: string, labelLW: number,
    labelR: string, valR: string,
    yPos: number
  ): number {
    const halfW = CONTENT_W / 2;

    // Left
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK)
      .text(labelL, x, yPos + 3, { lineBreak: false, width: labelLW });
    const vlx = x + labelLW;
    const vlw = halfW - labelLW;
    doc.font('Helvetica').fontSize(9).fillColor(BLACK)
      .text(valL, vlx, yPos + 3, { lineBreak: false, width: vlw });
    underline(doc, vlx, yPos + ROW_H - 3, vlw - 4);

    // Right
    const rx = x + halfW + 4;
    const labelRW = 70;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK)
      .text(labelR, rx, yPos + 3, { lineBreak: false, width: labelRW });
    const vrx = rx + labelRW;
    const vrw = halfW - labelRW;
    doc.font('Helvetica').fontSize(9).fillColor(BLACK)
      .text(valR, vrx, yPos + 3, { lineBreak: false, width: vrw });
    underline(doc, vrx, yPos + ROW_H - 3, vrw);

    return yPos + ROW_H;
  }

  // ── APPLICANT ─────────────────────────────────────────────────────────────────
  y = sectionHeader('APPLICANT', y);

  // First Name | Last Name
  {
    const fn_w = CONTENT_W / 2;
    const ln_w = CONTENT_W / 2;

    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK)
      .text('FIRST NAME :', x, y + 3, { width: 65, lineBreak: false });
    doc.font('Helvetica').fontSize(9)
      .text(val(data.firstName), x + 65, y + 3, { width: fn_w - 65, lineBreak: false });
    underline(doc, x + 65, y + ROW_H - 3, fn_w - 65 - 4);

    const lnx = x + fn_w;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK)
      .text('LAST NAME :', lnx, y + 3, { width: 60, lineBreak: false });
    doc.font('Helvetica').fontSize(9)
      .text(val(data.lastName), lnx + 60, y + 3, { width: ln_w - 60, lineBreak: false });
    underline(doc, lnx + 60, y + ROW_H - 3, ln_w - 60);

    y += ROW_H;
  }

  // Street Address | Home Phone
  y = row2('STREET ADDRESS :', val(data.streetAddress), 96, 'HOME PHONE :', val(data.homePhone), y);

  // City | State | Zip | Cell #
  {
    const cw = 90; const sw = 90; const zw = 100; const cew = CONTENT_W - cw - sw - zw;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('CITY :', x, y + 3, { width: 30, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.city), x + 30, y + 3, { width: cw - 30, lineBreak: false });
    underline(doc, x + 30, y + ROW_H - 3, cw - 34);

    const sx = x + cw;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('STATE :', sx, y + 3, { width: 36, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.state), sx + 36, y + 3, { width: sw - 36, lineBreak: false });
    underline(doc, sx + 36, y + ROW_H - 3, sw - 40);

    const zx = sx + sw;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('ZIP :', zx, y + 3, { width: 24, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.zipCode), zx + 24, y + 3, { width: zw - 24, lineBreak: false });
    underline(doc, zx + 24, y + ROW_H - 3, zw - 28);

    const cex = zx + zw;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('CELL PHONE :', cex, y + 3, { width: 65, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.cellPhone), cex + 65, y + 3, { width: cew - 65, lineBreak: false });
    underline(doc, cex + 65, y + ROW_H - 3, cew - 65);
    y += ROW_H;
  }

  // Occupancy checkboxes | Monthly Payment | How Long
  {
    const types = ['RENT', 'OWN', 'LIVE W/ RELATIVE'];
    let cx = x;
    for (const t of types) {
      const checked = data.occupancyType.includes(t.replace('LIVE W/ RELATIVE', 'Live W/ Relative').replace('RENT', 'Rent').replace('OWN', 'Own'));
      doc.rect(cx, y + 4, 8, 8).lineWidth(0.5).strokeColor(BLACK).stroke();
      if (checked) {
        doc.moveTo(cx + 2, y + 8).lineTo(cx + 4, y + 10).lineTo(cx + 7, y + 5).lineWidth(1).strokeColor(BLACK).stroke();
      }
      cx += 10;
      doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text(t, cx, y + 3, { width: t.length * 5 + 8, lineBreak: false });
      cx += t.length * 5 + 12;
    }
    // Monthly Payment
    const mpLabelW = 100;
    const mpX = cx + 6;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('MONTHLY PAYMENT:', mpX, y + 3, { width: mpLabelW, lineBreak: false });
    const mpVX = mpX + mpLabelW;
    const mpVW = 55;
    doc.font('Helvetica').fontSize(9).text(val(data.monthlyPayment), mpVX, y + 3, { width: mpVW, lineBreak: false });
    underline(doc, mpVX, y + ROW_H - 3, mpVW);
    // How Long
    const hlX = mpVX + mpVW + 4;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('HOW LONG:', hlX, y + 3, { width: 58, lineBreak: false });
    const hlVX = hlX + 58;
    const hlVW = CONTENT_W - (hlVX - x);
    doc.font('Helvetica').fontSize(9).text(val(data.howLong), hlVX, y + 3, { width: hlVW, lineBreak: false });
    underline(doc, hlVX, y + ROW_H - 3, hlVW);
    y += ROW_H;
  }

  // Social Security | Date of Birth
  {
    const ssw = CONTENT_W / 2;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('SOCIAL SECURITY # :', x, y + 3, { width: 95, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.socialSecurity), x + 95, y + 3, { width: ssw - 95, lineBreak: false });
    underline(doc, x + 95, y + ROW_H - 3, ssw - 99);

    const dobX = x + ssw + 4;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('DATE OF BIRTH :', dobX, y + 3, { width: 80, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.dateOfBirth), dobX + 80, y + 3, { width: ssw - 80, lineBreak: false });
    underline(doc, dobX + 80, y + ROW_H - 3, ssw - 84);
    y += ROW_H;
  }

  y = row('EMAIL ADDRESS :', val(data.email), y);

  // ── EMPLOYMENT ────────────────────────────────────────────────────────────────
  y = sectionHeader('EMPLOYMENT', y);

  // Employer Name | How Long YRS MOS
  {
    const enW = CONTENT_W / 2 + 40;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('EMPLOYER NAME :', x, y + 3, { width: 90, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.employerName), x + 90, y + 3, { width: enW - 90, lineBreak: false });
    underline(doc, x + 90, y + ROW_H - 3, enW - 94);

    const hlX = x + enW + 4;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('HOW LONG?', hlX, y + 3, { width: 55, lineBreak: false });
    const yrsX = hlX + 55;
    doc.font('Helvetica').fontSize(9).text(val(data.employerHowLongYrs), yrsX, y + 3, { width: 22, lineBreak: false });
    underline(doc, yrsX, y + ROW_H - 3, 22);
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('YRS', yrsX + 22, y + 3, { width: 20, lineBreak: false });
    const mosX = yrsX + 42;
    doc.font('Helvetica').fontSize(9).text(val(data.employerHowLongMos), mosX, y + 3, { width: 22, lineBreak: false });
    underline(doc, mosX, y + ROW_H - 3, 22);
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('MOS', mosX + 22, y + 3, { width: 25, lineBreak: false });
    y += ROW_H;
  }

  y = row('EMPLOYER ADDRESS :', val(data.employerAddress), y);

  {
    const ptW = CONTENT_W / 2;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('POSITION/TITLE :', x, y + 3, { width: 85, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.positionTitle), x + 85, y + 3, { width: ptW - 85, lineBreak: false });
    underline(doc, x + 85, y + ROW_H - 3, ptW - 89);

    const wpX = x + ptW + 4;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('WORK PHONE :', wpX, y + 3, { width: 75, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.workPhone), wpX + 75, y + 3, { width: ptW - 75, lineBreak: false });
    underline(doc, wpX + 75, y + ROW_H - 3, ptW - 79);
    y += ROW_H;
  }

  {
    const gasW = 130;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('GROSS ANNUAL SALARY :', x, y + 3, { width: gasW, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.grossAnnualSalary), x + gasW, y + 3, { width: 120, lineBreak: false });
    underline(doc, x + gasW, y + ROW_H - 3, 120);
    y += ROW_H;
  }

  // ── CO-APPLICANT ─────────────────────────────────────────────────────────────
  y = sectionHeader('CO-APPLICANT', y);

  // First Name | Last Name
  {
    const fn_w = CONTENT_W / 2;
    const ln_w = CONTENT_W / 2;

    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK)
      .text('FIRST NAME :', x, y + 3, { width: 65, lineBreak: false });
    doc.font('Helvetica').fontSize(9)
      .text(val(data.coFirstName), x + 65, y + 3, { width: fn_w - 65, lineBreak: false });
    underline(doc, x + 65, y + ROW_H - 3, fn_w - 65 - 4);

    const lnx = x + fn_w;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK)
      .text('LAST NAME :', lnx, y + 3, { width: 60, lineBreak: false });
    doc.font('Helvetica').fontSize(9)
      .text(val(data.coLastName), lnx + 60, y + 3, { width: ln_w - 60, lineBreak: false });
    underline(doc, lnx + 60, y + ROW_H - 3, ln_w - 60);

    y += ROW_H;
  }

  y = row2('STREET ADDRESS :', val(data.coStreetAddress), 96, 'HOME PHONE :', val(data.coHomePhone), y);

  {
    const cw = 90; const sw = 90; const zw = 100; const cew = CONTENT_W - cw - sw - zw;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('CITY :', x, y + 3, { width: 30, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.coCity), x + 30, y + 3, { width: cw - 30, lineBreak: false });
    underline(doc, x + 30, y + ROW_H - 3, cw - 34);

    const sx = x + cw;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('STATE :', sx, y + 3, { width: 36, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.coState), sx + 36, y + 3, { width: sw - 36, lineBreak: false });
    underline(doc, sx + 36, y + ROW_H - 3, sw - 40);

    const zx = sx + sw;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('ZIP :', zx, y + 3, { width: 24, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.coZipCode), zx + 24, y + 3, { width: zw - 24, lineBreak: false });
    underline(doc, zx + 24, y + ROW_H - 3, zw - 28);

    const cex = zx + zw;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('CELL PHONE :', cex, y + 3, { width: 65, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.coCellPhone), cex + 65, y + 3, { width: cew - 65, lineBreak: false });
    underline(doc, cex + 65, y + ROW_H - 3, cew - 65);
    y += ROW_H;
  }

  {
    const types = ['RENT', 'OWN', 'LIVE W/ RELATIVE'];
    let cx = x;
    for (const t of types) {
      const checked = data.coOccupancyType.includes(t.replace('LIVE W/ RELATIVE', 'Live W/ Relative').replace('RENT', 'Rent').replace('OWN', 'Own'));
      doc.rect(cx, y + 4, 8, 8).lineWidth(0.5).strokeColor(BLACK).stroke();
      if (checked) {
        doc.moveTo(cx + 2, y + 8).lineTo(cx + 4, y + 10).lineTo(cx + 7, y + 5).lineWidth(1).strokeColor(BLACK).stroke();
      }
      cx += 10;
      doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text(t, cx, y + 3, { width: t.length * 5 + 8, lineBreak: false });
      cx += t.length * 5 + 12;
    }
    const mpLabelW = 100;
    const mpX = cx + 6;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('MONTHLY PAYMENT:', mpX, y + 3, { width: mpLabelW, lineBreak: false });
    const mpVX = mpX + mpLabelW;
    const mpVW = 55;
    doc.font('Helvetica').fontSize(9).text(val(data.coMonthlyPayment), mpVX, y + 3, { width: mpVW, lineBreak: false });
    underline(doc, mpVX, y + ROW_H - 3, mpVW);
    const hlX = mpVX + mpVW + 4;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('HOW LONG:', hlX, y + 3, { width: 58, lineBreak: false });
    const hlVX = hlX + 58;
    const hlVW = CONTENT_W - (hlVX - x);
    doc.font('Helvetica').fontSize(9).text(val(data.coHowLong), hlVX, y + 3, { width: hlVW, lineBreak: false });
    underline(doc, hlVX, y + ROW_H - 3, hlVW);
    y += ROW_H;
  }

  {
    const ssw = CONTENT_W / 2;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('SOCIAL SECURITY # :', x, y + 3, { width: 95, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.coSocialSecurity), x + 95, y + 3, { width: ssw - 95, lineBreak: false });
    underline(doc, x + 95, y + ROW_H - 3, ssw - 99);

    const dobX = x + ssw + 4;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('DATE OF BIRTH :', dobX, y + 3, { width: 80, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.coDateOfBirth), dobX + 80, y + 3, { width: ssw - 80, lineBreak: false });
    underline(doc, dobX + 80, y + ROW_H - 3, ssw - 84);
    y += ROW_H;
  }

  y = row('EMAIL ADDRESS :', val(data.coEmail), y);

  // ── CO-APPLICANT EMPLOYMENT ───────────────────────────────────────────────────
  y = sectionHeader('EMPLOYMENT', y);

  {
    const enW = CONTENT_W / 2 + 40;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('EMPLOYER NAME :', x, y + 3, { width: 90, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.coEmployerName), x + 90, y + 3, { width: enW - 90, lineBreak: false });
    underline(doc, x + 90, y + ROW_H - 3, enW - 94);

    const hlX = x + enW + 4;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('HOW LONG?', hlX, y + 3, { width: 55, lineBreak: false });
    const yrsX = hlX + 55;
    doc.font('Helvetica').fontSize(9).text(val(data.coEmployerHowLongYrs), yrsX, y + 3, { width: 22, lineBreak: false });
    underline(doc, yrsX, y + ROW_H - 3, 22);
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('YRS', yrsX + 22, y + 3, { width: 20, lineBreak: false });
    const mosX = yrsX + 42;
    doc.font('Helvetica').fontSize(9).text(val(data.coEmployerHowLongMos), mosX, y + 3, { width: 22, lineBreak: false });
    underline(doc, mosX, y + ROW_H - 3, 22);
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('MOS', mosX + 22, y + 3, { width: 25, lineBreak: false });
    y += ROW_H;
  }

  y = row('EMPLOYER ADDRESS :', val(data.coEmployerAddress), y);

  {
    const ptW = CONTENT_W / 2;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('POSITION/TITLE :', x, y + 3, { width: 85, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.coPositionTitle), x + 85, y + 3, { width: ptW - 85, lineBreak: false });
    underline(doc, x + 85, y + ROW_H - 3, ptW - 89);

    const wpX = x + ptW + 4;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('WORK PHONE :', wpX, y + 3, { width: 75, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.coWorkPhone), wpX + 75, y + 3, { width: ptW - 75, lineBreak: false });
    underline(doc, wpX + 75, y + ROW_H - 3, ptW - 79);
    y += ROW_H;
  }

  {
    const gasW = 130;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(BLACK).text('GROSS ANNUAL SALARY :', x, y + 3, { width: gasW, lineBreak: false });
    doc.font('Helvetica').fontSize(9).text(val(data.grossAnnualSalary), x + gasW, y + 3, { width: 120, lineBreak: false });
    underline(doc, x + gasW, y + ROW_H - 3, 120);
    y += ROW_H;
  }

  // ── Consent paragraph ─────────────────────────────────────────────────────────
  y += 6;
  doc.font('Helvetica').fontSize(7.5).fillColor(BLACK)
    .text(
      'By your signature below, you certify that you have read and completed this application to obtain credit, and that all information provided by you for this transaction is true, correct and complete. You understand and agree that this application and related credit information will be forwarded to multiple financial institutions in order to obtain credit on your behalf. You authorize the Dealer to make inquiries and obtain information about you as we deem appropriate for the purpose of evaluating or submitting this application.',
      x, y, { width: CONTENT_W, align: 'justify' }
    );
  y += 48;

  // ── Signature row ─────────────────────────────────────────────────────────────
  const SIG_H = 36;
  const colW = CONTENT_W / 3;

  // Applicant signature
  const sigADrawn = tryEmbedSignatureImage(doc, data.signatureApplicantDataUrl, x, y + SIG_H, colW - 8, SIG_H);
  if (!sigADrawn && val(data.signatureApplicant) && val(data.signatureApplicant) !== '[signature attached]') {
    doc.font('Helvetica').fontSize(9).fillColor(BLACK)
      .text(val(data.signatureApplicant), x, y + SIG_H - 14, { width: colW - 8, lineBreak: false });
  }
  underline(doc, x, y + SIG_H, colW - 8);
  doc.font('Helvetica-Bold').fontSize(7).fillColor(BLACK)
    .text('SIGNATURE OF APPLICANT', x, y + SIG_H + 3, { width: colW - 8, lineBreak: false });

  // Co-applicant signature
  const sigBX = x + colW;
  const sigBDrawn = tryEmbedSignatureImage(doc, data.signatureCoApplicantDataUrl, sigBX, y + SIG_H, colW - 8, SIG_H);
  if (!sigBDrawn && val(data.signatureCoApplicant) && val(data.signatureCoApplicant) !== '[signature attached]') {
    doc.font('Helvetica').fontSize(9).fillColor(BLACK)
      .text(val(data.signatureCoApplicant), sigBX, y + SIG_H - 14, { width: colW - 8, lineBreak: false });
  }
  underline(doc, sigBX, y + SIG_H, colW - 8);
  doc.font('Helvetica-Bold').fontSize(7).fillColor(BLACK)
    .text('SIGNATURE OF CO-APPLICANT', sigBX, y + SIG_H + 3, { width: colW - 8, lineBreak: false });

  // Date
  const dateX = x + colW * 2;
  doc.font('Helvetica').fontSize(9).fillColor(BLACK)
    .text(val(data.signatureDate), dateX, y + SIG_H - 14, { width: colW, lineBreak: false });
  underline(doc, dateX, y + SIG_H, colW);
  doc.font('Helvetica-Bold').fontSize(7).fillColor(BLACK)
    .text('DATE', dateX, y + SIG_H + 3, { width: colW, lineBreak: false });

  return pdfToBuffer(doc);
}
