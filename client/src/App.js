import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import KYCForm from './pages/KYCForm';
import TrustScoreDashboard from './pages/TrustScoreDashboard';
import Dashboard from './pages/Dashboard'; // Ensure this path is correct
import SignInPage from './pages/SignInPage'; // Import the SignInPage
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kyc-form" element={<KYCForm />} />
        <Route path="/trust-score" element={<TrustScoreDashboard />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        /> {/* Wrap Dashboard with ProtectedRoute */}
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </Router>
  );
};

export default App;
