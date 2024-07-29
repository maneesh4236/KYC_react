import React from 'react';
import { useNavigate } from 'react-router-dom';

const DefaultPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Welcome to the KYC System</h1>
      <button className="btn btn-primary" onClick={() => navigate('/register')}>
        Register
      </button>
      <button className="btn btn-primary" onClick={() => navigate('/customer-login')}>
        Customer Login
      </button>
      <button className="btn btn-primary" onClick={() => navigate('/admin-login')}>
        Admin Login
      </button>
    </div>
  );
};

export default DefaultPage;
