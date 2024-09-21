import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material'; // Example of using Material UI

const TrustScore = () => {
  const [trustScores, setTrustScores] = useState(null); // Changed to trustScores to handle multiple scores
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    const fetchTrustScores = async () => { // Updated function name for clarity
      setLoading(true); // Set loading state
      try {
        const response = await fetch('http://localhost:5000/api/kyc/trust-score');
        if (!response.ok) {
          throw new Error('Failed to fetch trust scores'); // Updated error message
        }
        const data = await response.json();
        setTrustScores(data); // Expecting an array of scores
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Reset loading state
      }
    };
    fetchTrustScores();
  }, []);

  return (
    <div>
      <h1>Trust Scores</h1>
      {loading ? ( // Show loading message while fetching
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching Trust Scores: {error}</p>
      ) : (
        trustScores !== null ? (
          <div>
            {trustScores.map((score, index) => ( // Map through trustScores array
              <div key={index}>
                <p>Your Trust Score: {score.trust_score}</p>
                <CircularProgress variant="determinate" value={score.trust_score} />
              </div>
            ))}
          </div>
        ) : (
          <p>No Trust Scores available.</p>
        )
      )}
    </div>
  );
};

export default TrustScore;
