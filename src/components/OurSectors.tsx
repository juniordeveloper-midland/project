import React from 'react';

const OurSectors = () => {
  return (
    <section className="bg-blue-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Our Sectors</h2>
          <p className="text-white text-lg max-w-4xl mx-auto leading-relaxed">
            G20 Security delivers tailored security services across industries, from construction sites to retail and more. With 
            experienced guards and free guard tracking, we ensure transparency, reliability, and peace of mind.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200">
              <img 
                src="" 
                alt="Static Guarding"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Static Guarding</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Trained officers provide on-site protection, 
                ensuring facilities and safeguarding 
                personnel and assets with vigilant 
                surveillance and immediate response.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200">
              <img 
                src="" 
                alt="Mobile Patrols"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Mobile Patrols</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Regular patrols across your premises, 
                checking for security risks and ensuring 
                comprehensive coverage of large or 
                multiple sites with flexible scheduling.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200">
              <img 
                src="" 
                alt="Event Security"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Event Security</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Specialized guards ensure safety, conduct 
                crowd control and manage entry of events, 
                providing professional security management 
                for gatherings of all sizes.
              </p>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default OurSectors;