/**
 * businessApplication.ts — Sanity schema
 *
 * Stores every field from the Business Application form,
 * plus a `pdf` file reference that is patched in after the
 * PDF is generated and uploaded via the API route.
 */

import { defineField, defineType } from 'sanity';

export const businessApplicationType = defineType({
  name: 'businessApplication',
  title: 'Business Application',
  type: 'document',
  fields: [
    // ── Business Information ─────────────────────────────────────
    defineField({ name: 'businessName',      title: 'Business Name',       type: 'string' }),
    defineField({ name: 'typeOfBusiness',    title: 'Type of Business',    type: 'string' }),
    defineField({ name: 'federalTaxId',      title: 'Federal Tax ID',      type: 'string' }),
    defineField({ name: 'yearEstablished',   title: 'Year Established',    type: 'string' }),
    defineField({ name: 'primaryPhone',      title: 'Primary Phone',       type: 'string' }),
    defineField({ name: 'emailAddress',      title: 'Email Address',       type: 'string' }),
    defineField({ name: 'address',           title: 'Address',             type: 'string' }),
    defineField({ name: 'city',              title: 'City',                type: 'string' }),
    defineField({ name: 'state',             title: 'State',               type: 'string' }),
    defineField({ name: 'zipCode',           title: 'Zip Code',            type: 'string' }),

    // ── Relationship / Applicant ─────────────────────────────────
    defineField({ name: 'relationshipToCompany', title: 'Relationship to Company', type: 'string' }),
    defineField({ name: 'applicantFirstName',    title: 'Applicant First Name',    type: 'string' }),
    defineField({ name: 'applicantLastName',     title: 'Applicant Last Name',     type: 'string' }),
    defineField({ name: 'ssn',                   title: 'SSN',                     type: 'string' }),
    defineField({ name: 'dateOfBirth',           title: 'Date of Birth',           type: 'string' }),
    defineField({ name: 'personalPhone',         title: 'Personal Phone',          type: 'string' }),

    // ── Present Address ──────────────────────────────────────────
    defineField({ name: 'presentAddress',     title: 'Present Address', type: 'string' }),
    defineField({ name: 'presentCity',        title: 'Present City',    type: 'string' }),
    defineField({ name: 'presentState',       title: 'Present State',   type: 'string' }),
    defineField({ name: 'presentZipCode',     title: 'Present Zip Code',type: 'string' }),
    defineField({ name: 'timeAtAddressYear',  title: 'Time at Address (Yrs)', type: 'string' }),
    defineField({ name: 'timeAtAddressMonth', title: 'Time at Address (Mos)', type: 'string' }),

    // ── Employment ───────────────────────────────────────────────
    defineField({ name: 'occupancyType',           title: 'Occupancy Type',          type: 'string' }),
    defineField({ name: 'mortgageHolderLandlord',  title: 'Mortgage Holder/Landlord',type: 'string' }),
    defineField({ name: 'workPhone',               title: 'Work Phone',              type: 'string' }),
    defineField({ name: 'annualIncome',            title: 'Annual Income',           type: 'string' }),

    // ── Signature ────────────────────────────────────────────────
    defineField({ name: 'companyName',    title: 'Company Name',  type: 'string' }),
    defineField({ name: 'signature',      title: 'Signature',     type: 'string' }),
    defineField({ name: 'by',             title: 'By',            type: 'string' }),
    defineField({ name: 'signatureDate',  title: 'Signature Date',type: 'string' }),

    // ── Consent ──────────────────────────────────────────────────
    defineField({ name: 'agreedToConsent', title: 'Agreed to Consent', type: 'boolean' }),

    // ── Generated PDF (patched in after generation) ──────────────
    defineField({
      name: 'pdf',
      title: 'Generated PDF',
      type: 'file',
      description: 'Auto-generated PDF containing all submitted form data.',
    }),

    // ── Metadata ─────────────────────────────────────────────────
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      description: 'Timestamp of form submission.',
    }),
  ],

  preview: {
    select: {
      title: 'businessName',
      subtitle: 'submittedAt',
    },
  },
});
