import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand and blurb */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/public/images/G20Logo.jpg"
                alt="G20Security Logo"
                className="h-9 w-9 object-contain"
              />
              <span className="text-xl font-semibold">G20SECURITY</span>
            </div>
            <p className="text-sm leading-6 max-w-xs text-blue-900/90">
              G20 Security Guarding provides reliable 24/7 manpower security across the UK. Trusted,
              SIA-approved protection for all industries.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/" className="hover:text-blue-700 transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-blue-700 transition-colors">About Us</a></li>
              <li><a href="/blogs" className="hover:text-blue-700 transition-colors">Blogs</a></li>
              <li><a href="/contact" className="hover:text-blue-700 transition-colors">Contact Us</a></li>
              <li><a href="/policy" className="hover:text-blue-700 transition-colors">Teams & Conditions</a></li>
              <li><a href="/policy" className="hover:text-blue-700 transition-colors">Policy</a></li>
              <li><a href="/faq" className="hover:text-blue-700 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-blue-700 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/></svg>
                <span>Bristol</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-blue-700 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.07 22 2 13.93 2 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.21 2.2Z"/></svg>
                <a href="tel:+447776543210" className="hover:text-blue-700 transition-colors">(44) 77765-43210</a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-blue-700 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.236-8 4.8-8-4.8V6l8 4.8L20 6v2.236Z"/></svg>
                <a href="mailto:info@G20Security.com" className="hover:text-blue-700 transition-colors">info@G20Security.com</a>
              </li>
            </ul>
          </div>

          {/* Socials */}
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

        <hr className="mt-10 mb-6 border-gray-200" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-blue-900/90">
          <div className="flex items-center gap-2">
            <span>©</span>
            <span>2025 G20Security Services. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


