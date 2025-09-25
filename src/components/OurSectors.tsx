 

const OurSectors = () => {
  return (
    <section className="relative">
      {/* Blue header band */}
      <div className="bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-3">Our Sectors</h2>
            <p className="text-white text-lg max-w-4xl mx-auto leading-relaxed">
              G20 Security delivers tailored security services across industries, from construction sites to retail and more. With
              experienced guards and free guard tracking, we ensure transparency, reliability, and peace of mind.
            </p>
          </div>
        </div>
      </div>

      {/* Cards overlapping blue/white boundary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-2xl shadow-xl overflow-hidden bg-white">
            <div className="h-56">
              <img
                src=""
                alt="Static Guarding"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gray-100 p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Static Guarding</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Trained officers provide on-site protection, deterring intruders and safeguarding premises. They maintain constant
                vigilance to ensure safety and peace of mind.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl shadow-xl overflow-hidden bg-white">
            <div className="h-56">
              <img
                src=""
                alt="Mobile Patrols"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gray-100 p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Mobile Patrols</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Regular patrols secure your premises, checking vulnerable areas and deterring threats. Flexible coverage ensures safety
                across large or multiple locations.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl shadow-xl overflow-hidden bg-white">
            <div className="h-56">
              <img
                src=""
                alt="Event Security"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gray-100 p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Event Security</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Specialist guards manage entry, monitor crowds, and maintain order at all events. They ensure a safe environment for
                guests, staff, and venues.
              </p>
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center space-x-2 mt-6 mb-6">
          <span className="w-2 h-2 rounded-full bg-gray-400 inline-block"></span>
          <span className="w-2 h-2 rounded-full bg-gray-300 inline-block"></span>
          <span className="w-2 h-2 rounded-full bg-gray-300 inline-block"></span>
        </div>
      </div>
    </section>
  );
};

export default OurSectors;