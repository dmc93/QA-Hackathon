// src/pages/Dashboard.js
import React from 'react';
import BudgetOverview from '../components/BudgetOverview';
import RecentTransactions from '../components/RecentTransactions';
import SpendingChart from '../components/SpendingChart';

const Dashboard = () => {
  const budgets = [
    { category: 'Groceries', spentAmount: 150, limit: 300 },
    { category: 'Entertainment', spentAmount: 100, limit: 200 },
  ];

  const transactions = [
    { date: '12/10/2024', description: 'Groceries', amount: 50 },
    { date: '10/10/2024', description: 'Utility Bill', amount: 100 },
  ];

  return (
    <div className="container">
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
        <RecentTransactions transactions={transactions} />
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
