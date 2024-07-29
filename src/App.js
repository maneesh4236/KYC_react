import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Only one import for BrowserRouter, Route, and Routes
import RegisterPage from './Components/RegisterPage.js';
import './App.css';
import CustomerLoginPage from './Components/CustomerLoginPage.js';
import KycDetails from './Components/KycDetails.js'; // Import KycDetails component
import KycSubmission from './Components/KycSubmission.js';
import AdminDashboard from './Components/AdminDashboard.js';
import DefaultPage from './Components/DefaultPage.js';
import AdminLoginPage from './Components/AdminLoginPage.js';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            
          <Route path="/" element={<DefaultPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/customer-login" element={<CustomerLoginPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/kyc-details/:userId" element={<KycDetails />} />
            <Route path="/submit-kyc" element={<KycSubmission />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
