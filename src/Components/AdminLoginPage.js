import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
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

        if (role === 'Admin') {
          navigate('/admin-dashboard');
        } else {
          setError('You do not have admin access');
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
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div>
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
        <div>
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
    </div>
  );
};

export default AdminLoginPage;
