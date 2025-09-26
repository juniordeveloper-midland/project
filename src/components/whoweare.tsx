import React from 'react';

const WhoWeAre = () => {
  return (
    <div className="bg-blue-800 text-white min-h-screen flex items-center">
      <div className="container mx-auto px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Section - Who We Are */}
          <div className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-blue-800 text-xl font-bold">
                1
              </div>
              <h2 className="text-4xl font-bold">Who We Are</h2>
              <p className="text-sm leading-relaxed max-w-xs">
                With years of industry experience, G20 Security specializes in delivering reliable, round-the-clock security services, trusted by businesses across the UK.
              </p>
            </div>
            
            {/* Lorem ipsum text */}
            <div className="space-y-4 text-sm leading-relaxed  text-align-center">
              <p>
                Lorem ipsum dolor sit amet consectetur. Sed blandit platea amet gravida diam. Et et aliquet leo tristique risus a. Eget nam nec eleifend ut lectus consectetur proin magna. Gravida semper metus bibendum id suscipit turpis amet.
              </p>
              <p>
                Vivamus praesent egestas ullamcorper vehicula mi lobortis. Id maecenas mattis vivamus ac tincidunt ut risus viverra non. Cum ornare eget proin diam proin urna fermentum malesuada risus. Vitae mauris vulputate id libero nisl sociis sed. Ut imperdiet id feugiat rutrum. Tellus proin viverra diam pellentesque placerat. Porta ne
              </p>
            </div>
          </div>

          {/* Middle Section - Our Mission */}
          <div className="flex flex-col items-center text-center space-y-4 border-l border-r border-white/30 px-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-blue-800 text-xl font-bold">
              2
            </div>
            <h2 className="text-4xl font-bold">Our Mission</h2>
            <p className="text-sm leading-relaxed max-w-xs">
              To deliver tailored, high-quality security solutions built on integrity, reliability, and professionalism - keeping people, property, and businesses safe.
            </p>
          </div>

          {/* Right Section - Our Vision */}
          <div className="flex flex-col items-center text-center space-y-4 relative">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-blue-800 text-xl font-bold">
              3
            </div>
            <h2 className="text-4xl font-bold">Our Vision</h2>
            <p className="text-sm leading-relaxed max-w-xs">
              Our vision is to be the UK's most trusted security partner. We deliver innovative, reliable, and people-focused solutions.
            </p>
            
           
          </div>
          
        </div>
        
      </div>
      
    </div>
    
  );
};

export default WhoWeAre;