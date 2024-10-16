import React, { useEffect, useState } from 'react';
import BudgetOverview from '../components/BudgetOverview';
import RecentTransactions from '../components/RecentTransactions';
import SpendingChart from '../components/SpendingChart';
import { fetchTransactions } from '../api'; // Import the fetch function

const Dashboard = () => {
  const [budgets, setBudgets] = useState([
    { category: 'Groceries', spentAmount: 150, limit: 300 },
    { category: 'Entertainment', spentAmount: 100, limit: 200 },
  ]);

  const [transactions, setTransactions] = useState([]);
  const userId = 1; // Replace with actual user ID from login or state management

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions(userId); // Fetch transactions for the logged-in user
        setTransactions(data); // Update the state with fetched transactions
      } catch (error) {
        console.error('Failed to load transactions:', error);
      }
    };

    loadTransactions();
  }, [userId]); // Run this effect when userId changes

  return (
    <div className="page-content">
      <div className="row">
        <div className="col-md-12">
          <h2>Welcome, User!</h2>
          <p>Here’s an overview of your spending:</p>
        </div>
      </div>

      <div className="row">
        {/* Budget Overview */}
        <BudgetOverview budgets={budgets} />

        {/* Recent Transactions */}
        <RecentTransactions transactions={transactions} /> {/* Pass fetched transactions */}
      </div>

      <div className="row mt-4">
        {/* Spending Chart */}
        <div className="col-md-12">
          <SpendingChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
