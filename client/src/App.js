import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';  // Ensure correct path
import Home from './pages/Home';           // Ensure correct path
import KYCForm from './pages/KYCForm';     // Ensure correct path
import TrustScore from './pages/TrustScore';  // Ensure correct path
import './App.css';  // Global CSS

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kyc-form" element={<KYCForm />} />
        <Route path="/trust-score" element={<TrustScore />} />
      </Routes>
    </Router>
  );
};

export default App;
