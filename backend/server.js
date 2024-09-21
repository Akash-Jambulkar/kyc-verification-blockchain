const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Make sure you have pg installed and configured for PostgreSQL
const Web3 = require('web3'); // Import Web3 for blockchain interaction
require('dotenv').config();
const contractData = require('./build/contracts/KYCStorage.json'); // Import the contract JSON

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize PostgreSQL connection
const pool = new Pool({
  connectionString: 'postgres://postgres:1234@localhost:5432/kyc_verification', // Update with your database name
});

// Connect to a blockchain provider (e.g., Infura or local node)
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_PROVIDER));

// Smart contract ABI and address
const contractABI = contractData.abi; // Use the ABI from the imported contract data
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address

// Create contract instance
const kycContract = new web3.eth.Contract(contractABI, contractAddress);

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Function to calculate Trust Score
const calculateTrustScore = (name, address, idNumber) => {
  let score = 0;

  // Add more comprehensive checks
  if (name && name.length > 3) score += 20;
  if (address && address.length > 5) score += 20;
  if (idNumber && idNumber.length >= 6) score += 20;

  // Additional checks for ID number format
  if (/^[0-9]{6,}$/.test(idNumber)) score += 20;

  return score;
};

// Routes

// Home route
app.get('/', (req, res) => {
  res.send('KYC Verification API is running');
});

// KYC submission route
app.post('/api/kyc', async (req, res) => {
  const { name, address, idNumber } = req.body;

  if (!name || !address || !idNumber) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const trustScore = calculateTrustScore(name, address, idNumber); // Use the existing function

  try {
    const newKYC = await pool.query(
      'INSERT INTO kyc_data (name, address, id_number, trust_score) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, address, idNumber, trustScore]
    );

    // Store KYC data on the blockchain
    const blockchainResponse = await storeKYCOnBlockchain(name, address, idNumber, trustScore);

    res.status(201).json({
      message: 'KYC data submitted successfully',
      data: newKYC.rows[0],
      blockchainReceipt: blockchainResponse.receipt,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Function to store KYC data on the blockchain
const storeKYCOnBlockchain = async (name, address, idNumber, trustScore) => {
  const account = '0xEDFB8125687F81eDA6818CB94cB47364cA29f84C'; // Replace with your wallet address
  const privateKey = '0xc97169fc4b95664e4702076ba3820fa7edb44797313431baed84e014b29ebabb'; // Replace with your private key (or use a better key management strategy)

  try {
    // Encode function call and send transaction
    const txData = kycContract.methods
      .storeKYC(name, address, idNumber, trustScore)
      .encodeABI();

    const tx = {
      to: contractAddress,
      data: txData,
      gas: 2000000,
      from: account,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    return { message: 'KYC data stored on blockchain', receipt };
  } catch (error) {
    console.error('Blockchain error:', error);
    throw new Error('Blockchain storage failed');
  }
};

// Route to get Trust Scores
app.get('/api/kyc/trust-score', async (req, res) => {
  try {
    console.log("Fetching trust scores..."); // Log here
    const trustScores = await pool.query('SELECT * FROM kyc_data'); // Fetch trust scores from kyc_data
    console.log(trustScores.rows); // Log fetched rows
    res.json(trustScores.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// PostgreSQL error handling
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
