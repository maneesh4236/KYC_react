import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // Ensure this CSS file is imported

const RegisterPage = () => {
  const [role, setRole] = useState('Customer'); // Default role is 'Customer'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState(''); // New state for email
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7236/api/User/register', {
        Username: username,
        Password: password,
        Role: role,
        Email: email // Include email in the request body
      });

      if (response.status === 200) {
        navigate('/'); // Redirect to login page on successful registration
      } else {
        setError('Registration failed');
      }
    } catch (error) {
      setError('An error occurred while registering');
    }
  };

  return (
    <div className="register-page">
      <header className="header">
        <h1>KYC Registration</h1>
      </header>
      
      <main>
        <form onSubmit={handleRegister}>
          <div className="role-selection">
            <label>
              <input
                type="radio"
                value="Customer"
                checked={role === 'Customer'}
                onChange={() => setRole('Customer')}
              />
              Customer Sign Up
            </label>
            <label>
              <input
                type="radio"
                value="Admin"
                checked={role === 'Admin'}
                onChange={() => setRole('Admin')}
              />
              Admin Sign Up
            </label>
          </div>
          <div className="form-group">
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Password:
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
          <button type="submit">Register</button>
          {error && <p className="error">{error}</p>}
        </form>
      </main>

      <footer className="footer">
        <p>&copy; 2024 KYC Application. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RegisterPage;
