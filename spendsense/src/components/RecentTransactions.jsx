import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const RecentTransactions = ({ transactions }) => {
  const recentTransactions = transactions.slice(0, 3); // Limit to 4 transactions

  return (
    <div>
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
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
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

      {/* Button to view all transactions */}
      <div className="mt-3">
        <Link to="/transactions" className="btn btn-primary">View All Transactions</Link>
      </div>
    </div>
  );
};

export default RecentTransactions;
