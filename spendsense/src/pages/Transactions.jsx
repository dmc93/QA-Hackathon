import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../api'; // Import the fetch function
import '../css/Transactions.css'; // Custom CSS for styling

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [months, setMonths] = useState([]);

  // Fetch transactions when the component mounts
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions(); // Fetch data from backend
        setTransactions(data);
        setFilteredTransactions(data); // Show all by default
      } catch (error) {
        console.error('Failed to load transactions:', error);
      }
    };
    loadTransactions();
  }, []);

  // Generate the last 12 months dynamically for the dropdown filter
  useEffect(() => {
    const generateLast12Months = () => {
      const monthList = [];
      const today = new Date();

      for (let i = 0; i < 12; i++) {
        const pastMonth = new Date(today.getFullYear(), today.getMonth() - i);
        const monthName = pastMonth.toLocaleString('default', { month: 'long' });
        const monthYear = `${monthName} ${pastMonth.getFullYear()}`;
        monthList.push({ value: pastMonth.toISOString().slice(0, 7), label: monthYear });
      }
      setMonths(monthList);
    };

    generateLast12Months();
  }, []);

  // Filter transactions based on the selected month
  useEffect(() => {
    if (selectedMonth === '') {
      setFilteredTransactions(transactions); // Show all if no month is selected
    } else {
      const filtered = transactions.filter((transaction) =>
        transaction.date.startsWith(selectedMonth)
      );
      setFilteredTransactions(filtered);
    }
  }, [selectedMonth, transactions]);

  // Function to export filtered transactions as CSV
  const exportToCSV = () => {
    const csvContent = [
      ['Date', 'Description', 'Category', 'Amount'], // CSV headers
      ...filteredTransactions.map((transaction) => [
        new Date(transaction.date).toLocaleDateString(), // Format the date in CSV
        transaction.description,
        transaction.category,
        `£${transaction.amount}`,
      ]),
    ]
      .map((e) => e.join(',')) // Join each array into a CSV row
      .join('\n'); // Join all rows into a CSV string

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container page-content">
      <h2>Transactions</h2>

      {/* Filter by month */}
      <div className="form-group">
        <label>Select Month</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="form-control"
        >
          <option value="">Show All Transactions</option>
          {months.map((month, index) => (
            <option key={index} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>

      {/* Display the full list of transactions */}
      <div className="transactions-list">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td> {/* Format the date */}
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td>£{transaction.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No transactions available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Export button */}
      <button className="btn btn-primary mt-4" onClick={exportToCSV}>
        Export to CSV
      </button>
    </div>
  );
};

export default Transactions;
