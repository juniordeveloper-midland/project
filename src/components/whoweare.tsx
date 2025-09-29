import React from 'react';

const WhoWeAre = () => {
  return (
    <div className="bg-blue-800 text-white">
      <div className="container mx-auto px-6 md:px-12 py-16 lg:py-20">
        {/* Top row: three pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 items-start">
          {/* Left Section - Who We Are */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-blue-800 text-xl font-bold">1</div>
            <h2 className="text-4xl lg:text-5xl font-bold">Who We Are</h2>
            <p className="text-sm leading-relaxed max-w-xs">
              With years of industry experience, G20 Security specializes in delivering reliable, round-the-clock security services, trusted by businesses across the UK.
            </p>
          </div>

          {/* Middle Section - Our Mission */}
          <div className="flex flex-col items-center text-center space-y-4 border-t lg:border-t-0 lg:border-l lg:border-r border-white/30 px-0 lg:px-8 pt-8 lg:pt-0">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-blue-800 text-xl font-bold">2</div>
            <h2 className="text-4xl lg:text-5xl font-bold">Our Mission</h2>
            <p className="text-sm leading-relaxed max-w-xs">
              To deliver tailored, high-quality security solutions built on integrity, reliability, and professionalism - keeping people, property, and businesses safe.
            </p>
          </div>

          {/* Right Section - Our Vision */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-blue-800 text-xl font-bold">3</div>
            <h2 className="text-4xl lg:text-5xl font-bold">Our Vision</h2>
            <p className="text-sm leading-relaxed max-w-xs">
              Our vision is to be the UK's most trusted security partner. We deliver innovative, reliable, and people-focused solutions.
            </p>
          </div>
        </div>

        {/* Bottom row: description + image anchored to baseline */}
        <div className="relative mt-12 lg:mt-16 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-end">
            <div className="space-y-6 text-base md:text-lg leading-relaxed max-w-none lg:pr-6 text-left">
              <p>
                Lorem ipsum dolor sit amet consectetur. Sed blandit platea amet gravida diam. Et at aliquet leo tristique risus a. Eget nam nec eleifend ut lectus consectetur proin magna. Gravida semper metus bibendum id suscipit turpis amet.
              </p>
              <p>
                Vivamus praesent egestas ullamcorper vehicula mi lobortis. Id maecenas mattis vivamus ac tincidunt ut risus viverra non. Cum ornare eget proin diam proin urna fermentum malesuada risus. Vitae mauris vulputate id libero nisl sociis sed. Ut imperdiet id feugiat rutrum. Tellus proin viverra diam pellentesque placerat.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end self-end overflow-visible">
              <img
                src="/images/whoweare.png"
                alt="G20 Security Personnel"
                className="w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl object-contain drop-shadow-xl translate-y-[10px] sm:translate-y-[8px] lg:translate-y-[10px] mb-[-12px] sm:mb-[-6px] lg:mb-[-8px] relative z-10"
                loading="lazy"
              />
            </div>
          </div>
          <div className="absolute left-0 right-0 bottom-0 h-px bg-white/30 z-0" />
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;