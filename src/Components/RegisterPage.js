import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 // Import the CSS file for styling



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
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <table className="register-table">
          <tbody>
            <tr>
              <td>
                <label>
                  <input
                    type="radio"
                    value="Customer"
                    checked={role === 'Customer'}
                    onChange={() => setRole('Customer')}
                  />
                  Customer Sign Up
                </label>
              </td>
              <td>
                <label>
                  <input
                    type="radio"
                    value="Admin"
                    checked={role === 'Admin'}
                    onChange={() => setRole('Admin')}
                  />
                  Admin Sign Up
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  Username:
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  Email:
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  Password:
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  Confirm Password:
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button type="submit">Register</button>
              </td>
            </tr>
            {error && (
              <tr>
                <td colSpan="2">
                  <p className="error">{error}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default RegisterPage;
