import React, { useState } from 'react';

const BudgetManagementForm = ({ addBudget, existingBudgets }) => {
    const [category, setCategory] = useState('');
    const [budgetLimit, setBudgetLimit] = useState('');
    const [budgetMonth, setBudgetMonth] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate if the budget already exists for the selected month
        const budgetExists = existingBudgets.some(budget => 
            budget.category === category && budget.budgetMonth === budgetMonth
        );

        if (budgetExists) {
            alert('This budget already exists for the selected month.');
            return;
        }

        // Convert the selected month to YYYY-MM format
        const monthParts = budgetMonth.split(' '); // Split "October 2024" into ["October", "2024"]
        const monthNumber = new Date(Date.parse(monthParts[0] + " 1, " + monthParts[1])).getMonth() + 1; // Get month number (0-11) and add 1
        const formattedBudgetMonth = `${monthParts[1]}-${monthNumber.toString().padStart(2, '0')}`; // Format to "YYYY-MM"

        const newBudget = {
            category,
            budgetLimit: parseFloat(budgetLimit),
            budgetMonth: formattedBudgetMonth, // Set the formatted month
            spentAmount: 0 // Default value
        };

        addBudget(newBudget); // Call the function to add the new budget
        setCategory('');
        setBudgetLimit('');
        setBudgetMonth('');
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
                    value={budgetLimit}
                    onChange={(e) => setBudgetLimit(e.target.value)}
                    className="form-control"
                    placeholder="Enter budget limit"
                    required
                />
            </div>
            <div className="form-group">
                <label>Budget Month</label>
                <select
                    value={budgetMonth}
                    onChange={(e) => setBudgetMonth(e.target.value)}
                    className="form-control"
                    required
                >
                    <option value="">Select Month</option>
                    {Array.from({ length: 12 }, (_, i) => {
                        const date = new Date();
                        date.setMonth(date.getMonth() + i);
                        const monthYear = date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear(); // Display as "October 2024"
                        return (
                            <option key={i} value={monthYear}>{monthYear}</option>
                        );
                    })}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Add Budget</button>
        </form>
    );
};

export default BudgetManagementForm;
