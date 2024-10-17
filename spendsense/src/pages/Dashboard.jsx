import React, { useEffect, useState } from 'react';
import BudgetOverview from '../components/BudgetOverview';
import RecentTransactions from '../components/RecentTransactions';
import SpendingChart from '../components/SpendingChart';
import { fetchTransactions } from '../api'; // Import the fetch function
import { useAuth } from '../AuthContext'; // Import useAuth for user info

const Dashboard = () => {
  const [budgets, setBudgets] = useState([
    { category: 'Groceries', spentAmount: 150, limit: 300 },
    { category: 'Entertainment', spentAmount: 100, limit: 200 },
  ]);

  const [transactions, setTransactions] = useState([]);
  const { userId } = useAuth(); // Access the user ID from context

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions(userId); // Fetch transactions for the logged-in user
        setTransactions(data); // Update the state with fetched transactions
      } catch (error) {
        console.error('Failed to load transactions:', error);
      }
    };

    if (userId) {
      loadTransactions(); // Only load transactions if userId is available
    }
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
        {/* Budget Overview Card */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h4>Budget Overview</h4>
              <BudgetOverview budgets={budgets} />
            </div>
          </div>
        </div>

        {/* Recent Transactions Card */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h4>Recent Transactions</h4>
              <RecentTransactions transactions={transactions} />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        {/* Spending Chart Card */}
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4>Spending and Income Trends</h4>
              <SpendingChart transactions={transactions} /> {/* Pass transactions to SpendingChart */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
