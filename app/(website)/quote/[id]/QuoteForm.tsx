'use client';

import React, { useState } from 'react';

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
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div
      className="w-full h-full p-8 md:p-12 rounded-xl text-white flex flex-col justify-center bg-card-dark"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Quick Lease Quote</h2>
        <p className="text-sm font-medium opacity-90">We Match or Beat Any Price</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col justify-center">
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="FIRST NAME"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-input-dark border border-border-dark text-white text-sm rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-gold uppercase placeholder-gray-500"
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="LAST NAME"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-input-dark border border-border-dark text-white text-sm rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-gold uppercase placeholder-gray-500"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-input-dark border border-border-dark text-white text-sm rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-gold uppercase placeholder-gray-500"
          />
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="PHONE"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-input-dark border border-border-dark text-white text-sm rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-gold uppercase placeholder-gray-500"
          />
        </div>
        <div>
          <input
            type="text"
            name="vehicleOfInterest"
            placeholder="Vehicle Of Interest"
            value={formData.vehicleOfInterest}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-input-dark border border-border-dark text-white text-sm rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-gold placeholder-gray-500"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-brand-gold text-black font-bold py-3 px-4 rounded shadow-md hover:bg-brand-gold-hover transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit For Quote'}
          </button>
        </div>

        {status === 'success' && (
          <p className="text-center text-sm font-semibold mt-4 text-green-200">
            Quote request submitted successfully!
          </p>
        )}
        {status === 'error' && (
          <p className="text-center text-sm font-semibold mt-4 text-red-200">
            Something went wrong. Please try again.
          </p>
        )}
      </form>

      <div className="mt-8">
        <p className="text-[10px] leading-tight opacity-75 text-center px-4">
          * Lease prices may reflect conquest, rebates, one pay or loyalty incentives. 
          Please inquire for more information. VIP Auto Group is not a franchised dealer.
        </p>
      </div>
    </div>
  );
}
