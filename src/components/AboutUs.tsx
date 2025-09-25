import React from 'react';
import { Zap, Users, Shield, Calendar, MapPin, Settings } from 'lucide-react';

const AboutUs = () => {
  return (
    <section className="bg-blue-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">About Us</h2>
          <div className="w-16 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-white text-lg max-w-4xl mx-auto leading-relaxed">
            G20 Security delivers trusted, SIA-approved protection with 24/7 nationwide coverage and years of expertise. Our 
            tailored solutions, skilled guards, and guard tracking ensure safety and peace of mind for every client.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-8 items-start">
          {/* Cards Grid - Takes 3 columns */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Row 1 */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Zap className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Fast Response Security Guards
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Immediate deployment of trained security personnel whenever and wherever needed.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    24/7 Security Coverage
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Reliable, round-the-clock guarding services available across the UK to protect your business at all times.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    SIA Approved Security
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We are licensed by the SIA, ensuring high-quality and comprehensive security that only SIA can trust.
                  </p>
                </div>
              </div>

              {/* Row 2 */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    10+ Years of Experience
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Decade-long expertise providing tailored security solutions to commercial, industrial, private, and public sectors.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Nationwide UK Coverage
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Our security services are available across the entire UK, wherever your business is located.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Settings className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Customised Security Plans
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We specialise in delivering bespoke security services designed to meet your specific business needs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Guard Image - Takes 1 column */}
          <div className="lg:col-span-1">
            <div className="flex justify-center lg:justify-end">
              <img 
                src="" 
                alt="Professional Security Guard"
                className="w-full max-w-sm h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;