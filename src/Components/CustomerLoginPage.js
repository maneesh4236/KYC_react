import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './CustomerLoginPage.css';

const CustomerLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7236/api/User/login', {
        Username: username,
        Password: password,
      });

      if (response.status === 200) {
        const { userId, role } = response.data;
        localStorage.setItem('UserId', userId);

        if (role === 'Customer') {
          navigate(`/kyc-details/${userId}`);
        } else {
          setError('You do not have customer access');
        }
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError('An error occurred while logging in');
    }
  };

  return (
    <div className="login-page">
      <header className="header">
        <h1>Customer Login</h1>
      </header>

      <main>
        <form onSubmit={handleLogin}>
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
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
        <Link to="/search-username">Forget Password?</Link>
      </main>

      <footer className="footer">
        <p>&copy; 2024 KYC Application. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CustomerLoginPage;
