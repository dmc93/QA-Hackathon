// src/pages/BudgetManagement.js
import React, { useState, useEffect } from 'react'; // Make sure to import useEffect
import BudgetManagementForm from '../components/BudgetManagementForm';

const BudgetManagement = () => {
  const [budgets, setBudgets] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [months, setMonths] = useState([]);

  // Generate the next 12 months dynamically when the page loads
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
      setSelectedMonth(monthList[0]); // Set the default selected month to the first in the list
    };

    generateNext12Months();
  }, []);

  const addBudget = (newBudgets) => {
    setBudgets((prevBudgets) => [...prevBudgets, ...newBudgets]); // Add budgets for the next 12 months
  };

  const updateBudgetLimit = (index, newLimit) => {
    const updatedBudgets = [...budgets];
    updatedBudgets[index].limit = newLimit;
    setBudgets(updatedBudgets);
  };

  // Simulate saving budget data (you will later replace this with an API call)
  const handleSaveBudget = (budget) => {
    console.log('Saving budget:', budget);
    // This is where you'd make the API call to save the budget to the database
  };

  // Filter the budgets to show only the selected month for editing
  const filteredBudget = budgets.find((budget) => budget.month === selectedMonth);

  return (
    <div className="container">
      <h2>Budget Management</h2>

      {/* Add New Budget Form */}
      <h4>Add a New Budget for the Next 12 Months</h4>
      <BudgetManagementForm addBudget={addBudget} />

      {/* Dropdown to Select Month */}
      <h4 className="mt-4">Edit Budget for Selected Month</h4>
      <div className="form-group">
        <label>Select Month to Edit</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="form-control"
        >
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Show Budget for the Selected Month */}
      {filteredBudget && (
        <div className="mt-4">
          <h5>Category: {filteredBudget.category}</h5>
          <p>Current Limit: £{filteredBudget.limit}</p>
          <div className="form-group">
            <label>Update Limit (£)</label>
            <input
              type="number"
              className="form-control"
              value={filteredBudget.limit}
              onChange={(e) => updateBudgetLimit(budgets.indexOf(filteredBudget), parseFloat(e.target.value))}
            />
          </div>
          {/* Save Button */}
          <button
            className="btn btn-success"
            onClick={() => handleSaveBudget(filteredBudget)} // Simulate saving
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default BudgetManagement;
