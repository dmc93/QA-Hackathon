import axios from 'axios';

// Set the base URL for your API
const API_BASE_URL = 'http://localhost:8082'; // For user-related actions
const LEDGER_BASE_URL = 'http://localhost:8084/api/ledgers'; // For transaction-related actions

// Login user and get JWT token
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      email,
      password,
    });
    return response.data; // Return the response data (including token and user ID)
  } catch (error) {
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

