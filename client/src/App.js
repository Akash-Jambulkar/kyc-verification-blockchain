import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import KYCForm from './pages/KYCForm';
import TrustScoreDashboard from './pages/TrustScoreDashboard';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kyc-form" element={<KYCForm />} />
        <Route path="/trust-score" element={<TrustScoreDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
