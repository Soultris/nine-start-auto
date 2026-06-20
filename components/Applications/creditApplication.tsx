'use client';

import React, { useState } from 'react';

export default function BusinessApplication() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    contactNumber: '',
    streetAddress: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    occupancyType: [] as string[],
    monthlyPayment: '',
    timeDuration: '',
    dateOfBirth: '',
    socialSecurity: '',
    email: '',
    agreed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'agreed') {
      setFormData({ ...formData, agreed: checked });
    } else if (type === 'checkbox') {
      const updated = checked
        ? [...formData.occupancyType, value]
        : formData.occupancyType.filter((v) => v !== value);
      setFormData({ ...formData, occupancyType: updated });
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

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Row 1: Name + Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <div>
                <label className={labelClass}>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Middle Name</label>
                <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Contact Number</label>
                <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            {/* Row 2: Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className={labelClass}>Street Address</label>
                <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Address Line 2</label>
                <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            {/* Row 3: City, State, Zip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
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
            </div>

            {/* Row 4: Occupancy Type */}
            <div>
              <label className={labelClass}>Occupancy Type</label>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-1">
                {['Own', 'Rent', 'Finance'].map((type) => (
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

            {/* Row 5: Monthly Payment + Time Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className={labelClass}>Monthly Payment</label>
                <input type="text" name="monthlyPayment" value={formData.monthlyPayment} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Time Duration</label>
                <input type="text" name="timeDuration" value={formData.timeDuration} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            {/* Row 6: DOB, SSN, Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              <div>
                <label className={labelClass}>Date of Birth</label>
                <input type="text" name="dateOfBirth" placeholder="MM/DD/YYYY" value={formData.dateOfBirth} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Social Security</label>
                <input type="text" name="socialSecurity" value={formData.socialSecurity} onChange={handleChange} className={inputClass} />
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <label className={labelClass}>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} />
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