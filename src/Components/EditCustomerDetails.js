import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCustomerDetails = () => {
  const { id } = useParams();
  const [customerDetails, setCustomerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7236/api/KycDetails/get/${id}`);
        setCustomerDetails(response.data);
      } catch (error) {
        setError('Failed to fetch customer details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7236/api/KycDetails/edit/${id}`, customerDetails);
      navigate('/admin-dashboard');
      // Optionally, show a success message to the user here
    } catch (error) {
      setError('Failed to update customer details.');
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
      <h2>Edit Customer Details</h2>
      {customerDetails && (
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={customerDetails.name}
              onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              value={customerDetails.address}
              onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              value={new Date(customerDetails.dob).toISOString().split('T')[0]}
              onChange={(e) => setCustomerDetails({ ...customerDetails, dob: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Aadhar Card Number</label>
            <input
              type="text"
              className="form-control"
              value={customerDetails.aadharCardNumber}
              onChange={(e) => setCustomerDetails({ ...customerDetails, aadharCardNumber: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>PAN Card Number</label>
            <input
              type="text"
              className="form-control"
              value={customerDetails.panCardNumber}
              onChange={(e) => setCustomerDetails({ ...customerDetails, panCardNumber: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control"
              value={customerDetails.phoneNumber}
              onChange={(e) => setCustomerDetails({ ...customerDetails, phoneNumber: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={customerDetails.email}
              onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      )}
    </div>
  );
};

export default EditCustomerDetails;
