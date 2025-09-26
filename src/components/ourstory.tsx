import React from 'react';
import { Play } from 'lucide-react';

const OurStory = () => {
  return (
    <div className="bg-[#143eb9] text-white min-h-screen py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header with chevron */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light mb-3">Our Story</h1>
          <div className="w-28 h-0.5 bg-white mx-auto"></div>
        </div>

        {/* The Early Years Section */}
        <div className="mb-20">
          <div className="text-left max-w-[420px]">
            <span className="block w-0 h-0 mx-auto mb-3 border-l-4 border-r-4 border-b-8 border-transparent border-b-white"></span>
            <h2 className="text-xl font-light mb-3">The Early Years</h2>
            <p className="text-sm leading-relaxed opacity-90">
              G20 Security was founded with a vision to provide reliable, professional guarding services. Our focus was on building trust, protecting local businesses, and ensuring community safety.
            </p>
          </div>
        </div>

        {/* The 1980s and 1990s Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[520px_1fr] gap-12 items-start mb-16">
          <div className="text-left max-w-[420px]">
            <span className="block w-0 h-0 mx-auto mb-3 border-l-4 border-r-4 border-b-8 border-transparent border-b-white"></span>
            <h2 className="text-xl font-light mb-3">The 1980s and 1990s</h2>
            <p className="text-sm leading-relaxed opacity-90">
              We expanded our services into new industries, offering manned guarding and site patrols. This era marked our growth into a recognized provider of trusted security solutions.
            </p>
          </div>
          <div className="relative">
            {/* Video/Image container */}
            <div className="relative overflow-hidden w-[600px] h-[280px] bg-[#465469]/80 mx-auto lg:ml-auto lg:mr-0">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23475569'/%3E%3Cg%3E%3Crect x='280' y='100' width='80' height='120' fill='%23334155'/%3E%3Crect x='295' y='85' width='50' height='40' fill='%231e293b'/%3E%3Ccircle cx='320' cy='105' r='15' fill='%23f1f5f9'/%3E%3Crect x='310' y='130' width='20' height='60' fill='%231e293b'/%3E%3Crect x='305' y='190' width='30' height='30' fill='%231e293b'/%3E%3C/g%3E%3Ctext x='50' y='280' font-family='Arial' font-size='12' fill='%23cbd5e1'%3ESecurity Guard%3C/text%3E%3C/svg%3E"
                alt="Security guard with radio"
                className="w-full h-full object-cover opacity-70"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white bg-opacity-95 rounded-full p-3 cursor-pointer hover:bg-opacity-100 transition-all shadow-lg">
                  <Play className="w-5 h-5 text-[#1f3472] ml-0.5 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* From 2000 to Now Section */}
        <div className="text-left max-w-[420px]">
          <span className="block w-0 h-0 mx-auto mb-3 border-l-4 border-r-4 border-b-8 border-transparent border-b-white"></span>
          <h2 className="text-xl font-light mb-3">From 2000 to Now</h2>
          <p className="text-sm leading-relaxed opacity-90">
            G20 Security has evolved into a nationwide security partner, trusted across all industries. We deliver tailored services, combining trained guards with innovative guard tracking systems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurStory;