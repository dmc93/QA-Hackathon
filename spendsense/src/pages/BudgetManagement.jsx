// src/pages/BudgetManagement.js
import React, { useState, useEffect } from 'react';
import BudgetManagementForm from '../components/BudgetManagementForm';

const BudgetManagement = () => {
  const [budgets, setBudgets] = useState([
    // Example budgets for different months
    { category: 'Groceries', spentAmount: 150, limit: 300, month: 'October 2024' },
    { category: 'Entertainment', spentAmount: 100, limit: 200, month: 'October 2024' },
    { category: 'Utilities', spentAmount: 50, limit: 100, month: 'November 2024' },
  ]);

  const [currentMonth, setCurrentMonth] = useState(''); // For tracking
  const [selectedMonth, setSelectedMonth] = useState(''); // For selecting the month in edit
  const [selectedBudget, setSelectedBudget] = useState(''); // For selecting the budget category to edit
  const [months, setMonths] = useState([]);
  
  // Get the current month and generate the next 12 months
  useEffect(() => {
    const generateNext12Months = () => {
      const monthList = [];
      const today = new Date();
      
      const currentMonthName = today.toLocaleString('default', { month: 'long' });
      const currentMonthYear = `${currentMonthName} ${today.getFullYear()}`;
      setCurrentMonth(currentMonthYear); // Set the current month for tracking

      for (let i = 0; i < 12; i++) {
        const futureMonth = new Date(today.getFullYear(), today.getMonth() + i);
        const monthName = futureMonth.toLocaleString('default', { month: 'long' });
        const monthYear = `${monthName} ${futureMonth.getFullYear()}`;
        monthList.push(monthYear);
      }
      setMonths(monthList);
      setSelectedMonth(monthList[0]); // Set default selected month
    };

    generateNext12Months();
  }, []);

  const addBudget = (newBudgets) => {
    setBudgets((prevBudgets) => [...prevBudgets, ...newBudgets]); // Add budgets for the next 12 months
  };

  const updateBudgetLimit = (budgetIndex, newLimit) => {
    const updatedBudgets = [...budgets];
    updatedBudgets[budgetIndex].limit = newLimit;
    setBudgets(updatedBudgets);
  };

  // Simulate saving budget data (replace this with an API call)
  const handleSaveBudget = (budget) => {
    console.log('Saving budget:', budget);
    // API call for saving the budget goes here
  };

  // Filter the budgets for the selected month (edit section)
  const selectedMonthBudgets = budgets.filter((budget) => budget.month === selectedMonth);

  // Find the selected budget for editing
  const selectedBudgetData = selectedMonthBudgets.find(
    (budget) => budget.category === selectedBudget
  );

  return (
    <div className="container page-content">
      <div className="row">
        {/* Left Section: Budget Tracking for Current Month */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title">Budget Tracking for {currentMonth}</h4>
              {budgets
                .filter((budget) => budget.month === currentMonth)
                .map((budget, index) => (
                  <div key={index} className="progress-bar-container">
                    <h5>{budget.category}</h5>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${(budget.spentAmount / budget.limit) * 100}%` }}
                      >
                        £{budget.spentAmount} spent out of £{budget.limit}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Section: Add/Edit Budgets */}
        <div className="col-md-6">
          {/* Add Budgets Card */}
          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title">Add or Edit Budgets</h4>
              <BudgetManagementForm addBudget={addBudget} />
            </div>
          </div>

          {/* Edit Budgets Card */}
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Edit Budgets</h4>

              {/* Dropdown to Select Month for Editing */}
              <div className="form-group">
                <label>Select Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(e.target.value);
                    setSelectedBudget(''); // Reset selected budget when changing month
                  }}
                  className="form-control"
                >
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropdown to Select Budget Category for the Selected Month */}
              {selectedMonthBudgets.length > 0 && (
                <div className="form-group">
                  <label>Select Budget Category</label>
                  <select
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="form-control"
                  >
                    <option value="">-- Select a Budget --</option>
                    {selectedMonthBudgets.map((budget, index) => (
                      <option key={index} value={budget.category}>
                        {budget.category}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Show selected budget for editing */}
              {selectedBudgetData && (
                <div className="mt-4">
                  <h5>Category: {selectedBudgetData.category}</h5>
                  <p>Current Limit: £{selectedBudgetData.limit}</p>
                  <div className="form-group">
                    <label>Update Limit (£)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={selectedBudgetData.limit}
                      onChange={(e) =>
                        updateBudgetLimit(budgets.indexOf(selectedBudgetData), parseFloat(e.target.value))
                      }
                    />
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={() => handleSaveBudget(selectedBudgetData)}
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

export default BudgetManagement;
