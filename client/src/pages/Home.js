import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, TrendingUp, FileText, Activity } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container mx-auto px-4">
          <div className="hero-content">
            <h1>Secure Loan Management & Verification</h1>
            <p>
              Experience a new era of lending with our transparent, secure, and
              trustworthy system backed by advanced verification technology.
            </p>
            <div className="flex gap-4 justify-center mt-8">
              <Link
                to="/kyc-form"
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/trust-score"
                className="bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Shield className="w-6 h-6" />
            </div>
            <h3>Secure Verification</h3>
            <p>Advanced identity verification system</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3>Smart Analytics</h3>
            <p>Data-driven lending decisions</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FileText className="w-6 h-6" />
            </div>
            <h3>Quick Process</h3>
            <p>Streamlined application flow</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Activity className="w-6 h-6" />
            </div>
            <h3>Live Monitoring</h3>
            <p>Real-time loan tracking</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Identity Verification</h3>
              <p className="text-gray-600">Complete our secure verification process using government-issued ID</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Trust Score</h3>
              <p className="text-gray-600">Receive your personalized trust score based on verified data</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Apply for Loan</h3>
              <p className="text-gray-600">Submit your loan application with supporting documents</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Get Funded</h3>
              <p className="text-gray-600">Receive funds directly to your account upon approval</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-8">
          Join thousands of satisfied customers who have successfully secured loans through our platform.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/kyc-form"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Start Verification
          </Link>
          <Link
            to="/trust-score"
            className="bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Check Trust Score
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
                <span className="font-semibold">TrustLend</span>
              </div>
              <p className="text-gray-600 text-sm">
                Secure, transparent loan management powered by advanced verification technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Personal Loans</li>
                <li>Business Loans</li>
                <li>Trust Score</li>
                <li>Verification</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Documentation</li>
                <li>Help Center</li>
                <li>Security</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Compliance</li>
                <li>Security Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 flex justify-between items-center">
            <p className="text-gray-600 text-sm">© 2024 TrustLend. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">Twitter</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">LinkedIn</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;