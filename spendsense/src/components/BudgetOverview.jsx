// src/components/BudgetOverview.js
import React from 'react';
import BudgetProgressBar from './BudgetProgressBar'; // Import the existing progress bar component

const BudgetOverview = ({ budgets }) => {
  return (
    <div className="col-md-6">
      <h4>Budget Progress</h4>
      {budgets.map((budget, index) => (
        <BudgetProgressBar
          key={index}
          category={budget.category}
          spentAmount={budget.spentAmount}
          budgetLimit={budget.limit}
        />
      ))}
    </div>
  );
};

export default BudgetOverview;
