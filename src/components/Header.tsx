import React from "react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo + Brand */}
          <div className="flex items-center space-x-2">
            <img
              src="https://your-domain.com/logo.png"
              alt="G20 Security Logo"
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-[#1f3b7a] tracking-wide">
              G20SECURITY
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <a
              href="#"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium"
            >
              Our Services
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium"
            >
              Sectors
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium"
            >
              Blogs
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium"
            >
              Contact Us
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
