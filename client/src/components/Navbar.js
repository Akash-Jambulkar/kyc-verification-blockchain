import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary-600" />
            <span className="font-semibold text-gray-900">TrustLend</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                Products
                <span className="ml-1">▼</span>
              </button>
              <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block">
                <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Personal Loans
                </Link>
                <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Business Loans
                </Link>
              </div>
            </div>
            <Link to="/kyc-form" className="text-gray-600 hover:text-gray-900">
              Apply for Loan
            </Link>
            <Link to="/trust-score" className="text-gray-600 hover:text-gray-900">
              Trust Score
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/trust-score" className="text-gray-600 hover:text-gray-900">
              Sign In
            </Link>
            <Link
              to="/kyc-form"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link
                to="/kyc-form"
                className="block text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Apply for Loan
              </Link>
              <Link
                to="/trust-score"
                className="block text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Trust Score
              </Link>
              <Link
                to="/trust-score"
                className="block text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/kyc-form"
                className="block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;