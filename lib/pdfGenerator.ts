/**
 * lib/pdfGenerator.ts
 *
 * Server-side PDF generation utilities using PDFKit.
 * Each function accepts typed form data and returns a Promise<Buffer>
 * that can be attached to emails or uploaded to Sanity.
 *
 * PDFKit works in Node.js serverless environments (Vercel).
 */

import PDFDocument from 'pdfkit';

// ─── Brand colours ────────────────────────────────────────────────────────────
const GOLD   = '#C9A84C';
const BLACK  = '#111111';
const GREY   = '#555555';
const LIGHT  = '#F5F5F5';

// ─── Types ────────────────────────────────────────────────────────────────────

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
  signatureCoApplicant: string;
  signatureDate: string;
  agreed: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Wraps PDFKit's event-based stream in a Promise<Buffer>.
 */
function pdfToBuffer(doc: PDFKit.PDFDocument): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
    doc.end();
  });
}

/**
 * Draws a coloured header banner at the top of the document.
 */
function drawHeader(doc: PDFKit.PDFDocument, title: string) {
  // Gold top bar
  doc.rect(0, 0, doc.page.width, 60).fill(GOLD);

  // Company name (left)
  doc
    .font('Helvetica-Bold')
    .fontSize(14)
    .fillColor(BLACK)
    .text('NINE STAR AUTO', 40, 20);

  // Form title (right)
  doc
    .font('Helvetica')
    .fontSize(11)
    .fillColor(BLACK)
    .text(title, 40, 38, { align: 'right' });

  // Reset colour
  doc.fillColor(BLACK);
  doc.moveDown(3);
}

/**
 * Draws a section heading line.
 */
function drawSection(doc: PDFKit.PDFDocument, title: string) {
  // Add space before each section
  doc.moveDown(0.8);

  const y = doc.y;

  // Section background strip
  doc.rect(40, y, doc.page.width - 80, 20).fill(LIGHT);

  // Section title text
  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor(GOLD)
    .text(title.toUpperCase(), 48, y + 5);

  doc.fillColor(BLACK);
  doc.moveDown(1.4);
}

/**
 * Draws a label + value pair as a compact row.
 */
function drawField(doc: PDFKit.PDFDocument, label: string, value: string | boolean) {
  const displayValue = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : (value || '—');

  doc
    .font('Helvetica-Bold')
    .fontSize(8)
    .fillColor(GREY)
    .text(`${label}:`, 48, doc.y, { continued: true, width: 160 });

  doc
    .font('Helvetica')
    .fontSize(9)
    .fillColor(BLACK)
    .text(` ${displayValue}`, { lineBreak: true });
}

/**
 * Draws two fields side by side in a two-column layout.
 */
function drawFieldRow(
  doc: PDFKit.PDFDocument,
  leftLabel: string,
  leftValue: string,
  rightLabel: string,
  rightValue: string
) {
  const startY = doc.y;
  const halfWidth = (doc.page.width - 96) / 2;

  // Left column
  doc
    .font('Helvetica-Bold').fontSize(8).fillColor(GREY)
    .text(`${leftLabel}:`, 48, startY, { width: halfWidth, continued: true });
  doc
    .font('Helvetica').fontSize(9).fillColor(BLACK)
    .text(` ${leftValue || '—'}`, { width: halfWidth, lineBreak: false });

  // Right column
  doc
    .font('Helvetica-Bold').fontSize(8).fillColor(GREY)
    .text(`${rightLabel}:`, 48 + halfWidth + 8, startY, { width: halfWidth, continued: true });
  doc
    .font('Helvetica').fontSize(9).fillColor(BLACK)
    .text(` ${rightValue || '—'}`, { width: halfWidth });
}

/**
 * Draws a footer with submission timestamp.
 */
function drawFooter(doc: PDFKit.PDFDocument) {
  const pageBottom = doc.page.height - 40;
  doc
    .font('Helvetica')
    .fontSize(8)
    .fillColor(GREY)
    .text(
      `Generated on ${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC  |  Nine Star Auto`,
      40,
      pageBottom,
      { align: 'center' }
    );
}

// ─── Business Application PDF ────────────────────────────────────────────────

/**
 * Generates a PDF for a Business Application submission.
 * @returns Buffer containing the complete PDF binary.
 */
export async function generateBusinessApplicationPDF(
  data: BusinessApplicationData
): Promise<Buffer> {
  const doc = new PDFDocument({ margin: 40, size: 'A4' });

  // Header
  drawHeader(doc, 'Business Application');

  // ── Business Information ──────────────────────────────────────────
  drawSection(doc, 'Business Information');
  drawField(doc, 'Business Name',  data.businessName);
  drawField(doc, 'Type of Business', data.typeOfBusiness);
  drawFieldRow(doc, 'Federal Tax ID', data.federalTaxId, 'Year Established', data.yearEstablished);
  drawFieldRow(doc, 'Primary Phone',  data.primaryPhone,  'Email Address',    data.emailAddress);
  drawField(doc, 'Address', data.address);
  drawFieldRow(doc, 'City', data.city, 'State', data.state);
  drawField(doc, 'Zip Code', data.zipCode);

  // ── Relationship / Applicant ──────────────────────────────────────
  drawSection(doc, 'Relationship to the Company');
  drawField(doc, 'Relationship',  data.relationshipToCompany);
  drawFieldRow(doc, 'First Name', data.applicantFirstName, 'Last Name', data.applicantLastName);
  drawFieldRow(doc, 'SSN',        data.ssn,                'Date of Birth', data.dateOfBirth);
  drawField(doc, 'Personal Phone', data.personalPhone);

  // ── Present Address ───────────────────────────────────────────────
  drawSection(doc, 'Present Address');
  drawField(doc, 'Address', data.presentAddress);
  drawFieldRow(doc, 'City',  data.presentCity,  'State',    data.presentState);
  drawFieldRow(doc, 'Zip',   data.presentZipCode, 'Time at Address', `${data.timeAtAddressYear} yr(s) ${data.timeAtAddressMonth} mo(s)`);

  // ── Employment ────────────────────────────────────────────────────
  drawSection(doc, 'Employment Information');
  drawFieldRow(doc, 'Occupancy Type', data.occupancyType, 'Mortgage Holder / Landlord', data.mortgageHolderLandlord);
  drawFieldRow(doc, 'Work Phone',     data.workPhone,     'Annual Income',               data.annualIncome);

  // ── Signature ─────────────────────────────────────────────────────
  drawSection(doc, 'Signature');
  drawField(doc, 'Company Name',   data.companyName);
  drawFieldRow(doc, 'Signature', data.signature, 'By', data.by);
  drawField(doc, 'Date', data.signatureDate);
  drawField(doc, 'Agreed to Consent', data.agreedToConsent);

  drawFooter(doc);

  return pdfToBuffer(doc);
}

// ─── Credit Application PDF ──────────────────────────────────────────────────

/**
 * Generates a PDF for a Credit Application submission.
 * @returns Buffer containing the complete PDF binary.
 */
export async function generateCreditApplicationPDF(
  data: CreditApplicationData
): Promise<Buffer> {
  const doc = new PDFDocument({ margin: 40, size: 'A4' });

  // Header
  drawHeader(doc, 'Credit Application');

  // ── Applicant ─────────────────────────────────────────────────────
  drawSection(doc, 'Applicant');
  drawFieldRow(doc, 'First Name', data.firstName, 'Last Name', data.lastName);
  drawFieldRow(doc, 'Middle Initial', data.middleInitial, 'Date of Birth', data.dateOfBirth);
  drawField(doc, 'Street Address', data.streetAddress);
  drawFieldRow(doc, 'City',       data.city,      'State',    data.state);
  drawFieldRow(doc, 'Zip Code',   data.zipCode,   'Home Phone', data.homePhone);
  drawFieldRow(doc, 'Cell Phone', data.cellPhone,  'Email',    data.email);
  drawField(doc, 'Occupancy Type', data.occupancyType.join(', '));
  drawFieldRow(doc, 'Monthly Payment', data.monthlyPayment, 'How Long', data.howLong);
  drawField(doc, 'Social Security', data.socialSecurity);

  // ── Employment ────────────────────────────────────────────────────
  drawSection(doc, 'Employment');
  drawField(doc, 'Employer Name', data.employerName);
  drawField(doc, 'Employer Address', data.employerAddress);
  drawFieldRow(doc, 'Position / Title', data.positionTitle, 'Work Phone', data.workPhone);
  drawFieldRow(doc, 'How Long (Yrs)', data.employerHowLongYrs, 'How Long (Mos)', data.employerHowLongMos);
  drawField(doc, 'Gross Annual Salary', data.grossAnnualSalary);

  // ── Co-Applicant ──────────────────────────────────────────────────
  drawSection(doc, 'Co-Applicant');
  drawFieldRow(doc, 'First Name', data.coFirstName, 'Last Name', data.coLastName);
  drawFieldRow(doc, 'Middle Initial', data.coMiddleInitial, 'Date of Birth', data.coDateOfBirth);
  drawField(doc, 'Street Address', data.coStreetAddress);
  drawFieldRow(doc, 'City',       data.coCity,     'State',      data.coState);
  drawFieldRow(doc, 'Zip Code',   data.coZipCode,  'Home Phone', data.coHomePhone);
  drawFieldRow(doc, 'Cell Phone', data.coCellPhone, 'Email',     data.coEmail);
  drawField(doc, 'Occupancy Type', data.coOccupancyType.join(', '));
  drawFieldRow(doc, 'Monthly Payment', data.coMonthlyPayment, 'How Long', data.coHowLong);
  drawField(doc, 'Social Security', data.coSocialSecurity);

  // ── Co-Applicant Employment ───────────────────────────────────────
  drawSection(doc, 'Co-Applicant Employment');
  drawField(doc, 'Employer Name', data.coEmployerName);
  drawField(doc, 'Employer Address', data.coEmployerAddress);
  drawFieldRow(doc, 'Position / Title', data.coPositionTitle, 'Work Phone', data.coWorkPhone);
  drawFieldRow(doc, 'How Long (Yrs)', data.coEmployerHowLongYrs, 'How Long (Mos)', data.coEmployerHowLongMos);
  drawField(doc, 'Gross Annual Salary', data.coGrossAnnualSalary);

  // ── Signature ─────────────────────────────────────────────────────
  drawSection(doc, 'Signature');
  drawFieldRow(doc, 'Applicant Signature', data.signatureApplicant, 'Co-Applicant Signature', data.signatureCoApplicant);
  drawField(doc, 'Date', data.signatureDate);
  drawField(doc, 'Agreed to Terms', data.agreed);

  drawFooter(doc);

  return pdfToBuffer(doc);
}
