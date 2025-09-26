import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo + Brand */}
          <div className="flex items-center space-x-2">
            <img
              src="https://i.postimg.cc/8P6cvDY8/g20.jpg"
              alt="G20 Security Logo"
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-[#1f3b7a] tracking-wide">
              G20SECURITY
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link
              to="/"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium"
            >
              About Us
            </Link>
            <Link
              to="/services"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium"
            >
              Our Services
            </Link>
            <Link
              to="/sectors"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium"
            >
              Sectors
            </Link>
            <Link
              to="/blogs"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium"
            >
              Blogs
            </Link>
            <Link
              to="/contact"
              className="text-gray-400 hover:text-[#1f3b7a] transition-colors text-base font-medium"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
