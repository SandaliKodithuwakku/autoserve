import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-[#F97316] hover:text-[#ea580c] transition-colors"
            onClick={closeMenu}
          >
            AutoServe
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-[#1F2937] hover:text-[#F97316] transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-[#1F2937] hover:text-[#F97316] transition-colors">
              Services
            </Link>
            <Link to="/about" className="text-[#1F2937] hover:text-[#F97316] transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-[#1F2937] hover:text-[#F97316] transition-colors">
              Contact
            </Link>
            <Link to="/faq" className="text-[#1F2937] hover:text-[#F97316] transition-colors">
              FAQ
            </Link>

            {/* Conditional Auth Links */}
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link 
                    to="/admin/dashboard" 
                    className="text-[#1F2937] hover:text-[#F97316] transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link 
                  to="/profile" 
                  className="text-[#1F2937] hover:text-[#F97316] transition-colors"
                >
                  Profile
                </Link>
                <span className="text-sm text-gray-600">
                  Hello, {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-[#1F2937] text-white px-4 py-2 rounded hover:bg-[#374151] transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[#1F2937] hover:text-[#F97316] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#F97316] text-white px-4 py-2 rounded hover:bg-[#ea580c] transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-[#1F2937] focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-[#1F2937] hover:text-[#F97316] transition-colors"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className="text-[#1F2937] hover:text-[#F97316] transition-colors"
                onClick={closeMenu}
              >
                Services
              </Link>
              <Link 
                to="/about" 
                className="text-[#1F2937] hover:text-[#F97316] transition-colors"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-[#1F2937] hover:text-[#F97316] transition-colors"
                onClick={closeMenu}
              >
                Contact
              </Link>
              <Link 
                to="/faq" 
                className="text-[#1F2937] hover:text-[#F97316] transition-colors"
                onClick={closeMenu}
              >
                FAQ
              </Link>

              {/* Mobile Conditional Auth Links */}
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin/dashboard" 
                      className="text-[#1F2937] hover:text-[#F97316] transition-colors"
                      onClick={closeMenu}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link 
                    to="/profile" 
                    className="text-[#1F2937] hover:text-[#F97316] transition-colors"
                    onClick={closeMenu}
                  >
                    Profile
                  </Link>
                  <span className="text-sm text-gray-600">
                    Hello, {user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-[#1F2937] text-white px-4 py-2 rounded hover:bg-[#374151] transition-colors text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[#1F2937] hover:text-[#F97316] transition-colors"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-[#F97316] text-white px-4 py-2 rounded hover:bg-[#ea580c] transition-colors text-center"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
