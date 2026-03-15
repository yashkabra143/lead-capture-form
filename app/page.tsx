'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: 'holding',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const categories = ['holding', 'taxi', 'Instagram', 'whatsapp', 'template'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          category: formData.category,
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        }),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setSuccess(true);
      setFormData({ name: '', phone: '', category: 'holding' });
      
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white">
            Lead capture to Indori Life Style
          </h1>
          <p className="text-slate-400 text-sm">
            Share your details and we'll get in touch
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-800 backdrop-blur-md border border-slate-700 rounded-xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-200 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit number (e.g., 9876543210)"
                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-200 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all appearance-none cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 border border-red-700 rounded-lg px-4 py-3 text-red-200 text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-900/30 border border-green-700 rounded-lg px-4 py-3 text-green-200 text-sm">
                ✓ Form submitted successfully! We'll be in touch soon.
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit'
              )}
            </button>
          </form>

          {/* Footer Info */}
          <p className="text-center text-slate-500 text-xs mt-6">
            Your data will be securely stored and used to contact you.
          </p>
        </div>
      </div>
    </div>
  );
}
