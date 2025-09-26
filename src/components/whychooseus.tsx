import React from 'react';
import { Shield, MapPin, FileText, Clock } from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-700 mb-4">Why Choose Us</h1>
          <h2 className="text-4xl font-semibold text-gray-600">Our Expertise</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-12">
            {/* SIA Approved Security */}
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">SIA Approved Security</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our guards are fully SIA licensed and compliant with strict UK standards. We maintain professionalism in every role. Trust us for reliable, accredited protection.
                </p>
              </div>
            </div>

            {/* Nationwide Coverage */}
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Nationwide Coverage</h3>
                <p className="text-gray-600 leading-relaxed">
                  We provide dependable security solutions across the UK. No matter your location, our services adapt to your needs. Protecting businesses and communities nationwide.
                </p>
              </div>
            </div>

            {/* 10+ Years of Expertise */}
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">10+ Years of Expertise</h3>
                <p className="text-gray-600 leading-relaxed">
                  "With over a decade of expertise, our skilled and proactive guards deliver the trusted security you can rely on."
                </p>
              </div>
            </div>

            {/* 24/7 Protection */}
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Protection</h3>
                <p className="text-gray-600 leading-relaxed">
                  Enjoy complete peace of mind with round-the-clock security coverage. Our teams stay alert and ready at all times. Day or night, your safety is our priority.
                </p>
              </div>
            </div>
          </div>

          {/* Right Images */}
          <div className="lg:w-1/2 space-y-3">
            {/* Top Image - Replace with your security officer image */}
            <div className="relative">
              <img 
                src="https://i.postimg.cc/RhmVmnMv/portrait-male-security-guard-with-radio-station-camera-screens.jpg" 
                alt="Security Officer" 
                className="w-full h-44 object-cover rounded-2xl"
              />
            </div>

            {/* Middle Image - Replace with your security guard image */}
            <div className="relative">
              <img 
                src="https://i.postimg.cc/gJHqm8vD/portrait-male-security-guard-with-barbed-wire-fence-1.jpg" 
                alt="Security Guard in Action" 
                className="w-full h-40 object-cover rounded-2xl"
              />
            </div>

            {/* Bottom Image - Replace with your construction security image */}
            <div className="relative">
              <img 
                src="https://i.postimg.cc/vZ8RstfP/side-view-security-men-working.jpg" 
                alt="Construction Site Security" 
                className="w-full h-48 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}