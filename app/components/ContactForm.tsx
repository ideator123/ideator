// components/contact/ContactForm.tsx
'use client';

import { useState, useEffect } from 'react';
// Removed: import { motion, AnimatePresence, Variants } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  eventType: string;
  budget: string;
  eventDate: string;
  guestCount: string;
  location: string;
  message: string;
}

// Removed all framer-motion variants

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    eventType: '',
    budget: '',
    eventDate: '',
    guestCount: '',
    location: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const eventTypes = [
    { value: 'Corporate Conference', icon: '🏢' },
    { value: 'Product Launch', icon: '🚀' },
    { value: 'Wedding Celebration', icon: '💒' },
    { value: 'Trade Show/Exhibition', icon: '🏪' },
    { value: 'Team Building Event', icon: '👥' },
    { value: 'Award Ceremony', icon: '🏆' },
    { value: 'Music Festival', icon: '🎵' },
    { value: 'Private Party', icon: '🎉' },
    { value: 'Other', icon: '✨' }
  ];

  const budgetRanges = [
    'Under $10,000',
    '$10,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000 - $500,000',
    '$500,000+',
    'Prefer not to say'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted!');
    setIsSubmitting(true);
    
    try {
      console.log('Submitting form data:', formData);
      console.log('Form data keys:', Object.keys(formData));
      console.log('Required fields check:', {
        name: formData.name,
        email: formData.email,
        eventType: formData.eventType,
        message: formData.message
      });
      
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          event_type: formData.eventType,
          budget: formData.budget,
          event_date: formData.eventDate || null,
          guest_count: formData.guestCount ? parseInt(formData.guestCount) : null,
          location: formData.location || null,
          message: formData.message
        })
        .select();

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Success! Inserted data:', data);
      setSubmitStatus('success');
      setFormData({
        name: '', email: '', phone: '', company: '', eventType: '',
        budget: '', eventDate: '', guestCount: '', location: '', message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('contact_submissions')
          .select('*')
          .limit(1);
        
        console.log('Supabase connection test:', { data, error });
        
        if (error) {
          console.error('Supabase connection failed:', error);
        } else {
          console.log('Supabase connection successful');
        }
      } catch (err) {
        console.error('Connection test error:', err);
      }
    };
    
    testConnection();
  }, []);

  return (
    <div className="relative">
      {/* Floating background shape */}
      <div 
        className="absolute -inset-4 bg-gradient-to-br from-white/40 to-white/20 rounded-[2.5rem] blur-xl"
        // No animation
      />
      
      <div className="relative bg-white/70 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-2xl p-8 lg:p-12 overflow-hidden">
        {/* Decorative corner elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#0a2449]/10 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#0a2449]/5 to-transparent rounded-tr-full" />
        
        <div className="relative z-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a2449] mb-4">Tell Us About Your Event</h2>
            <p className="text-[#0a2449]/70 mb-10 text-lg">Share your vision and we'll craft the perfect experience</p>
          </div>
          
          <form onSubmit={(e) => {
            console.log('Form onSubmit triggered');
            handleSubmit(e);
          }} className="space-y-8">
            
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#0a2449] border-l-4 border-[#0a2449] pl-4">Personal Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Full Name *"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />

                <FormField
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 (123) 456-7890"
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />

                <FormField
                  label="Company/Organization"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company name"
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#0a2449] border-l-4 border-[#0a2449] pl-4">Event Details</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <SelectField
                  label="Event Type *"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  options={eventTypes}
                  placeholder="Select event type"
                  required
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />

                <SelectField
                  label="Estimated Budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  options={budgetRanges.map(range => ({ value: range, icon: '' }))}
                  placeholder="Select budget range"
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <FormField
                  label="Event Date"
                  name="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />

                <FormField
                  label="Guest Count"
                  name="guestCount"
                  type="number"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                  placeholder="150"
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />

                <FormField
                  label="Location/City"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Event location"
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-[#0a2449] uppercase tracking-wider">
                Tell us about your vision
              </label>
              <div className="relative group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={6}
                  className="w-full px-6 py-4 bg-white/50 border-2 border-[#0a2449]/20 rounded-2xl transition-all duration-300 text-[#0a2449] placeholder-[#0a2449]/50 resize-none focus:border-[#0a2449] focus:outline-none"
                  placeholder="Share your event goals, preferred themes, special requirements, or any creative ideas you have in mind..."
                  maxLength={500}
                />
                <div className="absolute bottom-4 right-4 text-xs text-[#0a2449]/40">
                  {formData.message.length}/500
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full bg-[#0a2449] text-[#efede7] px-8 py-6 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-500 overflow-hidden disabled:opacity-75 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a2449] via-[#1a3458] to-[#0a2449]" />
                
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <svg 
                        className="h-6 w-6 animate-spin" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Your Vision...
                    </>
                  ) : (
                    <>
                      Send Inquiry
                      <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus && (
              <div 
                className={`rounded-2xl p-6 ${
                  submitStatus === 'success' 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200' 
                    : 'bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200'
                }`}
              >
                <div className="flex items-center justify-center mb-3">
                  {submitStatus === 'success' ? (
                    <>
                      <div 
                        className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4"
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-green-800">Message sent successfully! 🎉</h4>
                        <p className="text-green-700">We'll get back to you within 4 hours with a personalized proposal.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-red-800">Submission failed</h4>
                        <p className="text-red-700">Please try again or contact us directly at hello@ideator.com</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

// Form Field Component
interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required,
  focusedField,
  setFocusedField
}) => (
  <div className="relative group">
    <label className="text-sm font-semibold text-[#0a2449] uppercase tracking-wider mb-2 block">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onFocus={() => setFocusedField(name)}
      onBlur={() => setFocusedField(null)}
      required={required}
      className={`w-full px-6 py-4 bg-white/50 border-2 rounded-2xl transition-all duration-300 text-[#0a2449] placeholder-[#0a2449]/50 focus:outline-none ${
        focusedField === name 
          ? 'border-[#0a2449]' 
          : 'border-[#0a2449]/20 hover:border-[#0a2449]/40'
      }`}
      placeholder={placeholder}
    />
  </div>
);

// Select Field Component
interface SelectOption {
  value: string;
  icon: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder: string;
  required?: boolean;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  required,
  focusedField,
  setFocusedField
}) => (
  <div className="relative group">
    <label className="text-sm font-semibold text-[#0a2449] uppercase tracking-wider mb-2 block">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      onFocus={() => setFocusedField(name)}
      onBlur={() => setFocusedField(null)}
      required={required}
      className={`w-full px-6 py-4 bg-white/50 border-2 rounded-2xl transition-all duration-300 text-[#0a2449] focus:outline-none ${
        focusedField === name 
          ? 'border-[#0a2449]' 
          : 'border-[#0a2449]/20 hover:border-[#0a2449]/40'
      }`}
    >
      <option value="">{placeholder}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.icon && `${option.icon} `}{option.value}
        </option>
      ))}
    </select>
  </div>
);
