// src/components/BudgetManagementForm.js
import React, { useState, useEffect } from 'react';

const BudgetManagementForm = ({ addBudget }) => {
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [months, setMonths] = useState([]);

  // Generate the next 12 months dynamically
  useEffect(() => {
    const generateNext12Months = () => {
      const monthList = [];
      const today = new Date();

      for (let i = 0; i < 12; i++) {
        const futureMonth = new Date(today.getFullYear(), today.getMonth() + i);
        const monthName = futureMonth.toLocaleString('default', { month: 'long' });
        const monthYear = `${monthName} ${futureMonth.getFullYear()}`;
        monthList.push(monthYear);
      }
      setMonths(monthList);
    };

    generateNext12Months();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store the budget for each of the next 12 months when created
    const newBudgets = months.map((month) => ({
      category,
      limit: parseFloat(limit),
      month,
    }));

    addBudget(newBudgets); // Pass the array of budgets for all 12 months to the parent

    // Reset the form
    setCategory('');
    setLimit('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Budget Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-control"
          placeholder="e.g., Groceries, Entertainment"
          required
        />
      </div>
      <div className="form-group">
        <label>Budget Limit (£)</label>
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="form-control"
          placeholder="Enter budget limit"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Budget for Next 12 Months</button>
    </form>
  );
};

export default BudgetManagementForm;
