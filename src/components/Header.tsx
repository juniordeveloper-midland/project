import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-3">
          {/* Logo + Brand - Left Side */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <img
              src="/images/G20Logo.jpg"
              alt="G20 Security Logo"
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-[#1f3b7a] tracking-wide">
              G20SECURITY
            </span>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center justify-center flex-1 space-x-10">
            <a
              href="/"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium"
            >
              About Us
            </a>
            <a
              href="/services"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium"
            >
              Our Services
            </a>
            <a
              href="/sectors"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium"
            >
              Sectors
            </a>
            <a
              href="/blogs"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium"
            >
              Blogs
            </a>
            <a
              href="/contact"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium"
            >
              Contact Us
            </a>
          </nav>

          {/* Mobile Menu Button - Right Side */}
          <div className="md:hidden ml-auto">
            <button
              onClick={toggleMobileMenu}
              className="flex flex-col justify-center items-center w-8 h-8 space-y-1"
              aria-label="Toggle mobile menu"
            >
              <div
                className={`w-6 h-0.5 bg-[#1f3b7a] transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-[#1f3b7a] transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-[#1f3b7a] transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 pb-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <nav className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
            <a
              href="/"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium py-2 px-2 rounded hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/about"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium py-2 px-2 rounded hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </a>
            <a
              href="/services"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium py-2 px-2 rounded hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Services
            </a>
            <a
              href="/sectors"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium py-2 px-2 rounded hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sectors
            </a>
            <a
              href="/blogs"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium py-2 px-2 rounded hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blogs
            </a>
            <a
              href="/contact"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium py-2 px-2 rounded hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
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