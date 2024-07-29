import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './Components/RegisterPage';
import './App.css';
import CustomerLoginPage from './Components/CustomerLoginPage';
import KycDetails from './Components/KycDetails';
import KycSubmission from './Components/KycSubmission.js';
import AdminDashboard from './Components/AdminDashboard';
import DefaultPage from './Components/DefaultPage';
import AdminLoginPage from './Components/AdminLoginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="App-nav">
            <h1>KYC Application</h1>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="/customer-login">Customer Login</a></li>
              <li><a href="/admin-login">Admin Login</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<DefaultPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/customer-login" element={<CustomerLoginPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/kyc-details/:userId" element={<KycDetails />} />
            <Route path="/submit-kyc" element={<KycSubmission />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
