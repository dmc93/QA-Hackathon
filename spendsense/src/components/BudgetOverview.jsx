// src/components/BudgetOverview.js
import React from 'react';
import BudgetProgressBar from './BudgetProgressBar'; // Import the existing progress bar component
import { Link } from 'react-router-dom'; // For navigation to manage budgets

const BudgetOverview = ({ budgets }) => {
  // Sort the budgets by the highest limit and pick the top two
  const topTwoBudgets = budgets
    .sort((a, b) => b.limit - a.limit)
    .slice(0, 2);

  return (
    <div className="col-md-6">
      <h4>Budget Progress</h4>
      {topTwoBudgets.map((budget, index) => (
        <BudgetProgressBar
          key={index}
          category={budget.category}
          spentAmount={budget.spentAmount}
          budgetLimit={budget.limit}
        />
      ))}

      {/* Link to navigate to the manage budgets page */}
      <div className="mt-3">
        <Link to="/budget-management" className="btn btn-primary">
          View All Budgets
        </Link>
      </div>
    </div>
  );
};

export default BudgetOverview;
