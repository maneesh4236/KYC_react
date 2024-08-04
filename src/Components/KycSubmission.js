import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './KycSubmission.css'; // Ensure this CSS file is imported

const KycSubmission = () => {
  const [newKyc, setNewKyc] = useState({
    name: '',
    address: '',
    dob: '',
    aadharCardNumber: '',
    panCardNumber: '',
    phoneNumber: '',
    email: '',
    kycStatus: ''
  });
  const [error, setError] = useState('');
  const [aadharError, setAadharError] = useState('');
  const [panError, setPanError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('UserId');

  // Format Aadhar Card number with dashes
  const formatAadharCardNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, ''); // Remove all non-numeric characters
    let formattedValue = '';

    for (let i = 0; i < cleanedValue.length; i++) {
      if (i > 0 && i % 4 === 0 && i < 12) {
        formattedValue += '-';
      }
      formattedValue += cleanedValue[i];
    }

    return formattedValue;
  };

  // Validate Aadhar Card
  const validateAadharCard = (value) => {
    const cleanedValue = value.replace(/\D/g, ''); // Remove all non-numeric characters
    return cleanedValue.length === 12;
  };

  // Validate PAN Card
  const validatePanCard = (value) => {
    const panRegex = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
    return panRegex.test(value);
  };

  // Validate Phone Number
  const validatePhoneNumber = (value) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Aadhar Card
    if (!validateAadharCard(newKyc.aadharCardNumber)) {
      setAadharError('Invalid Aadhar Card Number. It should be 12 digits long.');
      isValid = false;
    } else {
      setAadharError('');
    }

    // Validate PAN Card
    if (!validatePanCard(newKyc.panCardNumber)) {
      setPanError('Invalid PAN Card Number.');
      isValid = false;
    } else {
      setPanError('');
    }

    // Validate Phone Number
    if (!validatePhoneNumber(newKyc.phoneNumber)) {
      setPhoneError('Invalid Phone Number. It should be 10 digits long.');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (!isValid) {
      return;
    }

    try {
      await axios.post('https://localhost:7236/api/KycDetails/submit', { ...newKyc, UserId: userId });
      alert('KYC details submitted successfully!');
      navigate(`/kyc-details/${userId}`);
    } catch (error) {
      setError('Failed to submit KYC details.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Submit KYC Details</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={newKyc.name}
              onChange={(e) => setNewKyc({ ...newKyc, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              value={newKyc.address}
              onChange={(e) => setNewKyc({ ...newKyc, address: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>DOB</label>
            <input
              type="date"
              className="form-control"
              value={newKyc.dob}
              onChange={(e) => setNewKyc({ ...newKyc, dob: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Aadhar Card Number</label>
            <input
              type="text"
              className="form-control"
              value={formatAadharCardNumber(newKyc.aadharCardNumber)}
              onChange={(e) => setNewKyc({ ...newKyc, aadharCardNumber: formatAadharCardNumber(e.target.value) })}
              maxLength="16" // 12 digits + 3 dashes
              required
            />
            {aadharError && <p className="error">{aadharError}</p>}
          </div>
          <div className="form-group">
            <label>Pan Card Number</label>
            <input
              type="text"
              className="form-control"
              value={newKyc.panCardNumber}
              onChange={(e) => setNewKyc({ ...newKyc, panCardNumber: e.target.value })}
              required
            />
            {panError && <p className="error">{panError}</p>}
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control"
              value={newKyc.phoneNumber}
              onChange={(e) => setNewKyc({ ...newKyc, phoneNumber: e.target.value })}
              maxLength="10"
              required
            />
            {phoneError && <p className="error">{phoneError}</p>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={newKyc.email}
              onChange={(e) => setNewKyc({ ...newKyc, email: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default KycSubmission;
