import React from 'react';
import { Zap, Users, Shield, Calendar, MapPin, Settings } from 'lucide-react';

const AboutUs = () => {
  return (
    <section className="bg-white-900 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-2">What We Do</h2>
          <div className="w-32 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-blue-900 text-lg max-w-4xl mx-auto leading-relaxed">
            G20 Security delivers trusted, SIA-approved protection with 24/7 nationwide coverage and years of expertise. Our 
            tailored solutions, skilled guards, and guard tracking ensure safety and peace of mind for every client.
          </p>
        </div>

        {/* Cards Container with White Background */}
        <div className="relative">
          {/* White Background Container */}
          <div className="bg-blue-900  rounded-2xl p-8 mx-auto max-w-6xl">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Row 1 */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Zap className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-base font-semibold text-blue-600 mb-3">
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
                  <h3 className="text-base font-semibold text-blue-600 mb-3">
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
                  <h3 className="text-base font-semibold text-blue-600 mb-3">
                    SIA Approved Security
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We are licensed by the SIA, ensuring high-quality and compliant security guarding services you can trust.
                  </p>
                </div>
              </div>

              {/* Row 2 */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-base font-semibold text-blue-600 mb-3">
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
                  <h3 className="text-base font-semibold text-blue-600 mb-3">
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
                  <h3 className="text-base font-semibold text-blue-600 mb-3">
                    Customised Security Plans
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We specialise in delivering bespoke security services designed to meet your specific business needs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          
        </div>
        {/* Security Guard Image - Positioned at bottom right */}
          <div className="absolute bottom-0 right-0 hidden lg:block">
            <div className="relative">
              <img 
                src="https://i.postimg.cc/7YkQqRHD/portrait-male-security-guard-with-uniform-removebg-preview.png" 
                alt="Professional Security Guard"
                className=" w-64 h-80 object-cover rounded-tl-lg shadow-2xl m-20px"
              />
              
            </div>
          </div>
      </div>
    </section>
  );
};

export default AboutUs;