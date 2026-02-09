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
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <div className="flex-1">
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
              onClick={closeMenu}
            >
              <img 
                src="https://res.cloudinary.com/ds8hmsirb/image/upload/v1770658286/logo_3_aazr6c.png" 
                alt="AutoServe Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            <Link to="/" className="text-gray-700 hover:text-[#F97316] transition-colors font-medium">
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-[#F97316] transition-colors font-medium">
              Services
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-[#F97316] transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#F97316] transition-colors font-medium">
              Contact
            </Link>
            <Link to="/faq" className="text-gray-700 hover:text-[#F97316] transition-colors font-medium">
              FAQ
            </Link>
            {user?.role === 'admin' && (
              <Link 
                to="/admin/dashboard" 
                className="text-gray-700 hover:text-[#F97316] transition-colors font-medium"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Auth Section - Right Aligned */}
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-[#F97316] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-gray-700">{user.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 border-2 border-[#F97316] text-[#F97316] rounded-md hover:bg-[#F97316] hover:text-white transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-5 py-2 border-2 border-[#F97316] text-[#F97316] rounded-md hover:bg-[#F97316] hover:text-white transition-colors font-medium"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="px-5 py-2 border-2 border-[#F97316] text-[#F97316] rounded-md hover:bg-[#F97316] hover:text-white transition-colors font-medium"
                >
                  Login
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-[#F97316] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                  </svg>
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
