import React from 'react';

const PolicyDetails = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white text-justify ">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>
      
      {/* Introduction */}
      <p className="text-sm text-gray-700 mb-6 leading-relaxed">
        By accessing and using the G2G Security website, you agree to comply with these Terms & Conditions. Please read 
        them carefully before using our services.
      </p>

      {/* Services Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Services</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          G2G Security provides a wide range of professional security solutions, including asset guarding, static guarding, mobile 
          patrols, event security, and access control. Use of our website does not constitute a service agreement; all security 
          services require a formal contract with agreed terms.
        </p>
      </div>

      {/* Use of Website Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Use of Website</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          You agree not to misuse our website, copy or republish content without permission, or engage in unlawful activity 
          while using our services.
        </p>
      </div>

      {/* Liability Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Liability</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          While we strive to keep information accurate and up to date, G2G Security is not liable for any indirect loss, damage, 
          or inconvenience arising from the use of this site.
        </p>
      </div>

      {/* Changes Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Changes</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          We may update these Terms & Conditions from time to time. Continued use of the site means you accept the latest 
          version.
        </p>
      </div>

      {/* Contact Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          For any questions regarding these Terms, please contact us at Info@G2GSecurity.com/(44) 7765-432101.
        </p>
      </div>

      {/* Privacy Policy Header */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      
      {/* Privacy Policy Introduction */}
      <p className="text-sm text-gray-700 mb-6 leading-relaxed">
        At G2G Security, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard 
        your personal information.
      </p>

      {/* Information We Collect Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Information We Collect</h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          When you use our website or contact us, we may collect basic details such as your name, email, phone number, and 
          any information you provide in forms.
        </p>
      </div>

      {/* How We Use Your Information Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">How We Use Your Information</h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-2">We use this information to:</p>
        <ol className="text-sm text-gray-700 ml-4 space-y-1">
          <li>1. Respond to inquiries and provide requested services.</li>
          <li>2. Improve our website and services.</li>
          <li>3. Send updates about our security solutions.</li>
        </ol>
      </div>

      {/* Data Sharing Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Data Sharing</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          We do not sell or share your personal data with third parties unless required by law.
        </p>
      </div>

      {/* Data Security Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Data Security</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          We use appropriate measures to protect your personal information against unauthorized access or misuse.
        </p>
      </div>

      {/* Cookies Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Cookies</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Our website may use cookies to improve user experience and gather analytics. You can disable cookies in your 
          browser if preferred.
        </p>
      </div>

      {/* Your Rights Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Rights</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          You may request access to, correction, or deletion of your personal information at any time.
        </p>
      </div>

      {/* Policy Updates Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Policy Updates</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          This Privacy Policy may be updated periodically. Please check this page for the latest version.
        </p>
      </div>

      {/* Contact Section for Privacy Policy */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          If you have any questions about our Privacy Policy, please contact us at Info@G2GSecurity.com/(44) 7765-432101.
        </p>
      </div>
    </div>
  );
};

export default PolicyDetails;