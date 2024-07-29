import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [kycDetails, setKycDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [newKycStatus, setNewKycStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKycDetails = async () => {
      try {
        const response = await axios.get('https://localhost:7236/api/KycDetails/all');
        setKycDetails(response.data);
      } catch (error) {
        setError('Failed to fetch KYC details.');
      } finally {
        setLoading(false);
      }
    };

    fetchKycDetails();
  }, []);

  const handleUpdateKycStatus = async () => {
    try {
      await axios.put('https://localhost:7236/api/KycApproval/update-status', {
        userId: selectedUser.userId,
        kycStatus: newKycStatus
      });
      setKycDetails(kycDetails.map(detail =>
        detail.userId === selectedUser.userId ? { ...detail, kycStatus: newKycStatus } : detail
      ));
      setSelectedUser(null);
      setNewKycStatus('');
    } catch (error) {
      setError('Failed to update KYC status.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Date of Birth</th>
            <th>Aadhar Card Number</th>
            <th>PAN Card Number</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>KYC Status</th>
          </tr>
        </thead>
        <tbody>
          {kycDetails.map(detail => (
            <tr key={detail.id}>
              <td>{detail.id}</td>
              <td>{detail.userId}</td>
              <td>{detail.name}</td>
              <td>{detail.address}</td>
              <td>{new Date(detail.dob).toLocaleDateString()}</td>
              <td>{detail.aadharCardNumber}</td>
              <td>{detail.panCardNumber}</td>
              <td>{detail.phoneNumber}</td>
              <td>{detail.email}</td>
              <td>
                {selectedUser && selectedUser.userId === detail.userId ? (
                  <div>
                    <input
                      type="text"
                      value={newKycStatus}
                      onChange={e => setNewKycStatus(e.target.value)}
                      placeholder="Enter new KYC status"
                    />
                    <button className="btn btn-success" onClick={handleUpdateKycStatus}>
                      Update
                    </button>
                    <button className="btn btn-secondary" onClick={() => setSelectedUser(null)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    {detail.kycStatus}
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        setSelectedUser(detail);
                        setNewKycStatus(detail.kycStatus);
                      }}
                    >
                      Update Status
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
