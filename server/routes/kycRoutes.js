// server/routes/kycRoutes.js
const express = require('express');
const { submitKYC } = require('../controllers/kycController');
const router = express.Router();

router.post('/', submitKYC); // Define POST route for KYC submission

module.exports = router;
