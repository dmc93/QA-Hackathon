// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css'; // Custom CSS for header

const Header = () => {
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
              <Link className="nav-link custom-link" to="/savings-goals"> {/* New link */}
                Savings Goals
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
