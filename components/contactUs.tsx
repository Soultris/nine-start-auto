'use client';

import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let valid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      contactNumber: '',
      email: '',
      message: '',
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'Must be at least 2 characters';
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Must be at least 2 characters';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
      valid = false;
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.contactNumber.trim())) {
      newErrors.contactNumber = 'Please enter a valid contact number (10-15 digits)';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        console.log('Form data successfully submitted:', formData);
      }, 1000);
    }
  };

  return (
    <section id="contact" aria-label="Contact us" className="w-full bg-[#212121] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 font-[montserrat]">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-medium text-white mb-4 tracking-tight">CONTACT US</h2>
          <p className="text-muted text-md max-w-3xl leading-relaxed font-light">
            Professional auto brokerage services Professional auto brokerage services Professional
            auto brokerage services Professional auto brokerage services Professional auto
            brokerage services
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-36 items-stretch">
          {/* Left Column: Form or Success Card */}
          {isSubmitted ? (
            <div className="bg-card-medium border border-card-medium rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[400px] h-full transition-all duration-300">
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-brand-gold" />
              </div>
              <h3 className="text-white text-2xl font-semibold mb-3">Thank You!</h3>
              <p className="text-muted text-sm max-w-sm mb-8">
                Your message has been successfully received. A member of our team will contact you shortly.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ firstName: '', lastName: '', contactNumber: '', email: '', message: '' });
                }}
                className="bg-brand-gold hover:bg-brand-gold-hover text-black py-2.5 sm:py-3 px-6 sm:px-8 rounded font-semibold text-sm transition-all active:scale-95 cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full bg-input-dark border ${
                        errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-border-dark focus:border-brand-gold'
                      } rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-colors duration-300`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full bg-input-dark border ${
                        errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-border-dark focus:border-brand-gold'
                      } rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-colors duration-300`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Contact Number</label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className={`w-full bg-input-dark border ${
                        errors.contactNumber ? 'border-red-500 focus:border-red-500' : 'border-border-dark focus:border-brand-gold'
                      } rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-colors duration-300`}
                    />
                    {errors.contactNumber && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.contactNumber}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-input-dark border ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-border-dark focus:border-brand-gold'
                      } rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-colors duration-300`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full bg-input-dark border ${
                      errors.message ? 'border-red-500 focus:border-red-500' : 'border-border-dark focus:border-brand-gold'
                    } rounded-lg px-4 py-3 text-white text-sm resize-none focus:outline-none transition-colors duration-300`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-gold hover:bg-brand-gold-hover text-black py-2.5 sm:py-3 px-6 sm:px-8 rounded font-semibold text-sm transition-all active:scale-95 disabled:opacity-50 mt-6 flex items-center justify-center cursor-pointer"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          )}

          {/* Right Column: Image */}
          <div className="rounded-2xl overflow-hidden min-h-[300px] lg:min-h-[400px]">
            <img
              src="/Contact/contact.png"
              alt="Customer with car"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}