const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const Web3 = require('web3').default;
require('dotenv').config();
const contractData = require('C:/Users/akash/OneDrive/Desktop/KYC_Project/build/contracts/KYCStorage.json');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize PostgreSQL connection
const pool = new Pool({
  connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});

// Initialize web3 with Ganache provider
const web3 = new Web3(process.env.BLOCKCHAIN_PROVIDER);

// Smart contract ABI and address
const contractABI = contractData.abi;
const contractAddress = process.env.CONTRACT_ADDRESS;

// Create contract instance
const kycContract = new web3.eth.Contract(contractABI, contractAddress);

// Middleware
app.use(cors());
app.use(express.json());

// Function to calculate Trust Score
const calculateTrustScore = (name, address, idNumber) => {
  let score = 0;
  if (name && name.length > 3) score += 20;
  if (address && address.length > 5) score += 20;
  if (idNumber && idNumber.length >= 6) score += 20;
  if (/^[0-9]{6,}$/.test(idNumber)) score += 20;
  return score;
};

// Routes
app.get('/', (req, res) => {
  res.send('KYC Verification API is running');
});

// KYC submission route
app.post('/api/kyc', async (req, res) => {
  const { name, address, idNumber } = req.body;
  if (!name || !address || !idNumber) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  const trustScore = calculateTrustScore(name, address, idNumber);
  try {
    const newKYC = await pool.query(
      'INSERT INTO kyc_data (name, address, id_number, trust_score) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, address, idNumber, trustScore]
    );
    const blockchainResponse = await storeKYCOnBlockchain(name, address, idNumber, trustScore);
    const responseData = {
      message: 'KYC data submitted successfully',
      data: {
        ...newKYC.rows[0],
        trust_score: newKYC.rows[0].trust_score.toString(),
      },
      blockchainReceipt: blockchainResponse.receipt,
    };
    res.status(201).json(responseData);
  } catch (err) {
    console.error('Error during KYC submission:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Function to store KYC data on the blockchain
const storeKYCOnBlockchain = async (name, address, idNumber, trustScore) => {
  const account = process.env.BLOCKCHAIN_ACCOUNT;
  const privateKey = process.env.BLOCKCHAIN_PRIVATE_KEY;
  try {
    const txData = kycContract.methods
      .storeKYC(name, address, idNumber, trustScore)
      .encodeABI();
    const tx = {
      to: contractAddress,
      data: txData,
      gas: 2000000,
      gasPrice: await web3.eth.getGasPrice(),
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
    const trustScores = await pool.query('SELECT * FROM kyc_data');
    const formattedScores = trustScores.rows.map(row => ({
      ...row,
      trust_score: typeof row.trust_score === 'bigint' ? row.trust_score.toString() : Number(row.trust_score),
    }));
    res.json(formattedScores);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// PostgreSQL error handling
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Example route to check connection
app.get('/check-blockchain', async (req, res) => {
  try {
    const blockNumber = await web3.eth.getBlockNumber();
    res.send(`Connected! Current block number is: ${blockNumber}`);
  } catch (error) {
    res.status(500).send('Error connecting to blockchain');
  }
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
