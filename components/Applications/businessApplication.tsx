'use client';

import React, { useState } from 'react';

const MONTHS = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 151 }, (_, i) => String(CURRENT_YEAR - i));

const COUNTRIES = [
  'United States',
  'Canada',
  'Mexico',
  'United Kingdom',
  'Ireland',
  'Australia',
  'New Zealand',
  'Germany',
  'France',
  'Spain',
  'Portugal',
  'Italy',
  'Netherlands',
  'Belgium',
  'Switzerland',
  'Austria',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Poland',
  'Greece',
  'Brazil',
  'Argentina',
  'Chile',
  'Colombia',
  'Peru',
  'India',
  'Pakistan',
  'Bangladesh',
  'Sri Lanka',
  'China',
  'Japan',
  'South Korea',
  'Singapore',
  'Malaysia',
  'Indonesia',
  'Philippines',
  'Vietnam',
  'Thailand',
  'United Arab Emirates',
  'Saudi Arabia',
  'Qatar',
  'Israel',
  'South Africa',
  'Nigeria',
  'Kenya',
  'Egypt',
  'Other',
];

const OCCUPANCY_TYPES = ['Own', 'Rent', 'Finance'];

interface BusinessApplicationFormData {
  // Business Information
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
  // Relationship to the Company
  relationshipToCompany: string;
  // Applicant Information
  applicantFirstName: string;
  applicantLastName: string;
  ssn: string;
  dateOfBirth: string;
  personalPhone: string;
  // Present Address
  presentAddress: string;
  presentCity: string;
  presentState: string;
  presentZipCode: string;
  timeAtAddressYear: string;
  timeAtAddressMonth: string;
  // Employment Information
  occupancyType: string;
  mortgageHolderLandlord: string;
  workPhone: string;
  annualIncome: string;
  // Consent
  agreedToConsent: boolean;
  // Signature Section
  companyName: string;
  signature: string;
  by: string;
  signatureDate: string;
}

const initialFormData: BusinessApplicationFormData = {
  businessName: '',
  typeOfBusiness: '',
  federalTaxId: '',
  yearEstablished: '',
  primaryPhone: '',
  emailAddress: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  relationshipToCompany: '',
  applicantFirstName: '',
  applicantLastName: '',
  ssn: '',
  dateOfBirth: '',
  personalPhone: '',
  presentAddress: '',
  presentCity: '',
  presentState: '',
  presentZipCode: '',
  timeAtAddressYear: '',
  timeAtAddressMonth: '',
  occupancyType: '',
  mortgageHolderLandlord: '',
  workPhone: '',
  annualIncome: '',
  agreedToConsent: false,
  companyName: '',
  signature: '',
  by: '',
  signatureDate: '',
};

export default function BusinessApplication() {
  const [formData, setFormData] = useState<BusinessApplicationFormData>(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const inputClass =
    'w-full bg-card-light border border-border-light rounded-lg px-4 py-2.5 text-black text-sm focus:outline-none focus:border-brand-gold transition-colors duration-300';

  const selectClass = `${inputClass} cursor-pointer`;

  const labelClass = 'block text-black text-sm font-medium mb-2 sm:mb-3.5';

  const sectionTitleClass =
    'text-base sm:text-lg font-medium text-black tracking-tight mb-4 sm:mb-5 pb-2 border-b border-border-light';

  const Required = () => <span className="text-red-500">*</span>;

  return (
    <div className="w-full font-[montserrat]">
      {/* Hero Banner */}
      <div className="relative w-full h-[220px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden">
        <img
          src="/Applications/ApplicationTop.png"
          alt="Business Application"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 z-10 flex items-center justify-center text-center px-4 sm:items-end sm:justify-start sm:text-left sm:pb-12">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-widest leading-tight">
              BUSINESS APPLICATION
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
              BUSINESS APPLICATION
            </h2>
            <p className="text-muted text-sm leading-relaxed font-light max-w-2xl">
              Please fill out the application below. Your information is secure and will not be
              shared with any third parties. We value your privacy as a customer.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-12">
            {/* Business Information */}
            <div>
              <h3 className={sectionTitleClass}>Business Information</h3>
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <label className={labelClass}>
                    Business Name <Required />
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Type of Business <Required />
                  </label>
                  <input
                    type="text"
                    name="typeOfBusiness"
                    value={formData.typeOfBusiness}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>
                      Federal Tax ID <Required />
                    </label>
                    <input
                      type="text"
                      name="federalTaxId"
                      value={formData.federalTaxId}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Year Established <Required />
                    </label>
                    <input
                      type="text"
                      name="yearEstablished"
                      value={formData.yearEstablished}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>
                      Primary Phone Number <Required />
                    </label>
                    <input
                      type="tel"
                      name="primaryPhone"
                      value={formData.primaryPhone}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Email Address <Required />
                    </label>
                    <input
                      type="email"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Relationship to the Company */}
            <div>
              <h3 className={sectionTitleClass}>Relationship to the Company</h3>
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <label className={labelClass}>
                    Your Relationship to the Company <Required />
                  </label>
                  <input
                    type="text"
                    name="relationshipToCompany"
                    value={formData.relationshipToCompany}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>First Name</label>
                    <input
                      type="text"
                      name="applicantFirstName"
                      value={formData.applicantFirstName}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input
                      type="text"
                      name="applicantLastName"
                      value={formData.applicantLastName}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>
                      SSN <Required />
                    </label>
                    <input
                      type="text"
                      name="ssn"
                      value={formData.ssn}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Date of Birth</label>
                    <input
                      type="text"
                      name="dateOfBirth"
                      placeholder="MM/DD/YYYY"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Primary Phone Number <Required />
                    </label>
                    <input
                      type="tel"
                      name="personalPhone"
                      value={formData.personalPhone}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Present Address</label>
                  <input
                    type="text"
                    name="presentAddress"
                    value={formData.presentAddress}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>City</label>
                    <input
                      type="text"
                      name="presentCity"
                      value={formData.presentCity}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>State</label>
                    <input
                      type="text"
                      name="presentState"
                      value={formData.presentState}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Zip Code</label>
                    <input
                      type="text"
                      name="presentZipCode"
                      value={formData.presentZipCode}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>Time at Address — Year</label>
                    <input
                      type="text"
                      name="timeAtAddressYear"
                      value={formData.timeAtAddressYear}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Time at Address — Month</label>
                    <input
                      type="text"
                      name="timeAtAddressMonth"
                      value={formData.timeAtAddressMonth}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Employment Information */}
            <div>
              <h3 className={sectionTitleClass}>Employment Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className={labelClass}>
                    Occupancy Type <Required />
                  </label>
                  <select
                    name="occupancyType"
                    value={formData.occupancyType}
                    onChange={handleChange}
                    required
                    className={selectClass}
                  >
                    <option value="">Select Occupancy Type</option>
                    {OCCUPANCY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>
                    Mortgage Holder / Landlord <Required />
                  </label>
                  <input
                    type="text"
                    name="mortgageHolderLandlord"
                    value={formData.mortgageHolderLandlord}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Work Phone Number</label>
                  <input
                    type="tel"
                    name="workPhone"
                    value={formData.workPhone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Annual Income <Required />
                  </label>
                  <input
                    type="text"
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Certification Section */}
            <div>
              <h3 className={sectionTitleClass}>Certification</h3>
              <div className="bg-card-light border border-border-light rounded-lg px-4 py-4 sm:px-5 sm:py-5">
                <p className="text-sm text-black leading-relaxed font-medium tracking-wide">
                  I CERTIFY THAT THE INFORMATION IS VALID AND UP TO DATE. I PERMIT MY APPLICATION
                  TO BE PROCESSED AND EVALUATED.
                </p>
              </div>
            </div>

            {/* Signature Section */}
            <div>
              <h3 className={sectionTitleClass}>Signature Section</h3>
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <label className={labelClass}>
                    Company Name <Required />
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className={labelClass}>
                      Signature <Required />
                    </label>
                    <input
                      type="text"
                      name="signature"
                      value={formData.signature}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      By <Required />
                    </label>
                    <input
                      type="text"
                      name="by"
                      value={formData.by}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Date <Required />
                    </label>
                    <input
                      type="text"
                      name="signatureDate"
                      placeholder="MM/DD/YYYY"
                      value={formData.signatureDate}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Consent */}
            <div>
              <h3 className={sectionTitleClass}>Consent</h3>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreedToConsent"
                  id="agreedToConsent"
                  checked={formData.agreedToConsent ?? false}
                  onChange={handleChange}
                  required
                  className="mt-0.5 w-4 h-4 accent-white flex-shrink-0"
                />
                <label
                  htmlFor="agreedToConsent"
                  className="text-sm text-black leading-relaxed cursor-pointer mb-10"
                >
                  I agree that by submitting this application, I authorize and give this
                  dealership, as well as any potential financing source this dealership presents
                  this application to, my consent to obtain my credit report from any credit
                  reporting agency used to complete an investigation of my credit.
                </label>
              </div>
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