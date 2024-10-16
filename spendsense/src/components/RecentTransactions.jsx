// src/components/RecentTransactions.js
import React from 'react';

const RecentTransactions = ({ transactions }) => {
  const recentTransactions = transactions.slice(0, 3); // Limit to 3 transactions

  return (
    <div className="col-md-6">
      <h4>Recent Transactions</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>£{transaction.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No recent transactions available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions;
