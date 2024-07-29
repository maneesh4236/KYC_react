import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DefaultPage.css'; // Import CSS file for styling

const DefaultPage = () => {
  const navigate = useNavigate();

  return (
    <div className="default-page">
      <header className="header">
        <h1>Welcome to the KYC System</h1>
      </header>
      <main>
        <div className="card mt-2">
         
          <div className="button-container">
            <button className="btn register-btn" onClick={() => navigate('/register')}>
              Register
            </button>
            <button className="btn login-btn" onClick={() => navigate('/customer-login')}>
              Customer Login
            </button>
            <button className="btn login-btn" onClick={() => navigate('/admin-login')}>
              Admin Login
            </button>
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 KYC Application. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DefaultPage;
