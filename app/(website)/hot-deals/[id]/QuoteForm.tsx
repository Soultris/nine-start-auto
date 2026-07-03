'use client';

import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface QuoteFormProps {
  carTitle: string;
}

export default function QuoteForm({ carTitle }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    vehicleOfInterest: carTitle,
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    vehicleOfInterest: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = () => {
    let valid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      vehicleOfInterest: '',
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    // Strip non-numeric/plus characters for length validation
    const cleanPhone = formData.phone.replace(/[^0-9+]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
      valid = false;
    }

    if (!formData.vehicleOfInterest.trim()) {
      newErrors.vehicleOfInterest = 'Vehicle is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    try {
      const response = await fetch('/api/quick-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote request');
      }

      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        vehicleOfInterest: carTitle,
      });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="w-full bg-gray-50 border border-border-light rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-[500px] transition-all duration-300 font-[montserrat]">
        <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 border border-brand-gold/20">
          <Check className="w-8 h-8 text-brand-gold" />
        </div>
        <h3 className="text-gray-900 text-2xl font-semibold mb-3">Quote Requested!</h3>
        <p className="text-gray-600 text-sm max-w-sm mb-8 leading-relaxed font-light font-[montserrat]">
          Your request has been successfully received. Our team will look for the best deals and contact you shortly with a personalized quote.
        </p>
        <button
          onClick={() => {
            setStatus('idle');
          }}
          className="bg-brand-gold hover:bg-brand-gold-hover text-black py-2.5 sm:py-3 px-6 sm:px-8 rounded font-semibold text-sm transition-all active:scale-95 cursor-pointer animate-fade-in"
        >
          Request Another Quote
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 border border-border-light rounded-2xl p-6 sm:p-10 flex flex-col justify-center font-[montserrat]">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">Quick Lease Quote</h2>
        <p className="text-xs sm:text-sm text-brand-gold font-semibold tracking-wide">We Match or Beat Any Price</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 flex-grow flex flex-col justify-center">
        {/* Name Fields Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="e.g. John"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full bg-white border ${
                errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-border-light focus:border-brand-gold focus:ring-1 focus:ring-brand-gold'
              } rounded-lg px-4 py-3 text-gray-900 text-sm focus:outline-none transition-colors duration-300 placeholder-gray-400`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.firstName}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="e.g. Doe"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full bg-white border ${
                errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-border-light focus:border-brand-gold focus:ring-1 focus:ring-brand-gold'
              } rounded-lg px-4 py-3 text-gray-900 text-sm focus:outline-none transition-colors duration-300 placeholder-gray-400`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Contact Fields Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-white border ${
                errors.email ? 'border-red-500 focus:border-red-500' : 'border-border-light focus:border-brand-gold focus:ring-1 focus:ring-brand-gold'
              } rounded-lg px-4 py-3 text-gray-900 text-sm focus:outline-none transition-colors duration-300 placeholder-gray-400`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="(123) 456-7890"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full bg-white border ${
                errors.phone ? 'border-red-500 focus:border-red-500' : 'border-border-light focus:border-brand-gold focus:ring-1 focus:ring-brand-gold'
              } rounded-lg px-4 py-3 text-gray-900 text-sm focus:outline-none transition-colors duration-300 placeholder-gray-400`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Vehicle Of Interest */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Vehicle Of Interest</label>
          <input
            type="text"
            name="vehicleOfInterest"
            value={formData.vehicleOfInterest}
            onChange={handleChange}
            className={`w-full bg-white border ${
              errors.vehicleOfInterest ? 'border-red-500 focus:border-red-500' : 'border-border-light focus:border-brand-gold focus:ring-1 focus:ring-brand-gold'
            } rounded-lg px-4 py-3 text-gray-900 text-sm focus:outline-none transition-colors duration-300`}
          />
          {errors.vehicleOfInterest && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.vehicleOfInterest}
            </p>
          )}
        </div>

        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3.5 rounded-lg flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Something went wrong. Please check your network and try again.</span>
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-brand-gold text-black font-semibold py-3 px-4 rounded shadow-md hover:bg-brand-gold-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider active:scale-[0.98] transition-all cursor-pointer"
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit For Quote'}
          </button>
        </div>
      </form>

      <div className="mt-8 pt-4 border-t border-border-light">
        <p className="text-[10px] leading-relaxed text-gray-500 text-center px-4">
          * Lease prices may reflect conquest, rebates, one pay or loyalty incentives. 
          Please inquire for more information. VIP Auto Group is not a franchised dealer.
        </p>
      </div>
    </div>
  );
}
