import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../ThemeContext';
import './TrustScoreDashboard.css';

const TrustScoreDashboard = () => {
  const { isDarkMode } = useTheme();
  const [trustScores, setTrustScores] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrustScores = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/kyc/trust-score');
        if (!response.ok) {
          throw new Error('Failed to fetch trust scores');
        }
        const data = await response.json();
        setTrustScores(data); // Ensure data is an array
      } catch (error) {
        setError(error.message);
        setTrustScores([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchTrustScores();
  }, []);

  // Check if loading or if there are no trust scores
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Error fetching Trust Scores: {error}</p>;
  }

  if (trustScores.length === 0) {
    return <p>No Trust Scores available.</p>;
  }

  return (
    <div className={`dashboard-container ${isDarkMode ? 'dark' : 'light'}`}>
      <ThemeToggle />
      <h1>Trust Score Dashboard</h1>
      <div className="trust-score-list">
        {trustScores.map((score) => (
          <div key={score.id} className="trust-score-card">
            <h2>{score.name}</h2>
            <p>Address: {score.address}</p>
            <p>ID Number: {score.id_number}</p>
            <p>Trust Score: {score.trust_score}</p>
            <p>Transaction History:</p>
            <ul>
              {score.transactions && score.transactions.length > 0 ? (
                score.transactions.map((transaction, index) => (
                  <li key={index}>{transaction}</li>
                ))
              ) : (
                <li>No transactions available.</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustScoreDashboard;
