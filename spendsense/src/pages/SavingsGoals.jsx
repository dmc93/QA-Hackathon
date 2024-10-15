// src/pages/SavingsGoals.js
import React, { useState } from 'react';
import SavingsGoalsForm from '../components/SavingsGoalsForm'; // Component for adding savings goals
import '../css/SavingsGoals.css'; // Add custom styles

const SavingsGoals = () => {
  const [goals, setGoals] = useState([
    // Example ongoing goals
    { category: 'Holiday', savedAmount: 500, goalAmount: 2000 },
    { category: 'Emergency Fund', savedAmount: 300, goalAmount: 1000 },
  ]);
  const [selectedGoal, setSelectedGoal] = useState(null); // Track the selected goal for editing

  const addGoal = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]); // Add the new goal to the list
  };

  const updateGoalAmount = (goalIndex, newAmount) => {
    const updatedGoals = [...goals];
    updatedGoals[goalIndex].goalAmount = newAmount;
    setGoals(updatedGoals);
  };

  const handleSaveGoal = (goal) => {
    console.log('Saving goal:', goal);
    // API call for saving the goal goes here
  };

  return (
    <div className="container page-content">
      <div className="row">
        {/* Left Section: Savings Goals Tracking */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title">Savings Goals Tracking</h4>
              {goals.length > 0 ? (
                goals.map((goal, index) => (
                  <div key={index} className="progress-bar-container mb-4">
                    <h5>{goal.category}</h5>
                    <div className="d-flex justify-content-between mb-1">
                      <span>£{goal.savedAmount} saved</span> {/* Display saved amount on the left */}
                      <span>Goal: £{goal.goalAmount}</span> {/* Display goal amount on the right */}
                    </div>
                    <div className="progress" style={{ height: '30px' }}>
                      <div
                        className="progress-bar bg-primary" // Changed color to blue
                        role="progressbar"
                        style={{ width: `${(goal.savedAmount / goal.goalAmount) * 100}%` }}
                      >
                        {/* No text inside the bar */}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No savings goals available. Add a new one below.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Add and Edit Savings Goals */}
        <div className="col-md-6">
          {/* Add Goal Card */}
          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title">Add a Savings Goal</h4>
              <SavingsGoalsForm addGoal={addGoal} />
            </div>
          </div>

          {/* Edit Goals Card */}
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Edit Savings Goals</h4>

              {/* Dropdown to Select Goal Category */}
              <div className="form-group">
                <label>Select Goal to Edit</label>
                <select
                  className="form-control"
                  onChange={(e) => {
                    const selected = goals.find(goal => goal.category === e.target.value);
                    setSelectedGoal(selected);
                  }}
                >
                  <option value="">-- Select a Goal --</option>
                  {goals.map((goal, index) => (
                    <option key={index} value={goal.category}>
                      {goal.category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Show the selected goal for editing */}
              {selectedGoal && (
                <div className="mt-4">
                  <h5>Category: {selectedGoal.category}</h5>
                  <p>Current Goal: £{selectedGoal.goalAmount}</p>
                  <div className="form-group">
                    <label>Update Goal (£)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={selectedGoal.goalAmount}
                      onChange={(e) =>
                        updateGoalAmount(goals.indexOf(selectedGoal), parseFloat(e.target.value))
                      }
                    />
                  </div>
                  <button
                    className="btn btn-primary" // Changed button color to match theme
                    onClick={() => handleSaveGoal(selectedGoal)}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsGoals;
