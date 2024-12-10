import React from 'react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import { Shield, Twitter, Linkedin, Github } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow container mx-auto px-4 py-8"
      >
        {children}
      </motion.main>
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-primary-600" />
                <span className="font-semibold text-gray-900">TrustLend</span>
              </div>
              <p className="text-gray-600 text-sm">
                Secure, transparent loan management powered by advanced verification technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/kyc-form" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Apply for Loan
                  </a>
                </li>
                <li>
                  <a href="/trust-score" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Trust Score
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/security" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="/compliance" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Newsletter</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} TrustLend. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy
                </a>
                <span className="text-gray-300">|</span>
                <a href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Terms
                </a>
                <span className="text-gray-300">|</span>
                <a href="/cookies" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;