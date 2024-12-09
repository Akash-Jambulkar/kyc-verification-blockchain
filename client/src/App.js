import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import KYCForm from './pages/KYCForm';
import TrustScore from './pages/TrustScore';
import './App.css';
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import KYCForm from './pages/KYCForm';
import TrustScoreDashboard from './pages/TrustScoreDashboard';
import Dashboard from './pages/Dashboard'; // Ensure this path is correct
import SignInPage from './pages/SignInPage'; // Import the SignInPage
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
>>>>>>> e9e2651882b856433bdb6cad60a594264125e5ed

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kyc-form" element={<KYCForm />} />
          <Route path="/trust-score" element={<TrustScore />} />
        </Routes>
      </Layout>
=======
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
>>>>>>> e9e2651882b856433bdb6cad60a594264125e5ed
    </Router>
  );
}

export default App;