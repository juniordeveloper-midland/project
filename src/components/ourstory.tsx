import React from 'react';
import { ChevronDown, Play } from 'lucide-react';

const OurStory = () => {
  return (
    <div className="bg-blue-900 text-white min-h-screen py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with chevron */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-4">
            <ChevronDown className="text-white w-6 h-6" />
          </div>
          <h1 className="text-5xl font-light mb-4">Our Story</h1>
          <div className="w-20 h-0.5 bg-white mx-auto"></div>
        </div>

        {/* The Early Years Section */}
        <div className="mb-32">
          <div className="text-left max-w-md">
            <h2 className="text-2xl font-light mb-6">The Early Years</h2>
            <p className="text-base leading-relaxed opacity-90">
              G20 Security was founded with a vision to provide reliable, professional guarding services. Our focus was on building trust, protecting local businesses, and ensuring community safety.
            </p>
          </div>
        </div>

        {/* Center chevron */}
        <div className="flex justify-center mb-16">
          <ChevronDown className="text-white w-6 h-6" />
        </div>

        {/* The 1980s and 1990s Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="text-left">
            <h2 className="text-2xl font-light mb-6">The 1980s and 1990s</h2>
            <p className="text-base leading-relaxed opacity-90">
              We expanded our services into new industries, offering manned guarding and site patrols. This era marked our growth into a recognized provider of trusted security solutions.
            </p>
          </div>
          <div className="relative">
            {/* Video/Image container */}
            <div className="relative rounded-lg overflow-hidden h-64 bg-gray-800">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23475569'/%3E%3Cg%3E%3Crect x='280' y='100' width='80' height='120' fill='%23334155'/%3E%3Crect x='295' y='85' width='50' height='40' fill='%231e293b'/%3E%3Ccircle cx='320' cy='105' r='15' fill='%23f1f5f9'/%3E%3Crect x='310' y='130' width='20' height='60' fill='%231e293b'/%3E%3Crect x='305' y='190' width='30' height='30' fill='%231e293b'/%3E%3C/g%3E%3Ctext x='50' y='280' font-family='Arial' font-size='12' fill='%23cbd5e1'%3ESecurity Guard%3C/text%3E%3C/svg%3E"
                alt="Security guard with radio"
                className="w-full h-full object-cover"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white bg-opacity-90 rounded-full p-3 cursor-pointer hover:bg-opacity-100 transition-all shadow-lg">
                  <Play className="w-6 h-6 text-blue-900 ml-0.5 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center chevron */}
        <div className="flex justify-center mb-20">
          <ChevronDown className="text-white w-6 h-6" />
        </div>

        {/* From 2000 to Now Section */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-light mb-8">From 2000 to Now</h2>
          <p className="text-base leading-relaxed opacity-90">
            G20 Security has evolved into a nationwide security partner, trusted across all industries. We deliver tailored services, combining trained guards with innovative guard tracking systems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurStory;