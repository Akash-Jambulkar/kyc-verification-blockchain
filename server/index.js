const express = require('express');
const cors = require('cors');
const pool = new Pool({
  connectionString: 'postgres://postgres:1234@localhost:5432/kyc_verification', // Update with your database name
});
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Test route
app.get('/', (req, res) => {
  res.send('KYC Verification API is running');
});

// KYC submission route (POST)
app.post('/api/kyc', async (req, res) => {
  const { name, address, idNumber } = req.body;

  if (!name || !address || !idNumber) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const trustScore = Math.floor(Math.random() * 100); // Generate a random trust score

  try {
    const newKYC = await pool.query(
      'INSERT INTO kyc_data (name, address, id_number, trust_score) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, address, idNumber, trustScore]
    );

    // Ensure trust_score is a regular number
    const trustScoreValue = newKYC.rows[0].trust_score instanceof BigInt 
      ? Number(newKYC.rows[0].trust_score) 
      : newKYC.rows[0].trust_score;

    res.json({
      message: 'KYC data submitted successfully',
      data: { ...newKYC.rows[0], trust_score: trustScoreValue }, // Use converted trust score
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// KYC data retrieval route (GET)
app.get('/api/kyc', async (req, res) => {
  try {
    const allKYC = await pool.query('SELECT * FROM kyc_data'); // Fetch all KYC records
    res.json(allKYC.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
