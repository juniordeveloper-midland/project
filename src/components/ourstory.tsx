import React from 'react';
import { Play } from 'lucide-react';

const Triangle: React.FC<{ className?: string }> = ({ className }) => (
  <span className={`block w-0 h-0 border-l-[7px] border-r-[7px] border-b-[12px] border-transparent border-b-white ${className || ''}`}></span>
);

const OurStory = () => {
  return (
    <div className="bg-[#2041a5] text-white min-h-screen py-14 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Title */}
        <div className="text-center mb-14">
          <h1 className="text-[40px] leading-none font-medium mb-4">Our Story</h1>
          <div className="w-32 h-[3px] bg-white mx-auto"></div>
        </div>

        {/* Timeline + Media layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[520px_1fr] lg:gap-16">
          {/* Left timeline column */}
          <div className="max-w-[460px]">
            {/* Early Years */}
            <div className="relative pb-12">
              <Triangle className="mb-4" />
              <h2 className="text-[20px] font-medium mb-3">The Early Years</h2>
              <p className="text-[14px] leading-6 opacity-90">
                G20 Security was founded with a vision to provide reliable, professional guarding services. Our focus was on building trust, protecting local businesses, and ensuring community safety.
              </p>
            </div>

            {/* 1980s and 1990s */}
            <div className="relative pb-12">
              <Triangle className="mb-4" />
              <h2 className="text-[20px] font-medium mb-3">The 1980s and 1990s</h2>
              <p className="text-[14px] leading-6 opacity-90">
                We expanded our services into new industries, offering manned guarding and site patrols. This era marked our growth into a recognized provider of trusted security solutions.
              </p>
            </div>

            {/* From 2000 to Now */}
            <div className="relative">
              <Triangle className="mb-4" />
              <h2 className="text-[20px] font-medium mb-3">From 2000 to Now</h2>
              <p className="text-[14px] leading-6 opacity-90">
                G20 Security has evolved into a nationwide security partner, trusted across all industries. We deliver tailored services, combining trained guards with innovative guard tracking systems.
              </p>
            </div>
          </div>

          {/* Right media card aligned with middle section */}
          <div className="mt-10 lg:mt-[84px]">
            <div className="relative w-full max-w-[600px] h-[300px] bg-white/10 overflow-hidden mx-auto lg:ml-auto lg:mr-0">
              <img
                src="/public/images/walkitalki.jpg"
                alt="Security guard with radio"
                className="w-full h-full object-cover opacity-80"
              />
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;