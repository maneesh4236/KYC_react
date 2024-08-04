import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCustomerDetails = () => {
  const { id } = useParams();
  const [customerDetails, setCustomerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [aadharError, setAadharError] = useState('');
  const [panError, setPanError] = useState('');
  const [phoneError, setPhoneError] = useState('');
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

  const validateAadharCard = (value) => {
    const cleanedValue = value.replace(/\D/g, ''); // Remove all non-numeric characters
    return cleanedValue.length === 12;
  };

  const validatePanCard = (value) => {
    const panRegex = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
    return panRegex.test(value);
  };

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!validateAadharCard(customerDetails.aadharCardNumber)) {
      setAadharError('Invalid Aadhar Card Number. It should be 12 digits long.');
      isValid = false;
    } else {
      setAadharError('');
    }

    if (!validatePanCard(customerDetails.panCardNumber)) {
      setPanError('Invalid PAN Card Number.');
      isValid = false;
    } else {
      setPanError('');
    }

    if (!validatePhoneNumber(customerDetails.phoneNumber)) {
      setPhoneError('Invalid Phone Number. It should be 10 digits long.');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (!isValid) {
      return;
    }

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
              value={formatAadharCardNumber(customerDetails.aadharCardNumber)}
              onChange={(e) => setCustomerDetails({ ...customerDetails, aadharCardNumber: formatAadharCardNumber(e.target.value) })}
              maxLength="16" // 12 digits + 3 dashes
            />
            {aadharError && <p className="error">{aadharError}</p>}
          </div>
          <div className="form-group">
            <label>PAN Card Number</label>
            <input
              type="text"
              className="form-control"
              value={customerDetails.panCardNumber}
              onChange={(e) => setCustomerDetails({ ...customerDetails, panCardNumber: e.target.value })}
            />
            {panError && <p className="error">{panError}</p>}
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control"
              value={customerDetails.phoneNumber}
              onChange={(e) => setCustomerDetails({ ...customerDetails, phoneNumber: e.target.value })}
              maxLength="10"
            />
            {phoneError && <p className="error">{phoneError}</p>}
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
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default EditCustomerDetails;
