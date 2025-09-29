import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-[500px] bg-cover bg-center bg-no-repeat" 
             style={{
               backgroundImage: ` linear-gradient(rgba(7, 15, 25, 0.65), rgba(7, 15, 25, 0.65)) , url('/public/images/herocity.jpg')`
             }}>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <div className="inline-block bg-blue-900 px-4 py-2 rounded text-sm font-medium mb-6">
              "Welcome to G2OSECURITY"
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              Trusted SIA - Licensed Security Solutions for Businesses Across the UK.
            </h1>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-3xl font-medium transition-all duration-200">
                Request a Free Quote
              </button>
              <button className="border-2 border-gray-800 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-3xl font-medium transition-all duration-200">
                Our Security Specialist
              </button>
            </div>
          </div>

          {/* Security Personnel Image */}
          <div className="hidden lg:block">
            <div className="relative">
              <img 
                src="/public/images/homehero.png" 
                alt="Security Personnel"
                className="w-full h-auto max-w-md ml-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;