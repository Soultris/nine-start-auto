'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  make: string;
  model: string;
  creditScore: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  email?: string;
  make?: string;
  model?: string;
  creditScore?: string;
}

interface InstantQuoteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstantQuote({ isOpen, onClose }: InstantQuoteProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    make: '',
    model: '',
    creditScore: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Reset form when popup opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        firstName: '',
        lastName: '',
        contactNumber: '',
        email: '',
        make: '',
        model: '',
        creditScore: '',
      });
      setErrors({});
      setSubmitted(false);
      setSubmitError('');
    }
  }, [isOpen]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\+?[\d\s\-()]{7,15}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.make.trim()) newErrors.make = 'Make is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';

    if (!formData.creditScore.trim()) {
      newErrors.creditScore = 'Credit score is required';
    } else if (
      isNaN(Number(formData.creditScore)) ||
      Number(formData.creditScore) < 300 ||
      Number(formData.creditScore) > 850
    ) {
      newErrors.creditScore = 'Enter a valid score (300–850)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (validate()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/quote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to submit quote');
        }

        setSubmitted(true);
      } catch (error) {
        console.error('Quote submission failed:', error);
        setSubmitError(
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.'
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClose = () => onClose();

  if (!isOpen) return null;

  const inputClass = (field: keyof FormErrors) =>
    `w-full bg-input-dark border rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none transition-colors duration-200 ${
      errors[field]
        ? 'border-red-500 focus:border-red-400'
        : 'border-border-dark focus:border-brand-gold'
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="relative w-full max-w-2xl bg-card-dark rounded-2xl p-8 shadow-2xl font-[montserrat]">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted hover:text-white transition-colors duration-200"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {submitted ? (
          /* Success State */
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-14 h-14 rounded-full bg-brand-gold flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Quote Submitted!</h3>
            <p className="text-muted text-sm mb-6">We&apos;ll get back to you as soon as possible.</p>
            <button
              onClick={handleClose}
              className="bg-brand-gold hover:bg-brand-gold-hover text-black py-2.5 sm:py-3 px-6 sm:px-8 rounded font-semibold text-sm transition-all active:scale-95 cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-7">
              <h2 className="text-2xl font-semibold text-white mb-2 tracking-tight">INSTANT QUOTE</h2>
              <p className="text-muted text-sm leading-relaxed font-light">
                Professional auto brokerage services Professional auto brokerage services
                Professional auto brokerage services Professional auto brokerage services
                Professional auto brokerage services
              </p>
            </div>

            {/* Submit Error */}
            {submitError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{submitError}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white text-xs font-medium mb-1.5">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={inputClass('firstName')}
                  />
                  {errors.firstName && <p className="text-red-500 text-[10px] mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-white text-xs font-medium mb-1.5">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={inputClass('lastName')}
                  />
                  {errors.lastName && <p className="text-red-500 text-[10px] mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <label className="block text-white text-xs font-medium mb-1.5">Contact Number</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className={inputClass('contactNumber')}
                  />
                  {errors.contactNumber && <p className="text-red-500 text-[10px] mt-1">{errors.contactNumber}</p>}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white text-xs font-medium mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass('email')}
                  />
                  {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-white text-xs font-medium mb-1.5">Make</label>
                  <input
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    className={inputClass('make')}
                  />
                  {errors.make && <p className="text-red-500 text-[10px] mt-1">{errors.make}</p>}
                </div>
                <div>
                  <label className="block text-white text-xs font-medium mb-1.5">Model</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className={inputClass('model')}
                  />
                  {errors.model && <p className="text-red-500 text-[10px] mt-1">{errors.model}</p>}
                </div>
              </div>

              {/* Row 3 — Credit Score (half width) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white text-xs font-medium mb-1.5">Credit Score</label>
                  <input
                    type="text"
                    name="creditScore"
                    value={formData.creditScore}
                    onChange={handleChange}
                    placeholder="300 – 850"
                    className={inputClass('creditScore')}
                  />
                  {errors.creditScore && <p className="text-red-500 text-[10px] mt-1">{errors.creditScore}</p>}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-gold hover:bg-brand-gold-hover text-black py-2.5 sm:py-3 px-6 sm:px-8 rounded font-semibold text-sm transition-all active:scale-95 disabled:opacity-50 mt-2 flex items-center justify-center cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}