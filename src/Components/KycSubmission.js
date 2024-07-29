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
  const navigate = useNavigate();
  const userId = localStorage.getItem('UserId');

  const handleSubmit = async (e) => {
    e.preventDefault();
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
              value={newKyc.aadharCardNumber}
              onChange={(e) => setNewKyc({ ...newKyc, aadharCardNumber: e.target.value })}
              required
            />
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
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control"
              value={newKyc.phoneNumber}
              onChange={(e) => setNewKyc({ ...newKyc, phoneNumber: e.target.value })}
              required
            />
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
