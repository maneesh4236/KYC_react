import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SearchUsername.css';

const SearchUsername = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://localhost:7236/api/User/check-username', { params: { username } });

      if (response.status === 200 && response.data.exists) {
        setMessage('Username found. Please proceed to reset your password.');
        setTimeout(() => {
          navigate(`/add-new-password?username=${username}`);
        }, 2000); // Navigate after 2 seconds
      } else {
        setMessage('Username not found. Please check your input.');
      }
    } catch (error) {
      setMessage('An error occurred while searching for the username.');
    }
  };

  return (
    <div className="search-username-page">
      <header className="header">
        <h1>Forget Password</h1>
      </header>

      <main>
        <form onSubmit={handleSearch}>
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
          <button type="submit">Search Username</button>
          {message && <p className="message">{message}</p>}
        </form>
      </main>

      <footer className="footer">
        <p>&copy; 2024 KYC Application. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SearchUsername;
