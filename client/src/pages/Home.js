import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../ThemeContext';

const Home = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`home-container ${isDarkMode ? 'dark' : 'light'}`}>
      <ThemeToggle />
      <header className="home-header">
        <h1>Welcome to Our Platform</h1>
        <p>Your one-stop solution for KYC verification and trust scoring.</p>
      </header>
      <section className="home-features">
        <h2>Features</h2>
        <div className="feature">
          <h3>Secure KYC Verification</h3>
          <p>Fast and secure verification process.</p>
        </div>
        <div className="feature">
          <h3>Trust Score Calculation</h3>
          <p>Get your trust score based on verified data.</p>
        </div>
        <div className="feature">
          <h3>User-Friendly Interface</h3>
          <p>Easy to navigate and use.</p>
        </div>
      </section>
      <section className="home-engagement">
        <h2>Get Started</h2>
        <p>Join us today and experience seamless banking and loan applications.</p>
        <div className="home-buttons">
          <Link to="/kyc-form" className="btn">Start KYC Verification</Link>
          <Link to="/trust-score" className="btn">Check Trust Score</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
