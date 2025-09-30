import React, { useState } from 'react';
import { Phone, Mail, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { contactService, ContactFormData } from '../services/contactService';

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset submit status when user starts typing
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setSubmitStatus('error');
      setSubmitMessage('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setSubmitStatus('error');
      setSubmitMessage('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setSubmitStatus('error');
      setSubmitMessage('Email address is required');
      return false;
    }
    if (!formData.phone.trim()) {
      setSubmitStatus('error');
      setSubmitMessage('Phone number is required');
      return false;
    }
    if (!formData.message.trim()) {
      setSubmitStatus('error');
      setSubmitMessage('Message is required');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setSubmitMessage('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await contactService.submitContactForm(formData);
      
      if (response.success) {
        setSubmitStatus('success');
        setSubmitMessage(response.message);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(response.message);
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white  shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Section - Company Info */}
          <div className="lg:w-2/5 bg-white p-8 lg:p-12">
            <div className="bg-white rounded-2xl border-2 border-blue-900 p-8 h-full">
              <h2 className="text-3xl font-bold text-blue-900 mb-6">
                How can we help?
              </h2>
              
              <p className="text-blue-900 text-lg mb-8 leading-relaxed">
                Your safety is our priority. Reach out today for trusted security solutions
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-900" />
                  </div>
                  <span className="text-blue-900 text-lg font-medium">
                    (44) 77765-43210
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-900" />
                  </div>
                  <span className="text-blue-900 text-lg font-medium">
                    info@G20Security.com
                  </span>
                </div>
              </div>

              <div>
            <h4 className="text-lg font-semibold mb-4">Follow us on</h4>
            <div className="flex items-center gap-5">
              <a aria-label="Facebook" href="#" className="text-blue-700 hover:text-blue-900 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.62-1.3 1.25V12h2.2l-.35 3h-1.85v7A10 10 0 0 0 22 12Z"/></svg>
              </a>
              <a aria-label="Twitter" href="#" className="text-blue-700 hover:text-blue-900 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.94c-.73.32-1.5.53-2.3.62a4.03 4.03 0 0 0 1.76-2.22 8 8 0 0 1-2.55.98 4 4 0 0 0-6.92 2.73c0 .32.04.65.1.95A11.37 11.37 0 0 1 3.15 4.6a4.02 4.02 0 0 0 1.24 5.36c-.6-.02-1.18-.19-1.68-.47v.05a4 4 0 0 0 3.2 3.93c-.53.15-1.1.18-1.65.07a4.02 4.02 0 0 0 3.74 2.78A8.05 8.05 0 0 1 2 19.54 11.36 11.36 0 0 0 8.16 21c7.36 0 11.4-6.1 11.4-11.4l-.01-.52A8.1 8.1 0 0 0 22 5.94Z"/></svg>
              </a>
              <a aria-label="Instagram" href="#" className="text-blue-700 hover:text-blue-900 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.75-.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"/></svg>
              </a>
              <a aria-label="YouTube" href="#" className="text-blue-700 hover:text-blue-900 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 7.5s-.23-1.64-.95-2.36c-.9-.95-1.9-.95-2.36-1C16.9 4 12 4 12 4h0s-4.9 0-8.19.14c-.46.05-1.46.05-2.36 1C.73 5.86.5 7.5.5 7.5S.36 9.36.36 11.23v1.54C.36 14.64.5 16.5.5 16.5s.23 1.64.95 2.36c.9.95 2.08.92 2.61 1.02C5.5 20.06 12 20.1 12 20.1s4.9 0 8.19-.14c.46-.05 1.46-.05 2.36-1 .72-.72.95-2.36.95-2.36s.14-1.86.14-3.73v-1.54C23.64 9.36 23.5 7.5 23.5 7.5ZM9.75 14.75v-5.5l5.5 2.75-5.5 2.75Z"/></svg>
              </a>
            </div>
          </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="lg:w-2/3 p-4 lg:p-6 bg-gray-50 border-2 border-blue-900 rounded-2xl">
            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="block text-gray-700 text-sm font-medium mb-2">
                    First Name:*
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="eg: Sara"
                    className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-500"
                  />
                </div>
                <div>
                  <div className="block text-gray-700 text-sm font-medium mb-2">
                    Last Name:*
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="eg: Chawla"
                    className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Email and Phone Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="block text-gray-700 text-sm font-medium mb-2">
                    Email Address:*
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="eg: abc@gmail.com"
                    className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-500"
                  />
                </div>
                <div>
                  <div className="block text-gray-700 text-sm font-medium mb-2">
                    Phone Number:*
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="eg: (44) 77765-43210"
                    className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <div className="block text-gray-700 text-sm font-medium mb-2">
                  Additional Information:
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message"
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-500 resize-none"
                />
              </div>

              {/* Status Message */}
              {submitStatus !== 'idle' && (
                <div className={`p-4 rounded-lg flex items-center space-x-3 ${
                  submitStatus === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {submitStatus === 'success' ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span className="text-sm font-medium">{submitMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg flex items-center justify-center space-x-2 ${
                  isSubmitting
                    ? 'bg-blue-400 cursor-not-allowed text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;