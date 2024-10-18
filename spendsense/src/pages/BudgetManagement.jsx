import React, { useEffect, useState } from 'react';
import BudgetManagementForm from '../components/BudgetManagementForm';
import { fetchBudgets, fetchTransactions, addBudget, updateBudget } from '../api'; // Import API functions
import { useAuth } from '../AuthContext'; // Import useAuth for user info
import '../css/BudgetManagement.css'; // Custom styles for Budget Management

const BudgetManagement = () => {
    const [budgets, setBudgets] = useState([]);
    const [transactions, setTransactions] = useState({}); // Transactions grouped by category
    const [currentMonth, setCurrentMonth] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedBudget, setSelectedBudget] = useState('');
    const [months, setMonths] = useState([]);
    const { userId } = useAuth(); // Access the user ID from context

    // Generate the next 12 months in format "Month Year"
    useEffect(() => {
        const generateNext12Months = () => {
            const monthList = [];
            const today = new Date();

            for (let i = 0; i < 12; i++) {
                const futureMonth = new Date(today.getFullYear(), today.getMonth() + i);
                const monthName = futureMonth.toLocaleString('default', { month: 'long' });
                const monthYear = `${monthName} ${futureMonth.getFullYear()}`; // Display "Month Year"
                monthList.push(monthYear);
            }
            setMonths(monthList);
            setCurrentMonth(monthList[0]); // Set default to the first month
            setSelectedMonth(monthList[0]); // Set default selected month
        };

        generateNext12Months();
    }, []);

    // Fetch budgets and transactions for the logged-in user
    useEffect(() => {
        const loadBudgetsAndTransactions = async () => {
            if (userId) {
                try {
                    // Fetch budgets
                    const budgetsData = await fetchBudgets(userId);
                    setBudgets(budgetsData);

                    // Fetch transactions and group by category
                    const transactionsData = await fetchTransactions(userId);
                    const currentMonthTransactions = transactionsData.filter(transaction => {
                        const transactionDate = new Date(transaction.date);
                        const currentDate = new Date();
                        return (
                            transactionDate.getMonth() === currentDate.getMonth() &&
                            transactionDate.getFullYear() === currentDate.getFullYear()
                        );
                    });

                    // Group transactions by category and sum them (convert negative amounts to positive)
                    const categorySpent = {};
                    currentMonthTransactions.forEach(transaction => {
                        if (!categorySpent[transaction.category]) {
                            categorySpent[transaction.category] = 0;
                        }
                        // Convert negative amounts to positive using Math.abs()
                        categorySpent[transaction.category] += Math.abs(transaction.amount);
                    });
                    
                    setTransactions(categorySpent); // Set grouped transactions
                } catch (error) {
                    console.error('Failed to load budgets or transactions:', error);
                }
            }
        };

        loadBudgetsAndTransactions(); // Load budgets and transactions when component mounts
    }, [userId]);

    // Format selected month into YYYY-MM
    const formatSelectedMonth = (monthYear) => {
        const [month, year] = monthYear.split(' ');
        const monthIndex = new Date(Date.parse(month + " 1, 2022")).getMonth() + 1; // Get month index
        return `${year}-${String(monthIndex).padStart(2, '0')}`; // Format as YYYY-MM
    };

    const formattedSelectedMonth = formatSelectedMonth(selectedMonth);

    // Handle saving a new budget
    const handleSaveBudget = async (newBudget) => {
        try {
            const existingBudget = budgets.find(
                budget => budget.category === newBudget.category && budget.budgetMonth === newBudget.budgetMonth
            );

            if (existingBudget) {
                alert('A budget for this category and month already exists.');
                return;
            }

            const addedBudget = await addBudget(userId, newBudget); // Send the new budget to the API
            setBudgets((prevBudgets) => [...prevBudgets, addedBudget]); // Update the state with the newly added budget
            console.log('Budget added successfully:', addedBudget);
        } catch (error) {
            console.error('Error saving budget:', error);
        }
    };

    // Handle editing an existing budget
    const handleEditBudget = async (updatedBudget) => {
        const budgetIndex = budgets.findIndex(b => b.category === updatedBudget.category && b.budgetMonth === selectedMonth);
        if (budgetIndex !== -1) {
            try {
                await updateBudget(userId, updatedBudget); // Call the API to update the budget
                setBudgets((prevBudgets) => {
                    const newBudgets = [...prevBudgets];
                    newBudgets[budgetIndex] = updatedBudget; // Update the budget in state
                    return newBudgets;
                });
                console.log('Budget updated successfully:', updatedBudget);
            } catch (error) {
                console.error('Error updating budget:', error);
            }
        }
    };

    // Filter the budgets for the selected month (edit section)
    const selectedMonthBudgets = budgets.filter((budget) => budget.budgetMonth === formattedSelectedMonth);

    // Find the selected budget for editing
    const selectedBudgetData = selectedMonthBudgets.find(
        (budget) => budget.category === selectedBudget
    );

    return (
        <div className="container page-content">
            <div className="row">
                {/* Left Section: Budget Tracking for Selected Month */}
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h4 className="card-title">Budget Tracking for {selectedMonth}</h4>
                            {budgets
                                .filter((budget) => budget.budgetMonth === formattedSelectedMonth)
                                .map((budget, index) => {
                                    const spentInCategory = transactions[budget.category] || 0; // Get spent amount from transactions
                                    const updatedSpentAmount = spentInCategory; // Update spent amount based on transactions
                                    
                                    return (
                                        <div key={index} className="progress-bar-container mb-4">
                                            <h5>{budget.category}</h5>
                                            <div className="d-flex justify-content-between mb-1">
                                                <span>£{updatedSpentAmount} spent</span>
                                                <span>Limit: £{budget.budgetLimit}</span>
                                            </div>
                                            <div className="progress" style={{ height: '30px' }}>
                                                <div
                                                    className="progress-bar bg-primary"
                                                    role="progressbar"
                                                    style={{ width: `${(updatedSpentAmount / budget.budgetLimit) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>

                {/* Right Section: Add/Edit Budgets */}
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h4 className="card-title">Add Budget</h4>
                            <BudgetManagementForm addBudget={handleSaveBudget} existingBudgets={budgets} /> {/* Pass existing budgets for validation */}
                        </div>
                    </div>

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
                                    <p>Current Limit: £{selectedBudgetData.budgetLimit}</p>
                                    <div className="form-group">
                                        <label>Update Limit (£)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={selectedBudgetData.budgetLimit}
                                            onChange={(e) =>
                                                handleEditBudget({ ...selectedBudgetData, budgetLimit: parseFloat(e.target.value) })
                                            }
                                        />
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleEditBudget(selectedBudgetData)}
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
