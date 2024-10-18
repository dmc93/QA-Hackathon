import axios from 'axios';

// Set the base URL for your API
const API_BASE_URL = 'http://localhost:8082'; // For user-related actions
const BUDGET_BASE_URL = 'http://localhost:8083/api/budgets'; // For budget-related actions
const LEDGER_BASE_URL = 'http://localhost:8084/api/ledgers'; // For transaction-related actions

// Login user and get JWT token
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, {
            email,
            password,
        });
        return response.data; // Return the response data (including token)
    } catch (error) {
        console.error('Error logging in:', error);
        throw error; // Propagate the error to be handled in the component
    }
};

// Fetch budgets for a specific userId
export const fetchBudgets = async (userId) => {
    try {
        const response = await axios.get(`${BUDGET_BASE_URL}/user/${userId}`);
        return response.data; // Return the fetched budgets
    } catch (error) {
        console.error('Error fetching budgets:', error);
        throw error; // Propagate the error to be handled in the component
    }
};

// Add a new budget
export const addBudget = async (userId, budget) => {
    try {
        // Ensure spentAmount is included in the budget object
        const budgetData = {
            ...budget,
            userId,
            spentAmount: budget.spentAmount !== undefined ? budget.spentAmount : 0, // Default to 0 if undefined
        };

        console.log("Budget to be sent:", budgetData); // Log the budget data to check its structure

        const response = await axios.post(BUDGET_BASE_URL, budgetData);
        return response.data; // Return the newly added budget
    } catch (error) {
        console.error('Error adding budget:', error);
        throw error; // Propagate the error to be handled in the component
    }
};




// Update an existing budget
export const updateBudget = async (userId, budget) => {
    try {
        const response = await axios.put(`${BUDGET_BASE_URL}/${budget.category}`, {
            ...budget,
            userId
        });
        return response.data; // Return the updated budget
    } catch (error) {
        console.error('Error updating budget:', error);
        throw error; // Propagate the error to be handled in the component
    }
};

// Fetch transactions for a specific userId
export const fetchTransactions = async (userId) => {
    try {
        const token = localStorage.getItem('jwtToken'); // Get the token from local storage
        const response = await axios.get(`${LEDGER_BASE_URL}/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include token in headers
            },
        });
        return response.data; // Return the fetched transactions
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error; // Propagate the error to be handled in the component
    }
};
