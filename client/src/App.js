import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import KYCForm from './pages/KYCForm';
import TrustScore from './pages/TrustScore';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kyc-form" element={<KYCForm />} />
          <Route path="/trust-score" element={<TrustScore />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;