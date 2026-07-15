'use client';

import React, { useState, useEffect } from 'react';
import { X, ArrowRightLeft, FileText } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';

interface FormData {
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  make: string;
  model: string;
  creditScore: string;
  notes: string;
}

interface TradeData {
  tradeYear: string;
  tradeMake: string;
  tradeModel: string;
  tradeTrim: string;
  tradeMileage: string;
  tradeEngine: string;
  tradeTransmission: string;
  tradeWreck: string;
  tradeClearTitle: string;
  tradeComments: string;
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

interface TradeErrors {
  tradeYear?: string;
  tradeMake?: string;
  tradeModel?: string;
  tradeMileage?: string;
}

interface InstantQuoteProps {
  isOpen: boolean;
  onClose: () => void;
}

type ActiveTab = 'quote' | 'trade';

export default function InstantQuote({ isOpen, onClose }: InstantQuoteProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('quote');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    make: '',
    model: '',
    creditScore: '',
    notes: '',
  });
  const [tradeData, setTradeData] = useState<TradeData>({
    tradeYear: '',
    tradeMake: '',
    tradeModel: '',
    tradeTrim: '',
    tradeMileage: '',
    tradeEngine: '',
    tradeTransmission: '',
    tradeWreck: '',
    tradeClearTitle: '',
    tradeComments: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [tradeErrors, setTradeErrors] = useState<TradeErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

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
        notes: '',
      });
      setTradeData({
        tradeYear: '',
        tradeMake: '',
        tradeModel: '',
        tradeTrim: '',
        tradeMileage: '',
        tradeEngine: '',
        tradeTransmission: '',
        tradeWreck: '',
        tradeClearTitle: '',
        tradeComments: '',
      });
      setErrors({});
      setTradeErrors({});
      setSubmitted(false);
      setSubmitError('');
      setActiveTab('quote');
      setTurnstileToken(null);
    }
  }, [isOpen]);

  const hasTradeData = (): boolean => {
    return !!(
      tradeData.tradeYear.trim() ||
      tradeData.tradeMake.trim() ||
      tradeData.tradeModel.trim() ||
      tradeData.tradeTrim.trim() ||
      tradeData.tradeMileage.trim() ||
      tradeData.tradeEngine.trim() ||
      tradeData.tradeTransmission.trim() ||
      tradeData.tradeWreck ||
      tradeData.tradeClearTitle ||
      tradeData.tradeComments.trim()
    );
  };

  const validateQuote = (): boolean => {
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

  const validateTrade = (): boolean => {
    if (!hasTradeData()) return true; // No trade data = nothing to validate
    const newTradeErrors: TradeErrors = {};

    if (!tradeData.tradeYear.trim()) {
      newTradeErrors.tradeYear = 'Year is required';
    } else if (isNaN(Number(tradeData.tradeYear)) || Number(tradeData.tradeYear) < 1900 || Number(tradeData.tradeYear) > new Date().getFullYear() + 2) {
      newTradeErrors.tradeYear = 'Enter a valid year';
    }
    if (!tradeData.tradeMake.trim()) newTradeErrors.tradeMake = 'Make is required';
    if (!tradeData.tradeModel.trim()) newTradeErrors.tradeModel = 'Model is required';
    if (tradeData.tradeMileage.trim() && isNaN(Number(tradeData.tradeMileage))) {
      newTradeErrors.tradeMileage = 'Enter a valid number';
    }

    setTradeErrors(newTradeErrors);
    return Object.keys(newTradeErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTradeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTradeData((prev) => ({ ...prev, [name]: value }));
    if (tradeErrors[name as keyof TradeErrors]) {
      setTradeErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    const quoteValid = validateQuote();
    const tradeValid = validateTrade();

    if (!quoteValid) {
      setActiveTab('quote');
      return;
    }
    if (!tradeValid) {
      setActiveTab('trade');
      return;
    }

    if (!turnstileToken) {
      setSubmitError('Please complete the captcha challenge.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: Record<string, unknown> = { ...formData };
      if (hasTradeData()) {
        payload.trade = tradeData;
      }
      payload.turnstileToken = turnstileToken;

      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to submit quote';
        const contentType = response.headers.get('content-type') ?? '';
        if (contentType.includes('application/json')) {
          const data = await response.json();
          errorMessage = data.error || errorMessage;
        }
        throw new Error(errorMessage);
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
  };

  const handleClose = () => onClose();

  if (!isOpen) return null;

  const inputClass = (field: keyof FormErrors) =>
    `w-full bg-input-dark border rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none transition-colors duration-200 ${
      errors[field]
        ? 'border-red-500 focus:border-red-400'
        : 'border-border-dark focus:border-brand-gold'
    }`;

  const tradeInputClass = (field?: keyof TradeErrors) =>
    `w-full bg-input-dark border rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none transition-colors duration-200 ${
      field && tradeErrors[field]
        ? 'border-red-500 focus:border-red-400'
        : 'border-border-dark focus:border-brand-gold'
    }`;

  const selectClass = (field?: keyof TradeErrors) =>
    `w-full bg-input-dark border rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none transition-colors duration-200 appearance-none ${
      field && tradeErrors[field]
        ? 'border-red-500 focus:border-red-400'
        : 'border-border-dark focus:border-brand-gold'
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="relative w-full max-w-2xl bg-card-dark rounded-2xl p-8 shadow-2xl font-[montserrat] max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted hover:text-white transition-colors duration-200 z-10"
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
            <div className="mb-5">
              <h2 className="text-2xl font-semibold text-white mb-2 tracking-tight">INSTANT QUOTE</h2>
              <p className="text-muted text-sm leading-relaxed font-light">
                Fill out the form below to receive a personalized lease quote. If you have a vehicle to trade in, switch to the Trade tab to include those details with your submission.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 bg-input-dark rounded-lg p-1 border border-border-dark">
              <button
                type="button"
                onClick={() => setActiveTab('quote')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === 'quote'
                    ? 'bg-brand-gold text-black shadow-sm'
                    : 'text-muted hover:text-white'
                }`}
              >
                <FileText size={16} />
                Instant Quote
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('trade')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === 'trade'
                    ? 'bg-brand-gold text-black shadow-sm'
                    : 'text-muted hover:text-white'
                }`}
              >
                <ArrowRightLeft size={16} />
                Trade
                {hasTradeData() && (
                  <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                )}
              </button>
            </div>

            {/* Submit Error */}
            {submitError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{submitError}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">

              {/* ─── Quote Tab ─── */}
              <div className={activeTab === 'quote' ? 'block' : 'hidden'}>
                <div className="space-y-4">
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

                  {/* Row 3 — Credit Score */}
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

                  {/* Notes */}
                  <div>
                    <label className="block text-white text-xs font-medium mb-1.5">Notes (Optional)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Any additional details or preferences..."
                      className="w-full bg-input-dark border border-border-dark focus:border-brand-gold rounded-lg px-4 py-2.5 text-white text-sm resize-none focus:outline-none transition-colors duration-200 placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* ─── Trade Tab ─── */}
              <div className={activeTab === 'trade' ? 'block' : 'hidden'}>
                <div className="space-y-4">
                  {/* Info banner */}
                  <div className="p-3 bg-brand-gold/10 border border-brand-gold/20 rounded-lg">
                    <p className="text-brand-gold text-xs font-medium">
                      Have a vehicle to trade? Fill in the details below. This is optional — leave blank if you don&apos;t have a trade-in.
                    </p>
                  </div>

                  {/* Contact Request heading */}
                  <h3 className="text-white text-sm font-semibold tracking-wide uppercase">Trade-In Vehicle Details</h3>

                  {/* Row 1: Year, Make, Model */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-white text-xs font-medium mb-1.5">Year</label>
                      <input
                        type="text"
                        name="tradeYear"
                        value={tradeData.tradeYear}
                        onChange={handleTradeChange}
                        placeholder="e.g. 2020"
                        className={tradeInputClass('tradeYear')}
                      />
                      {tradeErrors.tradeYear && <p className="text-red-500 text-[10px] mt-1">{tradeErrors.tradeYear}</p>}
                    </div>
                    <div>
                      <label className="block text-white text-xs font-medium mb-1.5">Make</label>
                      <input
                        type="text"
                        name="tradeMake"
                        value={tradeData.tradeMake}
                        onChange={handleTradeChange}
                        placeholder="e.g. Toyota"
                        className={tradeInputClass('tradeMake')}
                      />
                      {tradeErrors.tradeMake && <p className="text-red-500 text-[10px] mt-1">{tradeErrors.tradeMake}</p>}
                    </div>
                    <div>
                      <label className="block text-white text-xs font-medium mb-1.5">Model</label>
                      <input
                        type="text"
                        name="tradeModel"
                        value={tradeData.tradeModel}
                        onChange={handleTradeChange}
                        placeholder="e.g. Camry"
                        className={tradeInputClass('tradeModel')}
                      />
                      {tradeErrors.tradeModel && <p className="text-red-500 text-[10px] mt-1">{tradeErrors.tradeModel}</p>}
                    </div>
                  </div>

                  {/* Row 2: Trim, Mileage, Engine */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-white text-xs font-medium mb-1.5">Trim</label>
                      <input
                        type="text"
                        name="tradeTrim"
                        value={tradeData.tradeTrim}
                        onChange={handleTradeChange}
                        placeholder="e.g. SE, XLE"
                        className={tradeInputClass()}
                      />
                    </div>
                    <div>
                      <label className="block text-white text-xs font-medium mb-1.5">Mileage</label>
                      <input
                        type="text"
                        name="tradeMileage"
                        value={tradeData.tradeMileage}
                        onChange={handleTradeChange}
                        placeholder="e.g. 45000"
                        className={tradeInputClass('tradeMileage')}
                      />
                      {tradeErrors.tradeMileage && <p className="text-red-500 text-[10px] mt-1">{tradeErrors.tradeMileage}</p>}
                    </div>
                    <div>
                      <label className="block text-white text-xs font-medium mb-1.5">Engine</label>
                      <input
                        type="text"
                        name="tradeEngine"
                        value={tradeData.tradeEngine}
                        onChange={handleTradeChange}
                        placeholder="e.g. 2.5L 4-Cyl"
                        className={tradeInputClass()}
                      />
                    </div>
                  </div>

                  {/* Row 3: Transmission, Wreck, Clear Title */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-white text-xs font-medium mb-1.5">Transmission</label>
                      <select
                        name="tradeTransmission"
                        value={tradeData.tradeTransmission}
                        onChange={handleTradeChange}
                        className={selectClass()}
                      >
                        <option value="">Select...</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                        <option value="CVT">CVT</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white text-xs font-medium mb-1.5">Been in a Wreck?</label>
                      <div className="flex gap-4 mt-1">
                        <label className={`flex items-center gap-2 cursor-pointer group`}>
                          <input
                            type="radio"
                            name="tradeWreck"
                            value="Yes"
                            checked={tradeData.tradeWreck === 'Yes'}
                            onChange={handleTradeChange}
                            className="sr-only peer"
                          />
                          <span className="w-5 h-5 rounded border-2 border-border-dark peer-checked:border-brand-gold peer-checked:bg-brand-gold flex items-center justify-center transition-all duration-200">
                            {tradeData.tradeWreck === 'Yes' && (
                              <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            )}
                          </span>
                          <span className="text-sm text-muted group-hover:text-white transition-colors">Yes</span>
                        </label>
                        <label className={`flex items-center gap-2 cursor-pointer group`}>
                          <input
                            type="radio"
                            name="tradeWreck"
                            value="No"
                            checked={tradeData.tradeWreck === 'No'}
                            onChange={handleTradeChange}
                            className="sr-only peer"
                          />
                          <span className="w-5 h-5 rounded border-2 border-border-dark peer-checked:border-brand-gold peer-checked:bg-brand-gold flex items-center justify-center transition-all duration-200">
                            {tradeData.tradeWreck === 'No' && (
                              <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            )}
                          </span>
                          <span className="text-sm text-muted group-hover:text-white transition-colors">No</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-white text-xs font-medium mb-1.5">Clear Title?</label>
                      <div className="flex gap-4 mt-1">
                        <label className={`flex items-center gap-2 cursor-pointer group`}>
                          <input
                            type="radio"
                            name="tradeClearTitle"
                            value="Yes"
                            checked={tradeData.tradeClearTitle === 'Yes'}
                            onChange={handleTradeChange}
                            className="sr-only peer"
                          />
                          <span className="w-5 h-5 rounded border-2 border-border-dark peer-checked:border-brand-gold peer-checked:bg-brand-gold flex items-center justify-center transition-all duration-200">
                            {tradeData.tradeClearTitle === 'Yes' && (
                              <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            )}
                          </span>
                          <span className="text-sm text-muted group-hover:text-white transition-colors">Yes</span>
                        </label>
                        <label className={`flex items-center gap-2 cursor-pointer group`}>
                          <input
                            type="radio"
                            name="tradeClearTitle"
                            value="No"
                            checked={tradeData.tradeClearTitle === 'No'}
                            onChange={handleTradeChange}
                            className="sr-only peer"
                          />
                          <span className="w-5 h-5 rounded border-2 border-border-dark peer-checked:border-brand-gold peer-checked:bg-brand-gold flex items-center justify-center transition-all duration-200">
                            {tradeData.tradeClearTitle === 'No' && (
                              <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            )}
                          </span>
                          <span className="text-sm text-muted group-hover:text-white transition-colors">No</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Comments */}
                  <div>
                    <label className="block text-white text-xs font-medium mb-1.5">Comments (Optional)</label>
                    <textarea
                      name="tradeComments"
                      value={tradeData.tradeComments}
                      onChange={handleTradeChange}
                      rows={3}
                      placeholder="Any additional details about your trade-in vehicle..."
                      className="w-full bg-input-dark border border-border-dark focus:border-brand-gold rounded-lg px-4 py-2.5 text-white text-sm resize-none focus:outline-none transition-colors duration-200 placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  onSuccess={(token) => {
                    setTurnstileToken(token);
                    setSubmitError('');
                  }}
                  onError={() => setSubmitError('Captcha verification failed. Please try again.')}
                  onExpire={() => setTurnstileToken(null)}
                />
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
                  hasTradeData() ? 'Submit Quote & Trade' : 'Submit'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}