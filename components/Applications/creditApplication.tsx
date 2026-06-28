'use client';

import React, { useState, useMemo } from 'react';

export default function BusinessApplication() {
  const [formData, setFormData] = useState({
    // Applicant
    firstName: '',
    middleInitial: '',
    lastName: '',
    streetAddress: '',
    homePhone: '',
    city: '',
    state: '',
    zipCode: '',
    cellPhone: '',
    occupancyType: [] as string[],
    monthlyPayment: '',
    howLong: '',
    socialSecurity: '',
    dateOfBirth: '',
    email: '',
    // Applicant Employment
    employerName: '',
    employerHowLongYrs: '',
    employerHowLongMos: '',
    employerAddress: '',
    positionTitle: '',
    workPhone: '',
    grossAnnualSalary: '',
    // Co-Applicant
    coFirstName: '',
    coMiddleInitial: '',
    coLastName: '',
    coStreetAddress: '',
    coHomePhone: '',
    coCity: '',
    coState: '',
    coZipCode: '',
    coCellPhone: '',
    coOccupancyType: [] as string[],
    coMonthlyPayment: '',
    coHowLong: '',
    coSocialSecurity: '',
    coDateOfBirth: '',
    coEmail: '',
    // Co-Applicant Employment
    coEmployerName: '',
    coEmployerHowLongYrs: '',
    coEmployerHowLongMos: '',
    coEmployerAddress: '',
    coPositionTitle: '',
    coWorkPhone: '',
    coGrossAnnualSalary: '',
    // Signature
    signatureApplicant: '',
    signatureCoApplicant: '',
    signatureDate: '',
    agreed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Track which fields have been touched (blurred) so errors only show after interaction
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  // Whether the user tried to submit (to show all errors at once)
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // ─── Section completion logic ──────────────────────────────────────────────
  //
  // A section is considered "filled" when its required fields are non-empty.
  // At least ONE section must be complete to allow submission.
  // The signature + agreement block is always required when submitting.

  const sectionCompletion = useMemo(() => {
    const f = formData;

    const applicantFilled =
      f.firstName.trim() !== '' &&
      f.lastName.trim() !== '' &&
      f.streetAddress.trim() !== '' &&
      f.city.trim() !== '' &&
      f.state.trim() !== '' &&
      f.zipCode.trim() !== '' &&
      f.socialSecurity.trim() !== '' &&
      f.dateOfBirth.trim() !== '' &&
      f.email.trim() !== '';

    const employmentFilled =
      f.employerName.trim() !== '' &&
      f.employerAddress.trim() !== '' &&
      f.positionTitle.trim() !== '' &&
      f.grossAnnualSalary.trim() !== '';

    const coApplicantFilled =
      f.coFirstName.trim() !== '' &&
      f.coLastName.trim() !== '' &&
      f.coStreetAddress.trim() !== '' &&
      f.coCity.trim() !== '' &&
      f.coState.trim() !== '' &&
      f.coZipCode.trim() !== '' &&
      f.coSocialSecurity.trim() !== '' &&
      f.coDateOfBirth.trim() !== '' &&
      f.coEmail.trim() !== '';

    const coEmploymentFilled =
      f.coEmployerName.trim() !== '' &&
      f.coEmployerAddress.trim() !== '' &&
      f.coPositionTitle.trim() !== '' &&
      f.coGrossAnnualSalary.trim() !== '';

    return { applicantFilled, employmentFilled, coApplicantFilled, coEmploymentFilled };
  }, [formData]);

  const atLeastOneSectionComplete = Object.values(sectionCompletion).some(Boolean);

  const signatureValid =
    formData.signatureApplicant.trim() !== '' &&
    formData.signatureDate.trim() !== '' &&
    formData.agreed;

  const canSubmit = atLeastOneSectionComplete && signatureValid;

  // Per-section required fields for inline error display
  const sectionRequiredFields: Record<string, { key: keyof typeof formData; label: string }[]> = {
    applicant: [
      { key: 'firstName', label: 'First Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'streetAddress', label: 'Street Address' },
      { key: 'city', label: 'City' },
      { key: 'state', label: 'State' },
      { key: 'zipCode', label: 'Zip Code' },
      { key: 'socialSecurity', label: 'Social Security' },
      { key: 'dateOfBirth', label: 'Date of Birth' },
      { key: 'email', label: 'Email Address' },
    ],
    employment: [
      { key: 'employerName', label: 'Employer Name' },
      { key: 'employerAddress', label: 'Employer Address' },
      { key: 'positionTitle', label: 'Position / Title' },
      { key: 'grossAnnualSalary', label: 'Gross Annual Salary' },
    ],
    coApplicant: [
      { key: 'coFirstName', label: 'First Name' },
      { key: 'coLastName', label: 'Last Name' },
      { key: 'coStreetAddress', label: 'Street Address' },
      { key: 'coCity', label: 'City' },
      { key: 'coState', label: 'State' },
      { key: 'coZipCode', label: 'Zip Code' },
      { key: 'coSocialSecurity', label: 'Social Security' },
      { key: 'coDateOfBirth', label: 'Date of Birth' },
      { key: 'coEmail', label: 'Email Address' },
    ],
    coEmployment: [
      { key: 'coEmployerName', label: 'Employer Name' },
      { key: 'coEmployerAddress', label: 'Employer Address' },
      { key: 'coPositionTitle', label: 'Position / Title' },
      { key: 'coGrossAnnualSalary', label: 'Gross Annual Salary' },
    ],
  };

  // Returns true if the field has an error that should be shown
  const showFieldError = (fieldKey: keyof typeof formData): boolean => {
    if (!submitAttempted && !touched[fieldKey]) return false;
    const value = formData[fieldKey];
    if (typeof value === 'string') return value.trim() === '';
    if (typeof value === 'boolean') return false;
    return false;
  };

  // Determine if a section has been "started" (any field non-empty) — used to
  // decide whether to highlight its missing required fields.
  const isSectionStarted = (section: string): boolean => {
    return sectionRequiredFields[section].some(({ key }) => {
      const v = formData[key];
      return typeof v === 'string' && v.trim() !== '';
    });
  };

  // Show inline errors for a section only if: submit was attempted OR the section was started
  const showSectionErrors = (section: string): boolean =>
    submitAttempted || isSectionStarted(section);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'agreed') {
      setFormData({ ...formData, agreed: checked });
    } else if (type === 'checkbox' && name === 'occupancyType') {
      const updated = checked
        ? [...formData.occupancyType, value]
        : formData.occupancyType.filter((v) => v !== value);
      setFormData({ ...formData, occupancyType: updated });
    } else if (type === 'checkbox' && name === 'coOccupancyType') {
      const updated = checked
        ? [...formData.coOccupancyType, value]
        : formData.coOccupancyType.filter((v) => v !== value);
      setFormData({ ...formData, coOccupancyType: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!canSubmit) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/process-form/credit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error ?? 'Submission failed. Please try again.');
      }

      setSubmitStatus('success');
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'An unexpected error occurred.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Style helpers ─────────────────────────────────────────────────────────

  const inputClass = (fieldKey?: keyof typeof formData, section?: string) => {
    const hasError =
      fieldKey &&
      section &&
      showSectionErrors(section) &&
      !sectionCompletion[section as keyof typeof sectionCompletion] &&
      showFieldError(fieldKey);

    return [
      'w-full bg-card-light border rounded-lg px-4 py-2.5 text-black text-sm focus:outline-none transition-colors duration-300',
      hasError
        ? 'border-red-400 focus:border-red-500 bg-red-50'
        : 'border-border-light focus:border-brand-gold',
    ].join(' ');
  };

  const labelClass = 'block text-black text-sm font-medium mb-2 sm:mb-3.5';

  const sectionTitleClass =
    'text-base sm:text-lg font-medium text-black tracking-tight mb-4 sm:mb-5 pb-2 border-b border-border-light flex items-center justify-between';

  const OCCUPANCY_OPTIONS = ['Rent', 'Own', 'Live W/ Relative'];

  // ─── Section completion badge ──────────────────────────────────────────────
  const CompletionBadge = ({ complete, started }: { complete: boolean; started: boolean }) => {
    if (complete) {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Complete
        </span>
      );
    }
    if (started) {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9V6a1 1 0 112 0v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3z" clipRule="evenodd" />
          </svg>
          In progress
        </span>
      );
    }
    return (
      <span className="text-xs font-normal text-gray-400">Optional</span>
    );
  };

  // ─── Missing fields summary for a section ────────────────────────────────
  const MissingFieldsNote = ({ section }: { section: string }) => {
    if (!showSectionErrors(section)) return null;
    if (sectionCompletion[section as keyof typeof sectionCompletion]) return null;
    if (!isSectionStarted(section)) return null;

    const missing = sectionRequiredFields[section]
      .filter(({ key }) => {
        const v = formData[key];
        return typeof v === 'string' && v.trim() === '';
      })
      .map(({ label }) => label);

    if (missing.length === 0) return null;

    return (
      <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
        To complete this section, fill in: {missing.join(', ')}.
      </p>
    );
  };

  return (
    <div className="w-full font-[montserrat]">
      {/* Hero Banner */}
      <div className="relative w-full h-[220px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden">
        <img
          src="/Applications/ApplicationTop.png"
          alt="Credit Application"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 z-10 flex items-center justify-center text-center px-4 sm:items-end sm:justify-start sm:text-left sm:pb-12">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-widest leading-tight">
              CREDIT APPLICATION
            </h1>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <section className="w-full bg-white py-10 sm:py-14 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-2 tracking-tight">
              CREDIT APPLICATION
            </h2>
            <p className="text-muted text-sm leading-relaxed font-light max-w-2xl">
              Please fill out the application below. Complete at least one section fully to submit.
              Your information is secure and will not be shared with any third parties.
            </p>
          </div>

          {/* Top-level validation notice after submit attempt */}
          {submitAttempted && !atLeastOneSectionComplete && (
            <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-3 text-sm">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p>
                Please complete at least one full section — <strong>Applicant</strong>,{' '}
                <strong>Employment</strong>, <strong>Co-Applicant</strong>, or{' '}
                <strong>Co-Applicant Employment</strong> — before submitting.
              </p>
            </div>
          )}

          {submitAttempted && atLeastOneSectionComplete && !signatureValid && (
            <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-3 text-sm">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p>Please provide your signature, date, and check the agreement box before submitting.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-12" noValidate>

            {/* ── APPLICANT ── */}
            <div>
              <h3 className={sectionTitleClass}>
                <span>Applicant</span>
                <CompletionBadge
                  complete={sectionCompletion.applicantFilled}
                  started={isSectionStarted('applicant')}
                />
              </h3>
              <div className="space-y-5 sm:space-y-6">

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-5">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} onBlur={handleBlur} className={inputClass('firstName', 'applicant')} />
                  </div>
                  <div>
                    <label className={labelClass}>Middle Initial</label>
                    <input type="text" name="middleInitial" value={formData.middleInitial} onChange={handleChange} onBlur={handleBlur} maxLength={1} className={inputClass()} />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} onBlur={handleBlur} className={inputClass('lastName', 'applicant')} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Street Address</label>
                    <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} onBlur={handleBlur} className={inputClass('streetAddress', 'applicant')} />
                  </div>
                  <div>
                    <label className={labelClass}>Home Phone</label>
                    <input type="tel" name="homePhone" value={formData.homePhone} onChange={handleChange} onBlur={handleBlur} className={inputClass()} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} onBlur={handleBlur} className={inputClass('city', 'applicant')} />
                  </div>
                  <div>
                    <label className={labelClass}>State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} onBlur={handleBlur} className={inputClass('state', 'applicant')} />
                  </div>
                  <div>
                    <label className={labelClass}>Zip Code</label>
                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} onBlur={handleBlur} className={inputClass('zipCode', 'applicant')} />
                  </div>
                  <div>
                    <label className={labelClass}>Cell Phone</label>
                    <input type="tel" name="cellPhone" value={formData.cellPhone} onChange={handleChange} onBlur={handleBlur} className={inputClass()} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>Occupancy Type</label>
                    <div className="flex flex-col gap-2 mt-1">
                      {OCCUPANCY_OPTIONS.map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" name="occupancyType" value={type} checked={formData.occupancyType.includes(type)} onChange={handleChange} className="w-4 h-4 accent-white rounded border-muted" />
                          <span className="text-sm text-black">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Monthly Payment</label>
                    <input type="text" name="monthlyPayment" value={formData.monthlyPayment} onChange={handleChange} onBlur={handleBlur} className={inputClass()} />
                  </div>
                  <div>
                    <label className={labelClass}>How Long</label>
                    <input type="text" name="howLong" value={formData.howLong} onChange={handleChange} onBlur={handleBlur} className={inputClass()} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>Social Security</label>
                    <input type="text" name="socialSecurity" value={formData.socialSecurity} onChange={handleChange} onBlur={handleBlur} className={inputClass('socialSecurity', 'applicant')} />
                  </div>
                  <div>
                    <label className={labelClass}>Date of Birth</label>
                    <input type="text" name="dateOfBirth" placeholder="MM/DD/YYYY" value={formData.dateOfBirth} onChange={handleChange} onBlur={handleBlur} className={inputClass('dateOfBirth', 'applicant')} />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} className={inputClass('email', 'applicant')} />
                  </div>
                </div>

                <MissingFieldsNote section="applicant" />
              </div>
            </div>

            {/* ── APPLICANT EMPLOYMENT ── */}
            <div>
              <h3 className={sectionTitleClass}>
                <span>Employment</span>
                <CompletionBadge
                  complete={sectionCompletion.employmentFilled}
                  started={isSectionStarted('employment')}
                />
              </h3>
              <div className="space-y-5 sm:space-y-6">

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-5">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Employer Name</label>
                    <input type="text" name="employerName" value={formData.employerName} onChange={handleChange} onBlur={handleBlur} className={inputClass('employerName', 'employment')} />
                  </div>
                  <div>
                    <label className={labelClass}>How Long — Yrs</label>
                    <input type="text" name="employerHowLongYrs" value={formData.employerHowLongYrs} onChange={handleChange} onBlur={handleBlur} className={inputClass()} />
                  </div>
                  <div>
                    <label className={labelClass}>How Long — Mos</label>
                    <input type="text" name="employerHowLongMos" value={formData.employerHowLongMos} onChange={handleChange} onBlur={handleBlur} className={inputClass()} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Employer Address</label>
                  <input type="text" name="employerAddress" value={formData.employerAddress} onChange={handleChange} onBlur={handleBlur} className={inputClass('employerAddress', 'employment')} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>Position / Title</label>
                    <input type="text" name="positionTitle" value={formData.positionTitle} onChange={handleChange} onBlur={handleBlur} className={inputClass('positionTitle', 'employment')} />
                  </div>
                  <div>
                    <label className={labelClass}>Work Phone</label>
                    <input type="tel" name="workPhone" value={formData.workPhone} onChange={handleChange} onBlur={handleBlur} className={inputClass()} />
                  </div>
                  <div>
                    <label className={labelClass}>Gross Annual Salary</label>
                    <input type="text" name="grossAnnualSalary" value={formData.grossAnnualSalary} onChange={handleChange} onBlur={handleBlur} className={inputClass('grossAnnualSalary', 'employment')} />
                  </div>
                </div>

                <MissingFieldsNote section="employment" />
              </div>
            </div>

            {/* ── CO-APPLICANT ── */}
            <div>
              <h3 className={sectionTitleClass}>
                <span>Co-Applicant</span>
                <CompletionBadge
                  complete={sectionCompletion.coApplicantFilled}
                  started={isSectionStarted('coApplicant')}
                />
              </h3>
              <div className="space-y-5 sm:space-y-6">

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-5">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>First Name</label>
                    <input type="text" name="coFirstName" value={formData.coFirstName} onChange={handleChange} onBlur={handleBlur} className={inputClass('coFirstName', 'coApplicant')} />
                  </div>
                  <div>
                    <label className={labelClass}>Middle Initial</label>
                    <input type="text" name="coMiddleInitial" value={formData.coMiddleInitial} onChange={handleChange} onBlur={handleBlur} maxLength={1} className={inputClass()} />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input type="text" name="coLastName" value={formData.coLastName} onChange={handleChange} onBlur={handleBlur} className={inputClass('coLastName', 'coApplicant')} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Street Address</label>
                    <input type="text" name="coStreetAddress" value={formData.coStreetAddress} onChange={handleChange} onBlur={handleBlur} className={inputClass('coStreetAddress', 'coApplicant')} />
                  </div>
                  <div>
                    <label className={labelClass}>Home #</label>
                    <input type="tel" name="coHomePhone" value={formData.coHomePhone} onChange={handleChange} onBlur={handleBlur} className={inputClass()} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>City</label>
                    <input type="text" name="coCity" value={formData.coCity} onChange={handleChange} onBlur={handleBlur} className={inputClass('coCity', 'coApplicant')} />
                  </div>
                  <div>
                    <label className={labelClass}>State</label>
                    <input type="text" name="coState" value={formData.coState} onChange={handleChange} onBlur={handleBlur} className={inputClass('coState', 'coApplicant')} />
                  </div>
                  <div>
                    <label className={labelClass}>Zip Code</label>
                    <input type="text" name="coZipCode" value={formData.coZipCode} onChange={handleChange} onBlur={handleBlur} className={inputClass('coZipCode', 'coApplicant')} />
                  </div>
                  <div>
                    <label className={labelClass}>Cell #</label>
                    <input type="tel" name="coCellPhone" value={formData.coCellPhone} onChange={handleChange} onBlur={handleBlur} className={inputClass()} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>Occupancy Type</label>
                    <div className="flex flex-col gap-2 mt-1">
                      {OCCUPANCY_OPTIONS.map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" name="coOccupancyType" value={type} checked={formData.coOccupancyType.includes(type)} onChange={handleChange} className="w-4 h-4 accent-white rounded border-muted" />
                          <span className="text-sm text-black">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Monthly Payment</label>
                    <input type="text" name="coMonthlyPayment" value={formData.coMonthlyPayment} onChange={handleChange} onBlur={handleBlur} className={inputClass()} />
                  </div>
                  <div>
                    <label className={labelClass}>How Long</label>
                    <input type="text" name="coHowLong" value={formData.coHowLong} onChange={handleChange} onBlur={handleBlur} className={inputClass()} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>Social Security #</label>
                    <input type="text" name="coSocialSecurity" value={formData.coSocialSecurity} onChange={handleChange} onBlur={handleBlur} className={inputClass('coSocialSecurity', 'coApplicant')} />
                  </div>
                  <div>
                    <label className={labelClass}>Date of Birth</label>
                    <input type="text" name="coDateOfBirth" placeholder="MM/DD/YYYY" value={formData.coDateOfBirth} onChange={handleChange} onBlur={handleBlur} className={inputClass('coDateOfBirth', 'coApplicant')} />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input type="email" name="coEmail" value={formData.coEmail} onChange={handleChange} onBlur={handleBlur} className={inputClass('coEmail', 'coApplicant')} />
                  </div>
                </div>

                <MissingFieldsNote section="coApplicant" />
              </div>
            </div>

            {/* ── CO-APPLICANT EMPLOYMENT ── */}
            <div>
              <h3 className={sectionTitleClass}>
                <span>Co-Applicant Employment</span>
                <CompletionBadge
                  complete={sectionCompletion.coEmploymentFilled}
                  started={isSectionStarted('coEmployment')}
                />
              </h3>
              <div className="space-y-5 sm:space-y-6">

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-5">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Employer Name</label>
                    <input type="text" name="coEmployerName" value={formData.coEmployerName} onChange={handleChange} onBlur={handleBlur} className={inputClass('coEmployerName', 'coEmployment')} />
                  </div>
                  <div>
                    <label className={labelClass}>How Long — Yrs</label>
                    <input type="text" name="coEmployerHowLongYrs" value={formData.coEmployerHowLongYrs} onChange={handleChange} onBlur={handleBlur} className={inputClass()} />
                  </div>
                  <div>
                    <label className={labelClass}>How Long — Mos</label>
                    <input type="text" name="coEmployerHowLongMos" value={formData.coEmployerHowLongMos} onChange={handleChange} onBlur={handleBlur} className={inputClass()} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Employer Address</label>
                  <input type="text" name="coEmployerAddress" value={formData.coEmployerAddress} onChange={handleChange} onBlur={handleBlur} className={inputClass('coEmployerAddress', 'coEmployment')} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>Position / Title</label>
                    <input type="text" name="coPositionTitle" value={formData.coPositionTitle} onChange={handleChange} onBlur={handleBlur} className={inputClass('coPositionTitle', 'coEmployment')} />
                  </div>
                  <div>
                    <label className={labelClass}>Work Phone</label>
                    <input type="tel" name="coWorkPhone" value={formData.coWorkPhone} onChange={handleChange} onBlur={handleBlur} className={inputClass()} />
                  </div>
                  <div>
                    <label className={labelClass}>Gross Annual Salary</label>
                    <input type="text" name="coGrossAnnualSalary" value={formData.coGrossAnnualSalary} onChange={handleChange} onBlur={handleBlur} className={inputClass('coGrossAnnualSalary', 'coEmployment')} />
                  </div>
                </div>

                <MissingFieldsNote section="coEmployment" />
              </div>
            </div>

            {/* ── CERTIFICATION ── */}
            <div className="bg-card-light border border-border-light rounded-lg px-4 py-4 sm:px-5 sm:py-5">
              <p className="text-sm text-black leading-relaxed">
                By your signature below, you certify that you have read and completed this application
                to obtain credit, and that all information provided by you for this transaction is true,
                correct and complete. You understand and agree that this application and related credit
                information will be forwarded to multiple financial institutions in order to obtain credit
                on your behalf. You authorize the Dealer to make inquiries and obtain information about
                you as we deem appropriate for the purpose of evaluating or submitting this application.
              </p>
            </div>

            {/* ── SIGNATURE ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              <div>
                <label className={labelClass}>
                  Signature of Applicant <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="signatureApplicant"
                  value={formData.signatureApplicant}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={[
                    'w-full border rounded-lg px-4 py-2.5 text-black text-sm focus:outline-none transition-colors duration-300',
                    submitAttempted && !formData.signatureApplicant.trim()
                      ? 'border-red-400 bg-red-50 focus:border-red-500'
                      : 'border-border-light bg-card-light focus:border-brand-gold',
                  ].join(' ')}
                />
                {submitAttempted && !formData.signatureApplicant.trim() && (
                  <p className="mt-1 text-xs text-red-600">Required</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Signature of Co-Applicant</label>
                <input type="text" name="signatureCoApplicant" value={formData.signatureCoApplicant} onChange={handleChange} onBlur={handleBlur} className="w-full bg-card-light border border-border-light rounded-lg px-4 py-2.5 text-black text-sm focus:outline-none focus:border-brand-gold transition-colors duration-300" />
              </div>
              <div>
                <label className={labelClass}>
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="signatureDate"
                  placeholder="MM/DD/YYYY"
                  value={formData.signatureDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={[
                    'w-full border rounded-lg px-4 py-2.5 text-black text-sm focus:outline-none transition-colors duration-300',
                    submitAttempted && !formData.signatureDate.trim()
                      ? 'border-red-400 bg-red-50 focus:border-red-500'
                      : 'border-border-light bg-card-light focus:border-brand-gold',
                  ].join(' ')}
                />
                {submitAttempted && !formData.signatureDate.trim() && (
                  <p className="mt-1 text-xs text-red-600">Required</p>
                )}
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                name="agreed"
                id="agreed"
                checked={formData.agreed ?? false}
                onChange={handleChange}
                className={[
                  'mt-0.5 w-4 h-4 flex-shrink-0',
                  submitAttempted && !formData.agreed ? 'outline outline-2 outline-red-400 rounded' : '',
                ].join(' ')}
              />
              <label htmlFor="agreed" className="text-sm text-black leading-relaxed cursor-pointer">
                I agree that by submitting this application, I authorize and give this dealership, as
                well as any potential financing source this dealership presents this application to,
                my consent to obtain my credit report from any credit reporting agency used to
                complete an investigation of my credit.{' '}
                <span className="text-red-500">*</span>
              </label>
            </div>
            {submitAttempted && !formData.agreed && (
              <p className="text-xs text-red-600 -mt-4">You must agree to the terms before submitting.</p>
            )}

            {/* Submit */}
            <div className="space-y-4">
              {submitStatus === 'success' && (
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-3 text-sm">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p>
                    <strong>Application submitted successfully!</strong> We've received your information and a confirmation email has been sent to you.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-3 text-sm">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p>{errorMessage || 'Something went wrong. Please try again.'}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-gold hover:bg-brand-gold-hover text-black py-2.5 sm:py-3 px-6 sm:px-8 rounded font-semibold text-sm transition-all active:scale-95 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Processing…
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}