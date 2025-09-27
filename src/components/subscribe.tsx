import React, { useState } from 'react';
import { emailService } from '../services/emailService';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    setMessageType('');

    try {
      // Send subscription via PHP backend
      const result = await emailService.sendSubscription(email);

      if (result.success) {
        setMessage(result.message);
        setMessageType('success');
        setEmail(''); // Clear the form
      } else {
        setMessage(result.message);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setMessage('An error occurred. Please try again later.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(7, 15, 25, 0.65), rgba(7, 15, 25, 0.65)), url('https://images.pexels.com/photos/1981443/pexels-photo-1981443.jpeg')",
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">
            Subscribe Our Newsletter
          </h2>
          <p className="text-white/90 mt-3 md:mt-4 text-base md:text-lg">
            Stay up to update with our latest news security insights.
          </p>
          <p className="text-white/70 mt-2 text-sm">
            Enter your email and click "Subscribe" to receive our newsletter.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 md:mt-8">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-xl">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Enter your Email"
                className="w-full sm:flex-1 h-11 md:h-12 rounded-full bg-white text-gray-800 placeholder-gray-500 px-4 md:px-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="h-11 md:h-12 px-6 md:px-7 rounded-full bg-white text-blue-700 font-medium hover:bg-gray-100 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
            
            {/* Message Display */}
            {message && (
              <div className={`mt-4 p-3 rounded-lg text-sm ${
                messageType === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;


