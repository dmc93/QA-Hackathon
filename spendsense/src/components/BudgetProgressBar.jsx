// src/components/BudgetProgressBar.js
import React from 'react';

const BudgetProgressBar = ({ category, spentAmount, budgetLimit }) => {
  const progressPercentage = (spentAmount / budgetLimit) * 100;

  return (
    <div className="mb-3">
      <h5>{category}</h5>
      <div className="d-flex justify-content-between mb-1">
        <span>£{spentAmount} spent</span>
        <span>Limit: £{budgetLimit}</span>
      </div>
      <div className="progress" style={{ height: '30px' }}>
        <div
          className="progress-bar bg-primary"
          role="progressbar"
          style={{ width: `${progressPercentage}%` }}
        >
          {/* You can display the percentage or value inside the bar if needed */}
        </div>
      </div>
    </div>
  );
};

export default BudgetProgressBar;
