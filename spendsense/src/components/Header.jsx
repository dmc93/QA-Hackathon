import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import useAuth to get authentication state
import '../css/Header.css'; // Custom CSS for header

const Header = () => {
  const { isAuthenticated, logout } = useAuth(); // Get authentication state and logout function
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate('/login'); // Redirect to login page after logging out
  };

  return (
    <nav className="navbar navbar-expand-lg custom-header">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="logo">SpendSense</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {/* Conditional rendering based on authentication state */}
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/bill-splitting">
                    Bill Splitter
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/budget-management">
                    Manage Budgets
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/savings-goals">
                    Savings Goals
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/transactions">
                    Transactions
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link custom-link" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link custom-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
