import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Logo } from '../common';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleSignOut = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/97 backdrop-blur-lg border-b border-gray-200 h-16 flex items-center px-8">
      <div className="max-w-7xl mx-auto w-full flex items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo size={16} />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center list-none flex-1 gap-0 ml-9">
          <li>
            <a href="#" className="block px-3.5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out whitespace-nowrap">
              Cryptocurrencies
            </a>
          </li>
          <li>
            <a href="#" className="block px-3.5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out whitespace-nowrap">
              Individuals
            </a>
          </li>
          <li>
            <a href="#" className="block px-3.5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out whitespace-nowrap">
              Businesses
            </a>
          </li>
          <li>
            <a href="#" className="block px-3.5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out whitespace-nowrap">
              Institutions
            </a>
          </li>
          <li>
            <a href="#" className="block px-3.5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out whitespace-nowrap">
              Developers
            </a>
          </li>
          <li>
            <a href="#" className="block px-3.5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out whitespace-nowrap">
              Company
            </a>
          </li>
        </ul>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          {/* Search Icon */}
          <button className="w-9 h-9 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4.5 h-4.5">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          {/* Globe Icon */}
          <button className="w-9 h-9 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4.5 h-4.5">
              <circle cx="12" cy="12" r="9" />
              <path d="M3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18" />
            </svg>
          </button>

          {isAuthenticated ? (
            <>
              {/* User Menu */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span>{user?.name || 'User'}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform group-hover:translate-y-0 translate-y-1">
                  <div className="py-1">
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                      Dashboard
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                      Settings
                    </Link>
                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Sign In */}
              <Link to="/signin" className="px-5 py-2 text-sm font-semibold text-gray-900 bg-transparent border border-gray-300 rounded-full hover:border-gray-400 transition-colors">
                Sign in
              </Link>

              {/* Sign Up */}
              <Link to="/signup" className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 border-none rounded-full hover:bg-blue-700 transition-colors">
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            {isMobileMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 py-4 px-8">
          <div className="flex flex-col space-y-4">
            <a href="#" className="block px-3.5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              Cryptocurrencies
            </a>
            <a href="#" className="block px-3.5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              Individuals
            </a>
            <a href="#" className="block px-3.5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              Businesses
            </a>
            <a href="#" className="block px-3.5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              Institutions
            </a>
            <a href="#" className="block px-3.5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              Developers
            </a>
            <a href="#" className="block px-3.5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              Company
            </a>

            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-900">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span>{user?.name || 'User'}</span>
                  </div>
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" size="small" className="w-full justify-start">
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" size="small" className="w-full justify-start">
                      Settings
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="small"
                    className="w-full justify-start"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" size="small" className="w-full justify-start">
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="primary" size="small" className="w-full">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
