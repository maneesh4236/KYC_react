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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7236/api/Customer/${id}`);
        setCustomerDetails(response.data);
      } catch (error) {
        setError('Failed to fetch customer details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  const validateAadharCard = (aadharCardNumber) => {
    const regex = /^(\d{4}-\d{4}-\d{4}-\d{4})$/;
    return regex.test(aadharCardNumber);
  };

  const validatePanCard = (panCardNumber) => {
    const regex = /^[A-Z]{5}[0-9]{5}$/;
    return regex.test(panCardNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { aadharCardNumber, panCardNumber } = customerDetails;

    if (!validateAadharCard(aadharCardNumber)) {
      setAadharError('Aadhar Card number must be 16 digits long with dashes between every four digits.');
      return;
    }

    if (!validatePanCard(panCardNumber)) {
      setPanError('PAN Card number must have 10 characters with the first five being uppercase letters and the remaining five being numbers.');
      return;
    }

    try {
      await axios.put(`https://localhost:7236/api/Customer/update/${id}`, customerDetails);
      navigate('/admin-dashboard');
    } catch (error) {
      setError('Failed to update customer details.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="edit-customer-details">
      <h2>Edit Customer Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name:
            <input type="text" name="name" value={customerDetails.name} onChange={handleChange} required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Address:
            <input type="text" name="address" value={customerDetails.address} onChange={handleChange} required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Date of Birth:
            <input type="date" name="dob" value={customerDetails.dob} onChange={handleChange} required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Aadhar Card Number:
            <input type="text" name="aadharCardNumber" value={customerDetails.aadharCardNumber} onChange={handleChange} required />
            {aadharError && <p className="error">{aadharError}</p>}
          </label>
        </div>
        <div className="form-group">
          <label>
            PAN Card Number:
            <input type="text" name="panCardNumber" value={customerDetails.panCardNumber} onChange={handleChange} required />
            {panError && <p className="error">{panError}</p>}
          </label>
        </div>
        <div className="form-group">
          <label>
            Phone Number:
            <input type="text" name="phoneNumber" value={customerDetails.phoneNumber} onChange={handleChange} required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input type="email" name="email" value={customerDetails.email} onChange={handleChange} required />
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditCustomerDetails;
