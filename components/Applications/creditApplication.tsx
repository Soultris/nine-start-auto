'use client';

import React, { useState } from 'react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const inputClass =
    'w-full bg-card-light border border-border-light rounded-lg px-4 py-2.5 text-black text-sm focus:outline-none focus:border-brand-gold transition-colors duration-300';

  const labelClass = 'block text-black text-sm font-medium mb-2 sm:mb-3.5';

  const sectionTitleClass =
    'text-base sm:text-lg font-medium text-black tracking-tight mb-4 sm:mb-5 pb-2 border-b border-border-light';

  const OCCUPANCY_OPTIONS = ['Rent', 'Own', 'Live W/ Relative'];

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
              Please fill out the application below. Your information is secure and will not be
              shared with any third parties. We value your privacy as a customer.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-12">

            {/* ── APPLICANT ── */}
            <div>
              <h3 className={sectionTitleClass}>Applicant</h3>
              <div className="space-y-5 sm:space-y-6">

                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-5">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Middle Initial</label>
                    <input type="text" name="middleInitial" value={formData.middleInitial} onChange={handleChange} maxLength={1} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                {/* Address + Home # */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Street Address</label>
                    <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Home </label>
                    <input type="tel" name="homePhone" value={formData.homePhone} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                {/* City / State / Zip / Cell # */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Zip Code</label>
                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Cell </label>
                    <input type="tel" name="cellPhone" value={formData.cellPhone} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                {/* Occupancy + Monthly Payment + How Long */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>Occupancy Type</label>
                    <div className="flex flex-col gap-2 mt-1">
                      {OCCUPANCY_OPTIONS.map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="occupancyType"
                            value={type}
                            checked={formData.occupancyType.includes(type)}
                            onChange={handleChange}
                            className="w-4 h-4 accent-white rounded border-muted"
                          />
                          <span className="text-sm text-black">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Monthly Payment</label>
                    <input type="text" name="monthlyPayment" value={formData.monthlyPayment} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>How Long</label>
                    <input type="text" name="howLong" value={formData.howLong} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                {/* SSN + DOB + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>Social Security </label>
                    <input type="text" name="socialSecurity" value={formData.socialSecurity} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Date of Birth</label>
                    <input type="text" name="dateOfBirth" placeholder="MM/DD/YYYY" value={formData.dateOfBirth} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── APPLICANT EMPLOYMENT ── */}
            <div>
              <h3 className={sectionTitleClass}>Employment</h3>
              <div className="space-y-5 sm:space-y-6">

                {/* Employer Name + How Long */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-5">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Employer Name</label>
                    <input type="text" name="employerName" value={formData.employerName} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>How Long — Yrs</label>
                    <input type="text" name="employerHowLongYrs" value={formData.employerHowLongYrs} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>How Long — Mos</label>
                    <input type="text" name="employerHowLongMos" value={formData.employerHowLongMos} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                {/* Employer Address */}
                <div>
                  <label className={labelClass}>Employer Address</label>
                  <input type="text" name="employerAddress" value={formData.employerAddress} onChange={handleChange} className={inputClass} />
                </div>

                {/* Position + Work Phone + Salary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>Position / Title</label>
                    <input type="text" name="positionTitle" value={formData.positionTitle} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Work Phone</label>
                    <input type="tel" name="workPhone" value={formData.workPhone} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Gross Annual Salary</label>
                    <input type="text" name="grossAnnualSalary" value={formData.grossAnnualSalary} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── CO-APPLICANT ── */}
            <div>
              <h3 className={sectionTitleClass}>Co-Applicant</h3>
              <div className="space-y-5 sm:space-y-6">

                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-5">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>First Name</label>
                    <input type="text" name="coFirstName" value={formData.coFirstName} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Middle Initial</label>
                    <input type="text" name="coMiddleInitial" value={formData.coMiddleInitial} onChange={handleChange} maxLength={1} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input type="text" name="coLastName" value={formData.coLastName} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                {/* Address + Home # */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Street Address</label>
                    <input type="text" name="coStreetAddress" value={formData.coStreetAddress} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Home #</label>
                    <input type="tel" name="coHomePhone" value={formData.coHomePhone} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                {/* City / State / Zip / Cell # */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>City</label>
                    <input type="text" name="coCity" value={formData.coCity} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>State</label>
                    <input type="text" name="coState" value={formData.coState} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Zip Code</label>
                    <input type="text" name="coZipCode" value={formData.coZipCode} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Cell #</label>
                    <input type="tel" name="coCellPhone" value={formData.coCellPhone} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                {/* Occupancy + Monthly Payment + How Long */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>Occupancy Type</label>
                    <div className="flex flex-col gap-2 mt-1">
                      {OCCUPANCY_OPTIONS.map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="coOccupancyType"
                            value={type}
                            checked={formData.coOccupancyType.includes(type)}
                            onChange={handleChange}
                            className="w-4 h-4 accent-white rounded border-muted"
                          />
                          <span className="text-sm text-black">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Monthly Payment</label>
                    <input type="text" name="coMonthlyPayment" value={formData.coMonthlyPayment} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>How Long</label>
                    <input type="text" name="coHowLong" value={formData.coHowLong} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                {/* SSN + DOB + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>Social Security #</label>
                    <input type="text" name="coSocialSecurity" value={formData.coSocialSecurity} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Date of Birth</label>
                    <input type="text" name="coDateOfBirth" placeholder="MM/DD/YYYY" value={formData.coDateOfBirth} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input type="email" name="coEmail" value={formData.coEmail} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── CO-APPLICANT EMPLOYMENT ── */}
            <div>
              <h3 className={sectionTitleClass}>Co-Applicant Employment</h3>
              <div className="space-y-5 sm:space-y-6">

                {/* Employer Name + How Long */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-5">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Employer Name</label>
                    <input type="text" name="coEmployerName" value={formData.coEmployerName} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>How Long — Yrs</label>
                    <input type="text" name="coEmployerHowLongYrs" value={formData.coEmployerHowLongYrs} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>How Long — Mos</label>
                    <input type="text" name="coEmployerHowLongMos" value={formData.coEmployerHowLongMos} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                {/* Employer Address */}
                <div>
                  <label className={labelClass}>Employer Address</label>
                  <input type="text" name="coEmployerAddress" value={formData.coEmployerAddress} onChange={handleChange} className={inputClass} />
                </div>

                {/* Position + Work Phone + Salary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>Position / Title</label>
                    <input type="text" name="coPositionTitle" value={formData.coPositionTitle} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Work Phone</label>
                    <input type="tel" name="coWorkPhone" value={formData.coWorkPhone} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Gross Annual Salary</label>
                    <input type="text" name="coGrossAnnualSalary" value={formData.coGrossAnnualSalary} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
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
                <label className={labelClass}>Signature of Applicant</label>
                <input type="text" name="signatureApplicant" value={formData.signatureApplicant} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Signature of Co-Applicant</label>
                <input type="text" name="signatureCoApplicant" value={formData.signatureCoApplicant} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Date</label>
                <input type="text" name="signatureDate" placeholder="MM/DD/YYYY" value={formData.signatureDate} onChange={handleChange} className={inputClass} />
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
                className="mt-0.5 w-4 h-4 accent-white flex-shrink-0"
              />
              <label htmlFor="agreed" className="text-sm text-black leading-relaxed cursor-pointer">
                I agree that by submitting this application, I authorize and give this dealership, as
                well as any potential financing source this dealership presents this application to,
                my consent to obtain my credit report from any credit reporting agency used to
                complete an investigation of my credit.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-brand-gold hover:bg-brand-gold-hover text-black py-2.5 sm:py-3 px-6 sm:px-8 rounded font-semibold text-sm transition-all active:scale-95 cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}