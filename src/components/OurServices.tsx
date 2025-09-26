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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Static Guarding */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 max-w-sm mx-auto">
            <div className="p-4 pt-0">
              <div className="h-70 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src="https://i.postimg.cc/3xvQxxW6/side-view-male-janitor.jpg" 
                  alt="Static Guarding - Professional security guard in high-visibility uniform"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
            <div className="px-4 pb-4">
              <h3 className="text-lg font-bold text-blue-700 mb-2">Static Guarding</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Fixed guards provide constant protection. They deter intruders and control access. Our officers monitor and prevent risks. Reliable presence for total peace of mind.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 inline-flex items-center">
                View More →
              </button>
            </div>
          </div>

          {/* Man Guarding */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 max-w-sm mx-auto">
            <div className="p-4 pt-6">
              <div className="h-70 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src="https://i.postimg.cc/RZMpjCKK/security-guard-workspace.jpg" 
                  alt="Man Guarding - Professional security officer in tactical gear"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
            <div className="px-4 pb-4">
              <h3 className="text-lg font-bold text-blue-700 mb-2">Man Guarding</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Expert officers trained in conflict resolution, crowd control, and emergency response. Our man guarding services provide professional protection tailored to your specific needs.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 inline-flex items-center">
                View More →
              </button>
            </div>
          </div>

          {/* Private Security */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 max-w-sm mx-auto">
            <div className="p-4 pt-6">
            <div className="h-70 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-2xl shadow-lg">
              <img 
                src="https://i.postimg.cc/7YBSZqjg/portrait-male-security-guard-with-radio-station-1.jpg" 
                alt="Private Security - Professional security personnel with radio equipment"
                className="w-full h-full object-cover object-center"
              />
            </div>
            </div>
            <div className="p-4 ">
              <h3 className="text-lg font-bold text-blue-700 mb-2">Private Security</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Discreet security solutions and close protection services for high-profile individuals, executives, and VIPs requiring personal protection.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 inline-flex items-center">
                View More →
              </button>
            </div>
          </div>

          {/* Mobile Patrols */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 max-w-sm mx-auto">
            <div className="p-4 pt-6">
            <div className="h-70 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-2xl shadow-lg">
              <img 
                src="https://images.pexels.com/photos/8591608/pexels-photo-8591608.jpeg" 
                alt="Mobile Patrols - Security patrol vehicle and officer"
                className="w-full h-full object-cover object-center"
              />
            </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-blue-700 mb-2">Mobile Patrols</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Regular drive-by and patrol visits. Mobile Security patrols are ideal for checking multiple sites, providing visible deterrent and rapid response capabilities.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 inline-flex items-center">
                View More →
              </button>
            </div>
          </div>

          {/* Event Security */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 max-w-sm mx-auto">
            <div className="p-4 pt-6">
            <div className="h-70 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-2xl shadow-lg">
              <img 
                src="https://i.postimg.cc/W3HP4FmB/security-guard-standing-scanning-door.jpg" 
                alt="Event Security - Security officers at event venue entrance"
                className="w-full h-full object-cover object-center"
              />
            </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-700 mb-3">Event Security</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Events manage access and crowd control. We provide bag searches and crowd management, ensuring your event runs smoothly and safely for all attendees.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 inline-flex items-center">
                View More →
              </button>
            </div>
          </div>

          {/* Access Control */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 max-w-sm mx-auto">
            <div className="p-4 pt-6">
            <div className="h-70 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-2xl shadow-lg">
              <img 
                src="https://i.postimg.cc/k5ZmJRvk/smiling-airport-security-officer-holding-metal-detector-airport-terminal.jpg" 
                alt="Access Control - Professional security officer at building entrance"
                className="w-full h-full object-cover object-center"
              />
            </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-700 mb-3">Access Control</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Officers verify visiting users entry. We check all visitors and staff entry, maintaining detailed logs and ensuring only authorized personnel access your premises.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 inline-flex items-center">
                View More →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;