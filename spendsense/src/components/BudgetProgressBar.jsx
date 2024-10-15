// src/components/BudgetProgressBar.js
import React from 'react';

const BudgetProgressBar = ({ category, spentAmount, budgetLimit }) => {
  return (
    <div className="mb-4">
      <h5>{category}</h5>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${(spentAmount / budgetLimit) * 100}%` }}
        >
          £{spentAmount} spent out of £{budgetLimit}
        </div>
      </div>
    </div>
  );
};

export default BudgetProgressBar;
