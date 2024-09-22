import React, { useState } from 'react';
import './KYCForm.css';
import { useNavigate } from 'react-router-dom'; // Update this import

const validateInputs = (name, address, idNumber) => {
  if (!name || name.length < 3) return false;
  if (!address || address.length < 1) return false;
  if (!idNumber || idNumber.length < 1) return false;
  return true;
};

const KYCForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    idNumber: '',
  });
  const [status, setStatus] = useState('');
  const navigate = useNavigate(); // Update this line

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs before submission
    if (!validateInputs(formData.name, formData.address, formData.idNumber)) {
      setStatus('Please fill in all fields correctly.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/kyc/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setStatus(data.message);

      // Navigate to Trust Score page with the score
      navigate('/trust-score'); // Corrected path to match the route
    } catch (error) {
      setStatus('Error submitting form');
    }
  };

  return (
    <div className="kyc-form-container">
      <h1>KYC Verification Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="idNumber">ID Number</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
        {status && <p>{status}</p>}
      </form>
    </div>
  );
};

export default KYCForm;
