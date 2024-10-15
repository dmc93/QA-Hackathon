// src/components/SavingsGoalsForm.js
import React, { useState } from 'react';

const SavingsGoalsForm = ({ addGoal }) => {
  const [goalCategory, setGoalCategory] = useState('');
  const [goalAmount, setGoalAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (goalCategory && goalAmount) {
      const newGoal = {
        category: goalCategory,
        savedAmount: 0, // Initially, no savings
        goalAmount: parseFloat(goalAmount), // Convert to a number
      };

      // Add the goal to the state using the addGoal function passed via props
      addGoal(newGoal);

      // Clear the form
      setGoalCategory('');
      setGoalAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Goal Category</label>
        <input
          type="text"
          className="form-control"
          value={goalCategory}
          onChange={(e) => setGoalCategory(e.target.value)}
          placeholder="e.g., Holiday, Emergency Fund"
        />
      </div>
      <div className="form-group">
        <label>Goal Amount (£)</label>
        <input
          type="number"
          className="form-control"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
          placeholder="Enter target savings amount"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Savings Goal
      </button>
    </form>
  );
};

export default SavingsGoalsForm;
