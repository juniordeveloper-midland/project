import React, { useState } from 'react';
import { Phone, Mail, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { contactService, ContactFormData } from '../services/contactService';
import SocialMediaLinks from './SocialMediaLinks';

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
                <SocialMediaLinks />
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
                    placeholder="eg: First Name"
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
                    placeholder="eg: Last Name"
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