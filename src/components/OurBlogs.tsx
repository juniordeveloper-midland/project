import React from 'react';

const OurBlogs = () => {
  return (
    <section className="bg-blue-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Our Blogs</h2>
          <p className="text-white text-lg max-w-4xl mx-auto leading-relaxed">
            Insights and tips on enhancing business security with professional management solutions.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48 bg-gray-200">
              <img 
                src="https://images.pexels.com/photos/8591605/pexels-photo-8591605.jpeg" 
                alt="Security Blog"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
               
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                How Manpower Security Guards Enhance Emergency Response
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Understanding how trained security personnel can significantly improve emergency response times and effectiveness in critical situations.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48 bg-gray-200">
              <img 
                src="https://i.postimg.cc/tgyjYGKz/security-guard-protecting-client.jpg" 
                alt="Security Blog"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Top 5 Benefits of Using Static and Mobile Security Guards
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Learn from static and mobile guards and discover the key advantages of combining both security approaches for comprehensive protection.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48 bg-gray-200">
              <img 
                src="https://i.postimg.cc/vZ8RstfP/side-view-security-men-working.jpg" 
                alt="Security Blog"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
               
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Why Manpower Security is Essential for Business Safety
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Explore the critical role that professional security guards play in maintaining business safety and protecting valuable assets.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48 bg-gray-200">
              <img 
                src="https://i.postimg.cc/gJHqm8vD/portrait-male-security-guard-with-barbed-wire-fence-1.jpg" 
                alt="Security Blog"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
              
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                The Role of Manpower Security in Preventing Workplace Incidents
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Discover how trained security personnel can proactively prevent workplace incidents and create safer work environments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurBlogs;