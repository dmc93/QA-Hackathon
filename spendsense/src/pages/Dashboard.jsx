import React, { useEffect, useState } from 'react';
import BudgetOverview from '../components/BudgetOverview';
import RecentTransactions from '../components/RecentTransactions';
import SpendingChart from '../components/SpendingChart';
import { fetchTransactions, fetchBudgets } from '../api'; // Import the fetch functions
import { useAuth } from '../AuthContext'; // Import useAuth for user info

const Dashboard = () => {
    const [budgets, setBudgets] = useState([]); // Initialize budgets state
    const [transactions, setTransactions] = useState([]);
    const { userId, userName } = useAuth(); // Access the user ID and name from context

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const data = await fetchTransactions(userId); // Fetch transactions for the logged-in user
                setTransactions(data); // Update the state with fetched transactions
            } catch (error) {
                console.error('Failed to load transactions:', error);
            }
        };

        const loadBudgets = async () => {
            try {
                const data = await fetchBudgets(userId); // Fetch budgets for the logged-in user
                setBudgets(data); // Update the state with fetched budgets
            } catch (error) {
                console.error('Failed to load budgets:', error);
            }
        };

        if (userId) {
            loadTransactions(); // Only load transactions if userId is available
            loadBudgets(); // Only load budgets if userId is available
        }
    }, [userId]); // Run this effect when userId changes

    return (
        <div className="page-content">
            <div className="row">
                <div className="col-md-12">
                    <h2>Welcome, {userName}!</h2> {/* Display the user's name */}
                    <p>Here’s an overview of your spending:</p>
                </div>
            </div>

            <div className="row">
                {/* Budget Overview Card */}
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h4>Budget Overview</h4>
                            <BudgetOverview budgets={budgets} transactions={transactions} /> {/* Pass both budgets and transactions */}
                        </div>
                    </div>
                </div>

                {/* Recent Transactions Card */}
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            
                            <RecentTransactions transactions={transactions} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                {/* Spending Chart Card */}
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h4>Spending and Income Trends</h4>
                            <SpendingChart transactions={transactions} /> {/* Pass transactions to SpendingChart */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
