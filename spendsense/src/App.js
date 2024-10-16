import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import BillSplitting from './pages/BillSplitting';
import BudgetManagement from './pages/BudgetManagement';
import SavingsGoals from './pages/SavingsGoals';
import Transactions from './pages/Transactions';
import Login from './pages/Login';
import { useAuth } from './AuthContext'; // Make sure this hook returns the authentication state
import './css/Sitewide.css';

function App() {
  const { isAuthenticated } = useAuth(); // Get the authentication state

  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          
          {/* Protect these routes */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/bill-splitting" element={isAuthenticated ? <BillSplitting /> : <Navigate to="/login" />} />
          <Route path="/budget-management" element={isAuthenticated ? <BudgetManagement /> : <Navigate to="/login" />} />
          <Route path="/savings-goals" element={isAuthenticated ? <SavingsGoals /> : <Navigate to="/login" />} />
          <Route path="/transactions" element={isAuthenticated ? <Transactions /> : <Navigate to="/login" />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
