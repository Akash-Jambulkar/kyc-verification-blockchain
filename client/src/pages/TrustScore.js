import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material'; // Example of using Material UI
import web3 from './web3';
import KYCStorage from './KYCStorage.json';  // Import the ABI

const contractAddress = '0x0eB08bdBA4A585E39eC3ded019F2C37F1412f213'; // Replace with your deployed contract address
const contractABI = KYCStorage.abi;
const contract = new web3.eth.Contract(contractABI, contractAddress);

const TrustScore = () => {
  const [trustScores, setTrustScores] = useState(null); // For API trust scores
  const [trustScore, setTrustScore] = useState(null); // For smart contract trust score
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    const fetchTrustScores = async () => { // Fetch from API
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

    const fetchContractTrustScore = async () => { // Fetch from smart contract
      const accounts = await web3.eth.getAccounts();
      const kyc = await contract.methods.getKYC(accounts[0]).call();
      setTrustScore(Number(kyc.trustScore)); // Convert BigInt to Number
    };

    const getBlockNumber = async () => { // Fetch current block number
      const blockNumber = await web3.eth.getBlockNumber();
      console.log('Current Block Number:', blockNumber);
    };

    fetchTrustScores();
    fetchContractTrustScore();
    getBlockNumber(); // Call to get block number
  }, []);

  return (
    <div>
      <h1>Trust Scores</h1>
      {loading ? ( // Show loading message while fetching
        <CircularProgress />
      ) : error ? (
        <p>Error fetching Trust Scores: {error}</p>
      ) : (
        <>
          {trustScores !== null ? (
            <div>
              {trustScores.map((score, index) => ( // Map through trustScores array
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
