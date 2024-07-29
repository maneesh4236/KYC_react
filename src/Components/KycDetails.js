import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const KycDetails = () => {
  const [kycDetails, setKycDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('UserId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKycDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7236/api/KycDetails/get/${userId}`);
        if (response.data) {
          setKycDetails(response.data);
        } else {
          setKycDetails(null);
        }
      } catch (error) {
        setError('Failed to fetch KYC details.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchKycDetails();
    } else {
      setError('User not logged in');
      setLoading(false);
    }
  }, [userId]);

  const handleRedirectToSubmission = () => {
    navigate('/submit-kyc');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2>KYC Details</h2>
      {error ? (
        <div>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={handleRedirectToSubmission}>
            Submit KYC Details
          </button>
        </div>
      ) : (
        <div>
          {kycDetails ? (
            <div>
              {/* Display KYC Details */}
              <div className="form-group">
                <label>Name</label>
                <p>{kycDetails.name}</p>
              </div>
              <div className="form-group">
                <label>Address</label>
                <p>{kycDetails.address}</p>
              </div>
              <div className="form-group">
                <label>DOB</label>
                <p>{kycDetails.dob}</p>
              </div>
              <div className="form-group">
                <label>Aadhar Card Number</label>
                <p>{kycDetails.aadharCardNumber}</p>
              </div>
              <div className="form-group">
                <label>Pan Card Number</label>
                <p>{kycDetails.panCardNumber}</p>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <p>{kycDetails.phoneNumber}</p>
              </div>
              <div className="form-group">
                <label>Email</label>
                <p>{kycDetails.email}</p>
              </div>
              <div className="form-group">
                <label>Status</label>
                <p>{kycDetails.kycStatus}</p>
              </div>
            </div>
          ) : (
            <div>
              <p>You do not have KYC details submitted.</p>
              <button className="btn btn-primary" onClick={handleRedirectToSubmission}>
                Submit KYC Details
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KycDetails;
