import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // We will create this CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the KYC Verification and Trust Score Platform</h1>
      <p>Get verified and know your Trust Score for seamless banking and loan applications.</p>
      
      <div className="home-buttons">
        <Link to="/kyc-form" className="btn">Start KYC Verification</Link>
        <Link to="/trust-score" className="btn">Check Trust Score</Link>
      </div>
    </div>
  );
};

export default Home;
