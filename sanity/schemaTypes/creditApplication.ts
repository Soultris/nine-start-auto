/**
 * creditApplication.ts — Sanity schema
 *
 * Stores every field from the Credit Application form,
 * plus a `pdf` file reference that is patched in after the
 * PDF is generated and uploaded via the API route.
 */

import { defineField, defineType } from 'sanity';

export const creditApplicationType = defineType({
  name: 'creditApplication',
  title: 'Credit Application',
  type: 'document',
  fields: [
    // ── Applicant ────────────────────────────────────────────────
    defineField({ name: 'firstName',      title: 'First Name',       type: 'string' }),
    defineField({ name: 'middleInitial',  title: 'Middle Initial',   type: 'string' }),
    defineField({ name: 'lastName',       title: 'Last Name',        type: 'string' }),
    defineField({ name: 'streetAddress',  title: 'Street Address',   type: 'string' }),
    defineField({ name: 'homePhone',      title: 'Home Phone',       type: 'string' }),
    defineField({ name: 'city',           title: 'City',             type: 'string' }),
    defineField({ name: 'state',          title: 'State',            type: 'string' }),
    defineField({ name: 'zipCode',        title: 'Zip Code',         type: 'string' }),
    defineField({ name: 'cellPhone',      title: 'Cell Phone',       type: 'string' }),
    defineField({
      name: 'occupancyType',
      title: 'Occupancy Type',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'monthlyPayment', title: 'Monthly Payment',  type: 'string' }),
    defineField({ name: 'howLong',        title: 'How Long',         type: 'string' }),
    defineField({ name: 'socialSecurity', title: 'Social Security',  type: 'string' }),
    defineField({ name: 'dateOfBirth',    title: 'Date of Birth',    type: 'string' }),
    defineField({ name: 'email',          title: 'Email Address',    type: 'string' }),

    // ── Applicant Employment ─────────────────────────────────────
    defineField({ name: 'employerName',        title: 'Employer Name',           type: 'string' }),
    defineField({ name: 'employerHowLongYrs',  title: 'Employer How Long (Yrs)', type: 'string' }),
    defineField({ name: 'employerHowLongMos',  title: 'Employer How Long (Mos)', type: 'string' }),
    defineField({ name: 'employerAddress',     title: 'Employer Address',        type: 'string' }),
    defineField({ name: 'positionTitle',       title: 'Position / Title',        type: 'string' }),
    defineField({ name: 'workPhone',           title: 'Work Phone',              type: 'string' }),
    defineField({ name: 'grossAnnualSalary',   title: 'Gross Annual Salary',     type: 'string' }),

    // ── Co-Applicant ─────────────────────────────────────────────
    defineField({ name: 'coFirstName',      title: 'Co-Applicant First Name',    type: 'string' }),
    defineField({ name: 'coMiddleInitial',  title: 'Co-Applicant Middle Initial',type: 'string' }),
    defineField({ name: 'coLastName',       title: 'Co-Applicant Last Name',     type: 'string' }),
    defineField({ name: 'coStreetAddress',  title: 'Co-Applicant Street Address',type: 'string' }),
    defineField({ name: 'coHomePhone',      title: 'Co-Applicant Home Phone',    type: 'string' }),
    defineField({ name: 'coCity',           title: 'Co-Applicant City',          type: 'string' }),
    defineField({ name: 'coState',          title: 'Co-Applicant State',         type: 'string' }),
    defineField({ name: 'coZipCode',        title: 'Co-Applicant Zip Code',      type: 'string' }),
    defineField({ name: 'coCellPhone',      title: 'Co-Applicant Cell Phone',    type: 'string' }),
    defineField({
      name: 'coOccupancyType',
      title: 'Co-Applicant Occupancy Type',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'coMonthlyPayment', title: 'Co-Applicant Monthly Payment',type: 'string' }),
    defineField({ name: 'coHowLong',        title: 'Co-Applicant How Long',       type: 'string' }),
    defineField({ name: 'coSocialSecurity', title: 'Co-Applicant Social Security',type: 'string' }),
    defineField({ name: 'coDateOfBirth',    title: 'Co-Applicant Date of Birth',  type: 'string' }),
    defineField({ name: 'coEmail',          title: 'Co-Applicant Email',          type: 'string' }),

    // ── Co-Applicant Employment ──────────────────────────────────
    defineField({ name: 'coEmployerName',       title: 'Co-Applicant Employer Name',           type: 'string' }),
    defineField({ name: 'coEmployerHowLongYrs', title: 'Co-Applicant Employer How Long (Yrs)', type: 'string' }),
    defineField({ name: 'coEmployerHowLongMos', title: 'Co-Applicant Employer How Long (Mos)', type: 'string' }),
    defineField({ name: 'coEmployerAddress',    title: 'Co-Applicant Employer Address',        type: 'string' }),
    defineField({ name: 'coPositionTitle',      title: 'Co-Applicant Position/Title',          type: 'string' }),
    defineField({ name: 'coWorkPhone',          title: 'Co-Applicant Work Phone',              type: 'string' }),
    defineField({ name: 'coGrossAnnualSalary',  title: 'Co-Applicant Gross Annual Salary',     type: 'string' }),

    // ── Signature ────────────────────────────────────────────────
    defineField({ name: 'signatureApplicant',   title: 'Signature of Applicant',    type: 'string' }),
    defineField({ name: 'signatureCoApplicant', title: 'Signature of Co-Applicant', type: 'string' }),
    defineField({ name: 'signatureDate',        title: 'Signature Date',            type: 'string' }),

    // ── Consent ──────────────────────────────────────────────────
    defineField({ name: 'agreed', title: 'Agreed to Terms', type: 'boolean' }),

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
      title: 'firstName',
      subtitle: 'submittedAt',
    },
    prepare({ title, subtitle }) {
      return { title: title || 'Credit Application', subtitle };
    },
  },
});
