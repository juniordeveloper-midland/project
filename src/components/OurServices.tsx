import React from 'react';

const OurServices = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Our Services</h2>
          <p className="text-gray-600 text-lg max-w-4xl mx-auto leading-relaxed">
            G20 Security delivers tailored protection across industries, from construction to retail and more. With free guard 
            tracking, we ensure reliability, transparency, and peace of mind.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Row 1 */}
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
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Our static guarding services offer highly trained security personnel who provide constant surveillance and protection for your premises, ensuring the safety of your assets at all times.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-medium transition-colors duration-200">
                View More
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200">
              <img 
                src="" 
                alt="Man Guarding"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Man Guarding</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Expert officers trained in conflict resolution, crowd control, and emergency response. Our man guarding services provide professional protection tailored to your specific needs.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-medium transition-colors duration-200">
                View More
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200">
              <img 
                src="" 
                alt="Private Security"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Private Security</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Discreet security solutions and close protection services for high-profile individuals, executives, and VIPs requiring personal protection.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-medium transition-colors duration-200">
                View More
              </button>
            </div>
          </div>

          {/* Row 2 */}
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
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Regular drive-by and patrol visits. Mobile Security patrols are ideal for checking multiple sites, providing visible deterrent and rapid response capabilities.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-medium transition-colors duration-200">
                View More
              </button>
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
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Events manage access and crowd control. We provide bag searches and crowd management, ensuring your event runs smoothly and safely for all attendees.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-medium transition-colors duration-200">
                View More
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200">
              <img 
                src="" 
                alt="Access Control"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Access Control</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Officers verify visiting users entry. We check all visitors and staff entry, maintaining detailed logs and ensuring only authorized personnel access your premises.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-medium transition-colors duration-200">
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;