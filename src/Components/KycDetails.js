import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './KycDetails.css'; // Ensure this CSS file is imported

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

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
        setError('New user? request for Kyc');
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
    <div className="kyc-details-page">
      <header className="header">
        <h2>KYC Details</h2>
      </header>

      <main> 
        {error ? (
          <div className="error-container">
            <p>{error}</p>
            <button className="btn btn-primary" onClick={handleRedirectToSubmission}>
              Raise a KYC request
            </button>
          </div>
        ) : (
          <div>
            {kycDetails ? (
              <table className="kyc-table">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{kycDetails.name}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{kycDetails.address}</td>
                  </tr>
                  <tr>
                    <th>DOB</th>
                    <td>{formatDate(kycDetails.dob)}</td>
                  </tr>
                  <tr>
                    <th>Aadhar Card Number</th>
                    <td>{kycDetails.aadharCardNumber}</td>
                  </tr>
                  <tr>
                    <th>Pan Card Number</th>
                    <td>{kycDetails.panCardNumber}</td>
                  </tr>
                  <tr>
                    <th>Phone Number</th>
                    <td>{kycDetails.phoneNumber}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{kycDetails.email}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>{kycDetails.kycStatus}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div className="no-details-container">
                <p>You do not have KYC details submitted.</p>
                <button className="btn btn-primary" onClick={handleRedirectToSubmission}>
                  Submit KYC Details
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default KycDetails;
