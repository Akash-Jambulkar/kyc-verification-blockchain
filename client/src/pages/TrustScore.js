import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import web3 from './web3';
import KYCStorage from './KYCStorage.json';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../ThemeContext';

const contractAddress = '0x0eB08bdBA4A585E39eC3ded019F2C37F1412f213';
const contractABI = KYCStorage.abi;
const contract = new web3.eth.Contract(contractABI, contractAddress);

const TrustScore = () => {
  const { isDarkMode } = useTheme();
  const [trustScores, setTrustScores] = useState(null);
  const [trustScore, setTrustScore] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrustScores = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/kyc/trust-score');
        if (!response.ok) {
          throw new Error('Failed to fetch trust scores');
        }
        const data = await response.json();
        setTrustScores(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchContractTrustScore = async () => {
      const accounts = await web3.eth.getAccounts();
      const kyc = await contract.methods.getKYC(accounts[0]).call();
      setTrustScore(Number(kyc.trustScore));
    };

    fetchTrustScores();
    fetchContractTrustScore();
  }, []);

  return (
    <div className={`trust-score-container ${isDarkMode ? 'dark' : 'light'}`}>
      <ThemeToggle />
      <h1>Trust Scores</h1>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <p>Error fetching Trust Scores: {error}</p>
      ) : (
        <>
          {trustScores !== null ? (
            <div>
              {trustScores.map((score, index) => (
                <div key={index}>
                  <p>Your Trust Score from API: {score.trust_score}</p>
                  <CircularProgress variant="determinate" value={score.trust_score} />
                </div>
              ))}
            </div>
          ) : (
            <p>No Trust Scores available from API.</p>
          )}
          {trustScore !== null ? (
            <div>
              <p>Your Trust Score from Smart Contract: {trustScore}</p>
              <CircularProgress variant="determinate" value={trustScore} />
            </div>
          ) : (
            <p>No Trust Score available from Smart Contract.</p>
          )}
        </>
      )}
    </div>
  );
};

export default TrustScore;
