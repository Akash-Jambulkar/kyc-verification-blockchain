import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/kyc-form">KYC Form</Link></li>
        <li><Link to="/trust-score">Trust Score</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
