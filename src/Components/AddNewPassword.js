import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './AddNewPassword.css';

const AddNewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7236/api/User/reset-password', {
        Username: username,
        Password: password,
      });

      if (response.status === 200) {
        setMessage('Password reset successfully. You can now log in with your new password.');
        setTimeout(() => {
          navigate('/');
        }, 2000); // Navigate to login page after 2 seconds
      } else {
        setMessage('Password reset failed.');
      }
    } catch (error) {
      setMessage('An error occurred while resetting the password.');
    }
  };

  return (
    <div className="reset-password-page">
      <header className="header">
        <h1>Reset Password</h1>
      </header>

      <main>
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label>
              New Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Reset Password</button>
          {message && <p className="message">{message}</p>}
        </form>
      </main>

      <footer className="footer">
        <p>&copy; 2024 KYC Application. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AddNewPassword;
