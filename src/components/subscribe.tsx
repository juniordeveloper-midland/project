import React, { useState } from 'react';

const Subscribe = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Replace with your submit logic or integration
    // eslint-disable-next-line no-alert
    alert(`Subscribed with: ${email}`);
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

          <form onSubmit={handleSubmit} className="mt-6 md:mt-8">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-xl">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your Email"
                className="w-full sm:flex-1 h-11 md:h-12 rounded-full bg-white text-gray-800 placeholder-gray-500 px-4 md:px-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="h-11 md:h-12 px-6 md:px-7 rounded-full bg-white text-blue-700 font-medium hover:bg-gray-100 transition-colors shadow-sm"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;


