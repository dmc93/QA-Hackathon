import React from 'react';
import BudgetProgressBar from './BudgetProgressBar'; // Import the progress bar component
import { Link } from 'react-router-dom'; // For navigation to manage budgets

const BudgetOverview = ({ budgets = [], transactions = [] }) => {
  // Get the current month in YYYY-MM format
  const getCurrentMonth = () => {
    const today = new Date();
    return today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0'); // Returns YYYY-MM format
  };

  // Helper function to calculate spent amounts from transactions by category for the current month
  const calculateSpentAmount = (category) => {
    const currentMonth = getCurrentMonth(); // Get current month

    // Filter transactions by category and current month, and sum the amounts
    const spentInCategory = transactions
      .filter(transaction =>
        transaction.category === category &&
        transaction.date.startsWith(currentMonth) // Ensure transaction is in the current month
      )
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0); // Sum the transaction amounts

    return spentInCategory; // Return the calculated spent amount
  };

  // Sort and get the top two budgets by limit
  const topTwoBudgets = budgets
    .sort((a, b) => b.budgetLimit - a.budgetLimit)
    .slice(0, 2);

  return (
    <div>
      {topTwoBudgets.map((budget, index) => {
        const spentAmount = calculateSpentAmount(budget.category); // Calculate spent amount for the current month

        return (
          <BudgetProgressBar
            key={index}
            category={budget.category}
            spentAmount={spentAmount} // Use the calculated spent amount
            budgetLimit={budget.budgetLimit} // Use the budget limit
          />
        );
      })}

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
