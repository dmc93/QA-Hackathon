// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import BillSplitting from './pages/BillSplitting';
import BudgetManagement from './pages/BudgetManagement'; // Import Budget Management Page
import Login from './pages/Login';
import './css/Sitewide.css';

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bill-splitting" element={<BillSplitting />} />
          <Route path="/budget-management" element={<BudgetManagement />} /> {/* New Route */}
          <Route path="/" element={<Login />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
