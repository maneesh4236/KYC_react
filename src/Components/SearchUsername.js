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
      const response = await axios.post('https://localhost:7236/api/User/check-username', { Username: username });

      if (response.status === 200 && response.data.exists) {
        setMessage('Username found. Please proceed to reset your password.');
        // Navigate to the password reset page or show further instructions
        // navigate('/reset-password'); // Uncomment and implement the reset password page if needed
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
